/* Client-side look selection — never invent outside the 30 */
(function (global) {
  const SEASON_LABEL = {
    summer: "夏",
    fall: "秋",
    winter: "冬",
    spring: "春",
    gym: "健身",
    lounge: "居家"
  };

  function calendarSeason(date) {
    const m = date.getMonth() + 1;
    if (m >= 3 && m <= 5) return "spring";
    if (m >= 6 && m <= 8) return "summer";
    if (m >= 9 && m <= 11) return "fall";
    return "winter";
  }

  function poolSeason(weather, date) {
    const t = weather.apparent;
    if (t >= 20) return "summer";
    if (t >= 15 && t <= 19) {
      const cal = calendarSeason(date);
      if (cal === "spring" || cal === "fall") return cal;
      // closer season by month
      const m = date.getMonth() + 1;
      if (m === 12 || m <= 2) return m === 12 ? "fall" : "spring";
      return cal === "summer" ? "summer" : cal;
    }
    if (t >= 8 && t <= 14) return "fall";
    return "winter";
  }

  function scoreLook(look, weather, preferred) {
    let score = 0;
    const tags = look.tags || [];
    if (look.season === preferred) score += 10;

    if (weather.raining || weather.precip >= 1) {
      if (tags.includes("rain")) score += 8;
      if (tags.includes("closed-shoes")) score += 4;
      if (tags.includes("jacket")) score += 3;
      if (tags.includes("light") || tags.includes("evening")) score -= 4;
    } else {
      if (tags.includes("rain")) score -= 3;
      if (tags.includes("dry")) score += 2;
    }

    if (weather.wind >= 25) {
      if (tags.includes("layer") || tags.includes("wind") || tags.includes("jacket")) score += 5;
    }

    if (weather.apparent <= 7 && tags.includes("warm")) score += 4;
    if (weather.apparent >= 8 && weather.apparent <= 14 && tags.includes("mid")) score += 3;
    if (weather.apparent >= 20 && tags.includes("light")) score += 2;

    return score;
  }

  function pickFromPool(looks, season, weather) {
    const pool = looks.filter((l) => l.season === season);
    if (!pool.length) return null;
    const ranked = pool
      .map((l) => ({ look: l, score: scoreLook(l, weather, season) }))
      .sort((a, b) => b.score - a.score || a.look.id.localeCompare(b.look.id));
    return ranked[0].look;
  }

  function pickSwap(looks, primary, weather, preferred) {
    const needRain = weather.raining || weather.precip >= 1;
    const pool = looks.filter((l) => l.season === preferred && l.id !== primary.id);
    if (!pool.length) return null;

    if (needRain) {
      const rain = pool.filter((l) => (l.tags || []).includes("rain") || (l.tags || []).includes("jacket"));
      if (rain.length) return rain[0];
    }
    // cooler swap: prefer more layers
    const layered = pool
      .filter((l) => (l.tags || []).includes("layer") || (l.tags || []).includes("jacket"))
      .sort((a, b) => scoreLook(b, { ...weather, apparent: weather.apparent - 5 }, preferred) - scoreLook(a, { ...weather, apparent: weather.apparent - 5 }, preferred));
    return layered[0] || pool[0];
  }

  function whyText(look, weather, preferred) {
    const bits = [];
    bits.push(`体感约 ${weather.apparent}°C，归入「${SEASON_LABEL[preferred]}」池。`);
    if (weather.raining || weather.precip >= 1) {
      bits.push("有降水，优先外套与闭口鞋。");
    } else {
      bits.push("干燥晴好，不必加雨具。");
    }
    if (weather.wind >= 25) bits.push(`风速 ${weather.wind} km/h，保留叠穿。`);
    bits.push(`入选：${look.name}。`);
    return bits.join(" ");
  }

  function swapReason(weather) {
    if (weather.raining || weather.precip >= 1) return "若雨势加重，改穿这一套（外套 + 闭口鞋）。";
    return "若降温约 5°C 或风变大，改穿这一套（更多中层）。";
  }

  function selectToday(looks, weather, date) {
    date = date || new Date();
    const preferred = poolSeason(weather, date);
    const primary = pickFromPool(looks, preferred, weather);
    const swap = pickSwap(looks, primary, weather, preferred);
    return {
      preferred,
      primary,
      swap,
      why: whyText(primary, weather, preferred),
      swapWhy: swapReason(weather),
      seasonLabel: SEASON_LABEL[preferred]
    };
  }

  global.WardrobeSelect = { selectToday, calendarSeason, poolSeason, SEASON_LABEL };
})(window);
