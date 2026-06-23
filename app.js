const $ = (selector) => document.querySelector(selector);
const pct = (value) => `${Math.round(value * 100)}%`;
const round = (value, digits = 1) => Number(value.toFixed(digits));
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const RESULT_STORAGE_KEY = "world-cup-2026-results";
const PREVIEW_DATE_OVERRIDE = "2026-06-23";

function initialDate() {
  const dates = [...new Set(FIXTURES.map((fixture) => fixture.date))];
  if (dates.includes(PREVIEW_DATE_OVERRIDE)) return PREVIEW_DATE_OVERRIDE;
  const today = new Date().toISOString().slice(0, 10);
  if (dates.includes(today)) return today;
  if (today < dates[0]) return dates[0];
  if (today > dates[dates.length - 1]) return dates[dates.length - 1];
  return dates.find((date) => date >= today) || dates[0];
}

const state = {
  date: initialDate(),
  group: "ALL",
  formWeight: 1,
  upsetWeight: 1
};

function teamLabel(team) {
  return `${TEAMS[team].zh} / ${team}`;
}

function fixtureKey(fixture) {
  return `${fixture.date}|${fixture.home}|${fixture.away}`;
}

function timeInfoFor(fixture) {
  const times = typeof BEIJING_TIMES === "undefined" ? {} : BEIJING_TIMES;
  return times[fixtureKey(fixture)] || null;
}

function fixtureTimeText(fixture) {
  const timeInfo = timeInfoFor(fixture);
  if (!timeInfo) return `${fixture.date} · ${fixture.group}组 · ${fixture.venue}`;
  return `${fixture.date} · ${fixture.group}组 · ${fixture.venue} · 北京时间 ${timeInfo.beijing}`;
}

function insightFor(fixture) {
  const insights = typeof MATCH_INSIGHTS === "undefined" ? [] : MATCH_INSIGHTS;
  return insights.find((item) => item.date === fixture.date && item.home === fixture.home && item.away === fixture.away) || null;
}

function rankScore(rank) {
  return 100 - Math.min(rank, 100) * 0.72;
}

function savedResults() {
  try {
    return JSON.parse(localStorage.getItem(RESULT_STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function allResults() {
  const fileResults = typeof RESULTS === "undefined" ? {} : RESULTS;
  return { ...fileResults, ...savedResults() };
}

function resultFor(fixture) {
  const result = allResults()[fixture.id];
  if (!result || result.status !== "final") return null;
  return {
    homeGoals: Number(result.homeGoals),
    awayGoals: Number(result.awayGoals),
    status: "final",
    updatedAt: result.updatedAt || ""
  };
}

function saveResult(fixtureId, homeGoals, awayGoals) {
  const stored = savedResults();
  stored[fixtureId] = {
    homeGoals: Number(homeGoals),
    awayGoals: Number(awayGoals),
    status: "final",
    updatedAt: new Date().toISOString()
  };
  localStorage.setItem(RESULT_STORAGE_KEY, JSON.stringify(stored));
}

function clearResult(fixtureId) {
  const stored = savedResults();
  delete stored[fixtureId];
  localStorage.setItem(RESULT_STORAGE_KEY, JSON.stringify(stored));
}

function actualOutcome(result) {
  if (result.homeGoals > result.awayGoals) return "home";
  if (result.homeGoals < result.awayGoals) return "away";
  return "draw";
}

function predictionOutcome(f) {
  const entries = [
    ["home", f.homeWin],
    ["draw", f.draw],
    ["away", f.awayWin]
  ];
  return entries.sort((a, b) => b[1] - a[1])[0][0];
}

function outcomeLabel(outcome, fixture) {
  if (outcome === "home") return `${TEAMS[fixture.home].zh}胜`;
  if (outcome === "away") return `${TEAMS[fixture.away].zh}胜`;
  return "平局";
}

function completedFixtures(beforeDate = null) {
  return FIXTURES
    .map((fixture) => ({ fixture, result: resultFor(fixture) }))
    .filter(({ fixture, result }) => result && (!beforeDate || fixture.date < beforeDate));
}

function teamMomentum(teamName, targetDate) {
  const team = TEAMS[teamName];
  let momentum = 0;
  completedFixtures(targetDate).forEach(({ fixture, result }) => {
    const isHome = fixture.home === teamName;
    const isAway = fixture.away === teamName;
    if (!isHome && !isAway) return;

    const goalsFor = isHome ? result.homeGoals : result.awayGoals;
    const goalsAgainst = isHome ? result.awayGoals : result.homeGoals;
    const opponentName = isHome ? fixture.away : fixture.home;
    const opponent = TEAMS[opponentName];
    const points = goalsFor > goalsAgainst ? 3 : goalsFor === goalsAgainst ? 1 : 0;
    const rankUpside = clamp((team.rank - opponent.rank) / 80, -0.5, 0.5);

    momentum += (points - 1) * 0.12;
    momentum += clamp(goalsFor - goalsAgainst, -3, 3) * 0.07;
    momentum += points === 3 ? rankUpside * 0.12 : points === 0 ? -rankUpside * 0.08 : rankUpside * 0.04;
  });
  return clamp(momentum, -0.9, 0.9);
}

function effectiveForm(teamName, targetDate) {
  return clamp(TEAMS[teamName].form + teamMomentum(teamName, targetDate), 1, 10);
}

function composite(teamName, opponentName, venue, targetDate) {
  const t = TEAMS[teamName];
  const opponent = TEAMS[opponentName];
  const sameRegion = t.host || venue.includes("Vancouver") || venue.includes("Toronto") || venue.includes("Mexico") || venue.includes("Los Angeles") || venue.includes("Seattle");
  const hostBoost = t.host ? 4.2 : 0;
  const travelBoost = t.confed === "CONCACAF" && sameRegion ? 1.3 : 0;
  const opponentStylePenalty = Math.max(0, opponent.tactics - t.tactics) * 0.35;
  const form = effectiveForm(teamName, targetDate);

  return (
    rankScore(t.rank) * 0.38 +
    t.squad * 2.35 +
    form * 2.05 * state.formWeight +
    t.coachScore * 1.4 +
    t.tactics * 1.35 +
    t.experience * 0.8 +
    hostBoost +
    travelBoost -
    opponentStylePenalty
  );
}

function poisson(lambda, goals) {
  let factorial = 1;
  for (let i = 2; i <= goals; i += 1) factorial *= i;
  return (Math.exp(-lambda) * lambda ** goals) / factorial;
}

function forecast(fixture) {
  const home = TEAMS[fixture.home];
  const away = TEAMS[fixture.away];
  let homeScore = composite(fixture.home, fixture.away, fixture.venue, fixture.date);
  let awayScore = composite(fixture.away, fixture.home, fixture.venue, fixture.date);
  const insight = insightFor(fixture);
  if (insight) {
    homeScore += insight.homeMood || 0;
    awayScore += insight.awayMood || 0;
  }
  const diff = homeScore - awayScore;
  const homeForm = effectiveForm(fixture.home, fixture.date);
  const awayForm = effectiveForm(fixture.away, fixture.date);
  const tempo = 2.15 + (home.tactics + away.tactics - 12) * 0.06 + (homeForm + awayForm - 12) * 0.035 + (insight ? insight.tempoModifier || 0 : 0);
  const upsetCompress = 1 - (state.upsetWeight - 1) * 0.18;
  const adjustedDiff = diff * upsetCompress;
  const homeLambda = Math.max(0.25, tempo / 2 + adjustedDiff / 48 + (home.squad - away.squad) * 0.05);
  const awayLambda = Math.max(0.25, tempo / 2 - adjustedDiff / 48 + (away.squad - home.squad) * 0.05);

  let homeWin = 0;
  let draw = 0;
  let awayWin = 0;
  for (let h = 0; h <= 8; h += 1) {
    for (let a = 0; a <= 8; a += 1) {
      const p = poisson(homeLambda, h) * poisson(awayLambda, a);
      if (h > a) homeWin += p;
      if (h === a) draw += p;
      if (h < a) awayWin += p;
    }
  }
  const total = homeWin + draw + awayWin;
  homeWin /= total;
  draw /= total;
  awayWin /= total;

  const upsetRisk = Math.min(0.92, Math.max(0.08, (1 - Math.max(homeWin, awayWin)) * 0.82 + Math.abs(home.rank - away.rank) / 220));
  return {
    homeScore,
    awayScore,
    homeWin,
    draw,
    awayWin,
    homeLambda,
    awayLambda,
    homeScoreRate: 1 - Math.exp(-homeLambda),
    awayScoreRate: 1 - Math.exp(-awayLambda),
    totalGoals: homeLambda + awayLambda,
    upsetRisk
  };
}


function mostLikelyScore(f) {
  let best = { home: 0, away: 0, probability: 0 };
  for (let homeGoals = 0; homeGoals <= 8; homeGoals += 1) {
    for (let awayGoals = 0; awayGoals <= 8; awayGoals += 1) {
      const probability = poisson(f.homeLambda, homeGoals) * poisson(f.awayLambda, awayGoals);
      if (probability > best.probability) {
        best = { home: homeGoals, away: awayGoals, probability };
      }
    }
  }
  return best;
}

function scoreCandidates(f, maxGoals = 6) {
  const rows = [];
  for (let homeGoals = 0; homeGoals <= maxGoals; homeGoals += 1) {
    for (let awayGoals = 0; awayGoals <= maxGoals; awayGoals += 1) {
      rows.push({
        home: homeGoals,
        away: awayGoals,
        probability: poisson(f.homeLambda, homeGoals) * poisson(f.awayLambda, awayGoals)
      });
    }
  }
  return rows.sort((a, b) => b.probability - a.probability);
}

function scoreKey(score) {
  return `${score.home}-${score.away}`;
}

function scoreOutcome(score) {
  if (score.home > score.away) return "home";
  if (score.home < score.away) return "away";
  return "draw";
}

function scoreProfile(fixture, f) {
  const candidates = scoreCandidates(f);
  const predicted = predictionOutcome(f);
  const regular = candidates[0];
  const used = new Set([scoreKey(regular)]);
  const directional = candidates.find((score) => scoreOutcome(score) === predicted && !used.has(scoreKey(score))) || regular;
  used.add(scoreKey(directional));
  const highTotal = Math.max(4, Math.ceil(f.totalGoals + 1.15));
  const open = candidates.find((score) => {
    if (used.has(scoreKey(score))) return false;
    if (score.home + score.away < highTotal) return false;
    if (predicted === "draw") return Math.abs(score.home - score.away) <= 1;
    return scoreOutcome(score) === predicted;
  }) || candidates.find((score) => !used.has(scoreKey(score)) && score.home + score.away >= 3 && scoreOutcome(score) === predicted) || directional;

  return { regular, directional, open };
}

function scoreScenarioText(fixture, profile) {
  return [
    `常规 ${scoreText(fixture, profile.regular)}`,
    `方向 ${scoreText(fixture, profile.directional)}`,
    `大球 ${scoreText(fixture, profile.open)}`
  ].join(" / ");
}

function scoreScenarioMarkup(fixture, profile) {
  return `<div class="score-lines">
    <strong>常规：${scoreText(fixture, profile.regular)}</strong>
    <strong>方向：${scoreText(fixture, profile.directional)}</strong>
    <strong>大球：${scoreText(fixture, profile.open)}</strong>
    <small>单一比分只看概率峰值，发布时建议看三档剧本。</small>
  </div>`;
}

function scoreText(fixture, score) {
  return `${TEAMS[fixture.home].zh} ${score.home}-${score.away} ${TEAMS[fixture.away].zh}`;
}

function strongestSide(fixture, f) {
  if (f.homeWin >= f.awayWin) return { team: fixture.home, label: TEAMS[fixture.home].zh, prob: f.homeWin };
  return { team: fixture.away, label: TEAMS[fixture.away].zh, prob: f.awayWin };
}

function reviewFixture(fixture, f, result) {
  if (!result) return null;
  const outcomeHit = predictionOutcome(f) === actualOutcome(result);
  const totalGoals = result.homeGoals + result.awayGoals;
  const totalGoalHit = Math.abs(totalGoals - f.totalGoals) <= 1;
  const homeGoalHit = (f.homeScoreRate >= 0.5) === (result.homeGoals > 0);
  const awayGoalHit = (f.awayScoreRate >= 0.5) === (result.awayGoals > 0);
  const score = [outcomeHit, totalGoalHit, homeGoalHit, awayGoalHit].filter(Boolean).length / 4;

  return {
    outcomeHit,
    totalGoalHit,
    homeGoalHit,
    awayGoalHit,
    qualified: score >= 0.75,
    score
  };
}

function dateOptionLabel(date) {
  const fixtures = FIXTURES.filter((fixture) => fixture.date === date);
  const beijingDates = [...new Set(fixtures.map((fixture) => timeInfoFor(fixture)?.beijingDate).filter(Boolean))];
  if (beijingDates.length === 1 && beijingDates[0] !== date) return `${date} / 北京 ${beijingDates[0]}`;
  if (beijingDates.length > 1) return `${date} / 北京 ${beijingDates.join("、")}`;
  return date;
}

function boardDateTitle(fixtures) {
  const beijingDates = [...new Set(fixtures.map((fixture) => timeInfoFor(fixture)?.beijingDate).filter(Boolean))];
  if (beijingDates.length === 1) return `北京时间${beijingDates[0]}`;
  return state.date;
}

function renderFilters() {
  const dates = [...new Set(FIXTURES.map((f) => f.date))];
  $("#dateFilter").innerHTML = dates.map((date) => `<option value="${date}">${dateOptionLabel(date)}</option>`).join("");
  $("#groupFilter").innerHTML = `<option value="ALL">全部小组</option>${"ABCDEFGHIJKL".split("").map((g) => `<option value="${g}">${g}组</option>`).join("")}`;
  $("#dateFilter").value = state.date;
}

function currentFixtures() {
  return FIXTURES
    .filter((fixture) => (fixture.date === state.date) && (state.group === "ALL" || fixture.group === state.group))
    .sort((a, b) => (timeInfoFor(a)?.beijing || "").localeCompare(timeInfoFor(b)?.beijing || "") || a.id - b.id);
}

function matchCard(fixture) {
  const f = forecast(fixture);
  const home = TEAMS[fixture.home];
  const away = TEAMS[fixture.away];
  const pick = strongestSide(fixture, f);
  const scoreProfileData = scoreProfile(fixture, f);
  const insight = insightFor(fixture);
  const result = resultFor(fixture);
  const review = reviewFixture(fixture, f, result);
  const homeForm = effectiveForm(fixture.home, fixture.date);
  const awayForm = effectiveForm(fixture.away, fixture.date);
  const homeMomentum = homeForm - home.form;
  const awayMomentum = awayForm - away.form;
  const factors = [
    `阵容 ${round(home.squad)} : ${round(away.squad)}`,
    `动态状态 ${round(homeForm)}${homeMomentum ? `(${homeMomentum > 0 ? "+" : ""}${round(homeMomentum)})` : ""} : ${round(awayForm)}${awayMomentum ? `(${awayMomentum > 0 ? "+" : ""}${round(awayMomentum)})` : ""}`,
    `教练 ${round(home.coachScore)} : ${round(away.coachScore)}`,
    `队形 ${home.formation} vs ${away.formation}`
  ];
  if (insight) {
    factors.push(`热度 ${insight.heat}/100 · ${insight.label}`);
  }
  const reviewText = review
    ? `赛果${review.outcomeHit ? "命中" : "未中"} · 总进球${review.totalGoalHit ? "合格" : "偏差"} · 进球方向${Math.round(((review.homeGoalHit ? 1 : 0) + (review.awayGoalHit ? 1 : 0)) / 2 * 100)}% · 综合${pct(review.score)}`
    : "待赛，赛后录入后自动复盘";
  const reviewClass = review ? (review.qualified ? "pass" : "miss") : "";

  return `
    <article class="match-card" data-fixture-id="${fixture.id}">
      <div class="match-top">
        <div class="team">
          <strong>${teamLabel(fixture.home)}</strong>
          <small>FIFA #${home.rank} · ${home.coach} · ${home.formation}</small>
        </div>
        <div class="versus">VS</div>
        <div class="team away">
          <strong>${teamLabel(fixture.away)}</strong>
          <small>FIFA #${away.rank} · ${away.coach} · ${away.formation}</small>
        </div>
      </div>
      <div class="prob-row" aria-label="胜平负概率">
        <div class="prob home-prob" style="opacity:${0.55 + f.homeWin * 0.45}">${home.zh}胜 ${pct(f.homeWin)}</div>
        <div class="prob draw-prob" style="opacity:${0.55 + f.draw * 0.45}">平 ${pct(f.draw)}</div>
        <div class="prob away-prob" style="opacity:${0.55 + f.awayWin * 0.45}">${away.zh}胜 ${pct(f.awayWin)}</div>
      </div>
      <div class="match-body">
        <div>
          <p class="meta">${fixtureTimeText(fixture)} · 推荐倾向：${pick.label}不败</p>
          <div class="score-callout"><span>比分场景</span>${scoreScenarioMarkup(fixture, scoreProfileData)}</div>
          <div class="stat-line"><span>${home.zh}进球率</span><div class="bar"><span style="width:${f.homeScoreRate * 100}%"></span></div><strong>${pct(f.homeScoreRate)}</strong></div>
          <div class="stat-line"><span>${away.zh}进球率</span><div class="bar away"><span style="width:${f.awayScoreRate * 100}%"></span></div><strong>${pct(f.awayScoreRate)}</strong></div>
          <div class="stat-line"><span>期望进球</span><div class="bar"><span style="width:${Math.min(100, f.totalGoals * 28)}%"></span></div><strong>${round(f.totalGoals, 2)}</strong></div>
          <div class="factor-row">${factors.map((factor) => `<span class="chip">${factor}</span>`).join("")}</div>
          <div class="result-editor">
            <label>
              ${home.zh}实际
              <input class="result-home" type="number" min="0" max="20" value="${result ? result.homeGoals : ""}" placeholder="-" />
            </label>
            <label>
              ${away.zh}实际
              <input class="result-away" type="number" min="0" max="20" value="${result ? result.awayGoals : ""}" placeholder="-" />
            </label>
            <button class="small-btn save-result" type="button">保存赛果</button>
            <button class="small-btn ghost clear-result" type="button">清除</button>
          </div>
        </div>
        <div class="risk-note">
          <strong>解读：</strong>${home.note} ${away.note}<br />
          <strong>风险：</strong>爆冷风险 ${pct(f.upsetRisk)}。若临场首发出现核心缺席，建议将状态敏感度调到 1.4 以上重算。<br />
          ${insight ? `<strong>热度/反应：</strong>${insight.summary}<br />` : ""}
          <span class="review-pill ${reviewClass}">${reviewText}</span>
        </div>
      </div>
    </article>
  `;
}

function renderMetrics(fixtures) {
  const forecasts = fixtures.map((fixture) => ({ fixture, f: forecast(fixture) }));
  $("#metricMatches").textContent = fixtures.length;
  $("#metricGoals").textContent = forecasts.length ? round(forecasts.reduce((sum, item) => sum + item.f.totalGoals, 0) / forecasts.length, 2) : "0.00";
  const locks = forecasts.map((item) => ({ ...strongestSide(item.fixture, item.f), fixture: item.fixture })).sort((a, b) => b.prob - a.prob);
  const upsets = forecasts.slice().sort((a, b) => b.f.upsetRisk - a.f.upsetRisk);
  $("#metricLock").textContent = locks[0] ? `${locks[0].label} ${pct(locks[0].prob)}` : "-";
  $("#metricUpset").textContent = upsets[0] ? `${TEAMS[upsets[0].fixture.home].zh} vs ${TEAMS[upsets[0].fixture.away].zh}` : "-";
  renderReviewMetrics();
}

function reviewRows(scopeFixtures = FIXTURES) {
  return scopeFixtures
    .map((fixture) => {
      const result = resultFor(fixture);
      if (!result) return null;
      const f = forecast(fixture);
      return { fixture, result, f, review: reviewFixture(fixture, f, result) };
    })
    .filter(Boolean);
}

function renderReviewMetrics() {
  const rows = reviewRows();
  const completed = rows.length;
  const outcomeHits = rows.filter((row) => row.review.outcomeHit).length;
  const totalGoalHits = rows.filter((row) => row.review.totalGoalHit).length;
  const scoringHits = rows.reduce((sum, row) => sum + (row.review.homeGoalHit ? 1 : 0) + (row.review.awayGoalHit ? 1 : 0), 0);
  const qualified = rows.filter((row) => row.review.qualified).length;

  $("#reviewCompleted").textContent = completed;
  $("#reviewOutcome").textContent = completed ? pct(outcomeHits / completed) : "-";
  $("#reviewScoring").textContent = completed ? pct(scoringHits / (completed * 2)) : "-";
  $("#reviewQualified").textContent = completed ? pct(qualified / completed) : "-";
}

function historicalFixtures() {
  return FIXTURES
    .filter((fixture) => fixture.date < state.date)
    .sort((a, b) => `${b.date}-${b.id}`.localeCompare(`${a.date}-${a.id}`));
}

function historyCard(fixture) {
  const f = forecast(fixture);
  const home = TEAMS[fixture.home];
  const away = TEAMS[fixture.away];
  const scoreProfileData = scoreProfile(fixture, f);
  const result = resultFor(fixture);
  const review = reviewFixture(fixture, f, result);
  const predictedOutcome = outcomeLabel(predictionOutcome(f), fixture);
  const actual = result ? `${home.zh} ${result.homeGoals}-${result.awayGoals} ${away.zh}` : "未录入赛果";
  const verdict = review
    ? `${review.outcomeHit ? "赛果命中" : "赛果未中"} · 总进球${review.totalGoalHit ? "合格" : "偏差"} · 综合${pct(review.score)}`
    : "录入实际比分后自动复盘";
  const verdictClass = review ? (review.qualified ? "pass" : "miss") : "";

  return `
    <article class="history-card">
      <div class="history-card-top">
        <div>
          <strong>${home.zh} vs ${away.zh}</strong>
          <span>${fixtureTimeText(fixture)}</span>
        </div>
        <span class="review-pill ${verdictClass}">${verdict}</span>
      </div>
      <div class="history-grid">
        <div><span>比分场景</span><strong>${scoreScenarioText(fixture, scoreProfileData)}</strong></div>
        <div><span>预测方向</span><strong>${predictedOutcome}</strong></div>
        <div><span>胜平负概率</span><strong>${home.zh}${pct(f.homeWin)} / 平${pct(f.draw)} / ${away.zh}${pct(f.awayWin)}</strong></div>
        <div><span>实际结果</span><strong>${actual}</strong></div>
      </div>
    </article>
  `;
}

function renderHistory() {
  const fixtures = historicalFixtures();
  const reviewed = reviewRows(fixtures);
  const qualified = reviewed.filter((row) => row.review.qualified).length;
  const outcomeHits = reviewed.filter((row) => row.review.outcomeHit).length;
  const summary = fixtures.length
    ? `当前日期 ${state.date} 之前共有 ${fixtures.length} 场历史预测；已录入 ${reviewed.length} 场赛果${reviewed.length ? `，胜平负命中率 ${pct(outcomeHits / reviewed.length)}，综合合格率 ${pct(qualified / reviewed.length)}` : "，待赛场次会在赛后录入。"}`
    : `当前日期 ${state.date} 之前暂无历史比赛。`;

  $("#historySummary").textContent = summary;
  $("#historyList").innerHTML = fixtures.length
    ? fixtures.map(historyCard).join("")
    : `<p class="risk-note">切换到更晚日期后，这里会显示之前比赛的预测和赛果复盘。</p>`;
}

function renderMatches() {
  const fixtures = currentFixtures();
  $("#matchList").innerHTML = fixtures.map(matchCard).join("") || `<p class="risk-note">当前筛选没有比赛。</p>`;
  renderMetrics(fixtures);
  renderXhs(fixtures);
  renderGroups();
  renderHistory();
}

function groupForecast(group) {
  const names = Object.keys(TEAMS).filter((name) => TEAMS[name].group === group);
  const table = Object.fromEntries(names.map((name) => [name, { pts: 0, gf: 0, ga: 0 }]));
  FIXTURES.filter((fixture) => fixture.group === group).forEach((fixture) => {
    const f = forecast(fixture);
    table[fixture.home].pts += f.homeWin * 3 + f.draw;
    table[fixture.away].pts += f.awayWin * 3 + f.draw;
    table[fixture.home].gf += f.homeLambda;
    table[fixture.home].ga += f.awayLambda;
    table[fixture.away].gf += f.awayLambda;
    table[fixture.away].ga += f.homeLambda;
  });
  return names.map((name) => ({ name, ...table[name], gd: table[name].gf - table[name].ga }))
    .sort((a, b) => b.pts - a.pts || b.gd - a.gd || TEAMS[a.name].rank - TEAMS[b.name].rank);
}

function renderGroups() {
  const groups = state.group === "ALL" ? "ABCDEFGHIJKL".split("") : [state.group];
  $("#groupBoard").innerHTML = groups.map((group) => {
    const rows = groupForecast(group).map((row, index) => `
      <div class="group-row">
        <span>${index + 1}</span>
        <strong>${TEAMS[row.name].zh}</strong>
        <span>${round(row.pts, 1)}分</span>
        <span>${round(row.gd, 1)}净</span>
      </div>
    `).join("");
    return `<article class="group-card"><h3>${group}组</h3>${rows}</article>`;
  }).join("");
}

function renderXhs(fixtures) {
  const forecasts = fixtures.map((fixture) => ({ fixture, f: forecast(fixture) }));
  const sorted = forecasts.slice().sort((a, b) => Math.max(b.f.homeWin, b.f.awayWin) - Math.max(a.f.homeWin, a.f.awayWin));
  const headline = `${boardDateTitle(fixtures)} 世界杯预测：${fixtures.length}场胜率与进球率`;
  const lines = sorted.map(({ fixture, f }) => {
    const insight = insightFor(fixture);
    const pick = strongestSide(fixture, f);
    const scoreProfileData = scoreProfile(fixture, f);
    const home = TEAMS[fixture.home];
    const away = TEAMS[fixture.away];
    const timeInfo = timeInfoFor(fixture);
    return `- ${home.zh} vs ${away.zh}${timeInfo ? `（北京时间${timeInfo.beijing}）` : ""}：${home.zh}胜${pct(f.homeWin)} / 平${pct(f.draw)} / ${away.zh}胜${pct(f.awayWin)}，比分场景${scoreScenarioText(fixture, scoreProfileData)}，总进球期望${round(f.totalGoals, 2)}。倾向${pick.label}不败，爆冷风险${pct(f.upsetRisk)}${insight ? `，热度${insight.heat}/100：${insight.label}` : ""}。`;
  });
  const focus = sorted[0] ? strongestSide(sorted[0].fixture, sorted[0].f).label : "暂无";
  const reviewed = reviewRows(fixtures);
  const reviewCopy = reviewed.length
    ? `
赛后复盘：
${reviewed.map(({ fixture, result, review }) => {
  const home = TEAMS[fixture.home];
  const away = TEAMS[fixture.away];
  return `- ${home.zh} ${result.homeGoals}-${result.awayGoals} ${away.zh}：${review.outcomeHit ? "赛果命中" : "赛果未中"}，总进球${review.totalGoalHit ? "合格" : "偏差"}，综合评分${pct(review.score)}。`;
}).join("\n")}
`
    : "";
  const copy = `${headline}

今日重点：${focus}胜率最高，但小组赛第一轮/第二轮变量很大，首发和临场天气要赛前再校正。

${lines.join("\n")}
${reviewCopy}

我的判断逻辑：
1. 基础强弱看 FIFA 排名和阵容深度
2. 临场变量看球员状态、伤病、教练稳定性、队形克制
3. 杯赛变量看主场旅行、赛程消耗、必须拿分的心理压力

仅做赛前分析，不等于确定赛果。临场首发出来后，胜率建议再上下修正 3-8 个点；比分看三档剧本，不把单一比分当确定结果。

#世界杯 #2026世界杯 #足球预测 #小红书足球 #今日赛事分析`;
  $("#xhsCopy").textContent = copy;
}

function renderWeights() {
  $("#weightGrid").innerHTML = MODEL_WEIGHTS.map(([label, weight]) => `
    <div class="weight">
      <span>${label}</span>
      <strong>${weight > 0 ? "+" : ""}${weight}%</strong>
    </div>
  `).join("");
}

function bindEvents() {
  $("#dateFilter").addEventListener("change", (event) => {
    state.date = event.target.value;
    renderMatches();
  });
  $("#groupFilter").addEventListener("change", (event) => {
    state.group = event.target.value;
    renderMatches();
  });
  ["formWeight", "upsetWeight"].forEach((id) => {
    $(`#${id}`).addEventListener("input", (event) => {
      state[id] = Number(event.target.value);
      renderMatches();
    });
  });
  $("#openHistory").addEventListener("click", () => {
    renderHistory();
    $("#historyModal").classList.remove("hidden");
  });
  $("#closeHistory").addEventListener("click", () => {
    $("#historyModal").classList.add("hidden");
  });
  $("#historyModal").addEventListener("click", (event) => {
    if (event.target.id === "historyModal") {
      $("#historyModal").classList.add("hidden");
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      $("#historyModal").classList.add("hidden");
    }
  });
  document.addEventListener("click", (event) => {
    const card = event.target.closest(".match-card");
    if (!card) return;
    const fixtureId = Number(card.dataset.fixtureId);
    if (event.target.matches(".save-result")) {
      const homeGoals = card.querySelector(".result-home").value;
      const awayGoals = card.querySelector(".result-away").value;
      if (homeGoals === "" || awayGoals === "") return;
      saveResult(fixtureId, homeGoals, awayGoals);
      renderMatches();
    }
    if (event.target.matches(".clear-result")) {
      clearResult(fixtureId);
      renderMatches();
    }
  });
  $("#copyXhs").addEventListener("click", async () => {
    await navigator.clipboard.writeText($("#xhsCopy").textContent);
    $("#copyXhs").textContent = "已复制";
    setTimeout(() => {
      $("#copyXhs").textContent = "复制文案";
    }, 1400);
  });
}

renderFilters();
renderWeights();
bindEvents();
renderMatches();
