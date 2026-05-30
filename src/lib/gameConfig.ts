import type { LevelConfig } from "@/types/game";

export const INITIAL_LIVES = 3;
export const STORAGE_KEYS = {
  highScore: "whack-a-mole-deluxe-high-score",
  leaderboard: "whack-a-mole-deluxe-leaderboard",
  settings: "whack-a-mole-deluxe-settings",
};

export const LEVELS: LevelConfig[] = [
  { level: 1, rows: 3, columns: 3, durationSeconds: 30, targetScore: 180, spawnMs: 880, moleLifetimeMs: 1150, bombChance: 0.08, goldenChance: 0.08, timeBonusChance: 0.04 },
  { level: 2, rows: 3, columns: 4, durationSeconds: 35, targetScore: 420, spawnMs: 760, moleLifetimeMs: 980, bombChance: 0.12, goldenChance: 0.10, timeBonusChance: 0.04 },
  { level: 3, rows: 4, columns: 4, durationSeconds: 40, targetScore: 760, spawnMs: 640, moleLifetimeMs: 820, bombChance: 0.16, goldenChance: 0.12, timeBonusChance: 0.03 },
  { level: 4, rows: 4, columns: 5, durationSeconds: 45, targetScore: 1180, spawnMs: 540, moleLifetimeMs: 720, bombChance: 0.18, goldenChance: 0.13, timeBonusChance: 0.03 },
];
