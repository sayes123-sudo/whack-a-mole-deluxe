import React from 'react';

interface SettingsPanelProps {
  isOpen: boolean;
  soundOn: boolean;
  onClose: () => void;
  onToggleSound: () => void;
}

export default function SettingsPanel({ isOpen, soundOn, onClose, onToggleSound }: SettingsPanelProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 py-8 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-cyan-300/20 bg-zinc-950/95 p-6 shadow-2xl shadow-cyan-500/20">
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">設定</p>
              <h2 className="text-3xl font-black neon-glow">遊戲選項</h2>
            </div>
            <button onClick={onClose} className="text-white/80 hover:text-white">關閉</button>
          </div>
          <div className="rounded-3xl border border-white/10 bg-black/30 p-4">
            <p className="text-sm text-white/80">音效</p>
            <button
              type="button"
              onClick={onToggleSound}
              className="mt-3 rounded-xl bg-gradient-to-r from-neonPink to-neonCyan px-4 py-3 text-sm font-bold text-black transition hover:brightness-105"
            >
              {soundOn ? '音效已開啟' : '音效已關閉'}
            </button>
          </div>
          <p className="text-xs text-white/60">音效設定會保存至本機，下次進入遊戲也會保留您的選擇。</p>
        </div>
      </div>
    </div>
  );
}
