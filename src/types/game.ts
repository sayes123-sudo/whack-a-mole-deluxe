export type GameEntity = "mole" | "golden-mole" | "bomb" | "time-bonus" | "empty";

export type Difficulty = "easy" | "normal" | "hard" | "expert";

export type GameCellFeedback = "hit" | "bonus" | "bomb" | "miss";

export interface LevelConfig {
  level: number;
  rows: number;
  columns: number;
  durationSeconds: number;
  targetScore: number;
  spawnMs: number;
  moleLifetimeMs: number;
  bombChance: number;
  goldenChance: number;
  timeBonusChance: number;
}

export interface GameCellState {
  id: number;
  entity: GameEntity;
  expiresAt?: number;
  feedback?: GameCellFeedback;
  feedbackEntity?: GameEntity;
}

export interface GameSettings {
  mute: boolean;
}

export type LeaderboardOutcome = "won" | "lost" | "game-over";

export interface LeaderboardEntry {
  id: string;
  playerName: string;
  score: number;
  level: number;
  outcome: LeaderboardOutcome;
  timeLeft: number;
  createdAt: string;
}

export interface GameState {
  status: "menu" | "playing" | "paused" | "won" | "lost" | "game-over";
  score: number;
  highScore: number;
  combo: number;
  lives: number;
  timeLeft: number;
  currentLevel: number;
  soundOn: boolean;
}
