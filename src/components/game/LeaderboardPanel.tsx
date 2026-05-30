"use client";

import { useSyncExternalStore } from 'react';
import { clearLeaderboard, loadLeaderboard, outcomeLabels } from '@/lib/leaderboard';
import { subscribeToLocalStorage } from '@/lib/storage';
import type { LeaderboardEntry } from '@/types/game';

const leaderboardSnapshot = () => JSON.stringify(loadLeaderboard());

const formatDate = (createdAt: string) => {
  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) return '剛剛';
  return new Intl.DateTimeFormat('zh-TW', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

function LeaderboardRow({ entry, rank }: { entry: LeaderboardEntry; rank: number }) {
  return (
    <li className="leaderboard-row">
      <div className="leaderboard-rank">{rank}</div>
      <div className="leaderboard-main">
        <div className="leaderboard-line">
          <strong>{entry.score}</strong>
          <span>{outcomeLabels[entry.outcome]}</span>
        </div>
        <p>{entry.playerName} · LEVEL {entry.level} · 剩餘 {entry.timeLeft}s · {formatDate(entry.createdAt)}</p>
      </div>
    </li>
  );
}

export default function LeaderboardPanel({ compact = false, clearable = false }: { compact?: boolean; clearable?: boolean }) {
  const entries = JSON.parse(useSyncExternalStore(subscribeToLocalStorage, leaderboardSnapshot, () => '[]')) as LeaderboardEntry[];
  const visibleEntries = compact ? entries.slice(0, 5) : entries;

  return (
    <section className={compact ? 'leaderboard leaderboard-compact' : 'leaderboard'}>
      <div className="leaderboard-head">
        <div>
          <p className="leaderboard-kicker">LOCAL TOP SCORES</p>
          <h2>本機排行榜</h2>
        </div>
        {clearable && entries.length > 0 ? (
          <button type="button" className="leaderboard-clear" onClick={clearLeaderboard}>
            清除
          </button>
        ) : null}
      </div>
      {visibleEntries.length > 0 ? (
        <ol className="leaderboard-list">
          {visibleEntries.map((entry, index) => (
            <LeaderboardRow key={entry.id} entry={entry} rank={index + 1} />
          ))}
        </ol>
      ) : (
        <div className="leaderboard-empty">
          <strong>尚無紀錄</strong>
          <span>完成一局後會自動登錄分數。</span>
        </div>
      )}
    </section>
  );
}
