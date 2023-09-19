import type { Match, TeamStat } from './types';

export function getIndex(): string[] {
  const index = localStorage.getItem('index');
  if (index) return JSON.parse(index) as string[];
  return [];
}

export function getMatch(id: string): Match {
  const match = localStorage.getItem(id);
  if (!match) throw new Error('No such match');
  const r = JSON.parse(match);
  if (typeof r.home == 'string') {
    const h: TeamStat = {
      team: r.home,
      score: r.homeScore,
      corners: r.homeCorners,
      shots: r.homeShots,
      fouls: r.homeFouls,
      penalties: 0
    };
    const a: TeamStat = {
      team: r.away,
      score: r.awayScore,
      corners: r.awayCorners,
      shots: r.awayShots,
      fouls: r.awayFouls,
      penalties: 0
    };
    r.home = h;
    r.away = a;
    const nm: Match = {
      id: r.id,
      home: h,
      away: a,
      arena: r.arena,
      time: r.time,
      showCorners: r.showCorners,
      showShots: r.showShots,
      showFouls: r.showFouls
    };
    saveMatch(nm);
    return nm;
  }
  return r as Match;
}

export function saveMatch(match: Match) {
  const index = getIndex();
  if (!index.includes(match.id)) {
    index.push(match.id);
    localStorage.setItem('index', JSON.stringify(index));
  }
  localStorage.setItem(match.id, JSON.stringify(match));
}

export function newMatch(): Match {
  const match = {
    id: Date.now().toString(),
    arena: 'Nadderud kunstgress 2',
    home: {
      team: 'Stabæk',
      score: 0,
      corners: 0,
      shots: 0,
      fouls: 0,
      penalties: 0,
      yellowCards: 0,
      redCards: 0
    },
    away: {
      team: 'Bortelag',
      score: 0,
      corners: 0,
      shots: 0,
      fouls: 0,
      penalties: 0,
      yellowCards: 0,
      redCards: 0
    },
    time: Date.now()
  };
  saveMatch(match);
  return match;
}
