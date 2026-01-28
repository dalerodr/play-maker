import { FC } from 'react';
import { Player, Team } from '../types';

interface FoulOutModalProps {
    isOpen: boolean;
    fouledOutPlayer: { playerId: string; playerName: string; team: Team; reason?: string } | null;
    players: Player[];
    onField: { [key: string]: boolean };
    onSubstitute: (fouledOutId: string, replacementId: string) => void;
    onClose: () => void;
}

export const FoulOutModal: FC<FoulOutModalProps> = ({
    isOpen,
    fouledOutPlayer,
    players,
    onField,
    onSubstitute,
    onClose,
}) => {
    if (!isOpen || !fouledOutPlayer) return null;

    const teamPlayers = players.filter((p) => p.team === fouledOutPlayer.team);
    const benchPlayers = teamPlayers.filter((p) => !onField[p.id]);

    const handleSubstitute = (replacementId: string) => {
        onSubstitute(fouledOutPlayer.playerId, replacementId);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-11/12 md:w-2/3 bg-white rounded-lg p-6">
                <div className="mb-4">
                    <h3 className="text-lg font-bold text-red-600">⚠️ JUGADOR EXPULSADO</h3>
                    <p className="text-sm text-gray-600 mt-2">
                        {fouledOutPlayer.reason || `${fouledOutPlayer.playerName} ha alcanzado 5 faltas y debe ser sustituido.`}
                    </p>
                </div>

                <div className="mb-4 p-3 bg-red-50 rounded border-2 border-red-300">
                    <p className="text-sm font-semibold text-red-800">
                        #{players.find((p) => p.id === fouledOutPlayer.playerId)?.number} {fouledOutPlayer.playerName}
                    </p>
                </div>

                <div className="mb-4">
                    <h4 className="font-bold text-[#222] mb-2">Selecciona un jugador del banquillo para sustituirlo:</h4>
                    {benchPlayers.length === 0 ? (
                        <p className="text-sm text-red-600 font-semibold">
                            No hay jugadores en el banquillo disponibles para la sustitución.
                        </p>
                    ) : (
                        <div className="space-y-2">
                            {benchPlayers.map((player) => (
                                <button
                                    key={player.id}
                                    onClick={() => handleSubstitute(player.id)}
                                    className="w-full text-left p-3 bg-green-50 border-2 border-green-300 rounded hover:bg-green-100 transition font-semibold text-[#222]"
                                >
                                    #{player.number} {player.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {benchPlayers.length === 0 && (
                    <div className="flex justify-end">
                        <button
                            onClick={onClose}
                            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded"
                        >
                            Cerrar
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
