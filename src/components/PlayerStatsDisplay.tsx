import { FC } from 'react';
import { Player } from '../types';

interface PlayerStatsDisplayProps {
    player: Player | null;
}

export const PlayerStatsDisplay: FC<PlayerStatsDisplayProps> = ({
    player,
}) => {
    if (!player) {
        return (
            <div className="bg-gray-100 p-6 rounded-lg text-center text-gray-500">
                Selecciona un jugador
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-center mb-6">
                <div className="text-5xl font-bold text-blue-600">{player.number}</div>
                <div className="text-2xl font-bold mt-2">{player.name}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-100 p-4 rounded text-center">
                    <div className="text-3xl font-bold text-blue-600">
                        {player.points2}
                    </div>
                    <div className="text-sm text-gray-600">2 Puntos</div>
                </div>
                <div className="bg-red-100 p-4 rounded text-center">
                    <div className="text-3xl font-bold text-red-600">{player.points3}</div>
                    <div className="text-sm text-gray-600">3 Puntos</div>
                </div>
                <div className="bg-yellow-100 p-4 rounded text-center">
                    <div className="text-3xl font-bold text-yellow-600">
                        {player.fouls}
                    </div>
                    <div className="text-sm text-gray-600">Faltas</div>
                </div>
                <div className="bg-green-100 p-4 rounded text-center">
                    <div className="text-3xl font-bold text-green-600">
                        {player.rebounds}
                    </div>
                    <div className="text-sm text-gray-600">Rebotes</div>
                </div>
                <div className="bg-purple-100 p-4 rounded text-center">
                    <div className="text-3xl font-bold text-purple-600">
                        {player.assists}
                    </div>
                    <div className="text-sm text-gray-600">Asistencias</div>
                </div>
                <div className="bg-orange-100 p-4 rounded text-center">
                    <div className="text-3xl font-bold text-orange-600">
                        {(player.points1 || 0) * 1 + player.points2 * 2 + player.points3 * 3}
                    </div>
                    <div className="text-sm text-gray-600">Total Puntos</div>
                </div>
            </div>
        </div>
    );
};
