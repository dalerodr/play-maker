import { useState, useCallback, useMemo } from 'react';
import { Player, Team, PlayEvent, TeamStats } from '../types';
import { TEAM_CONFIG } from '../config/playersConfig';

const initializePlayers = (): Player[] => {
    const homeTeam: Player[] = TEAM_CONFIG.home.players.map((config, i) => ({
        id: `home-${i}`,
        number: config.number,
        name: config.name,
        team: 'home' as Team,
        points1: 0,
        points2: 0,
        points3: 0,
        fouls: 0,
        rebounds: 0,
        assists: 0,
        steals: 0,
        turnovers: 0,
        technicalFouls: 0,
        unsportingFouls: 0,
    }));

    const awayTeam: Player[] = TEAM_CONFIG.away.players.map((config, i) => ({
        id: `away-${i}`,
        number: config.number,
        name: config.name,
        team: 'away' as Team,
        points1: 0,
        points2: 0,
        points3: 0,
        fouls: 0,
        rebounds: 0,
        assists: 0,
        steals: 0,
        turnovers: 0,
        technicalFouls: 0,
        unsportingFouls: 0,
    }));

    return [...homeTeam, ...awayTeam];
};

export const useGameState = () => {
    const [players, setPlayers] = useState<Player[]>(initializePlayers);
    const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
    const [currentQuarter, setCurrentQuarter] = useState(1);
    const [events, setEvents] = useState<PlayEvent[]>([]);
    const [onField, setOnField] = useState<{ [key: string]: boolean }>(() => {
        const initial: { [key: string]: boolean } = {};
        const allPlayers = initializePlayers();
        // First 5 of each team on field by default
        allPlayers.slice(0, 5).forEach((p) => { initial[p.id] = true; });
        allPlayers.slice(12, 17).forEach((p) => { initial[p.id] = true; });
        return initial;
    });
    const [teamNames, setTeamNames] = useState<{ home: string; away: string }>({ home: 'Local', away: 'Visitante' });
    const [teamLogos, setTeamLogos] = useState<{ home: string | null; away: string | null }>({ home: null, away: null });

    const calculateTeamStats = useCallback((allPlayers: Player[], team: Team): TeamStats => {
        const teamPlayers = allPlayers.filter((p) => p.team === team);
        return {
            totalPoints: teamPlayers.reduce((sum, p) => sum + (p.points1 || 0) * 1 + p.points2 * 2 + p.points3 * 3, 0),
            totalFouls: teamPlayers.reduce((sum, p) => sum + p.fouls, 0),
            field1Points: teamPlayers.reduce((sum, p) => sum + (p.points1 || 0), 0),
            field2Points: teamPlayers.reduce((sum, p) => sum + p.points2, 0),
            field3Points: teamPlayers.reduce((sum, p) => sum + p.points3, 0),
            totalRebounds: teamPlayers.reduce((sum, p) => sum + p.rebounds, 0),
            totalAssists: teamPlayers.reduce((sum, p) => sum + p.assists, 0),
            totalSteals: teamPlayers.reduce((sum, p) => sum + (p.steals || 0), 0),
            totalTurnovers: teamPlayers.reduce((sum, p) => sum + (p.turnovers || 0), 0),
        };
    }, []);

    const homeStats = useMemo(() => calculateTeamStats(players, 'home'), [players, calculateTeamStats]);
    const awayStats = useMemo(() => calculateTeamStats(players, 'away'), [players, calculateTeamStats]);

    const resetGame = useCallback((currentPlayers: Player[], currentTeamNames: { home: string; away: string }) => {
        // Nombres por defecto para los 5 titulares (posiciones)
        const defaultPositions = ['Base', 'Escolta', 'Alero', 'Ala-Pívot', 'Pívot'];
        
        // Resetear jugadores: primeros 5 a posiciones por defecto, reservas mantienen nombre
        const resetedPlayers = currentPlayers.map((player, index) => {
            const teamIndex = player.team === 'home' 
                ? index 
                : index - TEAM_CONFIG.home.players.length;
            
            // Los primeros 5 de cada equipo se restauran a posición por defecto
            const name = teamIndex < 5 ? defaultPositions[teamIndex] : player.name;
            
            return {
                ...player,
                name,
                points1: 0,
                points2: 0,
                points3: 0,
                fouls: 0,
                rebounds: 0,
                assists: 0,
                steals: 0,
                turnovers: 0,
                technicalFouls: 0,
                unsportingFouls: 0,
            };
        });
        
        // Resetear onField: primeros 5 de cada equipo en cancha
        const newOnField: { [key: string]: boolean } = {};
        resetedPlayers.forEach((player) => {
            const teamIndex = player.team === 'home' 
                ? resetedPlayers.filter(p => p.team === 'home').indexOf(player)
                : resetedPlayers.filter(p => p.team === 'away').indexOf(player);
            // Los primeros 5 de cada equipo están en cancha
            newOnField[player.id] = teamIndex < 5;
        });
        
        setPlayers(resetedPlayers);
        setEvents([]);
        setSelectedPlayerId(null);
        setCurrentQuarter(1);
        setOnField(newOnField);
        setTeamNames(currentTeamNames);
    }, []);

    return {
        players,
        setPlayers,
        selectedPlayerId,
        setSelectedPlayerId,
        currentQuarter,
        setCurrentQuarter,
        events,
        setEvents,
        onField,
        setOnField,
        teamNames,
        setTeamNames,
        teamLogos,
        setTeamLogos,
        homeStats,
        awayStats,
        calculateTeamStats,
        resetGame,
    };
};
