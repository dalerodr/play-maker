import { FC, useState } from 'react';

interface GridCoordinates {
    row: number;
    col: number;
}

interface BasketballCourtProps {
    onCoordinatesSelected: (coords: GridCoordinates) => void;
    lastCoordinates: GridCoordinates | null;
}

const GRID_ROWS = 6;
const GRID_COLS = 4;

export const BasketballCourt: FC<BasketballCourtProps> = ({
    onCoordinatesSelected,
    lastCoordinates
}) => {
    const [hoverCoords, setHoverCoords] = useState<GridCoordinates | null>(null);

    const handleGridClick = (row: number, col: number) => {
        onCoordinatesSelected({ row, col });
    };

    const handleMouseMove = (row: number, col: number) => {
        setHoverCoords({ row, col });
    };

    const handleMouseLeave = () => {
        setHoverCoords(null);
    };

    const isSelected = (row: number, col: number) =>
        lastCoordinates?.row === row && lastCoordinates?.col === col;

    const isHovering = (row: number, col: number) =>
        hoverCoords?.row === row && hoverCoords?.col === col;
    return (
        <div className="w-full rounded-lg shadow-lg p-4 bg-white">
            <h3 className="text-lg font-bold mb-2 text-[#CE1141]">Cancha - Chicago Bulls</h3>

            <div className="relative w-full" style={{ paddingTop: '150%' }}>
                {/* Pro-style basketball court SVG template - Half court vertical */}
                <svg viewBox="0 0 20 30" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
                    <defs>
                        <pattern id="parquet" patternUnits="userSpaceOnUse" width="8" height="8">
                            <rect x="0" y="0" width="8" height="8" fill="#F5E6C8" />
                            <rect x="0" y="0" width="8" height="2" fill="#E2C48D" />
                            <rect x="0" y="6" width="8" height="2" fill="#E2C48D" />
                        </pattern>
                    </defs>
                    <rect x="0" y="0" width="20" height="30" fill="url(#parquet)" />

                    {/* Outer boundary */}
                    <rect x="1" y="1" width="18" height="28" fill="none" stroke="#222" strokeWidth="1.2" />

                    {/* Baseline */}
                    <line x1="1" y1="1" x2="19" y2="1" stroke="#222" strokeWidth="0.7" />

                    {/* Center circle (only half visible at baseline) */}
                    <circle cx="10" cy="10" r="4" fill="none" stroke="#222" strokeWidth="1.2" />

                    {/* Free throw circle */}
                    <circle cx="10" cy="5" r="4" fill="none" stroke="#222" strokeWidth="1" />

                    {/* Paint area */}
                    <rect x="6" y="1" width="8" height="8" fill="none" stroke="#222" strokeWidth="1" />

                    {/* Restricted area arc */}
                    <path d="M6 3 A3 3 0 0 1 14 3" fill="none" stroke="#222" strokeWidth="0.7" />

                    {/* Backboard */}
                    <rect x="9" y="0.2" width="2" height="0.5" fill="#222" />

                    {/* Three-point line (NBA style) */}
                    <line x1="1" y1="1" x2="1" y2="10" stroke="#CE1141" strokeWidth="2" />
                    <line x1="19" y1="1" x2="19" y2="10" stroke="#CE1141" strokeWidth="2" />
                    <path d="M1 10 Q 10 16 19 10" fill="none" stroke="#CE1141" strokeWidth="2" />

                    {/* Chicago Bulls logo (SVG simplified) */}
                    <g transform="translate(10,22) scale(0.05)">
                        <ellipse cx="0" cy="0" rx="80" ry="60" fill="#FFF" stroke="#CE1141" strokeWidth="8" />
                        <ellipse cx="0" cy="10" rx="40" ry="25" fill="#CE1141" />
                        <ellipse cx="-20" cy="-10" rx="10" ry="8" fill="#000" />
                        <ellipse cx="20" cy="-10" rx="10" ry="8" fill="#000" />
                        <rect x="-10" y="20" width="20" height="8" fill="#000" />
                        <ellipse cx="0" cy="30" rx="8" ry="5" fill="#000" />
                    </g>
                </svg>

                {/* Grid overlay on top of SVG */}
                <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`, gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)`, gap: '4px' }}>
                    {Array.from({ length: GRID_ROWS }).map((_, rowIdx) =>
                        Array.from({ length: GRID_COLS }).map((_, colIdx) => {
                            const isSel = isSelected(rowIdx, colIdx);
                            const isHv = isHovering(rowIdx, colIdx);
                            return (
                                <button
                                    key={`${rowIdx}-${colIdx}`}
                                    onClick={() => handleGridClick(rowIdx, colIdx)}
                                    onMouseEnter={() => handleMouseMove(rowIdx, colIdx)}
                                    onMouseLeave={handleMouseLeave}
                                    className={`w-full h-full rounded-sm border transition-colors flex items-center justify-center text-xs font-bold ${isSel ? 'bg-[#CE1141]/90 text-white ring-2 ring-[#000]' : isHv ? 'bg-black/10 text-[#CE1141]' : 'bg-transparent text-[#222]'
                                        }`}
                                    title={`Zona ${rowIdx + 1}-${colIdx + 1}`}
                                >
                                    {(isSel || isHv) ? `${rowIdx + 1}-${colIdx + 1}` : ''}
                                </button>
                            );
                        })
                    )}
                </div>
            </div>

            <div className="mt-3 text-sm text-[#222]">
                <p className="font-semibold">
                    {lastCoordinates
                        ? `Posición: Fila ${lastCoordinates.row + 1}, Columna ${lastCoordinates.col + 1}`
                        : 'Haz clic en una zona para registrar la acción'}
                </p>
            </div>
        </div>
    );
};
