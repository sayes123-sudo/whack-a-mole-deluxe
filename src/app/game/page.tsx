"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useGameEngine } from '@/lib/gameEngine';
import GameBoard from '@/components/game/GameBoard';
import GameHud from '@/components/game/GameHud';
import GameOverModal from '@/components/game/GameOverModal';
import PauseOverlay from '@/components/game/PauseOverlay';
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
    <main className="game-screen relative min-h-screen overflow-hidden bg-arcadeBg text-white">
      <div className="game-layout relative z-10 mx-auto grid w-full max-w-7xl gap-4 px-3 py-4 sm:px-5 lg:py-6">
        <section className="rounded-3xl border border-cyan-200/15 bg-slate-950/80 p-3 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-4">
          <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-neonCyan">地鼠大作戰 Deluxe</p>
              <h1 className="mt-1 text-3xl font-black leading-tight neon-glow sm:text-4xl">LEVEL {engine.state.currentLevel} · {statusLabel}</h1>
            </div>
            <div className="flex flex-wrap gap-2">
              {engine.state.status === 'playing' ? (
                <ArcadeButton onClick={engine.pauseGame} className="min-w-0 px-5 py-3 text-sm">暫停</ArcadeButton>
              ) : engine.state.status === 'paused' ? (
                <ArcadeButton onClick={engine.resumeGame} className="min-w-0 px-5 py-3 text-sm">繼續</ArcadeButton>
              ) : (
                <ArcadeButton onClick={() => engine.initLevel(1)} className="min-w-0 px-5 py-3 text-sm">開始</ArcadeButton>
              )}
              <button onClick={engine.restartLevel} className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-black text-white transition hover:bg-white/20">
                重開
              </button>
              <button onClick={() => setSettingsOpen(true)} className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-black text-white transition hover:bg-white/20">
                設定
              </button>
            </div>
          </div>
          <div className="mb-4 rounded-3xl border border-white/10 bg-slate-950/80 p-3">
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
          <div className="rounded-3xl border border-white/10 bg-slate-950/85 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.3)] backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.28em] text-neonCyan">任務資訊</p>
            <div className="mt-4 grid gap-3 text-sm text-white/75">
              <p>版面：{config.rows} x {config.columns}</p>
              <p>目標：{config.targetScore} 分</p>
              <p>倒數：{config.durationSeconds} 秒</p>
              <p>炸彈機率：{Math.round(config.bombChance * 100)}%</p>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-950/85 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.3)] backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.28em] text-neonCyan">操作提示</p>
            <p className="mt-3 text-sm leading-7 text-white/75">
              點擊地鼠拿分，空點會中斷 Combo。炸彈扣一命和 30 分，金地鼠與時間獎勵是衝高分關鍵。
            </p>
          </div>
          <Link href="/" className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-center text-sm font-black text-white transition hover:bg-white/20">
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
