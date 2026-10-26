(function () {
  const cfg = window.WARDROBE_CONFIG;
  if (!cfg) {
    document.body.innerHTML = "<p style='padding:2rem'>缺少配置 data/config.js</p>";
    return;
  }

  const SEASON_CN = { summer: "夏", fall: "秋", winter: "冬", spring: "春", gym: "健身", lounge: "居家" };
  const ROUTES = [
    { hash: "#/", id: "home", label: "今日" },
    { hash: "#/profile", id: "profile", label: "档案" }
  ];

  function $(sel, root) { return (root || document).querySelector(sel); }
  function el(html) {
    const t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstChild;
  }

  function shopUrl(name, look) {
    const shop = cfg.shop || {};
    const lookUrls = (look && look.urls) || {};
    return lookUrls[name] || shop[name] || "";
  }

  function piecesLines(look) {
    const p = look.pieces || {};
    const lines = [];
    function push(role, name) {
      if (!name) return;
      const buySet = new Set(look.buy || []);
      lines.push({
        role,
        name,
        url: shopUrl(name, look),
        needBuy: buySet.has(name)
      });
    }
    push("连身", p.onePiece);
    push("上装", p.top);
    push("下装", p.bottom);
    push("鞋履", p.shoes);
    (p.extras || []).forEach((x, i) => push(i === 0 ? "配饰" : "", x));
    return lines;
  }

  function placeholderFrame(look, folio) {
    if (look.image) {
      return `
      <div class="look-thumb has-image">
        <img src="${look.image}" alt="${look.name} 试穿图" />
        <span class="thumb-folio">${folio || look.id.toUpperCase()}</span>
      </div>`;
    }
    return `
      <div class="look-thumb" role="img" aria-label="${look.name} 占位图">
        <span class="thumb-folio">${folio || look.id.toUpperCase()}</span>
        <span class="thumb-label">${look.name}</span>
      </div>`;
  }

  function renderMasthead(activeId) {
    const nav = ROUTES.map((r) => {
      const active = r.id === activeId ? " is-active" : "";
      const aria = r.id === activeId ? ' aria-current="page"' : "";
      return `<a href="${r.hash}" class="${active.trim()}"${aria}>${r.label}</a>`;
    }).join("");
    return `
      <header class="masthead">
        <div class="masthead-inner">
          <div class="masthead-top">
            <h1 class="site-title">${cfg.siteName}</h1>
            <div class="site-tag">${cfg.tagline || ""}</div>
          </div>
          <nav class="nav" aria-label="主导航">${nav}</nav>
        </div>
      </header>`;
  }

  function renderFooter() {
    return `
      <footer class="footer">
        <span>${cfg.siteName} · 私人衣橱</span>
        <span>试穿图可稍后替换 · 天气来自 Open-Meteo</span>
      </footer>`;
  }

  function lookThumbHtml(look, folio) {
    const meta = `
      <div class="hero-meta">
        <h3 class="hero-name">${look.name}</h3>
        <div class="hero-season">${SEASON_CN[look.season]}</div>
      </div>`;
    if (look.image) {
      return `
      <img class="hero-tryon" src="${look.image}" alt="${look.name} 试穿图" />
      ${meta}`;
    }
    return `
      <div class="hero-placeholder-mark">
        <div class="folio">${folio || look.id.toUpperCase()}</div>
        <div class="caption">穿搭试穿图<br/><span style="font-size:0.85em;opacity:0.75">主体照片 + 本套衣服合成后显示在这里</span></div>
        <a class="hero-profile-cta" href="#/profile">去完善主体档案 →</a>
      </div>
      ${meta}`;
  }

  function checklistHtml(lines) {
    return lines
      .map((row) => {
        const buy = row.url
          ? `<a class="buy-link" href="${row.url}" target="_blank" rel="noopener noreferrer">去购买</a>`
          : row.needBuy
            ? `<span class="buy-pending">待加链接</span>`
            : "";
        return `<li>
            <span class="role">${row.role || "·"}</span>
            <span class="piece-name">${row.name}</span>
            ${buy}
          </li>`;
      })
      .join("");
  }

  function paintTodayLook(spread, look, why) {
    const lines = piecesLines(look);
    $("#hero-frame", spread).innerHTML = lookThumbHtml(look);
    const hasBuy = lines.some((r) => r.url);
    $("#side-rest", spread).innerHTML = `
      <div class="why-block">
        <h3>为何入选</h3>
        <p>${why}</p>
      </div>
      <div class="checklist">
        <h3>穿着清单</h3>
        <ul>${checklistHtml(lines)}</ul>
        <p class="checklist-hint">${hasBuy ? "喜欢这套单品，点「去购买」去京东看同款。" : "喜欢可点「去购买」去京东看同款。"}</p>
      </div>`;
  }

  function weatherFlagsHtml(weather) {
    const flags = [];
    flags.push(`<span class="flag">体感 ${weather.apparent}°C</span>`);
    flags.push(`<span class="flag">气温 ${weather.temp}°C</span>`);
    if (weather.raining || weather.precip >= 1) {
      flags.push(`<span class="flag is-alert">有雨 ${weather.precip} mm</span>`);
    } else {
      flags.push(`<span class="flag">无雨</span>`);
    }
    if (weather.wind >= 25) flags.push(`<span class="flag is-alert">风 ${weather.wind} km/h</span>`);
    else flags.push(`<span class="flag">风 ${weather.wind} km/h</span>`);
    return flags.join("");
  }

  function paintWeatherCard(spread, weather) {
    $("#weather-details", spread).innerHTML = `
        <p class="weather-city">${cfg.city.name}</p>
        <p class="weather-temp">${weather.apparent}<span>°C</span></p>
        <p class="weather-cond">${weather.condition}</p>
        <div class="weather-flags">${weatherFlagsHtml(weather)}</div>
        <p class="weather-status">${weather.statusLabel}</p>`;
  }

  function showTodayPicks(root, spread, weather) {
    const pick = WardrobeSelect.selectToday(cfg.looks, weather);
    const picks = pick.picks || [];
    const picksRoot = $("#today-picks", root);
    const gate = $("#today-gate", root);

    if (!picks.length) {
      $("#hero-frame", spread).innerHTML = `
        <div class="hero-placeholder-mark">
          <div class="folio">Empty</div>
          <div class="caption">衣橱里还没有造型</div>
        </div>`;
      if (gate) gate.hidden = true;
      picksRoot.hidden = true;
      return;
    }

    if (gate) gate.hidden = true;
    picksRoot.hidden = false;
    picksRoot.innerHTML = `
      <p class="section-kicker">按天气排序</p>
      <h3 class="today-picks-title">五套候场</h3>
      <div class="today-picks-grid" role="list">
        ${picks
          .map((look, i) => {
            const mini = piecesLines(look)
              .map((row) => row.name)
              .join(" · ");
            return `
            <button type="button" class="today-pick${i === 0 ? " is-active" : ""}" role="listitem" data-index="${i}" aria-pressed="${i === 0 ? "true" : "false"}">
              <span class="today-pick-rank">${String(i + 1).padStart(2, "0")}</span>
              <span class="today-pick-body">
                <span class="today-pick-name">${look.name}</span>
                <span class="today-pick-meta">${SEASON_CN[look.season] || ""} · ${mini}</span>
              </span>
            </button>`;
          })
          .join("")}
      </div>`;

    function show(index) {
      const look = picks[index];
      paintTodayLook(spread, look, pick.why);
      picksRoot.querySelectorAll(".today-pick").forEach((btn, i) => {
        const on = i === index;
        btn.classList.toggle("is-active", on);
        btn.setAttribute("aria-pressed", on ? "true" : "false");
      });
    }

    picksRoot.onclick = (event) => {
      const btn = event.target.closest(".today-pick");
      if (!btn || !picksRoot.contains(btn)) return;
      show(Number(btn.dataset.index) || 0);
    };
    show(0);
  }

  async function renderHome(root) {
    root.innerHTML = `
      ${renderMasthead("home")}
      <main class="page" id="main">
        <p class="section-kicker">今日编选</p>
        <h2 class="section-title">今日五选</h2>
        <p class="lede">打开页面会自动读上海天气。点「获取今日穿搭」按天气选出五套；试穿图由助手每日更新，清单可点「去购买」。</p>
        <div class="today-spread" id="today-spread">
          <div class="hero-look">
            <div class="hero-frame" id="hero-frame">
              <div class="hero-placeholder-mark">
                <div class="folio">Today</div>
                <div class="caption">天气就绪后，点下方按钮获取今日穿搭</div>
              </div>
            </div>
          </div>
          <div class="weather-card" id="weather-card" aria-live="polite">
            <div class="weather-details" id="weather-details"><p class="weather-status">正在读取上海天气…</p></div>
            <a class="home-profile-link" href="#/profile">完善主体档案 <span aria-hidden="true">→</span></a>
          </div>
          <aside class="side-rest" id="side-rest">
            <div class="today-gate" id="today-gate">
              <button type="button" class="fetch-today-btn" id="fetch-today-btn" disabled>正在读天气…</button>
              <p class="today-gate-hint">先读今日天气，再按体感选出五套候场。</p>
            </div>
          </aside>
        </div>
        <section class="today-picks" id="today-picks" aria-label="今日五选" hidden></section>
      </main>
      ${renderFooter()}`;

    const spread = $("#today-spread", root);
    const profileLink = $(".home-profile-link", spread);
    const fetchBtn = $("#fetch-today-btn", root);
    WardrobeProfile.listPhotos().then((photos) => {
      if (spread.isConnected && photos.length) {
        profileLink.innerHTML = '主体已建档 <span aria-hidden="true">· 查看 →</span>';
      }
    }).catch(() => {
      if (spread.isConnected) profileLink.textContent = "查看主体档案 →";
    });

    const weather = await WardrobeWeather.fetchShanghaiWeather(cfg.city);
    if (!spread.isConnected) return;
    paintWeatherCard(spread, weather);
    fetchBtn.disabled = false;
    fetchBtn.textContent = "获取今日穿搭";
    fetchBtn.onclick = () => {
      fetchBtn.disabled = true;
      fetchBtn.textContent = "编选中…";
      showTodayPicks(root, spread, weather);
    };
  }

  function renderSeason(root, season) {
    const list = cfg.looks.filter((l) => l.season === season);
    const titleMap = {
      summer: "夏 · 七套",
      fall: "秋 · 七套",
      winter: "冬 · 七套",
      spring: "春 · 七套",
      gym: "健身 · 一套",
      lounge: "居家 · 一套"
    };
    root.innerHTML = `
      ${renderMasthead(season)}
      <main class="page">
        <p class="section-kicker">胶囊衣橱</p>
        <h2 class="section-title">${titleMap[season]}</h2>
        <p class="lede">只在这一池里轮换。天气不好时换同季另一套，不临时发明。</p>
        <div class="look-grid">
          ${list
            .map((look, i) => {
              const mini = piecesLines(look)
                .map((row) => row.name)
                .join(" · ");
              return `
              <article class="look-card">
                ${placeholderFrame(look, String(i + 1).padStart(2, "0"))}
                <h3>${look.name}</h3>
                <p class="blurb">${look.blurb || ""}</p>
                <p class="pieces-mini">${mini}</p>
              </article>`;
            })
            .join("")}
        </div>
      </main>
      ${renderFooter()}`;
  }

  function renderProfile(root) {
    root.innerHTML = `
      ${renderMasthead("profile")}
      <main class="page">
        <p class="section-kicker">私人参照</p>
        <h2 class="section-title">主体档案</h2>
        <p class="lede">记录自己的比例，留下几张自然的身影。为之后的试穿，准备一份只属于自己的参考。</p>
        <div id="profile-page"></div>
      </main>
      ${renderFooter()}`;
    return WardrobeProfilePage.mount($("#profile-page", root));
  }

  function allPieces() {
    const map = new Map();
    cfg.looks.forEach((look) => {
      const owned = new Set(look.owned || []);
      const buy = new Set(look.buy || []);
      const names = [];
      const p = look.pieces || {};
      if (p.onePiece) names.push(p.onePiece);
      if (p.top) names.push(p.top);
      if (p.bottom) names.push(p.bottom);
      if (p.shoes) names.push(p.shoes);
      (p.extras || []).forEach((x) => names.push(x));
      names.forEach((n) => {
        if (!map.has(n)) map.set(n, { name: n, status: "owned", looks: [] });
        const row = map.get(n);
        row.looks.push(look.name);
        if (buy.has(n)) row.status = "buy";
        else if (owned.has(n)) row.status = row.status === "buy" ? "buy" : "owned";
      });
    });
    return Array.from(map.values()).sort((a, b) => {
      if (a.status !== b.status) return a.status === "buy" ? -1 : 1;
      return a.name.localeCompare(b.name, "zh");
    });
  }

  function renderPieces(root) {
    const rows = allPieces();
    root.innerHTML = `
      ${renderMasthead("pieces")}
      <main class="page">
        <p class="section-kicker">单品档案</p>
        <h2 class="section-title">单品库</h2>
        <p class="lede">衣橱造型拆开后的全部单品。「要买」是占位，可在配置里改成已有。</p>
        <table class="piece-table">
          <thead><tr><th>单品</th><th>状态</th><th>出现在</th></tr></thead>
          <tbody>
            ${rows
              .map(
                (r) => `
              <tr>
                <td>${r.name}</td>
                <td><span class="badge ${r.status}">${r.status === "buy" ? "要买" : "已有"}</span></td>
                <td>${r.looks.slice(0, 3).join("、")}${r.looks.length > 3 ? "…" : ""}</td>
              </tr>`
              )
              .join("")}
          </tbody>
        </table>
      </main>
      ${renderFooter()}`;
  }

  function renderPurge(root) {
    const purge = cfg.purge || [];
    root.innerHTML = `
      ${renderMasthead("purge")}
      <main class="page">
        <p class="section-kicker">删减清单</p>
        <h2 class="section-title">清理清单</h2>
        <p class="lede">不在日常衣橱体系里的衣服。卖掉、捐赠或丢弃——腾出空间给真正上场的。</p>
        <table class="purge-table">
          <thead><tr><th>单品</th><th>建议</th><th>备注</th></tr></thead>
          <tbody>
            ${
              purge.length
                ? purge
                    .map(
                      (p) => `
              <tr>
                <td>${p.name}</td>
                <td>${p.action || "—"}</td>
                <td>${p.note || ""}</td>
              </tr>`
                    )
                    .join("")
                : `<tr><td colspan="3">清单为空。在 data/config.js 的 purge 数组里添加。</td></tr>`
            }
          </tbody>
        </table>
      </main>
      ${renderFooter()}`;
  }

  function renderRotation(root) {
    root.innerHTML = `
      ${renderMasthead("rotation")}
      <main class="page">
        <p class="section-kicker">轮换节奏</p>
        <h2 class="section-title">轮换说明</h2>
        <div class="note-box">
          <p>${cfg.rotationNote || ""}</p>
        </div>
        <p class="lede" style="margin-top:2rem">衣橱里可以有更多造型待命；首页每天只按天气排出五套，点开看清单再出门。</p>
      </main>
      ${renderFooter()}`;
  }

  let disposePage;

  async function route() {
    if (disposePage) { disposePage(); disposePage = null; }
    const raw = (location.hash || "#/").replace(/^#/, "") || "/";
    const path = raw.split("?")[0];
    const root = $("#app");
    document.title = cfg.siteName;

    if (path === "/profile") {
      disposePage = renderProfile(root);
      return;
    }
    if (path === "/" || path === "") return renderHome(root);
    location.hash = "#/";
  }

  window.addEventListener("hashchange", () => route());
  route();
})();
