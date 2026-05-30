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

type StatAccent = 'cyan' | 'pink' | 'amber' | 'heart';

function StatBlock({ label, value, accent = 'cyan' }: { label: string; value: ReactNode; accent?: StatAccent }) {
  return (
    <div className={`hud-stat hud-stat-${accent}`}>
      <p className="hud-stat-label">{label}</p>
      <p className="hud-stat-value">{value}</p>
    </div>
  );
}

export default function GameHud({ score, highScore, timeLeft, lives, combo, level, targetScore }: GameHudProps) {
  const progress = Math.min(100, Math.round((score / targetScore) * 100));

  return (
    <div className="grid min-w-0 gap-3">
      <div className="hud-primary grid gap-3">
        <StatBlock label="分數" value={score} accent="amber" />
        <StatBlock label="最高分" value={highScore} accent="pink" />
        <StatBlock label="時間" value={`${timeLeft}s`} accent="cyan" />
        <StatBlock label="命數" value={'♥'.repeat(lives) || '0'} accent="heart" />
      </div>
      <div className="hud-secondary grid gap-3">
        <StatBlock label="關卡" value={`LEVEL ${level}`} accent="cyan" />
        <StatBlock label="Combo" value={`x${combo}`} accent="amber" />
        <div className="hud-progress">
          <div className="hud-progress-head">
            <p className="hud-stat-label">目標</p>
            <p className="hud-progress-score">{score}/{targetScore}</p>
          </div>
          <div className="hud-progress-track">
            <div className="hud-progress-bar" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
