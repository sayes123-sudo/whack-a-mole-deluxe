"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useGameEngine } from '@/lib/gameEngine';
import GameBoard from '@/components/game/GameBoard';
import GameHud from '@/components/game/GameHud';
import GameOverModal from '@/components/game/GameOverModal';
import LeaderboardPanel from '@/components/game/LeaderboardPanel';
import LevelRoadmap from '@/components/game/LevelRoadmap';
import PauseOverlay from '@/components/game/PauseOverlay';
import PlayerNameForm from '@/components/game/PlayerNameForm';
import ScoreGuide from '@/components/game/ScoreGuide';
import SettingsPanel from '@/components/game/SettingsPanel';
import { LEVELS } from '@/lib/gameConfig';
import { saveLeaderboardEntry } from '@/lib/leaderboard';
import ArcadeButton from '@/components/ui/ArcadeButton';
import { playBomb, playClick, playCombo, playGameOver, playLevelClear, playWarning } from '@/lib/sound';
import type { LeaderboardOutcome } from '@/types/game';

export default function GamePage() {
  const engine = useGameEngine();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const config = engine.currentConfig;
  const status = engine.state.status;
  const { initLevel, nextLevel, selectLevel } = engine;
  const isPaused = engine.state.status === 'paused';
  const prevTimeRef = useRef(engine.state.timeLeft);
  const recordedResultRef = useRef<string | null>(null);

  useEffect(() => {
    if (!engine.state.soundOn) return;
    if (engine.state.status === 'won') {
      playLevelClear(engine.audioContextRef.current);
    } else if (engine.state.status === 'lost' || engine.state.status === 'game-over') {
      playGameOver(engine.audioContextRef.current);
    }
  }, [engine.state.status, engine.state.soundOn, engine.audioContextRef]);

  useEffect(() => {
    if (!engine.state.soundOn) return;
    if (engine.state.timeLeft <= 5 && prevTimeRef.current > 5) {
      playWarning(engine.audioContextRef.current);
    }
    prevTimeRef.current = engine.state.timeLeft;
  }, [engine.state.timeLeft, engine.state.soundOn, engine.audioContextRef]);

  useEffect(() => {
    if (status === 'playing') {
      recordedResultRef.current = null;
      return;
    }

    if (status !== 'won' && status !== 'lost' && status !== 'game-over') return;
    if (engine.state.score <= 0) return;

    const recordKey = `${status}-${engine.state.currentLevel}-${engine.state.score}-${engine.state.timeLeft}`;
    if (recordedResultRef.current === recordKey) return;

    recordedResultRef.current = recordKey;
    saveLeaderboardEntry({
      score: engine.state.score,
      level: engine.state.currentLevel,
      outcome: status as LeaderboardOutcome,
      timeLeft: engine.state.timeLeft,
    });
  }, [engine.state.currentLevel, engine.state.score, engine.state.timeLeft, status]);

  const statusLabel = useMemo(() => {
    if (engine.state.status === 'won') return '關卡達成！';
    if (engine.state.status === 'lost') return '遊戲結束';
    if (engine.state.status === 'paused') return '暫停中';
    if (engine.state.status === 'playing') return '戰鬥中';
    return '選擇關卡';
  }, [engine.state.status]);

  const levelLabels = ['初階', '中階', '高階', '專家'];

  const primaryAction = useMemo(() => {
    if (status === 'won') {
      return {
        label: engine.isLastLevel ? '完成' : '下一關',
        disabled: engine.isLastLevel,
        onClick: engine.isLastLevel ? undefined : nextLevel,
      };
    }

    if (status === 'lost' || status === 'game-over') {
      return {
        label: '重新開始',
        disabled: false,
        onClick: () => initLevel(status === 'game-over' ? 1 : engine.state.currentLevel),
      };
    }

    return {
      label: '開始',
      disabled: status === 'playing' || status === 'paused',
      onClick: () => initLevel(engine.state.currentLevel),
    };
  }, [engine.isLastLevel, engine.state.currentLevel, initLevel, nextLevel, status]);

  const handleHit = (index: number) => {
    const entity = engine.hitCell(index);
    if (engine.state.soundOn) {
      if (entity === 'bomb') playBomb(engine.audioContextRef.current);
      else if (entity === 'mole' || entity === 'golden-mole') playClick(engine.audioContextRef.current);
      else if (entity === 'time-bonus') playCombo(engine.audioContextRef.current);
    }
  };

  return (
    <main className="game-screen relative min-h-screen overflow-x-hidden text-white">
      <div className="game-layout relative z-10 mx-auto grid w-full max-w-7xl gap-4 px-3 py-4 sm:px-5 lg:py-6">
        <section className="game-arena">
          <div className="game-topbar">
            <div>
              <p className="game-kicker">地鼠大作戰 Deluxe</p>
              <h1 className="game-title">LEVEL {engine.state.currentLevel} · {statusLabel}</h1>
            </div>
          </div>

          <div className="game-control-strip">
            <div className="level-tabs" aria-label="選擇關卡難易度">
              {LEVELS.map((level) => (
                <button
                  type="button"
                  key={level.level}
                  disabled={engine.state.status === 'playing' || engine.state.status === 'paused'}
                  className={level.level === engine.state.currentLevel ? 'level-tab level-tab-active' : 'level-tab'}
                  onClick={() => selectLevel(level.level)}
                >
                  {levelLabels[level.level - 1]}
                </button>
              ))}
            </div>
            <div className="game-start-score">
              <ArcadeButton
                onClick={primaryAction.onClick}
                className="game-start-button"
                disabled={primaryAction.disabled}
              >
                {primaryAction.label}
              </ArcadeButton>
              <div className="top-score-card">
                <span>目前分數</span>
                <strong>{engine.state.score}</strong>
              </div>
            </div>
          </div>

          <div className="game-playfield">
            <GameBoard rows={config.rows} columns={config.columns} cells={engine.cells} onHit={handleHit} />
          </div>
          <LevelRoadmap currentLevel={engine.state.currentLevel} />

          <div className="game-details">
            <div className="game-hud-panel">
              <GameHud
                score={engine.state.score}
                highScore={engine.state.highScore}
                timeLeft={engine.state.timeLeft}
                lives={engine.state.lives}
                combo={engine.state.combo}
                level={engine.state.currentLevel}
                targetScore={config.targetScore}
              />
            </div>

            <aside className="game-info-grid">
              <div className="game-side-panel">
                <PlayerNameForm compact />
              </div>
              <div className="game-side-panel">
                <p className="side-title">遊戲控制</p>
                <div className="game-secondary-actions">
                  <button type="button" onClick={engine.restartLevel} className="game-plain-button">
                    重開本關
                  </button>
                  {engine.state.status === 'playing' ? (
                    <button type="button" onClick={engine.pauseGame} className="game-plain-button">
                      暫停
                    </button>
                  ) : engine.state.status === 'paused' ? (
                    <button type="button" onClick={engine.resumeGame} className="game-plain-button">
                      繼續
                    </button>
                  ) : null}
                  <button type="button" onClick={() => setSettingsOpen(true)} className="game-plain-button">
                    設定
                  </button>
                </div>
              </div>
              <div className="game-side-panel">
                <p className="side-title">任務資訊</p>
                <div className="side-list">
                  <p>版面：{config.rows} x {config.columns}</p>
                  <p>目標：{config.targetScore} 分</p>
                  <p>倒數：{config.durationSeconds} 秒</p>
                  <p>炸彈機率：{Math.round(config.bombChance * 100)}%</p>
                </div>
              </div>
              <div className="game-side-panel">
                <p className="side-title">分數圖鑑</p>
                <ScoreGuide compact />
              </div>
              <LeaderboardPanel compact />
              <div className="game-side-panel">
                <p className="side-title">遊戲說明</p>
                <p className="side-copy">
                  點擊加分目標、避開炸彈與空洞。達成目標分數即可過關；生命歸零或時間到未達標就失敗。
                </p>
                <p className="side-copy side-copy-strong">連續命中會累積 Combo，分數倍率會逐步提高。</p>
              </div>
              <Link href="/" className="game-menu-link">
                返回主選單
              </Link>
            </aside>
          </div>
        </section>
      </div>

      {isPaused && <PauseOverlay onResume={engine.resumeGame} onRestart={engine.restartLevel} />}
      {(engine.state.status === 'won' || engine.state.status === 'lost' || engine.state.status === 'game-over') && (
        <GameOverModal
          status={engine.state.status === 'game-over' ? 'game-over' : engine.state.status}
          score={engine.state.score}
          targetScore={config.targetScore}
          timeLeft={engine.state.timeLeft}
          currentLevel={engine.state.currentLevel}
          isFinalLevel={engine.isLastLevel}
          onRestart={engine.restartLevel}
          onNextLevel={engine.nextLevel}
          onMenu={() => (window.location.href = '/')}
        />
      )}
      <SettingsPanel isOpen={settingsOpen} soundOn={engine.state.soundOn} onClose={() => setSettingsOpen(false)} onToggleSound={engine.toggleMute} />
    </main>
  );
}
