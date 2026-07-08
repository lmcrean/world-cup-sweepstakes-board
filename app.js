const API_BASE = "https://worldcup26.ir";
const REFRESH_MS = 5 * 60 * 1000;
const CACHE_KEY = "wc2026-live-groups";
const GAMES_CACHE_KEY = "wc2026-live-games";

const teams = [
  { id: "1", name: "Mexico", display: "Mexico", flag: "🇲🇽", code: "MEX", group: "A" },
  { id: "2", name: "South Africa", display: "South Africa", flag: "🇿🇦", code: "RSA", group: "A" },
  { id: "3", name: "South Korea", display: "South Korea", flag: "🇰🇷", code: "KOR", group: "A" },
  { id: "4", name: "Czech Republic", display: "Czechia", flag: "🇨🇿", code: "CZE", group: "A" },
  { id: "5", name: "Canada", display: "Canada", flag: "🇨🇦", code: "CAN", group: "B" },
  { id: "6", name: "Bosnia and Herzegovina", display: "Bosnia & Herzegovina", flag: "🇧🇦", code: "BIH", group: "B" },
  { id: "7", name: "Qatar", display: "Qatar", flag: "🇶🇦", code: "QAT", group: "B" },
  { id: "8", name: "Switzerland", display: "Switzerland", flag: "🇨🇭", code: "SUI", group: "B" },
  { id: "9", name: "Brazil", display: "Brazil", flag: "🇧🇷", code: "BRA", group: "C" },
  { id: "10", name: "Morocco", display: "Morocco", flag: "🇲🇦", code: "MAR", group: "C" },
  { id: "11", name: "Haiti", display: "Haiti", flag: "🇭🇹", code: "HAI", group: "C" },
  { id: "12", name: "Scotland", display: "Scotland", flag: "🏴", code: "SCO", group: "C" },
  { id: "13", name: "United States", display: "United States", flag: "🇺🇸", code: "USA", group: "D" },
  { id: "14", name: "Paraguay", display: "Paraguay", flag: "🇵🇾", code: "PAR", group: "D" },
  { id: "15", name: "Australia", display: "Australia", flag: "🇦🇺", code: "AUS", group: "D" },
  { id: "16", name: "Turkey", display: "Türkiye", flag: "🇹🇷", code: "TUR", group: "D" },
  { id: "17", name: "Germany", display: "Germany", flag: "🇩🇪", code: "GER", group: "E" },
  { id: "18", name: "Curaçao", display: "Curaçao", flag: "🇨🇼", code: "CUW", group: "E" },
  { id: "19", name: "Ivory Coast", display: "Ivory Coast", flag: "🇨🇮", code: "CIV", group: "E" },
  { id: "20", name: "Ecuador", display: "Ecuador", flag: "🇪🇨", code: "ECU", group: "E" },
  { id: "21", name: "Netherlands", display: "Netherlands", flag: "🇳🇱", code: "NED", group: "F" },
  { id: "22", name: "Japan", display: "Japan", flag: "🇯🇵", code: "JPN", group: "F" },
  { id: "23", name: "Sweden", display: "Sweden", flag: "🇸🇪", code: "SWE", group: "F" },
  { id: "24", name: "Tunisia", display: "Tunisia", flag: "🇹🇳", code: "TUN", group: "F" },
  { id: "25", name: "Belgium", display: "Belgium", flag: "🇧🇪", code: "BEL", group: "G" },
  { id: "26", name: "Egypt", display: "Egypt", flag: "🇪🇬", code: "EGY", group: "G" },
  { id: "27", name: "Iran", display: "Iran", flag: "🇮🇷", code: "IRN", group: "G" },
  { id: "28", name: "New Zealand", display: "New Zealand", flag: "🇳🇿", code: "NZL", group: "G" },
  { id: "29", name: "Spain", display: "Spain", flag: "🇪🇸", code: "ESP", group: "H" },
  { id: "30", name: "Cape Verde", display: "Cabo Verde", flag: "🇨🇻", code: "CPV", group: "H" },
  { id: "31", name: "Saudi Arabia", display: "Saudi Arabia", flag: "🇸🇦", code: "KSA", group: "H" },
  { id: "32", name: "Uruguay", display: "Uruguay", flag: "🇺🇾", code: "URU", group: "H" },
  { id: "33", name: "France", display: "France", flag: "🇫🇷", code: "FRA", group: "I" },
  { id: "34", name: "Senegal", display: "Senegal", flag: "🇸🇳", code: "SEN", group: "I" },
  { id: "35", name: "Iraq", display: "Iraq", flag: "🇮🇶", code: "IRQ", group: "I" },
  { id: "36", name: "Norway", display: "Norway", flag: "🇳🇴", code: "NOR", group: "I" },
  { id: "37", name: "Argentina", display: "Argentina", flag: "🇦🇷", code: "ARG", group: "J" },
  { id: "38", name: "Algeria", display: "Algeria", flag: "🇩🇿", code: "ALG", group: "J" },
  { id: "39", name: "Austria", display: "Austria", flag: "🇦🇹", code: "AUT", group: "J" },
  { id: "40", name: "Jordan", display: "Jordan", flag: "🇯🇴", code: "JOR", group: "J" },
  { id: "41", name: "Portugal", display: "Portugal", flag: "🇵🇹", code: "POR", group: "K" },
  { id: "42", name: "Democratic Republic of the Congo", display: "DR Congo", flag: "🇨🇩", code: "COD", group: "K" },
  { id: "43", name: "Uzbekistan", display: "Uzbekistan", flag: "🇺🇿", code: "UZB", group: "K" },
  { id: "44", name: "Colombia", display: "Colombia", flag: "🇨🇴", code: "COL", group: "K" },
  { id: "45", name: "England", display: "England", flag: "🏴", code: "ENG", group: "L" },
  { id: "46", name: "Croatia", display: "Croatia", flag: "🇭🇷", code: "CRO", group: "L" },
  { id: "47", name: "Ghana", display: "Ghana", flag: "🇬🇭", code: "GHA", group: "L" },
  { id: "48", name: "Panama", display: "Panama", flag: "🇵🇦", code: "PAN", group: "L" }
];

const assignments = [
  { student: "Yasir", teams: ["New Zealand", "Tunisia"] },
  { student: "Prabhmeet", teams: ["Czech Republic", "Curaçao"] },
  { student: "jenelle", teams: ["Switzerland", "Colombia"] },
  { student: "shahan", teams: ["Morocco", "Japan"] },
  { student: "naba", teams: ["Ivory Coast", "Senegal"] },
  { student: "abeera", teams: ["Spain", "Sweden"] },
  { student: "yaseen", teams: ["Iran", "Netherlands"] },
  { student: "siam", teams: ["United States", "Mexico"] },
  { student: "rylan", teams: ["Egypt", "Democratic Republic of the Congo"] },
  { student: "jahkai", teams: ["Qatar", "Paraguay"] },
  { student: "mr. crean", teams: ["Australia", "France"] },
  { student: "harleen", teams: ["South Africa", "Scotland"] },
  { student: "shaan", teams: ["South Korea", "Portugal"] },
  { student: "ahmed", teams: ["Canada", "Brazil"] },
  { student: "giulia", teams: ["Iraq", "Bosnia and Herzegovina"] },
  { student: "haylee", teams: ["Haiti", "Saudi Arabia"] },
  { student: "aadya", teams: ["Argentina", "Croatia"] },
  { student: "simrat", teams: ["Cape Verde", "Austria"] },
  { student: "manveer", teams: ["Uruguay", "Belgium"] },
  { student: "saif", teams: ["Uzbekistan", "Jordan"] },
  { student: "maryama", teams: ["England", "Algeria"] },
  { student: "garima", teams: ["Ecuador", "Turkey"] },
  { student: "yousuf", teams: ["Norway", "Ghana"] },
  { student: "callum", teams: ["Germany"] },
  { student: "tanushka", teams: ["Panama"] }
];

function seedRow(teamId, mp, w, d, l, pts, gf, ga, gd) {
  return { team_id: String(teamId), mp, w, d, l, pts, gf, ga, gd };
}

const seedPayload = {
  cachedAt: "2026-06-22T11:00:00.000Z",
  groups: [
    { name: "A", teams: [seedRow(1, 2, 2, 0, 0, 6, 3, 0, 3), seedRow(3, 2, 1, 0, 1, 3, 2, 2, 0), seedRow(4, 2, 0, 1, 1, 1, 2, 3, -1), seedRow(2, 2, 0, 1, 1, 1, 1, 3, -2)] },
    { name: "B", teams: [seedRow(5, 2, 1, 1, 0, 4, 7, 1, 6), seedRow(8, 2, 1, 1, 0, 4, 5, 2, 3), seedRow(6, 2, 0, 1, 1, 1, 2, 5, -3), seedRow(7, 2, 0, 1, 1, 1, 1, 7, -6)] },
    { name: "C", teams: [seedRow(9, 2, 1, 1, 0, 4, 4, 1, 3), seedRow(10, 2, 1, 1, 0, 4, 2, 1, 1), seedRow(12, 2, 1, 0, 1, 3, 1, 1, 0), seedRow(11, 2, 0, 0, 2, 0, 0, 4, -4)] },
    { name: "D", teams: [seedRow(13, 2, 2, 0, 0, 6, 6, 1, 5), seedRow(15, 2, 1, 0, 1, 3, 2, 2, 0), seedRow(14, 2, 1, 0, 1, 3, 2, 4, -2), seedRow(16, 2, 0, 0, 2, 0, 0, 3, -3)] },
    { name: "E", teams: [seedRow(17, 2, 2, 0, 0, 6, 9, 2, 7), seedRow(19, 2, 1, 0, 1, 3, 2, 2, 0), seedRow(20, 2, 0, 1, 1, 1, 0, 1, -1), seedRow(18, 2, 0, 1, 1, 1, 1, 7, -6)] },
    { name: "F", teams: [seedRow(21, 2, 1, 1, 0, 4, 7, 3, 4), seedRow(22, 2, 1, 1, 0, 4, 6, 2, 4), seedRow(23, 2, 1, 0, 1, 3, 6, 6, 0), seedRow(24, 2, 0, 0, 2, 0, 1, 9, -8)] },
    { name: "G", teams: [seedRow(26, 2, 1, 1, 0, 4, 4, 2, 2), seedRow(27, 2, 0, 2, 0, 2, 2, 2, 0), seedRow(25, 2, 0, 2, 0, 2, 1, 1, 0), seedRow(28, 2, 0, 1, 1, 1, 3, 5, -2)] },
    { name: "H", teams: [seedRow(29, 2, 1, 1, 0, 4, 4, 0, 4), seedRow(32, 2, 0, 2, 0, 2, 3, 3, 0), seedRow(30, 2, 0, 2, 0, 2, 2, 2, 0), seedRow(31, 2, 0, 1, 1, 1, 1, 5, -4)] },
    { name: "I", teams: [seedRow(33, 1, 1, 0, 0, 3, 3, 1, 2), seedRow(34, 1, 0, 0, 1, 0, 1, 3, -2), seedRow(35, 1, 0, 0, 1, 0, 1, 4, -3), seedRow(36, 1, 1, 0, 0, 3, 4, 1, 3)] },
    { name: "J", teams: [seedRow(37, 1, 1, 0, 0, 3, 3, 0, 3), seedRow(38, 1, 0, 0, 1, 0, 0, 3, -3), seedRow(39, 1, 1, 0, 0, 3, 3, 1, 2), seedRow(40, 1, 0, 0, 1, 0, 1, 3, -2)] },
    { name: "K", teams: [seedRow(41, 1, 0, 1, 0, 1, 1, 1, 0), seedRow(42, 1, 0, 1, 0, 1, 1, 1, 0), seedRow(43, 1, 0, 0, 1, 0, 1, 3, -2), seedRow(44, 1, 1, 0, 0, 3, 3, 1, 2)] },
    { name: "L", teams: [seedRow(45, 1, 1, 0, 0, 3, 4, 2, 2), seedRow(46, 1, 0, 0, 1, 0, 2, 4, -2), seedRow(47, 1, 1, 0, 0, 3, 1, 0, 1), seedRow(48, 1, 0, 0, 1, 0, 0, 1, -1)] }
  ]
};

const teamByName = new Map(teams.flatMap((team) => [
  [team.name.toLowerCase(), team],
  [team.display.toLowerCase(), team]
]));
const teamById = new Map(teams.map((team) => [team.id, team]));

const state = {
  standings: new Map(),
  groups: [],
  lastUpdated: null,
  error: null,
  usingCache: false,
  games: [],
  query: "",
  sort: "points",
  highlight: true
};

const els = {
  apiStatus: document.querySelector("#apiStatus"),
  leaderName: document.querySelector("#leaderName"),
  topPoints: document.querySelector("#topPoints"),
  playedMatches: document.querySelector("#playedMatches"),
  lastUpdated: document.querySelector("#lastUpdated"),
  leftGroups: document.querySelector("#leftGroups"),
  rightGroups: document.querySelector("#rightGroups"),
  pitch: document.querySelector("#pitch"),
  leftMatches: document.querySelector("#leftMatches"),
  rightMatches: document.querySelector("#rightMatches"),
  semiMatches: document.querySelector("#semiMatches"),
  boardLeaderboard: document.querySelector("#boardLeaderboard"),
  leaderboardList: document.querySelector("#leaderboardList"),
  groupTables: document.querySelector("#groupTables"),
  searchInput: document.querySelector("#searchInput"),
  sortSelect: document.querySelector("#sortSelect"),
  highlightToggle: document.querySelector("#highlightToggle"),
  refreshButton: document.querySelector("#refreshButton"),
  replayButton: document.querySelector("#replayButton"),
  printButton: document.querySelector("#printButton"),
  posterFitButton: document.querySelector("#posterFitButton")
};

function parseNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function enrichStanding(row) {
  const team = teamById.get(String(row.team_id));
  return {
    team,
    pts: parseNumber(row.pts),
    mp: parseNumber(row.mp),
    w: parseNumber(row.w),
    d: parseNumber(row.d),
    l: parseNumber(row.l),
    gf: parseNumber(row.gf),
    ga: parseNumber(row.ga),
    gd: parseNumber(row.gd)
  };
}

function defaultStanding(team) {
  return { team, pts: 0, mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0 };
}

function standingForTeam(team) {
  return state.standings.get(team.id) || defaultStanding(team);
}

function assignmentRows() {
  return assignments.map((entry) => {
    const assignedTeams = entry.teams.map((name) => teamByName.get(name.toLowerCase())).filter(Boolean);
    const teamStats = assignedTeams.map((team) => standingForTeam(team));
    return {
      ...entry,
      assignedTeams,
      teamStats,
      points: teamStats.reduce((sum, row) => sum + row.pts, 0),
      played: teamStats.reduce((sum, row) => sum + row.mp, 0),
      gd: teamStats.reduce((sum, row) => sum + row.gd, 0),
      gf: teamStats.reduce((sum, row) => sum + row.gf, 0)
    };
  });
}

function sortRows(rows) {
  const sorted = [...rows];
  if (state.sort === "name") {
    sorted.sort((a, b) => a.student.localeCompare(b.student));
  } else if (state.sort === "teams") {
    sorted.sort((a, b) => b.assignedTeams.length - a.assignedTeams.length || a.student.localeCompare(b.student));
  } else {
    sorted.sort((a, b) => b.points - a.points || b.gd - a.gd || b.gf - a.gf || a.student.localeCompare(b.student));
  }
  return sorted;
}

function filteredRows(rows) {
  const query = state.query.trim().toLowerCase();
  if (!query) return rows;
  return rows.map((row) => {
    const haystack = `${row.student} ${row.assignedTeams.map((team) => team.display).join(" ")}`.toLowerCase();
    return { ...row, dimmed: !haystack.includes(query) };
  });
}

function groupList() {
  const byGroup = new Map();
  teams.forEach((team) => {
    if (!byGroup.has(team.group)) byGroup.set(team.group, []);
    byGroup.get(team.group).push(standingForTeam(team));
  });

  return [...byGroup.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, rows]) => ({
      name,
      rows: rows.sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf || a.team.display.localeCompare(b.team.display))
    }));
}

function renderGroupCard(group) {
  const rows = group.rows.map((row) => `
    <div class="team-row" title="${row.team.display}: ${row.pts} pts, GD ${row.gd}">
      <span>${row.team.flag}</span>
      <strong>${row.team.code} · ${row.team.display}</strong>
      <span class="team-row__pts">${row.pts}</span>
    </div>
  `).join("");

  return `
    <article class="group-card">
      <div class="group-card__title"><span>Group ${group.name}</span><span>Pts</span></div>
      ${rows}
    </article>
  `;
}

function renderGroups() {
  const groups = groupList();
  els.leftGroups.innerHTML = groups.slice(0, 6).map(renderGroupCard).join("");
  els.rightGroups.innerHTML = groups.slice(6).map(renderGroupCard).join("");
}

function renderBracket() {
  const knockoutGames = state.games
    .filter((game) => ["r32", "r16", "qf", "sf", "third", "final"].includes(game.type))
    .sort((a, b) => parseNumber(a.id) - parseNumber(b.id));
  const activeType = knockoutGames.find((game) => !isFinished(game))?.type || "final";
  const focus = bracketFocus(activeType, knockoutGames);

  els.leftMatches.innerHTML = focus.left.map(renderMatchCard).join("");
  els.rightMatches.innerHTML = focus.right.map(renderMatchCard).join("");
  els.semiMatches.innerHTML = focus.centre.map(renderMatchCard).join("");
  els.pitch.dataset.stage = stageName(activeType);
  renderFinalCard(focus.final, activeType);
}

function renderLeaderboard() {
  const rows = filteredRows(sortRows(assignmentRows()));
  const topPoints = Math.max(...rows.map((row) => row.points));
  els.leaderboardList.innerHTML = rows.map((row, index) => {
    const isLeader = state.highlight && row.points === topPoints && !row.dimmed;
    const teamsHtml = row.teamStats.map((standing) => `
      <li>
        <span>${standing.team.flag}</span>
        <span>${standing.team.display}</span>
        <strong>${standing.pts} pts</strong>
      </li>
    `).join("");

    return `
      <article class="student-card ${isLeader ? "is-leader" : ""} ${row.dimmed ? "is-dimmed" : ""}" style="--rank:${index + 1}">
        <div class="student-card__top">
          <div>
            <h3>${row.student}</h3>
            <span>${row.assignedTeams.length} ${row.assignedTeams.length === 1 ? "team" : "teams"} · GD ${row.gd}</span>
          </div>
          <span class="points">${row.points}</span>
        </div>
        <ul class="teams-list">${teamsHtml}</ul>
      </article>
    `;
  }).join("");
}

function renderBoardLeaderboard() {
  const rows = assignmentRows()
    .sort((a, b) => b.points - a.points || b.gd - a.gd || b.gf - a.gf || a.student.localeCompare(b.student))
    .slice(0, 5);
  els.boardLeaderboard.innerHTML = rows.map((row, index) => `
    <div class="board-leaderboard__row ${index === 0 ? "is-top" : ""}">
      <span class="board-leaderboard__rank">${index + 1}</span>
      <strong>${row.student}</strong>
      <span>${row.assignedTeams.map((team) => team.code).join(" / ")}</span>
      <b>${row.points}</b>
    </div>
  `).join("");
}

function isFinished(game) {
  return String(game.finished).toLowerCase() === "true" || String(game.time_elapsed).toLowerCase() === "finished";
}

function stageName(type) {
  return {
    r32: "Round of 32",
    r16: "Round of 16",
    qf: "Quarter-finals",
    sf: "Semi-finals",
    third: "Third place",
    final: "Final"
  }[type] || "Knockout";
}

function shortStageName(type) {
  return {
    r32: "R32",
    r16: "R16",
    qf: "QF",
    sf: "SF",
    third: "3rd",
    final: "Final"
  }[type] || "KO";
}

function gamesByType(games, type) {
  return games.filter((game) => game.type === type);
}

function bracketFocus(activeType, games) {
  const r16 = gamesByType(games, "r16");
  const qf = gamesByType(games, "qf");
  const sf = gamesByType(games, "sf");
  const third = gamesByType(games, "third");
  const final = gamesByType(games, "final");

  if (activeType === "r32") {
    const r32 = gamesByType(games, "r32");
    return { left: r32.slice(0, 8), right: r32.slice(8), centre: r16.slice(0, 4), final: final[0] };
  }
  if (activeType === "r16") {
    return { left: r16.slice(0, 4), right: r16.slice(4), centre: qf, final: final[0] };
  }
  if (activeType === "qf") {
    return { left: qf.slice(0, 2), right: qf.slice(2), centre: sf, final: final[0] };
  }
  if (activeType === "sf") {
    return { left: sf, right: third, centre: final, final: final[0] };
  }
  return { left: sf, right: third, centre: final, final: final[0] };
}

function displayTeam(game, side) {
  const id = side === "home" ? game.home_team_id : game.away_team_id;
  const apiName = game[`${side}_team_name_en`];
  const label = game[`${side}_team_label`];
  const team = teamById.get(String(id));
  if (team && id !== "0") return { flag: team.flag, name: team.display, code: team.code };
  const name = apiName || label || "TBD";
  return { flag: "", name, code: compactLabel(name) };
}

function compactLabel(label) {
  return String(label)
    .replace(/^Winner Match\s+/i, "W")
    .replace(/^Loser Match\s+/i, "L")
    .replace(/^Winner Group\s+/i, "1")
    .replace(/^Runner-up Group\s+/i, "2")
    .replace(/^3rd Group\s+/i, "3");
}

function winnerSide(game) {
  if (!isFinished(game)) return null;
  const homeScore = parseNumber(game.home_score);
  const awayScore = parseNumber(game.away_score);
  if (homeScore > awayScore) return "home";
  if (awayScore > homeScore) return "away";
  const homePens = parseNumber(game.home_penalty_score);
  const awayPens = parseNumber(game.away_penalty_score);
  if (homePens > awayPens) return "home";
  if (awayPens > homePens) return "away";
  return null;
}

function scoreText(game) {
  const score = `${parseNumber(game.home_score)}-${parseNumber(game.away_score)}`;
  if (game.home_penalty_score && game.home_penalty_score !== "null") {
    return `${score} (${parseNumber(game.home_penalty_score)}-${parseNumber(game.away_penalty_score)} pens)`;
  }
  return score;
}

function formatMatchDate(game) {
  const [datePart, timePart = ""] = String(game.local_date || "").split(" ");
  if (!datePart) return "Date TBC";
  const [month, day] = datePart.split("/");
  return `${month}/${day}${timePart ? ` ${timePart}` : ""}`;
}

function renderTeamSlot(game, side) {
  const team = displayTeam(game, side);
  const score = parseNumber(game[`${side}_score`]);
  const isWinner = winnerSide(game) === side;
  return `
    <div class="match-card__team ${isWinner ? "is-winner" : ""}">
      <span>${escapeHtml(team.flag)}</span>
      <strong>${escapeHtml(team.code || team.name)}</strong>
      <b>${isFinished(game) ? score : "-"}</b>
    </div>
  `;
}

function renderMatchCard(game, index) {
  const status = isFinished(game) ? scoreText(game) : formatMatchDate(game);
  return `
    <article class="match-card match-card--${index % 3} ${isFinished(game) ? "is-complete" : "is-upcoming"}">
      <span>${escapeHtml(shortStageName(game.type))} · Match ${escapeHtml(game.id)}</span>
      <strong>${escapeHtml(status)}</strong>
      ${renderTeamSlot(game, "home")}
      ${renderTeamSlot(game, "away")}
    </article>
  `;
}

function renderFinalCard(finalGame, activeType) {
  const rows = assignmentRows()
    .sort((a, b) => b.points - a.points || b.gd - a.gd || b.gf - a.gf || a.student.localeCompare(b.student))
    .slice(0, 3);
  const finalHtml = finalGame ? `
    <div class="final-card__match">
      <span>${escapeHtml(formatMatchDate(finalGame))}</span>
      <strong>${escapeHtml(displayTeam(finalGame, "home").name)} vs ${escapeHtml(displayTeam(finalGame, "away").name)}</strong>
    </div>
  ` : "";

  els.boardLeaderboard.innerHTML = `
    ${finalHtml}
    <div class="board-leaderboard__stage">Active: ${escapeHtml(stageName(activeType))}</div>
    ${rows.map((row, index) => `
      <div class="board-leaderboard__row ${index === 0 ? "is-top" : ""}">
        <span class="board-leaderboard__rank">${index + 1}</span>
        <strong>${escapeHtml(row.student)}</strong>
        <span>${escapeHtml(row.assignedTeams.map((team) => team.code).join(" / "))}</span>
        <b>${row.points}</b>
      </div>
    `).join("")}
  `;
}

function renderGroupTables() {
  els.groupTables.innerHTML = groupList().map((group) => `
    <article class="table-card">
      <h3>Group ${group.name}</h3>
      <table>
        <thead>
          <tr><th>Team</th><th>MP</th><th>W</th><th>D</th><th>L</th><th>GD</th><th>Pts</th></tr>
        </thead>
        <tbody>
          ${group.rows.map((row) => `
            <tr>
              <td>${row.team.flag} ${row.team.display}</td>
              <td>${row.mp}</td>
              <td>${row.w}</td>
              <td>${row.d}</td>
              <td>${row.l}</td>
              <td>${row.gd}</td>
              <td><strong>${row.pts}</strong></td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </article>
  `).join("");
}

function renderMetrics() {
  const rows = sortRows(assignmentRows());
  const leader = rows[0];
  const played = teams.reduce((sum, team) => sum + standingForTeam(team).mp, 0);

  els.leaderName.textContent = leader ? leader.student : "-";
  els.topPoints.textContent = leader ? leader.points : "-";
  els.playedMatches.textContent = played;
  els.lastUpdated.textContent = state.lastUpdated
    ? state.lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "Offline";
}

function updateStatus() {
  els.apiStatus.classList.toggle("is-live", !state.error && Boolean(state.lastUpdated));
  els.apiStatus.classList.toggle("is-error", Boolean(state.error) && !state.usingCache);
  if (state.error && state.usingCache) {
    els.apiStatus.textContent = "Using cached live data";
  } else if (state.error) {
    els.apiStatus.textContent = "Live data unavailable";
  } else if (state.lastUpdated) {
    els.apiStatus.textContent = "Live data connected";
  } else {
    els.apiStatus.textContent = "Connecting...";
  }
}

function render() {
  renderGroups();
  renderBracket();
  renderLeaderboard();
  renderGroupTables();
  renderMetrics();
  updateStatus();
}

function applyGroupsPayload(payload, fromCache = false) {
  const groups = Array.isArray(payload.groups) ? payload.groups : [];
  const nextStandings = new Map();
  groups.forEach((group) => {
    (group.teams || []).forEach((row) => {
      const enriched = enrichStanding(row);
      if (enriched.team) nextStandings.set(enriched.team.id, enriched);
    });
  });
  state.groups = groups;
  state.standings = nextStandings;
  state.lastUpdated = payload.cachedAt ? new Date(payload.cachedAt) : new Date();
  state.usingCache = fromCache;
}

function loadCachedStandings() {
  try {
    const cached = JSON.parse(window.localStorage.getItem(CACHE_KEY) || "null");
    if (cached?.groups) {
      applyGroupsPayload(cached, true);
      return;
    }
  } catch (error) {
    console.warn("Unable to load cached standings", error);
  }
  applyGroupsPayload(seedPayload, true);
}

function saveCachedStandings(payload) {
  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify({
      groups: payload.groups,
      cachedAt: new Date().toISOString()
    }));
  } catch (error) {
    console.warn("Unable to save cached standings", error);
  }
}

async function requestGroups() {
  const response = await fetch(`${API_BASE}/get/groups`, { cache: "no-store" });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

async function requestGames() {
  const response = await fetch(`${API_BASE}/get/games`, { cache: "no-store" });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

async function fetchLiveStandings() {
  state.error = null;
  state.usingCache = false;
  updateStatus();

  try {
    let payload;
    try {
      payload = await requestGroups();
    } catch (firstError) {
      await new Promise((resolve) => window.setTimeout(resolve, 1200));
      payload = await requestGroups();
    }
    const gamesPayload = await requestGames();
    applyGroupsPayload(payload, false);
    state.games = Array.isArray(gamesPayload.games) ? gamesPayload.games : [];
    saveCachedStandings(payload);
    saveCachedGames(gamesPayload);
  } catch (error) {
    state.error = error;
    loadCachedStandings();
    loadCachedGames();
    console.error("Unable to fetch live standings", error);
  }

  render();
}

function loadCachedGames() {
  try {
    const cached = JSON.parse(window.localStorage.getItem(GAMES_CACHE_KEY) || "null");
    if (cached?.games) {
      state.games = cached.games;
      return;
    }
  } catch (error) {
    console.warn("Unable to load cached games", error);
  }
  state.games = [];
}

function saveCachedGames(payload) {
  try {
    window.localStorage.setItem(GAMES_CACHE_KEY, JSON.stringify({
      games: payload.games,
      cachedAt: new Date().toISOString()
    }));
  } catch (error) {
    console.warn("Unable to save cached games", error);
  }
}

function wireEvents() {
  els.searchInput.addEventListener("input", (event) => {
    state.query = event.target.value;
    renderLeaderboard();
  });

  els.sortSelect.addEventListener("change", (event) => {
    state.sort = event.target.value;
    renderLeaderboard();
  });

  els.highlightToggle.addEventListener("change", (event) => {
    state.highlight = event.target.checked;
    renderLeaderboard();
  });

  els.refreshButton.addEventListener("click", fetchLiveStandings);
  els.printButton.addEventListener("click", () => window.print());
  els.replayButton.addEventListener("click", () => {
    document.body.classList.remove("replay");
    window.requestAnimationFrame(() => {
      document.body.classList.add("replay");
      window.setTimeout(() => document.body.classList.remove("replay"), 900);
    });
  });

  els.posterFitButton.hidden = true;
}

wireEvents();
loadCachedStandings();
loadCachedGames();
els.pitch.classList.add("is-groups-collapsed");
render();
fetchLiveStandings();
window.setInterval(fetchLiveStandings, REFRESH_MS);
