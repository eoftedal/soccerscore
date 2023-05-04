import type { Match } from './types'

export function getIndex(): string[] {
  const index = localStorage.getItem('index')
  if (index) return JSON.parse(index) as string[]
  return []
}

export function getMatch(id: string): Match {
  const match = localStorage.getItem(id)
  if (!match) throw new Error("No such match");
  return JSON.parse(match) as Match
}

export function saveMatch(match: Match) {
  const index = getIndex()
  if (!index.includes(match.id)) {
    index.push(match.id)
    localStorage.setItem('index', JSON.stringify(index))
  }
  localStorage.setItem(match.id, JSON.stringify(match))
}

export function newMatch(): Match {
  const match = {
    id: Date.now().toString(),
    home: 'Stabæk',
    away: 'Bortelag',
    homeScore: 0,
    awayScore: 0,
    time: Date.now(),
    awayCorners: 0,
    homeCorners: 0,
    awayShots: 0,
    homeShots: 0
  }
  saveMatch(match)
  return match
}
