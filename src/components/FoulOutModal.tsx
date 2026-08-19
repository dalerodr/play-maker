import { FC, useEffect, useRef, memo } from 'react';
import { Player, Team } from '../types';

interface FoulOutModalProps {
    isOpen: boolean;
    fouledOutPlayer: { playerId: string; playerName: string; team: Team; reason?: string } | null;
    players: Player[];
    onField: { [key: string]: boolean };
    onSubstitute: (fouledOutId: string, replacementId: string) => void;
    onClose: () => void;
}

export const FoulOutModal: FC<FoulOutModalProps> = memo(({
    isOpen,
    fouledOutPlayer,
    players,
    onField,
    onSubstitute,
    onClose,
}) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const previousFocusRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (isOpen) {
            previousFocusRef.current = document.activeElement as HTMLElement;
            setTimeout(() => {
                modalRef.current?.focus();
            }, 100);
        } else if (previousFocusRef.current) {
            previousFocusRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen || !fouledOutPlayer) return null;

    const teamPlayers = players.filter((p) => p.team === fouledOutPlayer.team);
    const benchPlayers = teamPlayers.filter((p) => !onField[p.id]);
    const fouledPlayer = players.find((p) => p.id === fouledOutPlayer.playerId);

    const handleSubstitute = (replacementId: string) => {
        onSubstitute(fouledOutPlayer.playerId, replacementId);
        onClose();
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div 
            className="modal-overlay"
            onClick={handleOverlayClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby="foulout-title"
        >
            <div className="modal-overlay-bg" />
            
            <div 
                ref={modalRef}
                className="modal-content max-w-lg"
                onClick={(e) => e.stopPropagation()}
                tabIndex={-1}
            >
                {/* Header */}
                <div className="modal-header" style={{ background: 'linear-gradient(to right, rgba(220, 38, 38, 0.4), transparent)' }}>
                    <h3 id="foulout-title" className="text-base sm:text-lg font-bold text-red-400 uppercase tracking-wider">
                        ⚠️ Jugador Expulsado
                    </h3>
                    <button 
                        onClick={onClose} 
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white/70 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                        aria-label="Cerrar modal"
                    >
                        ✕
                    </button>
                </div>
                
                {/* Content */}
                <div className="modal-body">
                    <div className="space-y-4">
                        {/* Player info */}
                        <div className="p-3 bg-red-900/30 rounded-xl border border-red-500/30">
                            <p className="text-sm font-semibold text-red-400">
                                {fouledOutPlayer.reason || `${fouledOutPlayer.playerName} ha alcanzado 5 faltas y debe ser sustituido.`}
                            </p>
                            {fouledPlayer && (
                                <p className="text-white/90 text-sm mt-2 font-bold">
                                    #{fouledPlayer.number} {fouledPlayer.name}
                                </p>
                            )}
                        </div>

                        {/* Substitution options */}
                        <div>
                            <h4 className="text-white/80 text-sm font-semibold mb-2">
                                Selecciona un jugador del banquillo:
                            </h4>
                            {benchPlayers.length === 0 ? (
                                <p className="text-red-400 text-sm font-semibold p-3 bg-red-900/20 rounded-lg">
                                    No hay jugadores en el banquillo disponibles para la sustitución.
                                </p>
                            ) : (
                                <div className="space-y-2">
                                    {benchPlayers.map((player) => (
                                        <button
                                            key={player.id}
                                            onClick={() => handleSubstitute(player.id)}
                                            className="w-full text-left p-3 bg-green-900/30 border border-green-500/30 rounded-lg hover:bg-green-900/50 active:bg-green-900/70 transition-colors font-semibold text-white/90 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 min-h-[44px]"
                                            aria-label={`Sustituir por ${player.name}, número ${player.number}`}
                                        >
                                            #{player.number} {player.name}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                
                {/* Footer */}
                <div className="modal-footer">
                    {benchPlayers.length === 0 && (
                        <button
                            onClick={onClose}
                            className="bg-gray-600 hover:bg-gray-500 active:bg-gray-700 text-white font-bold py-2.5 px-8 rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                        >
                            Cerrar
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
});

FoulOutModal.displayName = 'FoulOutModal';
