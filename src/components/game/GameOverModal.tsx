import React from 'react';

interface Props {
  status: 'won' | 'lost' | 'game-over';
  score: number;
  targetScore: number;
  currentLevel: number;
  isFinalLevel: boolean;
  onRestart: () => void;
  onNextLevel: () => void;
  onMenu: () => void;
}

export default function GameOverModal({
  status,
  score,
  targetScore,
  currentLevel,
  isFinalLevel,
  onRestart,
  onNextLevel,
  onMenu,
}: Props) {
  const title =
    status === 'game-over'
      ? '終極勝利！'
      : status === 'won'
      ? isFinalLevel
        ? '全部通關！'
        : '關卡達成！'
      : '遊戲失敗';

  const message =
    status === 'game-over'
      ? '你已經完成全部關卡，成為地鼠王者。'
      : status === 'won'
      ? isFinalLevel
        ? '恭喜你完成所有關卡！'
        : `第 ${currentLevel} 關達成，準備進入下一關。`
      : '請再試一次，下一次會更快更準。';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 px-4 py-8">
      <div className="w-full max-w-xl rounded-3xl border border-cyan-300/20 bg-zinc-950/95 p-6 shadow-2xl shadow-cyan-500/20 backdrop-blur-xl">
        <div className="space-y-4 text-center">
          <p className="text-neonCyan uppercase tracking-[0.3em] text-sm">{status === 'won' ? '恭喜達成' : '遊戲結束'}</p>
          <h3 className="text-4xl font-black neon-glow">{title}</h3>
          <p className="text-white/80">{message}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
              <p className="text-xs uppercase text-white/70">當前分數</p>
              <p className="mt-2 text-3xl font-bold text-white">{score}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
              <p className="text-xs uppercase text-white/70">目標分數</p>
              <p className="mt-2 text-3xl font-bold text-white">{targetScore}</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row justify-center">
            <button onClick={onRestart} className="rounded-xl bg-neonPink px-5 py-3 text-sm font-bold text-black transition hover:brightness-110">
              重新開始
            </button>
            {status === 'won' && !isFinalLevel ? (
              <button onClick={onNextLevel} className="rounded-xl bg-neonCyan px-5 py-3 text-sm font-bold text-black transition hover:brightness-110">
                下一關
              </button>
            ) : null}
            <button onClick={onMenu} className="rounded-xl border border-white/20 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/5">
              回到主選單
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
