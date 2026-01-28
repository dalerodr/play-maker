

import { Player } from '../types';

type Props = {
    players: Player[];
    selectedPlayerId: string | null;
    onSelectPlayer: (playerId: string) => void;
};

const PlayerActionSelector = ({ players, selectedPlayerId, onSelectPlayer }: Props) => {
    const handlePlayerClick = (playerId: string) => {
        if (selectedPlayerId === playerId) {
            onSelectPlayer('');
        } else {
            onSelectPlayer(playerId);
        }
    };

    // Determine team color based on first player
    const team = players.length > 0 ? players[0].team : 'home';
    const isHome = team === 'home';
    const textColor = isHome ? 'text-[#CE1141]' : 'text-[#222]';
    const bgSelected = isHome ? 'bg-[#CE1141]' : 'bg-[#222]';
    const borderSelected = isHome ? 'border-[#000]' : 'border-[#CE1141]';
    const hoverBg = isHome ? 'hover:bg-[#CE1141]' : 'hover:bg-[#222]';
    const hoverBorder = isHome ? 'hover:border-[#000]' : 'hover:border-[#CE1141]';
    const borderColor = isHome ? 'border-gray-300' : 'border-gray-300';

    return (
        <div className="flex flex-col gap-0.5">
            {players.map((player) => (
                <button
                    key={player.id}
                    onClick={() => handlePlayerClick(player.id)}
                    className={`flex items-center justify-between px-1 py-3 rounded-lg shadow text-xs font-bold transition border-2
                        ${selectedPlayerId === player.id
                            ? `${bgSelected} text-white ${borderSelected}`
                            : `bg-white ${textColor} ${borderColor} ${hoverBg} hover:text-white ${hoverBorder}`
                        }`
                    }
                >
                    <span className="text-xs font-bold">#{player.number}</span>
                    <span className="truncate flex-1 text-xs text-center px-1">{player.name}</span>
                </button>
            ))}
        </div>
    );
};

export { PlayerActionSelector };
