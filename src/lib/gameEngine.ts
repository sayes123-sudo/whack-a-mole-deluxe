import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { INITIAL_LIVES, LEVELS, STORAGE_KEYS } from './gameConfig';
import type { GameCellFeedback, GameCellState, GameEntity, GameSettings, GameState, LevelConfig } from '@/types/game';
import { loadHighScore, loadSettings, saveHighScore, saveSettings, subscribeToLocalStorage } from './storage';
import { makeAudioContext } from './sound';

const DEFAULT_SETTINGS: GameSettings = { mute: false };
const FEEDBACK_MS = 420;

const createCells = (config: LevelConfig): GameCellState[] =>
  Array.from({ length: config.rows * config.columns }, (_, id) => ({ id, entity: 'empty' }));

const getLevelConfig = (level: number): LevelConfig =>
  LEVELS.find((item) => item.level === level) ?? LEVELS[LEVELS.length - 1];

const pickEntity = (config: LevelConfig): GameEntity => {
  const roll = Math.random();
  if (roll < config.bombChance) return 'bomb';
  if (roll < config.bombChance + config.goldenChance) return 'golden-mole';
  if (roll < config.bombChance + config.goldenChance + config.timeBonusChance) return 'time-bonus';
  return 'mole';
};

const comboMultiplier = (combo: number): number => {
  if (combo >= 10) return 2;
  if (combo >= 6) return 1.5;
  if (combo >= 3) return 1.2;
  return 1;
};

const feedbackForEntity = (entity: GameEntity): GameCellFeedback => {
  if (entity === 'bomb') return 'bomb';
  if (entity === 'golden-mole' || entity === 'time-bonus') return 'bonus';
  return 'hit';
};

const highScoreSnapshot = () => String(loadHighScore(STORAGE_KEYS.highScore, 0));
const settingsSnapshot = () => JSON.stringify(loadSettings<GameSettings>(STORAGE_KEYS.settings, DEFAULT_SETTINGS));

export function useGameEngine() {
  const storedHighScore = Number(useSyncExternalStore(subscribeToLocalStorage, highScoreSnapshot, () => '0'));
  const settings = JSON.parse(useSyncExternalStore(subscribeToLocalStorage, settingsSnapshot, () => JSON.stringify(DEFAULT_SETTINGS))) as GameSettings;
  const [state, setState] = useState<GameState>(() => {
    const initialConfig = getLevelConfig(1);
    return {
      status: 'menu',
      score: 0,
      highScore: 0,
      combo: 0,
      lives: INITIAL_LIVES,
      timeLeft: initialConfig.durationSeconds,
      currentLevel: initialConfig.level,
      soundOn: true,
    };
  });
  const [cells, setCells] = useState<GameCellState[]>(() => createCells(getLevelConfig(1)));
  const tickRef = useRef<number | null>(null);
  const spawnRef = useRef<number | null>(null);
  const stateRef = useRef<GameState>(state);
  const cellsRef = useRef<GameCellState[]>(cells);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    stateRef.current = { ...state, highScore: Math.max(state.highScore, storedHighScore), soundOn: !settings.mute };
  }, [settings.mute, state, storedHighScore]);

  useEffect(() => {
    cellsRef.current = cells;
  }, [cells]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioContextRef.current = makeAudioContext();
    }
  }, []);

  const clearIntervals = useCallback(() => {
    if (tickRef.current !== null) {
      window.clearInterval(tickRef.current);
      tickRef.current = null;
    }
    if (spawnRef.current !== null) {
      window.clearInterval(spawnRef.current);
      spawnRef.current = null;
    }
  }, []);

  useEffect(() => clearIntervals, [clearIntervals]);

  const currentConfig = useMemo(() => getLevelConfig(state.currentLevel), [state.currentLevel]);

  const markFeedback = useCallback((index: number, feedback: GameCellFeedback, feedbackEntity: GameEntity = 'empty') => {
    setCells((current) => {
      const next = current.slice();
      if (next[index]) {
        next[index] = { id: index, entity: 'empty', feedback, feedbackEntity };
      }
      return next;
    });

    window.setTimeout(() => {
      setCells((current) => {
        const next = current.slice();
        if (next[index]?.feedback === feedback) {
          next[index] = { id: index, entity: 'empty' };
        }
        return next;
      });
    }, FEEDBACK_MS);
  }, []);

  const spawnOnce = useCallback((config: LevelConfig) => {
    if (stateRef.current.status !== 'playing') return;

    setCells((current) => {
      const available = current.filter((cell) => cell.entity === 'empty' && !cell.feedback);
      if (available.length === 0) return current;

      const selected = available[Math.floor(Math.random() * available.length)];
      const expiresAt = Date.now() + config.moleLifetimeMs;
      const next = current.slice();
      next[selected.id] = { id: selected.id, entity: pickEntity(config), expiresAt };

      window.setTimeout(() => {
        setCells((latest) => {
          const copy = latest.slice();
          if (copy[selected.id]?.expiresAt === expiresAt) {
            copy[selected.id] = { id: selected.id, entity: 'empty' };
          }
          return copy;
        });
      }, config.moleLifetimeMs);

      return next;
    });
  }, []);

  const startTimers = useCallback(
    (config: LevelConfig) => {
      clearIntervals();

      window.setTimeout(() => spawnOnce(config), 180);
      tickRef.current = window.setInterval(() => {
        setState((previous) => {
          if (previous.status !== 'playing') return previous;
          const timeLeft = Math.max(0, previous.timeLeft - 1);
          const status = timeLeft === 0 ? (previous.score >= config.targetScore ? 'won' : 'lost') : previous.status;
          return { ...previous, timeLeft, status };
        });
      }, 1000);

      spawnRef.current = window.setInterval(() => spawnOnce(config), config.spawnMs);
    },
    [clearIntervals, spawnOnce],
  );

  const beginLevel = useCallback(
    (level: number, score: number) => {
      const config = getLevelConfig(level);
      clearIntervals();
      setCells(createCells(config));
      setState((previous) => ({
        ...previous,
        status: 'playing',
        score,
        combo: 0,
        lives: INITIAL_LIVES,
        timeLeft: config.durationSeconds,
        currentLevel: config.level,
      }));
    },
    [clearIntervals],
  );

  const selectLevel = useCallback(
    (level: number) => {
      const config = getLevelConfig(level);
      clearIntervals();
      setCells(createCells(config));
      setState((previous) => ({
        ...previous,
        status: 'menu',
        score: 0,
        combo: 0,
        lives: INITIAL_LIVES,
        timeLeft: config.durationSeconds,
        currentLevel: config.level,
      }));
    },
    [clearIntervals],
  );

  const initLevel = useCallback(
    (level = 1) => {
      beginLevel(level, 0);
    },
    [beginLevel],
  );

  const pauseGame = useCallback(() => {
    if (stateRef.current.status !== 'playing') return;
    clearIntervals();
    setState((previous) => ({ ...previous, status: 'paused' }));
  }, [clearIntervals]);

  const resumeGame = useCallback(() => {
    if (stateRef.current.status !== 'paused') return;
    setState((previous) => ({ ...previous, status: 'playing' }));
  }, []);

  const restartLevel = useCallback(() => {
    beginLevel(stateRef.current.currentLevel, 0);
  }, [beginLevel]);

  const nextLevel = useCallback(() => {
    const next = stateRef.current.currentLevel + 1;
    if (next > LEVELS.length) {
      clearIntervals();
      setState((previous) => ({ ...previous, status: 'game-over' }));
      return;
    }

    beginLevel(next, stateRef.current.score);
  }, [beginLevel, clearIntervals]);

  const toggleMute = useCallback(() => {
    const next = { mute: !settings.mute };
    saveSettings(STORAGE_KEYS.settings, next);
  }, [settings.mute]);

  const hitCell = useCallback(
    (index: number) => {
      if (stateRef.current.status !== 'playing') return;

      const cell = cellsRef.current[index];
      if (!cell) return;

      if (cell.entity === 'empty') {
        markFeedback(index, 'miss');
        setState((previous) => ({ ...previous, combo: 0 }));
        return;
      }

      const entity = cell.entity;
      markFeedback(index, feedbackForEntity(entity), entity);

      setState((previous) => {
        const config = getLevelConfig(previous.currentLevel);
        let score = previous.score;
        let combo = previous.combo;
        let lives = previous.lives;
        let timeLeft = previous.timeLeft;
        let status = previous.status;

        if (entity === 'mole') {
          combo += 1;
          score += Math.round(10 * comboMultiplier(combo));
        } else if (entity === 'golden-mole') {
          combo += 1;
          score += Math.round(50 * comboMultiplier(combo));
        } else if (entity === 'time-bonus') {
          combo += 1;
          score += Math.round(15 * comboMultiplier(combo));
          timeLeft = Math.min(config.durationSeconds + 8, timeLeft + 3);
        } else if (entity === 'bomb') {
          combo = 0;
          lives = Math.max(0, lives - 1);
          score = Math.max(0, score - 30);
        }

        if (lives === 0) {
          status = 'lost';
        } else if (score >= config.targetScore) {
          status = 'won';
        }

        const highScore = Math.max(previous.highScore, storedHighScore, score);
        if (highScore > storedHighScore) {
          saveHighScore(STORAGE_KEYS.highScore, highScore);
        }

        return { ...previous, score, combo, lives, timeLeft, status, highScore };
      });
    },
    [markFeedback, storedHighScore],
  );

  const derivedState = useMemo<GameState>(
    () => ({ ...state, highScore: Math.max(state.highScore, storedHighScore), soundOn: !settings.mute }),
    [settings.mute, state, storedHighScore],
  );

  useEffect(() => {
    if (state.status !== 'playing') return;
    startTimers(getLevelConfig(state.currentLevel));
    return clearIntervals;
  }, [clearIntervals, startTimers, state.currentLevel, state.status]);

  return {
    state: derivedState,
    settings,
    cells,
    currentConfig,
    initLevel,
    selectLevel,
    pauseGame,
    resumeGame,
    restartLevel,
    nextLevel,
    hitCell,
    toggleMute,
    isLastLevel: state.currentLevel >= LEVELS.length,
    audioContextRef,
  };
}
