import type { CSSProperties } from 'react';
import GameCell from '@/components/game/GameCell';
import type { GameCellState } from '@/types/game';

interface GameBoardProps {
  rows: number;
  columns: number;
  cells: GameCellState[];
  onHit: (index: number) => void;
}

export default function GameBoard({ rows, columns, cells, onHit }: GameBoardProps) {
  const gridStyle: CSSProperties = { gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` };

  return (
    <div className="game-board-shell mx-auto min-w-0 overflow-hidden">
      <div className="game-grid grid gap-2 rounded-3xl border border-cyan-200/15 bg-black/30 p-3 shadow-[inset_0_0_40px_rgba(51,255,255,0.08),0_30px_90px_rgba(0,0,0,0.45)] sm:gap-3 sm:p-4" style={gridStyle}>
        {cells.map(cell => (
          <GameCell key={cell.id} cell={cell} onHit={onHit} />
        ))}
      </div>
    </div>
  );
}
