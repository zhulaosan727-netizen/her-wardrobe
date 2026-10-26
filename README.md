# 她的衣橱

天气驱动的私人衣橱静态站（杂志编辑页风格）。面向上海，可上传腾讯云 COS，大陆手机点开链接即可使用，无需登录。

## 本地预览

```bash
cd wardrobe-site
python3 -m http.server 8765
```

浏览器打开 `http://127.0.0.1:8765/`。

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

- `#/` 今日（上海天气 + 一套推荐 + 理由 + 天气替换）
- `#/summer` `#/fall` `#/winter` `#/spring` 各 7 套
- `#/gym` `#/lounge` 各 1 套
- `#/pieces` 单品库（已有 / 要买）
- `#/purge` 清理清单
- `#/rotation` 轮换说明

## 天气

浏览器直连 [Open-Meteo](https://api.open-meteo.com)（无需 API Key）。失败时使用本地缓存或当季估温，页面不会空白。

## 上传

见 `上传说明.md`。
