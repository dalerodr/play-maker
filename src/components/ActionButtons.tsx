import { FC, memo } from 'react';

interface ActionButtonsProps {
    selectedPlayerId: string | null;
    onAction: (action: string) => void;
    isPlayerOnField: boolean;
    size?: 'sm' | 'md';
    columns?: number;
}

export const ActionButtons: FC<ActionButtonsProps> = memo(({
    selectedPlayerId,
    onAction,
    isPlayerOnField,
    size = 'md',
    columns = 3,
}) => {
    const isDisabled = !selectedPlayerId || !isPlayerOnField;

    const btnBase = size === 'sm'
        ? 'py-1.5 px-1 sm:py-2 sm:px-2 rounded-lg text-[10px] sm:text-xs font-bold border flex-1 min-h-[36px] sm:min-h-[40px]'
        : 'py-2.5 px-3 rounded-lg text-sm font-bold border-2';

    const gridCols = columns === 2 ? 'grid-cols-2' : columns === 4 ? 'grid-cols-5' : 'grid-cols-3';

    const buttons = [
        { action: 'points1', label: '+1', color: 'bg-bulls-red hover:bg-bulls-red-dark text-white border-bulls-red-dark shadow-glow-red' },
        { action: 'points2', label: '+2', color: 'bg-bulls-red hover:bg-bulls-red-dark text-white border-bulls-red-dark shadow-glow-red' },
        { action: 'points3', label: '+3', color: 'bg-bulls-red hover:bg-bulls-red-dark text-white border-bulls-red-dark shadow-glow-red' },
        { action: 'foul', label: 'Falta', color: 'bg-amber-600/90 hover:bg-amber-600 text-white border-amber-500/30' },
        { action: 'technical_foul', label: 'Técnica', color: 'bg-amber-700/90 hover:bg-amber-700 text-white border-amber-600/30' },
        { action: 'unsporting_foul', label: 'Anti.', color: 'bg-red-700/90 hover:bg-red-700 text-white border-red-600/30' },
        { action: 'rebound', label: 'Rebote', color: 'bg-white/10 hover:bg-white/15 text-white border-white/20' },
        { action: 'assist', label: 'Ast.', color: 'bg-bulls-neon/90 hover:bg-bulls-neon text-bulls-black border-bulls-neon/30' },
        { action: 'steal', label: 'Robo', color: 'bg-purple-600/90 hover:bg-purple-600 text-white border-purple-500/30' },
        { action: 'turnover', label: 'Pérd.', color: 'bg-orange-600/90 hover:bg-orange-600 text-white border-orange-500/30' },
    ];

    return (
        <div className="h-full flex flex-col">
            <div className={`grid ${gridCols} gap-1 flex-1 content-start`}>
                {buttons.map(({ action, label, color }) => (
                    <button
                        key={action}
                        onClick={() => onAction(action)}
                        disabled={isDisabled}
                        className={`${btnBase} ${color} transition-all duration-150 select-none active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-transparent`}
                        aria-label={
                            action === 'points1' ? 'Marcar 1 punto' :
                            action === 'points2' ? 'Marcar 2 puntos' :
                            action === 'points3' ? 'Marcar 3 puntos' :
                            action === 'foul' ? 'Marcar falta' :
                            action === 'technical_foul' ? 'Marcar falta técnica' :
                            action === 'unsporting_foul' ? 'Marcar falta antideportiva' :
                            action === 'rebound' ? 'Marcar rebote' :
                            action === 'assist' ? 'Marcar asistencia' :
                            action === 'steal' ? 'Marcar robo' :
                            'Marcar pérdida'
                        }
                    >
                        {label}
                    </button>
                ))}
            </div>
        </div>
    );
});

ActionButtons.displayName = 'ActionButtons';
