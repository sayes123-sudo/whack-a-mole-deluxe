"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useGameEngine } from '@/lib/gameEngine';
import GameBoard from '@/components/game/GameBoard';
import GameHud from '@/components/game/GameHud';
import GameOverModal from '@/components/game/GameOverModal';
import PauseOverlay from '@/components/game/PauseOverlay';
import ScoreGuide from '@/components/game/ScoreGuide';
import SettingsPanel from '@/components/game/SettingsPanel';
import ArcadeButton from '@/components/ui/ArcadeButton';
import { playBomb, playClick, playCombo, playGameOver, playLevelClear, playWarning } from '@/lib/sound';

export default function GamePage() {
  const engine = useGameEngine();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const config = engine.currentConfig;
  const status = engine.state.status;
  const { initLevel } = engine;
  const isPaused = engine.state.status === 'paused';
  const prevTimeRef = useRef(engine.state.timeLeft);
  const hasStartedRef = useRef(false);

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
    if (status === 'menu' && !hasStartedRef.current) {
      hasStartedRef.current = true;
      initLevel(1);
    }
  }, [status, initLevel]);

  const statusLabel = useMemo(() => {
    if (engine.state.status === 'won') return '關卡達成！';
    if (engine.state.status === 'lost') return '遊戲結束';
    if (engine.state.status === 'paused') return '暫停中';
    if (engine.state.status === 'playing') return '戰鬥中';
    return '準備就緒';
  }, [engine.state.status]);

  const handleHit = (index: number) => {
    const cell = engine.cells[index];
    if (!cell) return;
    engine.hitCell(index);
    if (engine.state.soundOn) {
      if (cell.entity === 'bomb') playBomb(engine.audioContextRef.current);
      else if (cell.entity === 'mole' || cell.entity === 'golden-mole') playClick(engine.audioContextRef.current);
      else if (cell.entity === 'time-bonus') playCombo(engine.audioContextRef.current);
    }
  };

  return (
    <main className="game-screen relative min-h-screen overflow-hidden text-white">
      <div className="game-layout relative z-10 mx-auto grid w-full max-w-7xl gap-4 px-3 py-4 sm:px-5 lg:py-6">
        <section className="game-arena">
          <div className="game-topbar">
            <div>
              <p className="game-kicker">地鼠大作戰 Deluxe</p>
              <h1 className="game-title">LEVEL {engine.state.currentLevel} · {statusLabel}</h1>
            </div>
            <div className="game-actions">
              {engine.state.status === 'playing' ? (
                <ArcadeButton onClick={engine.pauseGame} className="min-w-0 px-5 py-3 text-sm">暫停</ArcadeButton>
              ) : engine.state.status === 'paused' ? (
                <ArcadeButton onClick={engine.resumeGame} className="min-w-0 px-5 py-3 text-sm">繼續</ArcadeButton>
              ) : (
                <ArcadeButton onClick={() => engine.initLevel(1)} className="min-w-0 px-5 py-3 text-sm">開始</ArcadeButton>
              )}
              <button onClick={engine.restartLevel} className="game-plain-button">
                重開
              </button>
              <button onClick={() => setSettingsOpen(true)} className="game-plain-button">
                設定
              </button>
            </div>
          </div>
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
          <GameBoard rows={config.rows} columns={config.columns} cells={engine.cells} onHit={handleHit} />
        </section>

        <aside className="grid content-start gap-4">
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

      {isPaused && <PauseOverlay onResume={engine.resumeGame} onRestart={engine.restartLevel} />}
      {(engine.state.status === 'won' || engine.state.status === 'lost' || engine.state.status === 'game-over') && (
        <GameOverModal
          status={engine.state.status === 'game-over' ? 'game-over' : engine.state.status}
          score={engine.state.score}
          targetScore={config.targetScore}
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
