export type Difficulty = 'EASY' | 'NORMAL' | 'HARD';
export type GameMode = 'CLASSIC' | 'ENDLESS';

export interface Question {
  q: string;
  a: string[];
  c: number; // Correct index
  lesson: string;
}

export interface PlayerStats {
  energy: number;
  social: number;
  score: number;
}

export interface LeaderboardEntry {
  name: string;
  score: number;
  date: string;
}

export interface GameConfig {
  difficulty: Difficulty;
  mode: GameMode;
  lockerCount: number;
  timePerQuestion: number; // in seconds
  energyPenalty: number;
  socialPenalty: number;
}
