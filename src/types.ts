export type Match = {
  id: string
  home: string
  away: string
  arena: string
  homeScore: number
  homeCorners: number
  homeShots: number
  homeFouls: number
  awayScore: number
  awayCorners: number
  awayShots: number
  awayFouls: number
  time: number
  showCorners?: boolean;
  showShots?: boolean;
  showFouls?: boolean;
}
