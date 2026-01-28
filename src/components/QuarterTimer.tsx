import { FC, useState } from 'react';
import { TeamStats } from '../types';

interface QuarterTimerProps {
    quarter: number;
    timer: { minute: number; second: number; isRunning: boolean };
    onToggleTimer: () => void;
    onResetTimer: () => void;
    onTimeChange: (minute: number, second: number) => void;
    onQuarterChange: (quarter: number) => void;
    homeStats: TeamStats;
    awayStats: TeamStats;
    homeTeamName?: string;
    awayTeamName?: string;
}

export const QuarterTimer: FC<QuarterTimerProps> = ({
    quarter,
    timer,
    onToggleTimer,
    onResetTimer,
    onTimeChange,
    onQuarterChange,
    homeStats,
    awayStats,
    homeTeamName = 'Local',
    awayTeamName = 'Visitante',
}) => {
    const [editMode, setEditMode] = useState(false);
    const [tempMinute, setTempMinute] = useState(timer.minute);
    const [tempSecond, setTempSecond] = useState(timer.second);

    const handleSaveTime = () => {
        onTimeChange(tempMinute, tempSecond);
        setEditMode(false);
    };

    const handleEditTime = () => {
        setTempMinute(timer.minute);
        setTempSecond(timer.second);
        setEditMode(true);
    };

    const formatTime = (min: number, sec: number) => {
        return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    };

    return (
        <div className="bg-gradient-to-r from-[#CE1141] to-[#222] text-white p-4 rounded-lg shadow-lg border-2 border-white">
            {/* Score Display */}
            <div className="grid grid-cols-3 gap-4 items-center">
                <div className="text-center bg-white/10 p-2 rounded flex flex-col items-center justify-center gap-2">
                    <div className="text-4xl font-bold text-white">{homeStats.totalPoints}</div>
                    <span className="text-xs opacity-90 font-semibold">{homeTeamName}</span>
                </div>
                <div className="text-center bg-white/10 p-2 rounded">
                    <div className="text-xs opacity-90 mb-1 font-semibold">Cuarto {quarter}/4</div>
                    <div className="text-4xl font-bold font-mono text-white">
                        {editMode ? (
                            <div className="flex justify-center gap-1">
                                <input
                                    type="number"
                                    min="0"
                                    max="10"
                                    value={tempMinute}
                                    onChange={(e) => setTempMinute(parseInt(e.target.value) || 0)}
                                    className="w-12 text-black px-1 rounded text-sm font-bold"
                                />
                                <span>:</span>
                                <input
                                    type="number"
                                    min="0"
                                    max="59"
                                    value={tempSecond}
                                    onChange={(e) => setTempSecond(parseInt(e.target.value) || 0)}
                                    className="w-12 text-black px-1 rounded text-sm font-bold"
                                />
                            </div>
                        ) : (
                            formatTime(timer.minute, timer.second)
                        )}
                    </div>
                </div>
                <div className="text-center bg-white/10 p-2 rounded flex flex-col items-center justify-center gap-2">
                    <div className="text-4xl font-bold text-white">{awayStats.totalPoints}</div>
                    <span className="text-xs opacity-90 font-semibold">{awayTeamName}</span>
                </div>
            </div>

            {/* Time Controls */}
            <div className="flex gap-2 justify-center flex-wrap mt-3">
                <button
                    onClick={onToggleTimer}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded text-xs transition border border-green-700"
                >
                    {timer.isRunning ? '⏸ Pausa' : '▶ Jugar'}
                </button>
                <button
                    onClick={onResetTimer}
                    className="bg-[#CE1141] hover:bg-[#a70d2a] text-white font-bold py-2 px-4 rounded text-xs transition border border-white"
                >
                    ↻ Reiniciar
                </button>
                {!editMode ? (
                    <button
                        onClick={handleEditTime}
                        className="bg-[#222] hover:bg-[#000] text-white font-bold py-2 px-4 rounded text-xs transition border border-[#CE1141]"
                    >
                        ✎ Editar
                    </button>
                ) : (
                    <>
                        <button
                            onClick={handleSaveTime}
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded text-xs transition border border-green-700"
                        >
                            ✓ Guardar
                        </button>
                        <button
                            onClick={() => setEditMode(false)}
                            className="bg-[#CE1141] hover:bg-[#a70d2a] text-white font-bold py-2 px-4 rounded text-xs transition border border-white"
                        >
                            ✕ Cancelar
                        </button>
                    </>
                )}
                <button
                    onClick={() => onQuarterChange(Math.max(1, quarter - 1))}
                    disabled={quarter === 1}
                    className="bg-[#222] hover:bg-[#000] disabled:bg-gray-600 text-white font-bold py-2 px-3 rounded text-xs transition border border-[#CE1141]"
                >
                    ← Q
                </button>
                <button
                    onClick={() => onQuarterChange(Math.min(4, quarter + 1))}
                    disabled={quarter === 4}
                    className="bg-[#222] hover:bg-[#000] disabled:bg-gray-600 text-white font-bold py-2 px-3 rounded text-xs transition border border-[#CE1141]"
                >
                    Q →
                </button>
            </div>
        </div>
    );
};
