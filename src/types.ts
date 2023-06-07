export type Match = {
  id: string;
  home: TeamStat;
  away: TeamStat;
  arena: string;
  time: number;
  showCorners?: boolean;
  showShots?: boolean;
  showFouls?: boolean;
  showPenalties?: boolean;
  notes?: string;
};

export type TeamStat = {
  team: string;
  score: number;
  corners: number;
  shots: number;
  fouls: number;
  penalties: number;
};
