import { FC } from 'react';
import { Player, Team } from '../types';

interface PlayerGridProps {
    players: Player[];
    onField: { [key: string]: boolean };
    onSelectPlayer: (playerId: string) => void;
    team: Team;
}

export const PlayerGrid: FC<PlayerGridProps> = ({
    players,
    onField,
    onSelectPlayer,
    team,
}) => {
    const filteredPlayers = players
        .filter((p) => p.team === team && onField[p.id]); return (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {filteredPlayers.map((player) => (
                    <button
                        key={player.id}
                        onClick={() => onSelectPlayer(player.id)}
                        className={`p-4 rounded-lg font-bold transition-all ${onField[player.id]
                            ? 'bg-green-500 hover:bg-green-600 text-white scale-105'
                            : 'bg-gray-300 hover:bg-gray-400 text-gray-800'
                            }`}
                    >
                        <div className="text-2xl font-bold">{player.number}</div>
                        <div className="text-xs sm:text-sm">{player.name}</div>
                    </button>
                ))}
            </div>
        );
};
