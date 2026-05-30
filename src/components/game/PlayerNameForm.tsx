"use client";

import { FormEvent, useState, useSyncExternalStore } from 'react';
import { loadPlayerName, PLAYER_NAME_MAX_LENGTH, savePlayerName, sanitizePlayerName } from '@/lib/leaderboard';
import { subscribeToLocalStorage } from '@/lib/storage';

const playerNameSnapshot = () => loadPlayerName();

export default function PlayerNameForm({ compact = false }: { compact?: boolean }) {
  const savedName = useSyncExternalStore(subscribeToLocalStorage, playerNameSnapshot, () => '玩家');
  const [draft, setDraft] = useState(savedName);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    savePlayerName(draft);
    setDraft(sanitizePlayerName(draft));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1400);
  };

  return (
    <form className={compact ? 'player-form player-form-compact' : 'player-form'} onSubmit={handleSubmit}>
      <label htmlFor={compact ? 'player-name-compact' : 'player-name'}>玩家登錄</label>
      <div className="player-form-row">
        <input
          id={compact ? 'player-name-compact' : 'player-name'}
          maxLength={PLAYER_NAME_MAX_LENGTH}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="輸入暱稱"
        />
        <button type="submit">儲存</button>
      </div>
      <p>{saved ? '已更新排行榜名稱。' : `目前以「${savedName}」登錄分數。`}</p>
    </form>
  );
}
