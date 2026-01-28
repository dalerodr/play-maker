import { FC } from 'react';

interface ActionButtonsProps {
    selectedPlayerId: string | null;
    onAction: (action: string) => void;
    isPlayerOnField: boolean;
    size?: 'sm' | 'md';
    columns?: number;
}

export const ActionButtons: FC<ActionButtonsProps> = ({
    selectedPlayerId,
    onAction,
    isPlayerOnField,
    size = 'md',
    columns = 3,
}) => {
    const isDisabled = !selectedPlayerId || !isPlayerOnField;

    // Always show Bulls colors, never gray/disabled
    // Use smaller buttons if size === 'sm'
    const btnBase = size === 'sm'
        ? 'py-1 px-1 rounded text-2xs font-bold border-2 flex-1'
        : 'py-3 px-3 rounded-lg text-lg font-bold border-2';

    const gridCols = columns === 2 ? 'grid-cols-2' : 'grid-cols-3';

    return (
        <div className="space-y-2 h-full flex flex-col">
            <div className={`grid ${gridCols} gap-1 flex-1`}>
                <button
                    onClick={() => onAction('points1')}
                    disabled={isDisabled}
                    className={`bg-[#CE1141] hover:bg-[#a70d2a] text-white ${btnBase} transition border-[#222] ${isDisabled ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                    +1
                </button>
                <button
                    onClick={() => onAction('points2')}
                    disabled={isDisabled}
                    className={`bg-[#CE1141] hover:bg-[#a70d2a] text-white ${btnBase} transition border-[#222] ${isDisabled ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                    +2
                </button>
                <button
                    onClick={() => onAction('points3')}
                    disabled={isDisabled}
                    className={`bg-[#CE1141] hover:bg-[#a70d2a] text-white ${btnBase} transition border-[#222] ${isDisabled ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                    +3
                </button>

                <button
                    onClick={() => onAction('foul')}
                    disabled={isDisabled}
                    className={`bg-[#222] hover:bg-[#000] text-white ${btnBase} transition border-[#CE1141] ${isDisabled ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                    Falta
                </button>
                <button
                    onClick={() => onAction('technical_foul')}
                    disabled={isDisabled}
                    className={`bg-[#222] hover:bg-[#000] text-white ${btnBase} transition border-[#CE1141] ${isDisabled ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                    Técnica
                </button>
                <button
                    onClick={() => onAction('unsporting_foul')}
                    disabled={isDisabled}
                    className={`bg-[#222] hover:bg-[#000] text-white ${btnBase} transition border-[#CE1141] ${isDisabled ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                    Anti.
                </button>

                <button
                    onClick={() => onAction('rebound')}
                    disabled={isDisabled}
                    className={`bg-white hover:bg-gray-50 text-[#CE1141] ${btnBase} transition border-[#CE1141] ${isDisabled ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                    Rebote
                </button>
                <button
                    onClick={() => onAction('assist')}
                    disabled={isDisabled}
                    className={`bg-[#39FF14] hover:bg-[#2ed90e] text-[#222] ${btnBase} transition border-[#222] ${isDisabled ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                    Ast.
                </button>
                <button
                    onClick={() => onAction('steal')}
                    disabled={isDisabled}
                    className={`bg-purple-500 hover:bg-purple-600 text-white ${btnBase} transition border-[#222] ${isDisabled ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                    Robo
                </button>
                <button
                    onClick={() => onAction('turnover')}
                    disabled={isDisabled}
                    className={`bg-orange-500 hover:bg-orange-600 text-white ${btnBase} transition border-[#222] ${isDisabled ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                    Pérdida
                </button>
            </div>
        </div>
    );
};
