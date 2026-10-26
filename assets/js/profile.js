/* 主体档案：只在当前浏览器保存，不发送照片或身体资料。 */
(function (global) {
  "use strict";

  const DB_NAME = "her-wardrobe-profile";
  const META_KEY = "her_wardrobe_profile_meta";
  const MAX_PHOTOS = 6;
  const EMPTY_META = { height: null, weight: null, note: "" };
  let database;

  function storageError(error) {
    if (error && error.name === "QuotaExceededError") {
      return new Error("浏览器存储空间不足，请删除部分照片或释放空间后重试。");
    }
    return new Error("无法使用本机照片存储，请检查浏览器是否允许此站点保存数据。" +
      (error && error.name === "InvalidStateError" ? "请退出隐私浏览后重试。" : ""));
  }

  function openDatabase() {
    if (database) return database;
    database = new Promise((resolve, reject) => {
      if (!global.indexedDB) {
        reject(storageError());
        return;
      }
      let request;
      try { request = global.indexedDB.open(DB_NAME, 1); }
      catch (error) { reject(storageError(error)); return; }
      let blocked = false;
      request.onupgradeneeded = () => {
        const db = request.result;
        db.createObjectStore("meta");
        db.createObjectStore("photos", { keyPath: "id" });
      };
      request.onerror = () => reject(storageError(request.error));
      request.onblocked = () => {
        blocked = true;
        reject(new Error("档案存储被其他标签页占用，请关闭其他衣橱页面后重试。"));
      };
      request.onsuccess = () => {
        const db = request.result;
        if (blocked) { db.close(); return; }
        db.onversionchange = () => { db.close(); database = null; };
        resolve(db);
      };
    }).catch((error) => { database = null; throw error; });
    return database;
  }

  // 仅在事务真正提交后报告成功；照片数量检查与写入在同一事务中。
  function transaction(db, stores, mode, action) {
    return new Promise((resolve, reject) => {
      let tx;
      try { tx = db.transaction(stores, mode); }
      catch (error) { reject(storageError(error)); return; }
      let value;
      let failure;
      tx.oncomplete = () => resolve(value);
      tx.onabort = () => reject(failure || storageError(tx.error));
      try {
        action(tx, (result) => { value = result; }, (error) => {
          failure = error;
          tx.abort();
        });
      } catch (error) {
        failure = storageError(error);
        tx.abort();
      }
    });
  }

  function fallbackMeta() {
    try {
      const meta = JSON.parse(localStorage.getItem(META_KEY) || "null");
      return meta ? { ...EMPTY_META, ...meta } : { ...EMPTY_META };
    } catch (_) {
      throw new Error("无法读取本机资料，请检查浏览器的存储设置。");
    }
  }

  async function get() {
    let db;
    try { db = await openDatabase(); } catch (_) { return fallbackMeta(); }
    const meta = await transaction(db, ["meta"], "readonly", (tx, done) => {
      const request = tx.objectStore("meta").get("profile");
      request.onsuccess = () => done(request.result);
    });
    if (meta) return { ...EMPTY_META, ...meta };
    try { return fallbackMeta(); } catch (_) { return { ...EMPTY_META }; }
  }

  async function save(meta) {
    const height = Number(meta.height);
    const weight = Number(meta.weight);
    if (!Number.isFinite(height) || height <= 0 || height > 300 ||
        !Number.isFinite(weight) || weight <= 0 || weight > 500) {
      throw new Error("请填写有效的身高（1～300 cm）与体重（1～500 kg）。");
    }
    const record = { height, weight, note: String(meta.note || "").trim().slice(0, 200) };
    let db;
    try { db = await openDatabase(); } catch (_) {
      try { localStorage.setItem(META_KEY, JSON.stringify(record)); } catch (_) {
        throw new Error("保存失败，浏览器未允许本地存储或空间不足。");
      }
      return record;
    }
    await transaction(db, ["meta"], "readwrite", (tx) => tx.objectStore("meta").put(record, "profile"));
    try { localStorage.removeItem(META_KEY); } catch (_) {}
    return record;
  }

  async function listPhotos() {
    const db = await openDatabase();
    const photos = await transaction(db, ["photos"], "readonly", (tx, done) => {
      const request = tx.objectStore("photos").getAll();
      request.onsuccess = () => done(request.result);
    });
    return photos.sort((a, b) => a.createdAt - b.createdAt || a.id.localeCompare(b.id));
  }

  async function compressPhoto(blob) {
    if (!(blob instanceof Blob) || !["image/jpeg", "image/png", "image/webp"].includes(blob.type)) {
      throw new Error("请选择 JPG、PNG 或 WebP 格式的照片。");
    }
    const url = URL.createObjectURL(blob);
    const image = new Image();
    const canvas = document.createElement("canvas");
    try {
      await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = () => reject(new Error("这张照片无法读取，请换一张有效的照片。"));
        image.src = url;
      });
      const scale = Math.min(1, 1600 / Math.max(image.naturalWidth, image.naturalHeight));
      canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
      canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
      const context = canvas.getContext("2d");
      if (!context) throw new Error("浏览器无法处理照片，请换一个浏览器重试。");
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      const encode = (quality) => new Promise((resolve, reject) => {
        canvas.toBlob((result) => result ? resolve(result) : reject(new Error("照片压缩失败，请换一张照片。")), "image/jpeg", quality);
      });
      let compressed = await encode(0.85);
      if (compressed.size >= 2 * 1024 * 1024) compressed = await encode(0.72);
      if (compressed.size >= 2 * 1024 * 1024) throw new Error("压缩后照片仍超过 2MB，请换一张较小的照片。");
      return { blob: compressed, width: canvas.width, height: canvas.height };
    } finally {
      URL.revokeObjectURL(url);
      image.src = "";
      canvas.width = canvas.height = 0;
    }
  }

  async function addPhoto(blob) {
    const db = await openDatabase();
    const compressed = await compressPhoto(blob);
    const photo = {
      ...compressed,
      id: global.crypto && global.crypto.randomUUID ? global.crypto.randomUUID() :
        Date.now().toString(36) + "-" + Math.random().toString(36).slice(2),
      createdAt: Date.now()
    };
    return transaction(db, ["photos"], "readwrite", (tx, done, abort) => {
      const store = tx.objectStore("photos");
      const request = store.count();
      request.onsuccess = () => {
        if (request.result >= MAX_PHOTOS) {
          abort(new Error("最多保存 6 张主体照片，请先删除一张再添加。"));
          return;
        }
        try {
          store.add(photo);
          done(photo);
        } catch (error) { abort(storageError(error)); }
      };
    });
  }

  async function removePhoto(id) {
    const db = await openDatabase();
    await transaction(db, ["photos"], "readwrite", (tx) => tx.objectStore("photos").delete(id));
  }

  async function clearPhotos() {
    const db = await openDatabase();
    await transaction(db, ["photos"], "readwrite", (tx) => tx.objectStore("photos").clear());
  }

  async function clear() {
    let db;
    try { db = await openDatabase(); } catch (error) {
      // IndexedDB 暂时不可读时，不能声称已删除其中的照片。
      if (global.indexedDB) throw error;
    }
    if (db) await transaction(db, ["meta", "photos"], "readwrite", (tx) => {
      tx.objectStore("meta").clear();
      tx.objectStore("photos").clear();
    });
    try { localStorage.removeItem(META_KEY); } catch (_) {
      throw new Error("无法清除备用资料，请检查浏览器存储设置后重试。");
    }
  }

  // 所有接口均返回 Promise；照片记录包含 id、blob、width、height、createdAt。
  global.WardrobeProfile = { get, save, listPhotos, addPhoto, removePhoto, clear };

  function mount(container) {
    container.innerHTML = `
      <div class="profile-layout">
        <section class="profile-basics" aria-labelledby="profile-basics-title">
          <p class="section-kicker">01 · 身体比例</p>
          <h3 id="profile-basics-title" class="profile-title">从了解自己开始</h3>
          <form id="profile-form">
            <fieldset class="profile-fields" disabled>
              <div class="profile-measures">
                <label for="profile-height">身高 <span>cm</span>
                  <input id="profile-height" name="height" type="number" inputmode="decimal" min="1" max="300" step="0.1" placeholder="如 165" required />
                </label>
                <label for="profile-weight">体重 <span>kg</span>
                  <input id="profile-weight" name="weight" type="number" inputmode="decimal" min="1" max="500" step="0.1" placeholder="如 52" required />
                </label>
              </div>
              <label for="profile-note">穿衣偏好 <span>选填 · 一句话</span>
                <textarea id="profile-note" name="note" rows="3" maxlength="200" placeholder="如：喜欢宽松剪裁，偏爱米白与深蓝。"></textarea>
              </label>
              <button class="profile-button is-primary" type="submit">保存资料</button>
            </fieldset>
            <p class="profile-message" id="profile-meta-status" role="status">正在读取本机资料…</p>
          </form>
        </section>
        <section class="profile-photos" aria-labelledby="profile-photos-title">
          <p class="section-kicker">02 · 留下身影</p>
          <div class="profile-section-heading">
            <h3 id="profile-photos-title" class="profile-title">主体照片</h3>
            <span class="profile-count" id="profile-count">0 / 6</span>
          </div>
          <p class="profile-hint" id="profile-upload-hint">选 1～6 张本人全身或半身照，光线清晰、姿态自然即可。支持 JPG / PNG / WebP；自动压缩到最长边约 1600px、单张小于 2MB。</p>
          <div class="profile-photo-actions">
            <label class="profile-button profile-upload">
              <span>＋ 添加主体照片</span>
              <input id="profile-upload" type="file" accept="image/jpeg,image/png,image/webp" multiple aria-label="添加主体照片" aria-describedby="profile-upload-hint" disabled />
            </label>
            <button class="profile-text-button" id="profile-clear-photos" type="button" disabled>清空照片</button>
          </div>
          <p class="profile-message" id="profile-photo-status" role="status">正在读取照片…</p>
          <div class="profile-empty" id="profile-empty" hidden>
            <span class="profile-empty-mark" aria-hidden="true">一张照片，一份自己的参照。</span>
            <p>还没有主体照片。照片只存在这台手机 / 电脑的浏览器里，用于之后生成试穿参考。</p>
          </div>
          <ol class="profile-photo-grid" id="profile-photo-grid" aria-label="已保存的主体照片"></ol>
        </section>
      </div>
      <div class="profile-local-note">
        <p>只留在本机 · 身高、体重与照片均保存在当前浏览器，不上传服务器。无需登录；更换设备、浏览器或清除站点数据后，需要重新建档。</p>
        <button class="profile-text-button" id="profile-clear-all" type="button" disabled>清除全部档案</button>
      </div>`;

    const find = (selector) => container.querySelector(selector);
    const form = find("#profile-form");
    const fields = find(".profile-fields");
    const upload = find("#profile-upload");
    const grid = find("#profile-photo-grid");
    const photoStatus = find("#profile-photo-status");
    const metaStatus = find("#profile-meta-status");
    const clearAll = find("#profile-clear-all");
    const clearPhotoButton = find("#profile-clear-photos");
    let photos = [];
    let urls = [];
    let busy = true;
    let available = false;
    let disposed = false;

    function message(target, text, error) {
      if (disposed) return;
      target.textContent = text;
      target.classList.toggle("is-error", !!error);
    }

    function controls() {
      if (disposed) return;
      fields.disabled = busy;
      upload.disabled = busy || !available || photos.length >= MAX_PHOTOS;
      upload.parentElement.classList.toggle("is-disabled", upload.disabled);
      clearPhotoButton.disabled = busy || !available || !photos.length;
      clearAll.disabled = busy;
      grid.querySelectorAll("button").forEach((button) => { button.disabled = busy; });
      container.setAttribute("aria-busy", String(busy));
    }

    function releasePreviews() {
      urls.forEach((url) => URL.revokeObjectURL(url));
      urls = [];
    }

    function drawPhotos() {
      if (disposed) return;
      releasePreviews();
      grid.replaceChildren();
      find("#profile-count").textContent = `${photos.length} / ${MAX_PHOTOS}`;
      find("#profile-empty").hidden = !!photos.length || !available;
      photos.forEach((photo, index) => {
        const item = document.createElement("li");
        const figure = document.createElement("figure");
        const image = document.createElement("img");
        image.src = URL.createObjectURL(photo.blob);
        urls.push(image.src);
        image.alt = `主体照片 ${index + 1}`;
        image.width = photo.width;
        image.height = photo.height;
        const caption = document.createElement("figcaption");
        const detail = document.createElement("span");
        detail.textContent = `${String(index + 1).padStart(2, "0")} · ${Math.ceil(photo.blob.size / 1024)} KB`;
        const remove = document.createElement("button");
        remove.type = "button";
        remove.className = "profile-text-button";
        remove.textContent = "删除";
        remove.setAttribute("aria-label", `删除第 ${index + 1} 张主体照片`);
        remove.onclick = () => runPhotoAction(async () => {
          await removePhoto(photo.id);
          return "已删除这张照片。";
        });
        caption.append(detail, remove);
        figure.append(image, caption);
        item.append(figure);
        grid.append(item);
      });
      controls();
    }

    async function runPhotoAction(action) {
      if (busy || disposed) return;
      busy = true;
      controls();
      message(photoStatus, "正在处理，请稍候…");
      try {
        const result = await action();
        photos = await listPhotos();
        drawPhotos();
        message(photoStatus, result);
      } catch (error) {
        // 一批文件中部分保存失败时，也展示已成功提交的照片。
        try { photos = await listPhotos(); drawPhotos(); } catch (_) {}
        message(photoStatus, error.message, true);
      } finally {
        busy = false;
        controls();
      }
    }

    form.onsubmit = async (event) => {
      event.preventDefault();
      if (busy) return;
      busy = true;
      controls();
      try {
        await save({ height: form.elements.height.value, weight: form.elements.weight.value, note: form.elements.note.value });
        message(metaStatus, "资料已保存在当前浏览器。");
      } catch (error) { message(metaStatus, error.message, true); }
      finally { busy = false; controls(); }
    };

    upload.onchange = () => {
      const files = Array.from(upload.files || []);
      upload.value = "";
      if (!files.length) return;
      runPhotoAction(async () => {
        const remaining = MAX_PHOTOS - photos.length;
        const selected = files.slice(0, remaining);
        const errors = [];
        let added = 0;
        for (const file of selected) {
          message(photoStatus, `正在压缩并保存第 ${added + errors.length + 1} / ${selected.length} 张…`);
          try { await addPhoto(file); added++; } catch (error) { errors.push(error.message); }
        }
        if (errors.length) throw new Error(`已保存 ${added} 张；${errors.length} 张未保存。${errors[0]}`);
        return `已在本机保存 ${added} 张照片。` + (files.length > remaining ? "最多保留 6 张，其余未添加。" : "");
      });
    };

    clearPhotoButton.onclick = () => {
      if (!global.confirm("清空当前浏览器中的全部主体照片？身高、体重与备注会保留。")) return;
      runPhotoAction(async () => { await clearPhotos(); return "主体照片已全部清空。"; });
    };

    clearAll.onclick = async () => {
      if (busy || !global.confirm("清除当前浏览器中的身高、体重、备注与全部主体照片？此操作无法恢复。")) return;
      busy = true;
      controls();
      try {
        await clear();
        if (disposed) return;
        form.reset();
        photos = [];
        drawPhotos();
        message(metaStatus, "资料已清除。");
        message(photoStatus, "全部主体照片已清除。");
      } catch (error) { message(photoStatus, error.message, true); }
      finally { busy = false; controls(); }
    };

    controls();
    Promise.allSettled([get(), listPhotos()]).then(([metaResult, photoResult]) => {
      if (disposed) return;
      if (metaResult.status === "fulfilled") {
        const meta = metaResult.value;
        form.elements.height.value = meta.height == null ? "" : meta.height;
        form.elements.weight.value = meta.weight == null ? "" : meta.weight;
        form.elements.note.value = meta.note;
        message(metaStatus, meta.height ? "已读取本机资料。修改后请保存。" : "填写后保存，留作之后试穿的比例参考。");
      } else { message(metaStatus, metaResult.reason.message, true); }
      if (photoResult.status === "fulfilled") {
        available = true;
        photos = photoResult.value;
        message(photoStatus, photos.length ? "照片已保存在本机，可继续添加或删除。" : "尚未添加照片。");
      } else {
        message(photoStatus, photoResult.reason.message + "身高、体重与备注仍可尝试保存。", true);
      }
      busy = false;
      drawPhotos();
    });

    return () => { disposed = true; releasePreviews(); };
  }

  global.WardrobeProfilePage = { mount };
})(window);
