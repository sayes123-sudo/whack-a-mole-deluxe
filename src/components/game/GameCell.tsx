import Image from 'next/image';
import type { GameCellState, GameEntity } from '@/types/game';

const entityLabels: Record<GameEntity, string> = {
  mole: '地鼠',
  'golden-mole': '金地鼠',
  bomb: '炸彈',
  'time-bonus': '時間獎勵',
  empty: '空洞',
};

const entityScoreLabels: Partial<Record<GameEntity, { text: string; tone: string }>> = {
  mole: { text: '+10', tone: 'entity-score-plus' },
  'golden-mole': { text: '+50', tone: 'entity-score-gold' },
  bomb: { text: '-30', tone: 'entity-score-minus' },
  'time-bonus': { text: '+15 / +3s', tone: 'entity-score-time' },
};

const entityImages: Partial<Record<GameEntity, string>> = {
  mole: '/assets/images/mole-normal.png',
  'golden-mole': '/assets/images/mole-golden.png',
  bomb: '/assets/images/bomb.png',
  'time-bonus': '/assets/images/time-bonus.png',
};

function feedbackImage(cell: GameCellState): string | null {
  if (!cell.feedbackEntity || cell.feedbackEntity === 'empty') return null;
  if (cell.feedback === 'hit' && cell.feedbackEntity === 'mole') return '/assets/images/mole-hit.png';
  return entityImages[cell.feedbackEntity] ?? null;
}

export default function GameCell({ cell, onHit }: { cell: GameCellState; onHit: (index: number) => void }) {
  const isActive = cell.entity !== 'empty';
  const visibleImage = isActive ? entityImages[cell.entity] : feedbackImage(cell);
  const scoreLabel = isActive ? entityScoreLabels[cell.entity] : null;
  const label = isActive ? entityLabels[cell.entity] : cell.feedback === 'miss' ? '揮空' : '空洞';

  return (
    <button
      type="button"
      onClick={() => onHit(cell.id)}
      aria-label={label}
      className={[
        'game-cell group relative aspect-square w-full overflow-hidden rounded-2xl border transition focus:outline-none focus:ring-2 focus:ring-cyan-200 sm:rounded-3xl',
        isActive ? 'border-cyan-200/35 bg-slate-950/90 shadow-[0_0_22px_rgba(51,255,255,0.14)]' : 'border-white/10 bg-slate-950/70',
        cell.feedback === 'bomb' ? 'cell-bomb' : '',
        cell.feedback === 'miss' ? 'cell-miss' : '',
        cell.feedback === 'bonus' ? 'cell-bonus' : '',
      ].join(' ')}
    >
      <Image src="/assets/images/hole.png" alt="" fill sizes="(max-width: 768px) 22vw, 150px" className="object-contain opacity-95" priority={false} />
      <span className="pointer-events-none absolute inset-x-[13%] bottom-[14%] h-[16%] rounded-full bg-black/50 blur-sm" />
      {visibleImage ? (
        <span className={['sprite-pop pointer-events-none absolute inset-[10%] z-10', cell.feedback ? 'sprite-feedback' : ''].join(' ')}>
          <Image src={visibleImage} alt="" fill sizes="(max-width: 768px) 22vw, 150px" className="object-contain drop-shadow-[0_0_16px_rgba(51,255,255,0.28)]" />
        </span>
      ) : null}
      {scoreLabel ? (
        <span className={`entity-score-badge ${scoreLabel.tone}`}>
          {scoreLabel.text}
        </span>
      ) : null}
      {cell.feedback === 'bomb' ? (
        <>
          <span className="bomb-flash" />
          <span className="bomb-burst" />
          <span className="bomb-smoke" />
        </>
      ) : null}
      {cell.feedback ? <span className={`feedback-ring feedback-${cell.feedback}`} /> : null}
    </button>
  );
}
