/* Client-side look selection — only from configured looks */
(function (global) {
  const SEASON_LABEL = {
    summer: "夏",
    fall: "秋",
    winter: "冬",
    spring: "春",
    gym: "健身",
    lounge: "居家"
  };
  const DAILY_COUNT = 5;

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

  function whyText(picks, weather, preferred) {
    const bits = [];
    bits.push(`体感约 ${weather.apparent}°C，归入「${SEASON_LABEL[preferred]}」优先。`);
    if (weather.raining || weather.precip >= 1) {
      bits.push("有降水，外套与闭口鞋靠前。");
    } else {
      bits.push("干燥晴好，雨具靠后。");
    }
    if (weather.wind >= 25) bits.push(`风速 ${weather.wind} km/h，保留叠穿。`);
    bits.push(`今日排出五套，首选「${picks[0].name}」。`);
    return bits.join(" ");
  }

  function selectToday(looks, weather, date) {
    date = date || new Date();
    const preferred = poolSeason(weather, date);
    const ranked = (looks || [])
      .map((look) => ({ look, score: scoreLook(look, weather, preferred) }))
      .sort((a, b) => b.score - a.score || a.look.id.localeCompare(b.look.id));

    const picks = ranked.slice(0, DAILY_COUNT).map((row) => row.look);
    if (!picks.length) {
      return {
        preferred,
        picks: [],
        primary: null,
        why: "衣橱里还没有造型可推荐。",
        seasonLabel: SEASON_LABEL[preferred],
        count: DAILY_COUNT
      };
    }

    return {
      preferred,
      picks,
      primary: picks[0],
      why: whyText(picks, weather, preferred),
      seasonLabel: SEASON_LABEL[preferred],
      count: DAILY_COUNT
    };
  }

  global.WardrobeSelect = { selectToday, calendarSeason, poolSeason, SEASON_LABEL, DAILY_COUNT };
})(window);
