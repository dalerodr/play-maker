import { memo } from 'react';
import { Player } from '../../types';

interface SummaryTabProps {
    players: Player[];
    teamNames: { home: string; away: string };
}

const SummaryTab = memo(({ players, teamNames }: SummaryTabProps) => {
    const getTeamStats = (team: 'home' | 'away') => {
        const teamPlayers = players.filter((p) => p.team === team);
        return teamPlayers.map((player) => ({
            ...player,
            totalPoints: (player.points1 || 0) * 1 + player.points2 * 2 + player.points3 * 3,
        }));
    };

    return (
        <div className="animate-slide-up">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {(['home', 'away'] as ('home' | 'away')[]).map((team) => {
                    const teamPlayers = getTeamStats(team);
                    return (
                        <div key={team} className="glass-card p-3">
                            <h3 className="text-sm font-bold mb-3 text-bulls-red uppercase tracking-wider">
                                {team === 'home' ? teamNames.home : teamNames.away}
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-xs">
                                    <thead>
                                        <tr className="border-b border-white/10">
                                            <th className="p-1.5 text-left text-white/60">#</th>
                                            <th className="p-1.5 text-left text-white/60">Nombre</th>
                                            <th className="p-1.5 text-center text-white/60">Pts</th>
                                            <th className="p-1.5 text-center text-white/60">Reb</th>
                                            <th className="p-1.5 text-center text-white/60">Ast</th>
                                            <th className="p-1.5 text-center text-white/60">Rob</th>
                                            <th className="p-1.5 text-center text-white/60">Pér</th>
                                            <th className="p-1.5 text-center text-white/60">Fal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {teamPlayers.map((player) => (
                                            <tr key={player.id} className="border-b border-white/5 hover:bg-white/5">
                                                <td className="p-1.5 font-bold text-bulls-red">{player.number}</td>
                                                <td className="p-1.5 text-white/90">{player.name}</td>
                                                <td className="p-1.5 text-center text-bulls-neon font-bold">{player.totalPoints}</td>
                                                <td className="p-1.5 text-center text-white/70">{player.rebounds}</td>
                                                <td className="p-1.5 text-center text-white/70">{player.assists}</td>
                                                <td className="p-1.5 text-center text-white/70">{player.steals || 0}</td>
                                                <td className="p-1.5 text-center text-white/70">{player.turnovers || 0}</td>
                                                <td className="p-1.5 text-center text-white/70">{player.fouls}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
});

SummaryTab.displayName = 'SummaryTab';

export default SummaryTab;
