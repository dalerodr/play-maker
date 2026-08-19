import { FC, useState, useEffect, useRef, useCallback, memo } from 'react';
import { Player, Team } from '../types';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

interface EditTeamsModalProps {
    isOpen: boolean;
    players: Player[];
    teamNames: { home: string; away: string };
    onClose: () => void;
    onSavePlayer: (playerId: string, newName: string, newNumber: number) => void;
    onSaveTeamName: (team: Team, teamName: string) => void;
}

export const EditTeamsModal: FC<EditTeamsModalProps> = memo(({
    isOpen,
    players,
    teamNames,
    onClose,
    onSavePlayer,
    onSaveTeamName,
}) => {
    const [editingPlayerId, setEditingPlayerId] = useState<string | null>(null);
    const [editingName, setEditingName] = useState('');
    const [editingNumber, setEditingNumber] = useState(0);
    const [localTeamNames, setLocalTeamNames] = useState(teamNames);
    const [editingTeamField, setEditingTeamField] = useState<Team | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const previousFocusRef = useRef<HTMLElement | null>(null);

    useBodyScrollLock(isOpen);

    useEffect(() => {
        setLocalTeamNames(teamNames);
    }, [teamNames, isOpen]);

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

    const handleEditPlayer = useCallback((playerId: string, name: string, number: number) => {
        setEditingPlayerId(playerId);
        setEditingName(name);
        setEditingNumber(number);
    }, []);

    const handleSavePlayer = useCallback(() => {
        if (editingPlayerId) {
            onSavePlayer(editingPlayerId, editingName, editingNumber);
            setEditingPlayerId(null);
            setEditingName('');
            setEditingNumber(0);
        }
    }, [editingPlayerId, editingName, editingNumber, onSavePlayer]);

    const handleCancelEdit = useCallback(() => {
        setEditingPlayerId(null);
        setEditingName('');
        setEditingNumber(0);
    }, []);

    const handleSaveTeamName = useCallback((team: Team) => {
        onSaveTeamName(team, localTeamNames[team]);
        setEditingTeamField(null);
    }, [localTeamNames, onSaveTeamName]);

    const handleOverlayClick = useCallback((e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }, [onClose]);

    const handleContentClick = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
    }, []);

    if (!isOpen) return null;

    const renderTeam = (team: Team) => {
        const teamPlayers = players.filter((p) => p.team === team);
        const isEditingName = editingTeamField === team;

        return (
            <div className="bg-gray-800/80 rounded-xl border border-white/10 flex flex-col h-full min-h-0">
                {/* Team Header */}
                <div className="bg-gradient-to-r from-bulls-red/30 to-transparent px-3 py-2.5 border-b border-white/10 flex-shrink-0">
                    {isEditingName ? (
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={localTeamNames[team]}
                                onChange={(e) => setLocalTeamNames({ ...localTeamNames, [team]: e.target.value })}
                                className="flex-1 px-3 py-1.5 bg-gray-700 border border-white/20 rounded-lg text-white text-sm font-bold focus:outline-none focus:ring-2 focus:ring-bulls-red focus:border-transparent"
                                autoFocus
                                aria-label={`Nombre del equipo ${team === 'home' ? 'local' : 'visitante'}`}
                            />
                            <button 
                                onClick={() => handleSaveTeamName(team)} 
                                className="bg-green-600 hover:bg-green-500 active:bg-green-700 text-white px-3 py-1.5 rounded-lg text-sm font-bold transition-colors"
                                aria-label="Guardar nombre del equipo"
                            >
                                ✓
                            </button>
                            <button 
                                onClick={() => setEditingTeamField(null)} 
                                className="bg-gray-600 hover:bg-gray-500 active:bg-gray-700 text-white px-3 py-1.5 rounded-lg text-sm transition-colors"
                                aria-label="Cancelar edición del nombre"
                            >
                                ✕
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center justify-between">
                            <h4 className="font-bold text-white text-sm sm:text-base">{localTeamNames[team]}</h4>
                            <button 
                                onClick={() => setEditingTeamField(team)} 
                                className="text-xs text-white/50 hover:text-white active:text-white/80 transition-colors"
                                aria-label={`Editar nombre de ${localTeamNames[team]}`}
                            >
                                ✎ Editar nombre
                            </button>
                        </div>
                    )}
                </div>

                {/* Players List - scrollable */}
                <div className="flex-1 overflow-y-auto p-2 min-h-0 overscroll-contain">
                    <div className="space-y-1.5">
                        {teamPlayers.map((player) => (
                            <div 
                                key={player.id} 
                                className={`rounded-lg transition-all duration-150 ${
                                    editingPlayerId === player.id 
                                        ? 'bg-bulls-red/20 border border-bulls-red/40' 
                                        : 'border border-transparent'
                                }`}
                            >
                                {editingPlayerId === player.id ? (
                                    <div className="space-y-2 p-2.5">
                                        <div className="flex gap-2">
                                            <input
                                                type="number"
                                                value={editingNumber}
                                                onChange={(e) => setEditingNumber(parseInt(e.target.value) || 0)}
                                                className="w-16 px-2 py-2 bg-gray-700 border border-white/20 rounded-lg text-center text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-bulls-red focus:border-transparent"
                                                autoFocus
                                                aria-label="Número del jugador"
                                            />
                                            <input
                                                type="text"
                                                value={editingName}
                                                onChange={(e) => setEditingName(e.target.value)}
                                                className="flex-1 px-2 py-2 bg-gray-700 border border-white/20 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-bulls-red focus:border-transparent min-w-0"
                                                aria-label="Nombre del jugador"
                                            />
                                        </div>
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={handleSavePlayer} 
                                                className="flex-1 bg-green-600 hover:bg-green-500 active:bg-green-700 text-white py-2 rounded-lg text-xs font-bold transition-colors"
                                            >
                                                ✓ Guardar
                                            </button>
                                            <button 
                                                onClick={handleCancelEdit} 
                                                className="flex-1 bg-gray-600 hover:bg-gray-500 active:bg-gray-700 text-white py-2 rounded-lg text-xs transition-colors"
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => handleEditPlayer(player.id, player.name, player.number)}
                                        className="w-full p-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] active:bg-white/[0.12] transition-colors flex items-center justify-between text-left cursor-pointer min-h-[44px]"
                                        aria-label={`Editar ${player.name}, número ${player.number}`}
                                    >
                                        <div className="flex items-center gap-2 min-w-0">
                                            <span className="text-bulls-red font-bold text-sm flex-shrink-0">#{player.number}</span>
                                            <span className="text-white/80 text-sm truncate">{player.name}</span>
                                        </div>
                                        <span className="text-xs text-white/40 hover:text-white transition-colors flex-shrink-0 ml-2">✎</span>
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div 
            className="modal-overlay"
            onClick={handleOverlayClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-teams-title"
        >
            <div className="modal-overlay-bg" />
            
            <div 
                ref={modalRef}
                className="modal-content"
                onClick={handleContentClick}
                tabIndex={-1}
            >
                {/* Header */}
                <div className="modal-header">
                    <div>
                        <h3 id="edit-teams-title" className="text-base sm:text-xl font-bold text-white uppercase tracking-wider">
                            Editar Equipos
                        </h3>
                        <p className="text-white/70 text-[10px] sm:text-xs mt-0.5">Nombres y números de jugadores</p>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 active:bg-white/40 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                        aria-label="Cerrar modal"
                    >
                        ✕
                    </button>
                </div>
                
                {/* Content */}
                <div className="modal-body">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 h-full min-h-0">
                        {renderTeam('home')}
                        {renderTeam('away')}
                    </div>
                </div>
                
                {/* Footer */}
                <div className="modal-footer">
                    <button 
                        onClick={onClose} 
                        className="bg-bulls-red hover:bg-bulls-red-dark active:bg-bulls-red text-white font-bold py-2.5 px-8 rounded-lg text-sm transition-colors shadow-lg hover:shadow-glow-red focus:outline-none focus:ring-2 focus:ring-bulls-red focus:ring-offset-2 focus:ring-offset-gray-900"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
});

EditTeamsModal.displayName = 'EditTeamsModal';
