import { FC, useState, useEffect } from 'react';
import { Player, Team } from '../types';

interface EditTeamModalProps {
    isOpen: boolean;
    team: Team;
    players: Player[];
    onClose: () => void;
    onSavePlayer: (playerId: string, newName: string, newNumber: number) => void;
    onSaveTeamName: (team: Team, teamName: string) => void;
    initialTeamName?: string;
}

export const EditTeamModal: FC<EditTeamModalProps> = ({
    isOpen,
    team,
    players,
    onClose,
    onSavePlayer,
    onSaveTeamName,
    initialTeamName,
}) => {
    const [editingPlayerId, setEditingPlayerId] = useState<string | null>(null);
    const [editingName, setEditingName] = useState('');
    const [editingNumber, setEditingNumber] = useState(0);
    const [teamName, setTeamName] = useState(initialTeamName || (team === 'home' ? 'Local' : 'Visitante'));
    const [isEditingTeamName, setIsEditingTeamName] = useState(false);

    // Update team name when the modal opens or when initialTeamName changes
    // so the modal always shows the latest team name from App state.
    useEffect(() => {
        if (initialTeamName) setTeamName(initialTeamName);
    }, [initialTeamName]);

    const teamPlayers = players.filter((p) => p.team === team);

    const handleEditPlayer = (playerId: string, name: string, number: number) => {
        setEditingPlayerId(playerId);
        setEditingName(name);
        setEditingNumber(number);
    };

    const handleSavePlayer = () => {
        if (editingPlayerId) {
            onSavePlayer(editingPlayerId, editingName, editingNumber);
            setEditingPlayerId(null);
            setEditingName('');
            setEditingNumber(0);
        }
    };

    const handleCancelEdit = () => {
        setEditingPlayerId(null);
        setEditingName('');
        setEditingNumber(0);
    };

    const handleSaveTeamName = () => {
        onSaveTeamName(team, teamName);
        setIsEditingTeamName(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-11/12 md:w-3/4 lg:w-1/2 bg-white rounded-lg p-6 max-h-96 overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-[#CE1141]">
                        Editar {team === 'home' ? 'Equipo Local' : 'Equipo Visitante'}
                    </h3>
                    <button onClick={onClose} className="text-sm text-gray-600 hover:text-gray-900">
                        ✕
                    </button>
                </div>

                {/* Editar nombre del equipo */}
                <div className="mb-6 p-4 bg-gray-50 rounded border-2 border-[#CE1141]">
                    {isEditingTeamName ? (
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={teamName}
                                onChange={(e) => setTeamName(e.target.value)}
                                className="flex-1 px-3 py-2 border rounded font-bold text-[#CE1141]"
                                placeholder="Nombre del equipo"
                            />
                            <button
                                onClick={handleSaveTeamName}
                                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded text-sm"
                            >
                                ✓
                            </button>
                            <button
                                onClick={() => setIsEditingTeamName(false)}
                                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded text-sm"
                            >
                                ✕
                            </button>
                        </div>
                    ) : (
                        <div className="flex justify-between items-center">
                            <h4 className="text-lg font-bold text-[#CE1141]">{teamName}</h4>
                            <button
                                onClick={() => setIsEditingTeamName(true)}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded text-sm"
                            >
                                Editar
                            </button>
                        </div>
                    )}
                </div>

                {/* Editar jugadores */}
                <div className="space-y-2">
                    <h4 className="font-bold text-[#222] mb-3">Jugadores</h4>
                    {teamPlayers.map((player) => (
                        <div key={player.id} className="p-3 bg-gray-50 rounded border border-gray-300">
                            {editingPlayerId === player.id ? (
                                <div className="space-y-2">
                                    <div className="flex gap-2">
                                        <input
                                            type="number"
                                            value={editingNumber}
                                            onChange={(e) => setEditingNumber(parseInt(e.target.value) || 0)}
                                            className="w-16 px-2 py-1 border rounded text-sm"
                                            placeholder="#"
                                        />
                                        <input
                                            type="text"
                                            value={editingName}
                                            onChange={(e) => setEditingName(e.target.value)}
                                            className="flex-1 px-2 py-1 border rounded text-sm"
                                            placeholder="Nombre"
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleSavePlayer}
                                            className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded text-xs"
                                        >
                                            ✓ Guardar
                                        </button>
                                        <button
                                            onClick={handleCancelEdit}
                                            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-2 rounded text-xs"
                                        >
                                            ✕ Cancelar
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold text-[#222]">
                                        #{player.number} {player.name}
                                    </span>
                                    <button
                                        onClick={() => handleEditPlayer(player.id, player.name, player.number)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded text-xs"
                                    >
                                        ✎ Editar
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Close button */}
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-[#CE1141] hover:bg-[#a70d2a] text-white font-bold py-2 px-6 rounded"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};
