/* Open-Meteo · Shanghai · graceful offline fallback */
(function (global) {
  const WMO = {
    0: "晴朗",
    1: "大致晴朗",
    2: "局部多云",
    3: "阴天",
    45: "有雾",
    48: "雾凇",
    51: "毛毛雨",
    53: "小雨",
    55: "中雨",
    56: "冻毛毛雨",
    57: "冻雨",
    61: "小雨",
    63: "中雨",
    65: "大雨",
    66: "冻雨",
    67: "强冻雨",
    71: "小雪",
    73: "中雪",
    75: "大雪",
    77: "雪粒",
    80: "阵雨",
    81: "强阵雨",
    82: "暴雨",
    85: "阵雪",
    86: "强阵雪",
    95: "雷阵雨",
    96: "雷阵雨伴冰雹",
    99: "强雷暴冰雹"
  };

  function seasonFallback(date) {
    const m = date.getMonth() + 1;
    if (m >= 6 && m <= 8) return { apparent: 28, temp: 30, precip: 0, code: 1, wind: 12, label: "夏 · 离线估温" };
    if (m >= 9 && m <= 11) return { apparent: 18, temp: 19, precip: 0, code: 2, wind: 14, label: "秋 · 离线估温" };
    if (m === 12 || m <= 2) return { apparent: 4, temp: 6, precip: 0, code: 3, wind: 16, label: "冬 · 离线估温" };
    return { apparent: 16, temp: 17, precip: 0, code: 2, wind: 14, label: "春 · 离线估温" };
  }

  function normalize(raw, meta) {
    const precip = Number(raw.precipitation || 0);
    const code = Number(raw.weather_code || 0);
    const raining = precip >= 1 || [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99].includes(code);
    return {
      apparent: Math.round(Number(raw.apparent_temperature)),
      temp: Math.round(Number(raw.temperature_2m)),
      precip,
      code,
      wind: Math.round(Number(raw.wind_speed_10m || 0)),
      condition: WMO[code] || "多云",
      raining,
      source: meta.source,
      fetchedAt: meta.fetchedAt,
      offline: !!meta.offline,
      statusLabel: meta.statusLabel
    };
  }

  async function fetchShanghaiWeather(city) {
    const url =
      "https://api.open-meteo.com/v1/forecast" +
      `?latitude=${city.latitude}&longitude=${city.longitude}` +
      "&current=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m" +
      `&timezone=${encodeURIComponent(city.timezone)}`;

    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const data = await res.json();
      if (!data.current) throw new Error("no current");
      const weather = normalize(data.current, {
        source: "open-meteo",
        fetchedAt: data.current.time || new Date().toISOString(),
        offline: false,
        statusLabel: "实时 · Open-Meteo"
      });
      try {
        localStorage.setItem("wardrobe_last_weather", JSON.stringify({ weather, savedAt: Date.now() }));
      } catch (_) {}
      return weather;
    } catch (err) {
      let cached = null;
      try {
        cached = JSON.parse(localStorage.getItem("wardrobe_last_weather") || "null");
      } catch (_) {}
      if (cached && cached.weather && Date.now() - cached.savedAt < 1000 * 60 * 60 * 24) {
        return {
          ...cached.weather,
          offline: true,
          statusLabel: "离线 · 使用最近一次记录"
        };
      }
      const fb = seasonFallback(new Date());
      return normalize(
        {
          apparent_temperature: fb.apparent,
          temperature_2m: fb.temp,
          precipitation: fb.precip,
          weather_code: fb.code,
          wind_speed_10m: fb.wind
        },
        {
          source: "season-fallback",
          fetchedAt: new Date().toISOString(),
          offline: true,
          statusLabel: fb.label
        }
      );
    }
  }

  global.WardrobeWeather = { fetchShanghaiWeather, WMO };
})(window);
