import { STORAGE_KEYS } from '@/lib/gameConfig';
import { notifyLocalStorageChange } from '@/lib/storage';
import type { LeaderboardEntry, LeaderboardOutcome } from '@/types/game';

export const LEADERBOARD_LIMIT = 8;

export const outcomeLabels: Record<LeaderboardOutcome, string> = {
  won: '關卡達成',
  lost: '挑戰結束',
  'game-over': '完全通關',
};

const isEntry = (value: unknown): value is LeaderboardEntry => {
  if (!value || typeof value !== 'object') return false;
  const item = value as Partial<LeaderboardEntry>;
  return (
    typeof item.id === 'string' &&
    typeof item.score === 'number' &&
    typeof item.level === 'number' &&
    typeof item.timeLeft === 'number' &&
    typeof item.createdAt === 'string' &&
    (item.outcome === 'won' || item.outcome === 'lost' || item.outcome === 'game-over')
  );
};

export const sortLeaderboard = (entries: LeaderboardEntry[]): LeaderboardEntry[] =>
  [...entries]
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (b.level !== a.level) return b.level - a.level;
      if (b.timeLeft !== a.timeLeft) return b.timeLeft - a.timeLeft;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })
    .slice(0, LEADERBOARD_LIMIT);

export const loadLeaderboard = (): LeaderboardEntry[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.leaderboard);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return sortLeaderboard(parsed.filter(isEntry));
  } catch {
    return [];
  }
};

export const saveLeaderboardEntry = (entry: Omit<LeaderboardEntry, 'id' | 'createdAt'>): LeaderboardEntry | null => {
  try {
    const savedEntry: LeaderboardEntry = {
      ...entry,
      id: `${Date.now()}-${Math.round(Math.random() * 100000)}`,
      createdAt: new Date().toISOString(),
    };
    const entries = sortLeaderboard([savedEntry, ...loadLeaderboard()]);
    localStorage.setItem(STORAGE_KEYS.leaderboard, JSON.stringify(entries));
    notifyLocalStorageChange();
    return savedEntry;
  } catch {
    return null;
  }
};

export const clearLeaderboard = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.leaderboard);
    notifyLocalStorageChange();
  } catch {
    // LocalStorage can be unavailable in privacy-restricted browsers.
  }
};
