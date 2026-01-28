import { FC } from 'react';
import { Player, Team } from '../types';

interface TeamSummaryProps {
    players: Player[];
    team: Team;
    teamName: string;
    onField?: { [key: string]: boolean };
}

export const TeamSummary: FC<TeamSummaryProps> = ({
    players,
    team,
    teamName,
    onField = {},
}) => {
    const teamPlayers = players.filter((p) => p.team === team);
    const fieldPlayers = teamPlayers.filter((p) => onField[p.id]);

    const totalStats = fieldPlayers.reduce(
        (acc, player) => ({
            points: acc.points + (player.points1 || 0) * 1 + player.points2 * 2 + player.points3 * 3,
            fouls: acc.fouls + player.fouls,
            rebounds: acc.rebounds + player.rebounds,
            assists: acc.assists + player.assists,
        }),
        { points: 0, fouls: 0, rebounds: 0, assists: 0 }
    );

    return (
        <div
            className={`${team === 'home'
                ? 'bg-blue-50 border-l-4 border-blue-500'
                : 'bg-red-50 border-l-4 border-red-500'
                } p-4 rounded-lg`}
        >
            <h3 className="text-xl font-bold mb-4 text-gray-800">{teamName}</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">
                        {totalStats.points}
                    </div>
                    <div className="text-xs text-gray-600">Puntos</div>
                </div>
                <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-600">
                        {totalStats.fouls}
                    </div>
                    <div className="text-xs text-gray-600">Faltas</div>
                </div>
                <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">
                        {totalStats.rebounds}
                    </div>
                    <div className="text-xs text-gray-600">Rebotes</div>
                </div>
                <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">
                        {totalStats.assists}
                    </div>
                    <div className="text-xs text-gray-600">Asistencias</div>
                </div>
            </div>

            {/* Jugadores en Campo */}
            <div className="mt-4 pt-4 border-t">
                <h4 className="font-semibold text-gray-700 mb-2 text-sm">En Campo ({fieldPlayers.length}/5):</h4>
                <div className="space-y-1 text-sm">
                    {fieldPlayers.map((player) => (
                        <div
                            key={player.id}
                            className="flex justify-between items-center p-2 bg-white rounded"
                        >
                            <div>
                                <span className="font-semibold">#{player.number}</span> {player.name}
                            </div>
                            <div className="text-xs">
                                <span className="font-bold text-blue-600">
                                    {(player.points1 || 0) * 1 + player.points2 * 2 + player.points3 * 3}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
