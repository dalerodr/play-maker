import { useCallback } from 'react';
import { Player, Team, PlayEvent } from '../types';

interface UsePlayerActionsProps {
    players: Player[];
    setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
    selectedPlayerId: string | null;
    setSelectedPlayerId: React.Dispatch<React.SetStateAction<string | null>>;
    onField: { [key: string]: boolean };
    setOnField: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
    events: PlayEvent[];
    setEvents: React.Dispatch<React.SetStateAction<PlayEvent[]>>;
    currentQuarter: number;
    timer: { minute: number; second: number };
    calculateTeamStats: (players: Player[], team: Team) => any;
}

export const usePlayerActions = ({
    players,
    setPlayers,
    selectedPlayerId,
    setSelectedPlayerId,
    onField,
    setOnField,
    events,
    setEvents,
    currentQuarter,
    timer,
    calculateTeamStats,
}: UsePlayerActionsProps) => {

    const handleSelectPlayer = useCallback((playerId: string) => {
        if (!playerId) {
            setSelectedPlayerId(null);
            return;
        }
        const player = players.find((p) => p.id === playerId);
        if (player) {
            if (selectedPlayerId && selectedPlayerId !== playerId) {
                const currentPlayer = players.find((p) => p.id === selectedPlayerId);
                if (currentPlayer && currentPlayer.team !== player.team) {
                    setSelectedPlayerId(null);
                }
            }
            setSelectedPlayerId(playerId);
        }
    }, [players, selectedPlayerId, setSelectedPlayerId]);

    const handleToggleOnField = useCallback((playerId: string) => {
        const player = players.find((p) => p.id === playerId);
        if (player) {
            const teamOnField = Object.entries(onField)
                .filter(([id]) => players.find((p) => p.id === id && p.team === player.team) && onField[id])
                .length;

            if (onField[playerId]) {
                setOnField((prev) => ({ ...prev, [playerId]: false }));
            } else if (teamOnField < 5) {
                setOnField((prev) => ({ ...prev, [playerId]: true }));
            }
        }
    }, [players, onField, setOnField]);

    const handleAction = useCallback((action: string) => {
        if (!selectedPlayerId) {
            alert('Por favor selecciona un jugador');
            return;
        }

        if (!onField[selectedPlayerId]) {
            alert('Este jugador está en la banca y no puede realizar acciones');
            return;
        }

        const player = players.find((p) => p.id === selectedPlayerId);
        if (!player) return;

        const updatedPlayers = players.map((p) => {
            if (p.id === selectedPlayerId) {
                switch (action) {
                    case 'points1':
                        return { ...p, points1: (p.points1 || 0) + 1 };
                    case 'points2':
                        return { ...p, points2: p.points2 + 1 };
                    case 'points3':
                        return { ...p, points3: p.points3 + 1 };
                    case 'foul':
                        return { ...p, fouls: p.fouls + 1 };
                    case 'technical_foul':
                        return { ...p, fouls: p.fouls + 1, technicalFouls: (p.technicalFouls || 0) + 1 };
                    case 'unsporting_foul':
                        return { ...p, fouls: p.fouls + 1, unsportingFouls: (p.unsportingFouls || 0) + 1 };
                    case 'rebound':
                        return { ...p, rebounds: p.rebounds + 1 };
                    case 'assist':
                        return { ...p, assists: p.assists + 1 };
                    case 'steal':
                        return { ...p, steals: (p.steals || 0) + 1 };
                    case 'turnover':
                        return { ...p, turnovers: (p.turnovers || 0) + 1 };
                    default:
                        return p;
                }
            }
            return p;
        });

        setPlayers(updatedPlayers);

        const teamStats = calculateTeamStats(updatedPlayers, player.team);

        const event: PlayEvent = {
            id: `${Date.now()}-${Math.random()}`,
            timestamp: `Minuto ${timer.minute} Cuarto ${currentQuarter}`,
            quarter: currentQuarter,
            minute: timer.minute,
            second: timer.second,
            playerId: selectedPlayerId,
            playerName: player.name,
            playerNumber: player.number,
            team: player.team,
            action: action as any,
            teamStats,
        };

        setEvents((prev) => [...prev, event]);

        return { updatedPlayers, updatedPlayer: updatedPlayers.find(p => p.id === selectedPlayerId) };
    }, [selectedPlayerId, onField, players, setPlayers, setEvents, currentQuarter, timer, calculateTeamStats]);

    const handleUndoLastAction = useCallback(() => {
        if (events.length === 0) {
            alert('No hay acciones para deshacer');
            return;
        }

        const lastEvent = events[events.length - 1];
        setEvents((prev) => prev.slice(0, -1));

        setPlayers((prevPlayers) => {
            return prevPlayers.map((player) => {
                if (player.id !== lastEvent.playerId) return player;
                let p = { ...player };
                switch (lastEvent.action) {
                    case 'points1': p.points1 = Math.max(0, (p.points1 || 0) - 1); break;
                    case 'points2': p.points2 = Math.max(0, p.points2 - 1); break;
                    case 'points3': p.points3 = Math.max(0, p.points3 - 1); break;
                    case 'foul': p.fouls = Math.max(0, p.fouls - 1); break;
                    case 'technical_foul':
                        p.fouls = Math.max(0, p.fouls - 1);
                        p.technicalFouls = Math.max(0, (p.technicalFouls || 0) - 1);
                        break;
                    case 'unsporting_foul':
                        p.fouls = Math.max(0, p.fouls - 1);
                        p.unsportingFouls = Math.max(0, (p.unsportingFouls || 0) - 1);
                        break;
                    case 'rebound': p.rebounds = Math.max(0, p.rebounds - 1); break;
                    case 'assist': p.assists = Math.max(0, p.assists - 1); break;
                    case 'steal': p.steals = Math.max(0, (p.steals || 0) - 1); break;
                    case 'turnover': p.turnovers = Math.max(0, (p.turnovers || 0) - 1); break;
                    default: break;
                }
                return p;
            });
        });

        return lastEvent;
    }, [events, setEvents, setPlayers]);

    const handleEditEvent = useCallback((eventId: string, newAction: string) => {
        setEvents((prevEvents) => {
            const updatedEvents = prevEvents.map((event) =>
                event.id === eventId ? { ...event, action: newAction as any } : event
            );

            const editedEvent = prevEvents.find((event) => event.id === eventId);
            if (!editedEvent) return updatedEvents;

            setPlayers((prevPlayers) => {
                return prevPlayers.map((player) => {
                    if (player.id !== editedEvent.playerId) return player;
                    let p = { ...player };
                    switch (editedEvent.action) {
                        case 'points1': p.points1 = Math.max(0, (p.points1 || 0) - 1); break;
                        case 'points2': p.points2 = Math.max(0, p.points2 - 1); break;
                        case 'points3': p.points3 = Math.max(0, p.points3 - 1); break;
                        case 'foul': p.fouls = Math.max(0, p.fouls - 1); break;
                        case 'technical_foul':
                            p.fouls = Math.max(0, p.fouls - 1);
                            p.technicalFouls = Math.max(0, (p.technicalFouls || 0) - 1);
                            break;
                        case 'unsporting_foul':
                            p.fouls = Math.max(0, p.fouls - 1);
                            p.unsportingFouls = Math.max(0, (p.unsportingFouls || 0) - 1);
                            break;
                        case 'rebound': p.rebounds = Math.max(0, p.rebounds - 1); break;
                        case 'assist': p.assists = Math.max(0, p.assists - 1); break;
                        case 'steal': p.steals = Math.max(0, (p.steals || 0) - 1); break;
                        case 'turnover': p.turnovers = Math.max(0, (p.turnovers || 0) - 1); break;
                        default: break;
                    }
                    switch (newAction) {
                        case 'points1': p.points1 = (p.points1 || 0) + 1; break;
                        case 'points2': p.points2 += 1; break;
                        case 'points3': p.points3 += 1; break;
                        case 'foul': p.fouls += 1; break;
                        case 'technical_foul':
                            p.fouls += 1;
                            p.technicalFouls = (p.technicalFouls || 0) + 1;
                            break;
                        case 'unsporting_foul':
                            p.fouls += 1;
                            p.unsportingFouls = (p.unsportingFouls || 0) + 1;
                            break;
                        case 'rebound': p.rebounds += 1; break;
                        case 'assist': p.assists += 1; break;
                        case 'steal': p.steals = (p.steals || 0) + 1; break;
                        case 'turnover': p.turnovers = (p.turnovers || 0) + 1; break;
                        default: break;
                    }
                    return p;
                });
            });
            return updatedEvents;
        });
    }, [setEvents, setPlayers]);

    const handleDeleteEvent = useCallback((eventId: string) => {
        setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
        setPlayers((prevPlayers) => {
            const deletedEvent = events.find((event) => event.id === eventId);
            if (!deletedEvent) return prevPlayers;
            return prevPlayers.map((player) => {
                if (player.id !== deletedEvent.playerId) return player;
                let p = { ...player };
                switch (deletedEvent.action) {
                    case 'points1': p.points1 = Math.max(0, (p.points1 || 0) - 1); break;
                    case 'points2': p.points2 = Math.max(0, p.points2 - 1); break;
                    case 'points3': p.points3 = Math.max(0, p.points3 - 1); break;
                    case 'foul': p.fouls = Math.max(0, p.fouls - 1); break;
                    case 'technical_foul':
                        p.fouls = Math.max(0, p.fouls - 1);
                        p.technicalFouls = Math.max(0, (p.technicalFouls || 0) - 1);
                        break;
                    case 'unsporting_foul':
                        p.fouls = Math.max(0, p.fouls - 1);
                        p.unsportingFouls = Math.max(0, (p.unsportingFouls || 0) - 1);
                        break;
                    case 'rebound': p.rebounds = Math.max(0, p.rebounds - 1); break;
                    case 'assist': p.assists = Math.max(0, p.assists - 1); break;
                    case 'steal': p.steals = Math.max(0, (p.steals || 0) - 1); break;
                    case 'turnover': p.turnovers = Math.max(0, (p.turnovers || 0) - 1); break;
                    default: break;
                }
                return p;
            });
        });
    }, [events, setEvents, setPlayers]);

    const handleSavePlayer = useCallback((playerId: string, newName: string, newNumber: number) => {
        setPlayers((prev) =>
            prev.map((p) =>
                p.id === playerId ? { ...p, name: newName, number: newNumber } : p
            )
        );
    }, [setPlayers]);

    const handleSaveTeamName = useCallback((_team: Team, _teamName: string) => {
        // This is handled in the parent component
    }, []);

    const handleSubstituteFouledOut = useCallback((fouledOutId: string, replacementId: string) => {
        setOnField((prev) => ({
            ...prev,
            [fouledOutId]: false,
            [replacementId]: true,
        }));
        setSelectedPlayerId(null);
    }, [setOnField, setSelectedPlayerId]);

    return {
        handleSelectPlayer,
        handleToggleOnField,
        handleAction,
        handleUndoLastAction,
        handleEditEvent,
        handleDeleteEvent,
        handleSavePlayer,
        handleSaveTeamName,
        handleSubstituteFouledOut,
    };
};
