import type { ReactNode } from 'react';

interface GameHudProps {
  score: number;
  highScore: number;
  timeLeft: number;
  lives: number;
  combo: number;
  level: number;
  targetScore: number;
}

function StatBlock({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-left">
      <p className="text-xs uppercase tracking-[0.24em] text-white/60">{label}</p>
      <p className="mt-2 text-xl font-black text-white">{value}</p>
    </div>
  );
}

export default function GameHud({ score, highScore, timeLeft, lives, combo, level, targetScore }: GameHudProps) {
  const progress = Math.min(100, Math.round((score / targetScore) * 100));

  return (
    <div className="grid min-w-0 gap-3">
      <div className="hud-primary grid gap-3">
        <StatBlock label="分數" value={score} />
        <StatBlock label="最高分" value={highScore} />
        <StatBlock label="時間" value={`${timeLeft}s`} />
        <StatBlock label="命數" value={'♥'.repeat(lives) || '0'} />
      </div>
      <div className="hud-secondary grid gap-3">
        <StatBlock label="關卡" value={`LEVEL ${level}`} />
        <StatBlock label="Combo" value={`x${combo}`} />
        <div className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs uppercase tracking-[0.24em] text-white/60">目標</p>
            <p className="text-sm font-black text-cyan-200">{score}/{targetScore}</p>
          </div>
          <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-gradient-to-r from-neonCyan via-neonAmber to-neonPink transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
