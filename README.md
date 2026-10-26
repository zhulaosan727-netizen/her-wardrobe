# 她的衣橱

天气驱动的私人衣橱静态站（杂志编辑页风格）。面向上海，可上传腾讯云 COS，大陆手机点开链接即可使用，无需登录。

## 本地预览

```bash
cd wardrobe-site
preview_dir=$(mktemp -d)
ln -s "$PWD" "$preview_dir/her-wardrobe"
python3 -m http.server 8765 --directory "$preview_dir"
```

浏览器打开 `http://127.0.0.1:8765/her-wardrobe/`。临时目录链接让本地预览与 nginx 部署共用 `/her-wardrobe/` 子路径，无需修改 base href。

（勿用 `file://` 直接打开：天气请求与部分浏览器对本地脚本的限制会影响体验。）

## 改站名 / 城市 / 造型

只改 **`data/config.js`**：

| 字段 | 含义 |
| --- | --- |
| `siteName` | 站点名称（默认「她的衣橱」） |
| `tagline` | 页眉副标 |
| `city.name / latitude / longitude / timezone` | 城市与坐标 |
| `looks` | 正好 30 套造型 |
| `purge` | 清理清单 |
| `rotationNote` | 轮换说明文案 |

每套造型可把 `image` 从 `null` 改成 `assets/img/looks/xxx.jpg`，并放入对应照片。当前为纸面墨线占位框，**不含任何假人脸/假身材**。

## 页面

- `#/` 今日（上海天气 + 五套推荐，可点选查看清单）
- `#/profile` 主体档案（身高、体重、穿衣偏好与 1～6 张本人主体照片）
- `#/summer` `#/fall` `#/winter` `#/spring` 各 7 套
- `#/gym` `#/lounge` 各 1 套
- `#/pieces` 单品库（已有 / 要买）
- `#/purge` 清理清单
- `#/rotation` 轮换说明

## 天气

浏览器直连 [Open-Meteo](https://api.open-meteo.com)（无需 API Key）。失败时使用本地缓存或当季估温，页面不会空白。

## 主体档案与本地存储

点导航「档案」，填写身高（cm）、体重（kg）与可选穿衣偏好后点「保存资料」。可添加 1～6 张 JPG / PNG / WebP 全身或半身照，照片自动转为 JPEG（最长边不超过 1600px，质量约 0.85，单张小于 2MB），保存后显示缩略图；可删除单张、清空照片，或用「清除全部档案」一起删除身体资料和照片。今日页会根据有无主体照片显示「主体已建档」或「完善主体档案」。

资料与照片优先保存在当前浏览器的 IndexedDB；不可用时仅身高、体重和备注回退到 localStorage，照片区会提示无法保存。刷新仍可读取，不上传任何服务器，无登录、后端或 AI 生成 API。数据不跨设备、浏览器或站点来源（协议 / 域名 / 端口）同步；隐私模式或清除浏览器站点数据可能使记录丢失。未来试穿流程可使用 `window.WardrobeProfile` 的异步方法 `get()` / `save({ height, weight, note })` / `listPhotos()` / `addPhoto(blob)` / `removePhoto(id)` / `clear()`；照片记录为 `{ id, blob, width, height, createdAt }`，压缩在 `addPhoto()` 内完成，预览 URL 由调用方创建与释放。

## 上传

见 `上传说明.md`。
