import React from 'react';

interface Props {
  onResume: () => void;
  onRestart: () => void;
}

export default function PauseOverlay({ onResume, onRestart }: Props) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/80 px-4 py-8 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-3xl border border-cyan-300/20 bg-zinc-950/95 p-6 shadow-2xl shadow-cyan-500/20">
        <div className="text-center space-y-4">
          <p className="text-neonCyan uppercase tracking-[0.3em] text-sm">暫停中</p>
          <h3 className="text-4xl font-black neon-glow">請稍後</h3>
          <p className="text-white/80">遊戲已暫停。你可以繼續或重新開始這一關。</p>
          <div className="flex flex-col gap-3 sm:flex-row justify-center">
            <button onClick={onResume} className="rounded-xl bg-neonCyan px-5 py-3 text-sm font-bold text-black transition hover:brightness-110">
              繼續遊戲
            </button>
            <button onClick={onRestart} className="rounded-xl bg-neonPink px-5 py-3 text-sm font-bold text-black transition hover:brightness-110">
              重新開始
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
