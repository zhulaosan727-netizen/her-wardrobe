/* 她的衣橱 — 唯一配置入口。改站名、城市、造型都只改这一份。 */
window.WARDROBE_CONFIG = {
  siteName: "她的衣橱",
  tagline: "私人造型 · 上海",
  city: {
    name: "上海",
    latitude: 31.2304,
    longitude: 121.4737,
    timezone: "Asia/Shanghai"
  },
  /* 今日专属五选：date 为 Asia/Shanghai YYYY-MM-DD 时，selectToday 优先按 ids 顺序返回 */
  today: { date: "2026-10-31", ids: ["fa01", "fa02", "fa03", "fa04", "fa05"] },
  /* 单品名 → 购买链接（暂用京东搜索；淘宝云端常被拦）。有精确商品页后可换成 item 链接。 */
  shop: {
    "驼色素色圆领针织": "https://search.jd.com/Search?keyword=%E9%A9%BC%E8%89%B2%E7%B4%A0%E8%89%B2%E5%9C%86%E9%A2%86%E9%92%88%E7%BB%87%20%E5%A5%B3&enc=utf-8",
    "卡其直筒裤": "https://search.jd.com/Search?keyword=%E5%8D%A1%E5%85%B6%E7%9B%B4%E7%AD%92%E8%A3%A4%20%E5%A5%B3&enc=utf-8",
    "棕色切尔西靴": "https://search.jd.com/Search?keyword=%E6%A3%95%E8%89%B2%E5%88%87%E5%B0%94%E8%A5%BF%E9%9D%B4%20%E5%A5%B3&enc=utf-8",
    "米色中长开衫": "https://search.jd.com/Search?keyword=%E7%B1%B3%E8%89%B2%E4%B8%AD%E9%95%BF%E5%BC%80%E8%A1%AB%20%E5%A5%B3&enc=utf-8",
    "格纹法兰绒衬衫": "https://search.jd.com/Search?keyword=%E6%A0%BC%E7%BA%B9%E6%B3%95%E5%85%B0%E7%BB%92%E8%A1%AC%E8%A1%AB%20%E5%A5%B3&enc=utf-8",
    "深蓝直筒牛仔裤": "https://search.jd.com/Search?keyword=%E6%B7%B1%E8%93%9D%E7%9B%B4%E7%AD%92%E7%89%9B%E4%BB%94%E8%A3%A4%20%E5%A5%B3&enc=utf-8",
    "白色运动鞋": "https://search.jd.com/Search?keyword=%E7%99%BD%E8%89%B2%E8%BF%90%E5%8A%A8%E9%9E%8B%20%E5%A5%B3&enc=utf-8",
    "薄羽绒马甲": "https://search.jd.com/Search?keyword=%E8%96%84%E7%BE%BD%E7%BB%92%E9%A9%AC%E7%94%B2%20%E5%A5%B3&enc=utf-8",
    "黑色细高领": "https://search.jd.com/Search?keyword=%E9%BB%91%E8%89%B2%E7%BB%86%E9%AB%98%E9%A2%86%20%E5%A5%B3&enc=utf-8",
    "炭灰呢料半裙": "https://search.jd.com/Search?keyword=%E7%82%AD%E7%81%B0%E5%91%A2%E6%96%99%E5%8D%8A%E8%A3%99%20%E5%A5%B3&enc=utf-8",
    "黑色短靴": "https://search.jd.com/Search?keyword=%E9%BB%91%E8%89%B2%E7%9F%AD%E9%9D%B4%20%E5%A5%B3&enc=utf-8",
    "羊毛大衣（中长）": "https://search.jd.com/Search?keyword=%E7%BE%8A%E6%AF%9B%E5%A4%A7%E8%A1%A3%EF%BC%88%E4%B8%AD%E9%95%BF%EF%BC%89%20%E5%A5%B3&enc=utf-8",
    "燕麦色连帽卫衣": "https://search.jd.com/Search?keyword=%E7%87%95%E9%BA%A6%E8%89%B2%E8%BF%9E%E5%B8%BD%E5%8D%AB%E8%A1%A3%20%E5%A5%B3&enc=utf-8",
    "橄榄工装裤": "https://search.jd.com/Search?keyword=%E6%A9%84%E6%A6%84%E5%B7%A5%E8%A3%85%E8%A3%A4%20%E5%A5%B3&enc=utf-8",
    "棕色老爹鞋": "https://search.jd.com/Search?keyword=%E6%A3%95%E8%89%B2%E8%80%81%E7%88%B9%E9%9E%8B%20%E5%A5%B3&enc=utf-8",
    "棒球夹克": "https://search.jd.com/Search?keyword=%E6%A3%92%E7%90%83%E5%A4%B9%E5%85%8B%20%E5%A5%B3&enc=utf-8",
    "白色牛津衬衫": "https://search.jd.com/Search?keyword=%E7%99%BD%E8%89%B2%E7%89%9B%E6%B4%A5%E8%A1%AC%E8%A1%AB%20%E5%A5%B3&enc=utf-8",
    "黑色西裤": "https://search.jd.com/Search?keyword=%E9%BB%91%E8%89%B2%E8%A5%BF%E8%A3%A4%20%E5%A5%B3&enc=utf-8",
    "黑色皮鞋": "https://search.jd.com/Search?keyword=%E9%BB%91%E8%89%B2%E7%9A%AE%E9%9E%8B%20%E5%A5%B3&enc=utf-8",
    "细条纹西装外套": "https://search.jd.com/Search?keyword=%E7%BB%86%E6%9D%A1%E7%BA%B9%E8%A5%BF%E8%A3%85%E5%A4%96%E5%A5%97%20%E5%A5%B3&enc=utf-8",
    "白色亚麻短袖衬衫": "https://search.jd.com/Search?keyword=%E7%99%BD%E8%89%B2%E4%BA%9A%E9%BA%BB%E7%9F%AD%E8%A2%96%E8%A1%AC%E8%A1%AB%20%E5%A5%B3&enc=utf-8",
    "米色阔腿西裤": "https://search.jd.com/Search?keyword=%E7%B1%B3%E8%89%B2%E9%98%94%E8%85%BF%E8%A5%BF%E8%A3%A4%20%E5%A5%B3&enc=utf-8",
    "裸色平底凉鞋": "https://search.jd.com/Search?keyword=%E8%A3%B8%E8%89%B2%E5%B9%B3%E5%BA%95%E5%87%89%E9%9E%8B%20%E5%A5%B3&enc=utf-8",
    "细金手链": "https://search.jd.com/Search?keyword=%E7%BB%86%E9%87%91%E6%89%8B%E9%93%BE%20%E5%A5%B3&enc=utf-8",
    "海军蓝白条纹 T 恤": "https://search.jd.com/Search?keyword=%E6%B5%B7%E5%86%9B%E8%93%9D%E7%99%BD%E6%9D%A1%E7%BA%B9%20T%20%E6%81%A4%20%E5%A5%B3&enc=utf-8",
    "白色直筒牛仔裤": "https://search.jd.com/Search?keyword=%E7%99%BD%E8%89%B2%E7%9B%B4%E7%AD%92%E7%89%9B%E4%BB%94%E8%A3%A4%20%E5%A5%B3&enc=utf-8",
    "白色皮质运动鞋": "https://search.jd.com/Search?keyword=%E7%99%BD%E8%89%B2%E7%9A%AE%E8%B4%A8%E8%BF%90%E5%8A%A8%E9%9E%8B%20%E5%A5%B3&enc=utf-8",
    "草编托特包": "https://search.jd.com/Search?keyword=%E8%8D%89%E7%BC%96%E6%89%98%E7%89%B9%E5%8C%85%20%E5%A5%B3&enc=utf-8",
    "香槟丝质吊带裙": "https://search.jd.com/Search?keyword=%E9%A6%99%E6%A7%9F%E4%B8%9D%E8%B4%A8%E5%90%8A%E5%B8%A6%E8%A3%99%20%E5%A5%B3&enc=utf-8",
    "细带裸色凉鞋": "https://search.jd.com/Search?keyword=%E7%BB%86%E5%B8%A6%E8%A3%B8%E8%89%B2%E5%87%89%E9%9E%8B%20%E5%A5%B3&enc=utf-8",
    "薄纱披肩": "https://search.jd.com/Search?keyword=%E8%96%84%E7%BA%B1%E6%8A%AB%E8%82%A9%20%E5%A5%B3&enc=utf-8",
    "小耳钉": "https://search.jd.com/Search?keyword=%E5%B0%8F%E8%80%B3%E9%92%89%20%E5%A5%B3&enc=utf-8",
    "浅灰短袖针织": "https://search.jd.com/Search?keyword=%E6%B5%85%E7%81%B0%E7%9F%AD%E8%A2%96%E9%92%88%E7%BB%87%20%E5%A5%B3&enc=utf-8",
    "卡其棉短裤": "https://search.jd.com/Search?keyword=%E5%8D%A1%E5%85%B6%E6%A3%89%E7%9F%AD%E8%A3%A4%20%E5%A5%B3&enc=utf-8",
    "白色帆布鞋": "https://search.jd.com/Search?keyword=%E7%99%BD%E8%89%B2%E5%B8%86%E5%B8%83%E9%9E%8B%20%E5%A5%B3&enc=utf-8",
    "棒球帽": "https://search.jd.com/Search?keyword=%E6%A3%92%E7%90%83%E5%B8%BD%20%E5%A5%B3&enc=utf-8",
    "宽松白衬衫（袖口挽起）": "https://search.jd.com/Search?keyword=%E5%AE%BD%E6%9D%BE%E7%99%BD%E8%A1%AC%E8%A1%AB%EF%BC%88%E8%A2%96%E5%8F%A3%E6%8C%BD%E8%B5%B7%EF%BC%89%20%E5%A5%B3&enc=utf-8",
    "中长牛仔裙": "https://search.jd.com/Search?keyword=%E4%B8%AD%E9%95%BF%E7%89%9B%E4%BB%94%E8%A3%99%20%E5%A5%B3&enc=utf-8",
    "棕色皮质凉鞋": "https://search.jd.com/Search?keyword=%E6%A3%95%E8%89%B2%E7%9A%AE%E8%B4%A8%E5%87%89%E9%9E%8B%20%E5%A5%B3&enc=utf-8",
    "细腰带": "https://search.jd.com/Search?keyword=%E7%BB%86%E8%85%B0%E5%B8%A6%20%E5%A5%B3&enc=utf-8",
    "燕麦色短袖圆领针织": "https://search.jd.com/Search?keyword=%E7%87%95%E9%BA%A6%E8%89%B2%E7%9F%AD%E8%A2%96%E5%9C%86%E9%A2%86%E9%92%88%E7%BB%87%20%E5%A5%B3&enc=utf-8",
    "橄榄绿A字半裙": "https://search.jd.com/Search?keyword=%E6%A9%84%E6%A6%84%E7%BB%BFA%E5%AD%97%E5%8D%8A%E8%A3%99%20%E5%A5%B3&enc=utf-8",
    "米白乐福鞋": "https://search.jd.com/Search?keyword=%E7%B1%B3%E7%99%BD%E4%B9%90%E7%A6%8F%E9%9E%8B%20%E5%A5%B3&enc=utf-8",
    "细金项链": "https://search.jd.com/Search?keyword=%E7%BB%86%E9%87%91%E9%A1%B9%E9%93%BE%20%E5%A5%B3&enc=utf-8",
    "浅蓝牛仔衬衫（袖口挽起）": "https://search.jd.com/Search?keyword=%E6%B5%85%E8%93%9D%E7%89%9B%E4%BB%94%E8%A1%AC%E8%A1%AB%EF%BC%88%E8%A2%96%E5%8F%A3%E6%8C%BD%E8%B5%B7%EF%BC%89%20%E5%A5%B3&enc=utf-8",
    "黑色中长半裙": "https://search.jd.com/Search?keyword=%E9%BB%91%E8%89%B2%E4%B8%AD%E9%95%BF%E5%8D%8A%E8%A3%99%20%E5%A5%B3&enc=utf-8",
    "白色厚底运动鞋": "https://search.jd.com/Search?keyword=%E7%99%BD%E8%89%B2%E5%8E%9A%E5%BA%95%E8%BF%90%E5%8A%A8%E9%9E%8B%20%E5%A5%B3&enc=utf-8",
    "棕色迷你斜挎包": "https://search.jd.com/Search?keyword=%E6%A3%95%E8%89%B2%E8%BF%B7%E4%BD%A0%E6%96%9C%E6%8C%8E%E5%8C%85%20%E5%A5%B3&enc=utf-8",
    "橄榄绿棉质吊带连衣裙": "https://search.jd.com/Search?keyword=%E6%A9%84%E6%A6%84%E7%BB%BF%E6%A3%89%E8%B4%A8%E5%90%8A%E5%B8%A6%E8%BF%9E%E8%A1%A3%E8%A3%99%20%E5%A5%B3&enc=utf-8",
    "棕色编织凉鞋": "https://search.jd.com/Search?keyword=%E6%A3%95%E8%89%B2%E7%BC%96%E7%BB%87%E5%87%89%E9%9E%8B%20%E5%A5%B3&enc=utf-8",
    "米色针织开衫": "https://search.jd.com/Search?keyword=%E7%B1%B3%E8%89%B2%E9%92%88%E7%BB%87%E5%BC%80%E8%A1%AB%20%E5%A5%B3&enc=utf-8",
    "纯白宽松圆领T恤": "https://search.jd.com/Search?keyword=%E7%BA%AF%E7%99%BD%E5%AE%BD%E6%9D%BE%E5%9C%86%E9%A2%86T%E6%81%A4%20%E5%A5%B3&enc=utf-8",
    "沙色亚麻阔腿裤": "https://search.jd.com/Search?keyword=%E6%B2%99%E8%89%B2%E4%BA%9A%E9%BA%BB%E9%98%94%E8%85%BF%E8%A3%A4%20%E5%A5%B3&enc=utf-8",
    "棕色平底凉鞋": "https://search.jd.com/Search?keyword=%E6%A3%95%E8%89%B2%E5%B9%B3%E5%BA%95%E5%87%89%E9%9E%8B%20%E5%A5%B3&enc=utf-8",
    "帆布托特包": "https://search.jd.com/Search?keyword=%E5%B8%86%E5%B8%83%E6%89%98%E7%89%B9%E5%8C%85%20%E5%A5%B3&enc=utf-8",
    "黑白细横条短袖罩衫": "https://search.jd.com/Search?keyword=%E9%BB%91%E7%99%BD%E7%BB%86%E6%A8%AA%E6%9D%A1%E7%9F%AD%E8%A2%96%E7%BD%A9%E8%A1%AB%20%E5%A5%B3&enc=utf-8",
    "黑色烟管九分裤": "https://search.jd.com/Search?keyword=%E9%BB%91%E8%89%B2%E7%83%9F%E7%AE%A1%E4%B9%9D%E5%88%86%E8%A3%A4%20%E5%A5%B3&enc=utf-8",
    "黑色芭蕾平底鞋": "https://search.jd.com/Search?keyword=%E9%BB%91%E8%89%B2%E8%8A%AD%E8%95%BE%E5%B9%B3%E5%BA%95%E9%9E%8B%20%E5%A5%B3&enc=utf-8",
    "薄灰针织开衫": "https://search.jd.com/Search?keyword=%E8%96%84%E7%81%B0%E9%92%88%E7%BB%87%E5%BC%80%E8%A1%AB%20%E5%A5%B3&enc=utf-8",
    "奶油色半高领薄针织": "https://search.jd.com/Search?keyword=%E5%A5%B6%E6%B2%B9%E8%89%B2%E5%8D%8A%E9%AB%98%E9%A2%86%E8%96%84%E9%92%88%E7%BB%87%20%E5%A5%B3&enc=utf-8",
    "浅卡其阔腿裤": "https://search.jd.com/Search?keyword=%E6%B5%85%E5%8D%A1%E5%85%B6%E9%98%94%E8%85%BF%E8%A3%A4%20%E5%A5%B3&enc=utf-8",
    "棕色乐福鞋": "https://search.jd.com/Search?keyword=%E6%A3%95%E8%89%B2%E4%B9%90%E7%A6%8F%E9%9E%8B%20%E5%A5%B3&enc=utf-8",
    "驼色短风衣": "https://search.jd.com/Search?keyword=%E9%A9%BC%E8%89%B2%E7%9F%AD%E9%A3%8E%E8%A1%A3%20%E5%A5%B3&enc=utf-8",
    "乳白尖领衬衫": "https://search.jd.com/Search?keyword=%E4%B9%B3%E7%99%BD%E5%B0%96%E9%A2%86%E8%A1%AC%E8%A1%AB%20%E5%A5%B3&enc=utf-8",
    "中蓝直筒牛仔裤": "https://search.jd.com/Search?keyword=%E4%B8%AD%E8%93%9D%E7%9B%B4%E7%AD%92%E7%89%9B%E4%BB%94%E8%A3%A4%20%E5%A5%B3&enc=utf-8",
    "白色厚底小白鞋": "https://search.jd.com/Search?keyword=%E7%99%BD%E8%89%B2%E5%8E%9A%E5%BA%95%E5%B0%8F%E7%99%BD%E9%9E%8B%20%E5%A5%B3&enc=utf-8",
    "深灰V领针织背心": "https://search.jd.com/Search?keyword=%E6%B7%B1%E7%81%B0V%E9%A2%86%E9%92%88%E7%BB%87%E8%83%8C%E5%BF%83%20%E5%A5%B3&enc=utf-8",
    "米白长袖圆领T恤": "https://search.jd.com/Search?keyword=%E7%B1%B3%E7%99%BD%E9%95%BF%E8%A2%96%E5%9C%86%E9%A2%86T%E6%81%A4%20%E5%A5%B3&enc=utf-8",
    "石洗浅蓝直筒牛仔裤": "https://search.jd.com/Search?keyword=%E7%9F%B3%E6%B4%97%E6%B5%85%E8%93%9D%E7%9B%B4%E7%AD%92%E7%89%9B%E4%BB%94%E8%A3%A4%20%E5%A5%B3&enc=utf-8",
    "焦糖色踝靴": "https://search.jd.com/Search?keyword=%E7%84%A6%E7%B3%96%E8%89%B2%E8%B8%9D%E9%9D%B4%20%E5%A5%B3&enc=utf-8",
    "焦糖灯芯绒短外套": "https://search.jd.com/Search?keyword=%E7%84%A6%E7%B3%96%E7%81%AF%E8%8A%AF%E7%BB%92%E7%9F%AD%E5%A4%96%E5%A5%97%20%E5%A5%B3&enc=utf-8",
    "酒红圆领针织中长裙": "https://search.jd.com/Search?keyword=%E9%85%92%E7%BA%A2%E5%9C%86%E9%A2%86%E9%92%88%E7%BB%87%E4%B8%AD%E9%95%BF%E8%A3%99%20%E5%A5%B3&enc=utf-8",
    "深棕踝靴": "https://search.jd.com/Search?keyword=%E6%B7%B1%E6%A3%95%E8%B8%9D%E9%9D%B4%20%E5%A5%B3&enc=utf-8",
    "米色中长风衣": "https://search.jd.com/Search?keyword=%E7%B1%B3%E8%89%B2%E4%B8%AD%E9%95%BF%E9%A3%8E%E8%A1%A3%20%E5%A5%B3&enc=utf-8",
    "麻灰色圆领套头针织": "https://search.jd.com/Search?keyword=%E9%BA%BB%E7%81%B0%E8%89%B2%E5%9C%86%E9%A2%86%E5%A5%97%E5%A4%B4%E9%92%88%E7%BB%87%20%E5%A5%B3&enc=utf-8",
    "深灰九分西裤": "https://search.jd.com/Search?keyword=%E6%B7%B1%E7%81%B0%E4%B9%9D%E5%88%86%E8%A5%BF%E8%A3%A4%20%E5%A5%B3&enc=utf-8",
    "黑色乐福鞋": "https://search.jd.com/Search?keyword=%E9%BB%91%E8%89%B2%E4%B9%90%E7%A6%8F%E9%9E%8B%20%E5%A5%B3&enc=utf-8",
    "黑色短款皮夹克": "https://search.jd.com/Search?keyword=%E9%BB%91%E8%89%B2%E7%9F%AD%E6%AC%BE%E7%9A%AE%E5%A4%B9%E5%85%8B%20%E5%A5%B3&enc=utf-8",
    "鼠尾草绿圆领细针织": "https://search.jd.com/Search?keyword=%E9%BC%A0%E5%B0%BE%E8%8D%89%E7%BB%BF%E5%9C%86%E9%A2%86%E7%BB%86%E9%92%88%E7%BB%87%20%E5%A5%B3&enc=utf-8",
    "灰褐高腰阔腿裤": "https://search.jd.com/Search?keyword=%E7%81%B0%E8%A4%90%E9%AB%98%E8%85%B0%E9%98%94%E8%85%BF%E8%A3%A4%20%E5%A5%B3&enc=utf-8",
    "米白踝靴": "https://search.jd.com/Search?keyword=%E7%B1%B3%E7%99%BD%E8%B8%9D%E9%9D%B4%20%E5%A5%B3&enc=utf-8",
    "豆沙粉羊毛短外套": "https://search.jd.com/Search?keyword=%E8%B1%86%E6%B2%99%E7%B2%89%E7%BE%8A%E6%AF%9B%E7%9F%AD%E5%A4%96%E5%A5%97%20%E5%A5%B3&enc=utf-8",
    "象牙白罗纹高领针织": "https://search.jd.com/Search?keyword=%E8%B1%A1%E7%89%99%E7%99%BD%E7%BD%97%E7%BA%B9%E9%AB%98%E9%A2%86%E9%92%88%E7%BB%87%20%E5%A5%B3&enc=utf-8",
    "巧克力灯芯绒A字中裙": "https://search.jd.com/Search?keyword=%E5%B7%A7%E5%85%8B%E5%8A%9B%E7%81%AF%E8%8A%AF%E7%BB%92A%E5%AD%97%E4%B8%AD%E8%A3%99%20%E5%A5%B3&enc=utf-8",
    "焦糖色乐福鞋": "https://search.jd.com/Search?keyword=%E7%84%A6%E7%B3%96%E8%89%B2%E4%B9%90%E7%A6%8F%E9%9E%8B%20%E5%A5%B3&enc=utf-8",
    "炭灰双排扣西装外套": "https://search.jd.com/Search?keyword=%E7%82%AD%E7%81%B0%E5%8F%8C%E6%8E%92%E6%89%A3%E8%A5%BF%E8%A3%85%E5%A4%96%E5%A5%97%20%E5%A5%B3&enc=utf-8",
    "燕麦色亨利领长袖针织": "https://search.jd.com/Search?keyword=%E7%87%95%E9%BA%A6%E8%89%B2%E4%BA%A8%E5%88%A9%E9%A2%86%E9%95%BF%E8%A2%96%E9%92%88%E7%BB%87%20%E5%A5%B3&enc=utf-8",
    "靛蓝桶形牛仔裤": "https://search.jd.com/Search?keyword=%E9%9D%9B%E8%93%9D%E6%A1%B6%E5%BD%A2%E7%89%9B%E4%BB%94%E8%A3%A4%20%E5%A5%B3&enc=utf-8",
    "苔绿轻薄绗缝马甲": "https://search.jd.com/Search?keyword=%E8%8B%94%E7%BB%BF%E8%BD%BB%E8%96%84%E7%BB%97%E7%BC%9D%E9%A9%AC%E7%94%B2%20%E5%A5%B3&enc=utf-8",
    "铁锈橙针织毛衣裙": "https://search.jd.com/Search?keyword=%E9%93%81%E9%94%88%E6%A9%99%E9%92%88%E7%BB%87%E6%AF%9B%E8%A1%A3%E8%A3%99%20%E5%A5%B3&enc=utf-8",
    "黑色连裤袜": "https://search.jd.com/Search?keyword=%E9%BB%91%E8%89%B2%E8%BF%9E%E8%A3%A4%E8%A2%9C%20%E5%A5%B3&enc=utf-8",
    "驼色系带风衣": "https://search.jd.com/Search?keyword=%E9%A9%BC%E8%89%B2%E7%B3%BB%E5%B8%A6%E9%A3%8E%E8%A1%A3%20%E5%A5%B3&enc=utf-8",
    "淡蓝牛津纺衬衫": "https://search.jd.com/Search?keyword=%E6%B7%A1%E8%93%9D%E7%89%9B%E6%B4%A5%E7%BA%BA%E8%A1%AC%E8%A1%AB%20%E5%A5%B3&enc=utf-8",
    "黑色高腰烟管裤": "https://search.jd.com/Search?keyword=%E9%BB%91%E8%89%B2%E9%AB%98%E8%85%B0%E7%83%9F%E7%AE%A1%E8%A3%A4%20%E5%A5%B3&enc=utf-8",
    "黑色玛丽珍平底鞋": "https://search.jd.com/Search?keyword=%E9%BB%91%E8%89%B2%E7%8E%9B%E4%B8%BD%E7%8F%8D%E5%B9%B3%E5%BA%95%E9%9E%8B%20%E5%A5%B3&enc=utf-8",
    "奶油色短款开衫": "https://search.jd.com/Search?keyword=%E5%A5%B6%E6%B2%B9%E8%89%B2%E7%9F%AD%E6%AC%BE%E5%BC%80%E8%A1%AB%20%E5%A5%B3&enc=utf-8",
  },
  /* 试穿图：主体+衣服的合成图放进 assets/img/looks/，image 填相对路径；有图则今日大图展示 */
  looks: [
    /* —— 夏 Summer ×7 —— */
    {
      id: "su01", season: "summer", name: "燕麦针织与橄榄半裙",
      pieces: { top: "燕麦色短袖圆领针织", bottom: "橄榄绿A字半裙", shoes: "米白乐福鞋", extras: ["细金项链"] },
      owned: ["燕麦色短袖圆领针织", "橄榄绿A字半裙", "米白乐福鞋"],
      buy: ["细金项链"],
      tags: ["dry", "smart", "light"], image: "assets/img/looks/su01.jpg?v=20261030a",
      blurb: "体感二十度出头的通勤清爽款。"
    },
    {
      id: "su02", season: "summer", name: "牛仔衬衫与黑裙",
      pieces: { top: "浅蓝牛仔衬衫（袖口挽起）", bottom: "黑色中长半裙", shoes: "白色厚底运动鞋", extras: ["棕色迷你斜挎包"] },
      owned: ["浅蓝牛仔衬衫（袖口挽起）", "黑色中长半裙", "白色厚底运动鞋"],
      buy: ["棕色迷你斜挎包"],
      tags: ["dry", "casual", "smart"], image: "assets/img/looks/su02.jpg?v=20261030a",
      blurb: "闲逛与轻会议都能穿。"
    },
    {
      id: "su03", season: "summer", name: "橄榄绿吊带裙",
      pieces: { onePiece: "橄榄绿棉质吊带连衣裙", shoes: "棕色编织凉鞋", extras: ["米色针织开衫"] },
      owned: ["橄榄绿棉质吊带连衣裙", "棕色编织凉鞋"],
      buy: ["米色针织开衫"],
      tags: ["dry", "weekend", "layer", "light"], image: "assets/img/looks/su03.jpg?v=20261030a",
      blurb: "连衣裙加薄开衫，空调房也稳。"
    },
    {
      id: "su04", season: "summer", name: "白T与沙色阔腿",
      pieces: { top: "纯白宽松圆领T恤", bottom: "沙色亚麻阔腿裤", shoes: "棕色平底凉鞋", extras: ["帆布托特包"] },
      owned: ["纯白宽松圆领T恤", "沙色亚麻阔腿裤", "棕色平底凉鞋"],
      buy: ["帆布托特包"],
      tags: ["dry", "casual", "light"], image: "assets/img/looks/su04.jpg?v=20261030a",
      blurb: "干燥晴天的透气日常。"
    },
    {
      id: "su05", season: "summer", name: "条纹罩衫与烟管裤",
      pieces: { top: "黑白细横条短袖罩衫", bottom: "黑色烟管九分裤", shoes: "黑色芭蕾平底鞋", extras: ["薄灰针织开衫"] },
      owned: ["黑白细横条短袖罩衫", "黑色烟管九分裤", "黑色芭蕾平底鞋"],
      buy: ["薄灰针织开衫"],
      tags: ["dry", "smart", "layer", "commute"], image: "assets/img/looks/su05.jpg?v=20261030a",
      blurb: "轻度通勤，线条干净。"
    },
    {
      id: "su06", season: "summer", name: "雨天轻便套装",
      pieces: { top: "深色速干短袖", bottom: "深灰九分裤", shoes: "防水短靴", extras: ["轻薄防雨外套"] },
      owned: ["深色速干短袖", "深灰九分裤"],
      buy: ["防水短靴", "轻薄防雨外套"],
      tags: ["rain", "closed-shoes", "jacket"], image: null,
      blurb: "夏日阵雨备用：外套 + 闭口鞋。"
    },
    {
      id: "su07", season: "summer", name: "亚麻套装通勤",
      pieces: { top: "浅驼亚麻衬衫", bottom: "同色亚麻直筒裤", shoes: "棕色乐福鞋", extras: ["金属框墨镜"] },
      owned: ["浅驼亚麻衬衫", "同色亚麻直筒裤", "棕色乐福鞋"],
      buy: ["金属框墨镜"],
      tags: ["dry", "commute", "layer-ready"], image: null,
      blurb: "一套到位的夏日通勤。"
    },
    /* —— 秋 Fall ×7 —— */
    {
      id: "fa01", season: "fall", name: "鼠尾草针织与灰褐阔腿",
      pieces: { top: "鼠尾草绿圆领细针织", bottom: "灰褐高腰阔腿裤", shoes: "米白踝靴", extras: ["豆沙粉羊毛短外套"] },
      owned: ["鼠尾草绿圆领细针织", "灰褐高腰阔腿裤", "米白踝靴"],
      buy: ["豆沙粉羊毛短外套"],
      tags: ["layer", "mid", "dry"], image: "assets/img/looks/fa01.jpg?v=20261031a",
      blurb: "晴冷晨约13°C，短外套可脱；午间近23°C仍清爽。"
    },
    {
      id: "fa02", season: "fall", name: "象牙白高领与灯芯绒裙",
      pieces: { top: "象牙白罗纹高领针织", bottom: "巧克力灯芯绒A字中裙", shoes: "焦糖色乐福鞋", extras: ["炭灰双排扣西装外套"] },
      owned: ["象牙白罗纹高领针织", "巧克力灯芯绒A字中裙", "焦糖色乐福鞋"],
      buy: ["炭灰双排扣西装外套"],
      tags: ["layer", "smart", "dry"], image: "assets/img/looks/fa02.jpg?v=20261031a",
      blurb: "轻正式叠穿，西装午后可挂。"
    },
    {
      id: "fa03", season: "fall", name: "燕麦亨利衫与桶形牛仔",
      pieces: { top: "燕麦色亨利领长袖针织", bottom: "靛蓝桶形牛仔裤", shoes: "白色厚底小白鞋", extras: ["苔绿轻薄绗缝马甲"] },
      owned: ["燕麦色亨利领长袖针织", "靛蓝桶形牛仔裤", "白色厚底小白鞋"],
      buy: ["苔绿轻薄绗缝马甲"],
      tags: ["layer", "casual", "weekend", "dry"], image: "assets/img/looks/fa03.jpg?v=20261031a",
      blurb: "周末街逛，马甲随脱。"
    },
    {
      id: "fa04", season: "fall", name: "铁锈橙针织裙与驼风衣",
      pieces: { onePiece: "铁锈橙针织毛衣裙", shoes: "黑色短靴", extras: ["黑色连裤袜", "驼色系带风衣"] },
      owned: ["铁锈橙针织毛衣裙", "黑色短靴", "黑色连裤袜"],
      buy: ["驼色系带风衣"],
      tags: ["layer", "smart", "jacket", "dry"], image: "assets/img/looks/fa04.jpg?v=20261031a",
      blurb: "晨凉披风衣，午间单穿裙装即可。"
    },
    {
      id: "fa05", season: "fall", name: "淡蓝牛津衫与烟管裤",
      pieces: { top: "淡蓝牛津纺衬衫", bottom: "黑色高腰烟管裤", shoes: "黑色玛丽珍平底鞋", extras: ["奶油色短款开衫"] },
      owned: ["淡蓝牛津纺衬衫", "黑色高腰烟管裤", "黑色玛丽珍平底鞋"],
      buy: ["奶油色短款开衫"],
      tags: ["smart", "layer", "commute", "dry"], image: "assets/img/looks/fa05.jpg?v=20261031a",
      blurb: "通勤干净，开衫应对早晚温差。"
    },

    {
      id: "fa06", season: "fall", name: "雨天呢外套",
      pieces: { top: "深灰高领针织", bottom: "黑色烟管裤", shoes: "防水短靴", extras: ["防水呢料外套"] },
      owned: ["深灰高领针织", "黑色烟管裤"],
      buy: ["防水短靴", "防水呢料外套"],
      tags: ["rain", "closed-shoes", "jacket", "layer"], image: null,
      blurb: "秋雨：外套与闭口鞋不可省。"
    },
    {
      id: "fa07", season: "fall", name: "灯芯绒与针织裙",
      pieces: { top: "酒红灯芯绒衬衫", bottom: "米色针织半裙", shoes: "棕色踝靴", extras: ["同色窄围巾"] },
      owned: ["酒红灯芯绒衬衫", "米色针织半裙", "棕色踝靴"],
      buy: ["同色窄围巾"],
      tags: ["mid", "layer"], image: null,
      blurb: "秋色入调，温柔一点。"
    },
    /* —— 冬 Winter ×7 —— */
    {
      id: "wi01", season: "winter", name: "羊绒高领与大衣",
      pieces: { top: "黑色羊绒高领", bottom: "炭灰羊毛西裤", shoes: "黑色切尔西靴", extras: ["深蓝羊毛大衣"] },
      owned: ["黑色羊绒高领", "炭灰羊毛西裤", "黑色切尔西靴"],
      buy: ["深蓝羊毛大衣"],
      tags: ["warm", "layer", "jacket"], image: null,
      blurb: "严寒通勤的骨架。"
    },
    {
      id: "wi02", season: "winter", name: "羽绒与厚针织",
      pieces: { top: "乳白厚圆领针织", bottom: "黑色加绒牛仔裤", shoes: "厚底短靴", extras: ["中长羽绒服"] },
      owned: ["乳白厚圆领针织", "黑色加绒牛仔裤", "厚底短靴"],
      buy: ["中长羽绒服"],
      tags: ["warm", "layer", "jacket", "wind"], image: null,
      blurb: "大风降温日的保暖首选。"
    },
    {
      id: "wi03", season: "winter", name: "衬衫叠穿西装",
      pieces: { top: "白衬衫 + 细高领内搭", bottom: "黑色西裤", shoes: "黑色皮鞋", extras: ["深灰厚西装外套"] },
      owned: ["白衬衫 + 细高领内搭", "黑色西裤", "黑色皮鞋"],
      buy: ["深灰厚西装外套"],
      tags: ["smart", "layer", "jacket"], image: null,
      blurb: "冬季正式场合。"
    },
    {
      id: "wi04", season: "winter", name: "针织裙与长靴",
      pieces: { onePiece: "炭灰高领针织连衣裙", shoes: "过膝长靴", extras: ["长款羊毛大衣", "羊绒围巾"] },
      owned: ["炭灰高领针织连衣裙", "过膝长靴"],
      buy: ["长款羊毛大衣", "羊绒围巾"],
      tags: ["warm", "layer", "jacket"], image: null,
      blurb: "线条干净的冬日造型。"
    },
    {
      id: "wi05", season: "winter", name: "卫衣与羽绒马甲",
      pieces: { top: "深灰厚卫衣", bottom: "黑色运动裤", shoes: "加绒运动鞋", extras: ["短羽绒马甲"] },
      owned: ["深灰厚卫衣", "黑色运动裤", "加绒运动鞋"],
      buy: ["短羽绒马甲"],
      tags: ["casual", "warm", "layer"], image: null,
      blurb: "周末外出，保暖且轻。"
    },
    {
      id: "wi06", season: "winter", name: "雨雪防风套装",
      pieces: { top: "黑色高领", bottom: "防水软壳裤", shoes: "防水雪地靴", extras: ["硬壳防风外套"] },
      owned: ["黑色高领"],
      buy: ["防水软壳裤", "防水雪地靴", "硬壳防风外套"],
      tags: ["rain", "warm", "closed-shoes", "jacket", "wind"], image: null,
      blurb: "雨雪天：硬壳 + 闭口鞋。"
    },
    {
      id: "wi07", season: "winter", name: "开司米与阔腿呢裤",
      pieces: { top: "驼色开司米圆领", bottom: "深驼阔腿呢裤", shoes: "同色短靴", extras: ["双面呢大衣"] },
      owned: ["驼色开司米圆领", "深驼阔腿呢裤", "同色短靴"],
      buy: ["双面呢大衣"],
      tags: ["warm", "smart", "layer", "jacket"], image: null,
      blurb: "冬日温柔通勤。"
    },
    /* —— 春 Spring ×7 —— */
    {
      id: "sp01", season: "spring", name: "浅色风衣与白裤",
      pieces: { top: "白 T 恤", bottom: "米白直筒裤", shoes: "白色运动鞋", extras: ["浅卡其风衣"] },
      owned: ["白 T 恤", "米白直筒裤", "白色运动鞋"],
      buy: ["浅卡其风衣"],
      tags: ["layer", "jacket", "mid"], image: null,
      blurb: "春日经典：风衣一披即成。"
    },
    {
      id: "sp02", season: "spring", name: "针织开衫与牛仔",
      pieces: { top: "浅粉细针织", bottom: "浅蓝直筒牛仔裤", shoes: "白色帆布鞋", extras: ["奶油色开衫"] },
      owned: ["浅粉细针织", "浅蓝直筒牛仔裤", "白色帆布鞋"],
      buy: ["奶油色开衫"],
      tags: ["layer", "casual"], image: null,
      blurb: "乍暖还寒的柔和色。"
    },
    {
      id: "sp03", season: "spring", name: "白衬衫与半裙",
      pieces: { top: "白色泡袖衬衫", bottom: "细格纹半裙", shoes: "裸色低跟", extras: ["短风衣"] },
      owned: ["白色泡袖衬衫", "裸色低跟"],
      buy: ["细格纹半裙", "短风衣"],
      tags: ["smart", "layer", "jacket"], image: null,
      blurb: "春季见面与轻正式。"
    },
    {
      id: "sp04", season: "spring", name: "运动休闲叠穿",
      pieces: { top: "灰绿短袖", bottom: "黑色运动裤", shoes: "跑鞋", extras: ["轻薄冲锋衣"] },
      owned: ["灰绿短袖", "黑色运动裤", "跑鞋"],
      buy: ["轻薄冲锋衣"],
      tags: ["casual", "layer", "jacket", "wind"], image: null,
      blurb: "春季风大时的户外款。"
    },
    {
      id: "sp05", season: "spring", name: "亚麻混纺套装",
      pieces: { top: "雾蓝衬衫", bottom: "同色九分裤", shoes: "棕色乐福", extras: ["薄羊毛围巾"] },
      owned: ["雾蓝衬衫", "同色九分裤", "棕色乐福"],
      buy: ["薄羊毛围巾"],
      tags: ["smart", "mid"], image: null,
      blurb: "回暖后的清爽套装。"
    },
    {
      id: "sp06", season: "spring", name: "春雨风衣套装",
      pieces: { top: "深色高领薄针织", bottom: "黑色烟管裤", shoes: "防水短靴", extras: ["中长防风雨衣"] },
      owned: ["深色高领薄针织", "黑色烟管裤"],
      buy: ["防水短靴", "中长防风雨衣"],
      tags: ["rain", "closed-shoes", "jacket", "layer"], image: null,
      blurb: "黄梅与春雨的备用造型。"
    },
    {
      id: "sp07", season: "spring", name: "碎花连衣裙叠穿",
      pieces: { onePiece: "小碎花中长裙", shoes: "白色平底鞋", extras: ["牛仔夹克", "草编包"] },
      owned: ["小碎花中长裙", "白色平底鞋"],
      buy: ["牛仔夹克", "草编包"],
      tags: ["weekend", "layer", "jacket"], image: null,
      blurb: "春日周末，轻快一点。"
    },
    /* —— 健身 / 居家 —— */
    {
      id: "gy01", season: "gym", name: "训练日基础套",
      pieces: { top: "透气训练背心", bottom: "高腰训练裤", shoes: "室内训练鞋", extras: ["轻薄外套（进出馆）"] },
      owned: ["透气训练背心", "高腰训练裤", "室内训练鞋"],
      buy: ["轻薄外套（进出馆）"],
      tags: ["gym"], image: null,
      blurb: "健身房固定造型，不另发明。"
    },
    {
      id: "lo01", season: "lounge", name: "居家柔软套装",
      pieces: { top: "棉质家居上衣", bottom: "同色家居裤", shoes: "室内拖鞋", extras: ["薄罩衫"] },
      owned: ["棉质家居上衣", "同色家居裤", "室内拖鞋"],
      buy: [],
      tags: ["lounge"], image: null,
      blurb: "在家的唯一正式选项。"
    }
  ],
  /* 清理清单占位：不在 30 套体系内的衣服，可手动增删 */
  purge: [
    { name: "旧印花 T 恤 ×3", action: "捐赠", note: "不进任何造型" },
    { name: "磨破的浅色牛仔裤", action: "丢弃", note: "已无法搭配" },
    { name: "不合身西装外套", action: "出售", note: "肩线过宽" }
  ],
  /* 轮换说明 */
  rotationNote:
    "每个季节固定 7 套。天气不适时只在当季池内替换，不临时发明新造型。健身与居家各 1 套，全年不变。建议按周轮换，让每套都有出场机会。"
};
