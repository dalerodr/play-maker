import { useState, useEffect } from 'react';
import { Player, Team, PlayEvent, TeamStats } from './types';
import { useQuarterTimer } from './hooks/useQuarterTimer';
import { ActionButtons } from './components/ActionButtons';
import { QuarterTimer } from './components/QuarterTimer';
import { GameEventLog } from './components/GameEventLog';
import { TabNavigation } from './components/TabNavigation';
import { PlayerActionSelector } from './components/PlayerActionSelector';
import { EditTeamModal } from './components/EditTeamModal';
import { FoulOutModal } from './components/FoulOutModal';
import { TEAM_CONFIG } from './config/playersConfig';
import './App.css';

// Sample data initialization
const initializePlayers = (): Player[] => {
    const homeTeam: Player[] = TEAM_CONFIG.home.players.map((config, i) => ({
        id: `home-${i}`,
        number: config.number,
        name: config.name,
        team: 'home',
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
        team: 'away',
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

export default function App() {
    const [players, setPlayers] = useState<Player[]>(initializePlayers());
    const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
    const [currentQuarter, setCurrentQuarter] = useState(1);
    const [events, setEvents] = useState<PlayEvent[]>([]);
    const [onField, setOnField] = useState<{ [key: string]: boolean }>({});
    const [activeTab, setActiveTab] = useState<'actions' | 'teams' | 'summary'>('actions');
    const [showSubsModal, setShowSubsModal] = useState(false);
    const [showEditTeamModal, setShowEditTeamModal] = useState<Team | null>(null);
    const [teamNames, setTeamNames] = useState<{ home: string; away: string }>({ home: 'Local', away: 'Visitante' });
    const [teamLogos, setTeamLogos] = useState<{ home: string | null; away: string | null }>({ home: null, away: null });
    const [showHomeLogoUpload, setShowHomeLogoUpload] = useState(false);
    const [showAwayLogoUpload, setShowAwayLogoUpload] = useState(false);
    const [showFoulOutModal, setShowFoulOutModal] = useState<{ playerId: string; playerName: string; team: Team; reason?: string } | null>(null);
    const { timer, toggleTimer, resetTimer, setTimeManually } = useQuarterTimer();

    // Initialize on field players
    useEffect(() => {
        const initial: { [key: string]: boolean } = {};
        players.slice(0, 5).forEach((p) => {
            initial[p.id] = true;
        });
        players.slice(12, 17).forEach((p) => {
            initial[p.id] = true;
        });
        setOnField(initial);
    }, []);

    // Updated: allow deselection (empty string or null)
    // Desincronizar: solo un jugador seleccionado a la vez (desselecciona del otro equipo)
    const handleSelectPlayer = (playerId: string) => {
        if (!playerId) {
            setSelectedPlayerId(null);
            return;
        }
        const player = players.find((p) => p.id === playerId);
        if (player) {
            // Si ya hay otro jugador seleccionado y es del otro equipo, deseleccionar primero
            if (selectedPlayerId && selectedPlayerId !== playerId) {
                const currentPlayer = players.find((p) => p.id === selectedPlayerId);
                if (currentPlayer && currentPlayer.team !== player.team) {
                    // Equipos diferentes: desseleccionar el anterior
                    setSelectedPlayerId(null);
                }
            }
            setSelectedPlayerId(playerId);
        }
    };

    const handleToggleOnField = (playerId: string) => {
        const player = players.find((p) => p.id === playerId);
        if (player) {
            const teamOnField = Object.entries(onField)
                .filter(([id]) => players.find((p) => p.id === id && p.team === player.team) && onField[id])
                .length;

            if (onField[playerId]) {
                // Desmarcar
                setOnField((prev) => ({ ...prev, [playerId]: false }));
            } else if (teamOnField < 5) {
                // Marcar si hay menos de 5
                setOnField((prev) => ({ ...prev, [playerId]: true }));
            }
        }
    };

    const handleAction = (action: string) => {
        if (!selectedPlayerId) {
            alert('Por favor selecciona un jugador');
            return;
        }

        // Verificar si el jugador está en el campo
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

        // Calculate team stats
        const teamStats = calculateTeamStats(updatedPlayers, player.team);

        // Create event
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

        // Check for foul out or disqualification conditions
        const updatedPlayer = updatedPlayers.find(p => p.id === selectedPlayerId);
        if (updatedPlayer) {
            if (updatedPlayer.fouls === 5) {
                setShowFoulOutModal({
                    playerId: updatedPlayer.id,
                    playerName: updatedPlayer.name,
                    team: updatedPlayer.team,
                    reason: `${updatedPlayer.name} ha alcanzado 5 faltas personales.`
                });
            } else if ((updatedPlayer.technicalFouls || 0) >= 2) {
                setShowFoulOutModal({
                    playerId: updatedPlayer.id,
                    playerName: updatedPlayer.name,
                    team: updatedPlayer.team,
                    reason: `${updatedPlayer.name} ha sido descalificado por acumular 2 faltas técnicas.`
                });
            } else if ((updatedPlayer.unsportingFouls || 0) >= 2) {
                setShowFoulOutModal({
                    playerId: updatedPlayer.id,
                    playerName: updatedPlayer.name,
                    team: updatedPlayer.team,
                    reason: `${updatedPlayer.name} ha sido descalificado por acumular 2 faltas antideportivas.`
                });
            }
        }
    };

    const calculateTeamStats = (allPlayers: Player[], team: Team): TeamStats => {
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
    };

    const homeStats = calculateTeamStats(players, 'home');
    const awayStats = calculateTeamStats(players, 'away');
    // selectedPlayer not needed here (we use selectedPlayerId and players array where required)

    const handleExportData = () => {
        const exportData = {
            gameDate: new Date().toISOString(),
            finalStats: {
                home: { ...homeStats, players: players.filter((p) => p.team === 'home') },
                away: { ...awayStats, players: players.filter((p) => p.team === 'away') },
            },
            events,
        };
        const dataStr = JSON.stringify(exportData, null, 2);
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(dataStr));
        element.setAttribute('download', `basket-stats-${Date.now()}.json`);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    const handleSavePlayer = (playerId: string, newName: string, newNumber: number) => {
        setPlayers((prev) =>
            prev.map((p) =>
                p.id === playerId ? { ...p, name: newName, number: newNumber } : p
            )
        );
    };

    const handleSaveTeamName = (team: Team, teamName: string) => {
        setTeamNames((prev) => ({
            ...prev,
            [team]: teamName,
        }));
    };

    const handleEditEvent = (eventId: string, newAction: string) => {
        setEvents((prevEvents) => {
            const updatedEvents = prevEvents.map((event) =>
                event.id === eventId ? { ...event, action: newAction as any } : event
            );

            // Encuentra el evento editado
            const editedEvent = prevEvents.find((event) => event.id === eventId);
            if (!editedEvent) return updatedEvents;

            // Revertir la estadística anterior y aplicar la nueva
            setPlayers((prevPlayers) => {
                return prevPlayers.map((player) => {
                    if (player.id !== editedEvent.playerId) return player;
                    // Revertir acción anterior
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
                    // Aplicar nueva acción
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
    };

    const handleUndoLastAction = () => {
        if (events.length === 0) {
            alert('No hay acciones para deshacer');
            return;
        }

        const lastEvent = events[events.length - 1];

        // Revertir el evento del registro
        setEvents((prev) => prev.slice(0, -1));

        // Revertir las estadísticas del jugador
        setPlayers((prevPlayers) => {
            return prevPlayers.map((player) => {
                if (player.id !== lastEvent.playerId) return player;
                let p = { ...player };
                switch (lastEvent.action) {
                    case 'points1':
                        p.points1 = Math.max(0, (p.points1 || 0) - 1);
                        break;
                    case 'points2':
                        p.points2 = Math.max(0, p.points2 - 1);
                        break;
                    case 'points3':
                        p.points3 = Math.max(0, p.points3 - 1);
                        break;
                    case 'foul':
                        p.fouls = Math.max(0, p.fouls - 1);
                        break;
                    case 'technical_foul':
                        p.fouls = Math.max(0, p.fouls - 1);
                        p.technicalFouls = Math.max(0, (p.technicalFouls || 0) - 1);
                        break;
                    case 'unsporting_foul':
                        p.fouls = Math.max(0, p.fouls - 1);
                        p.unsportingFouls = Math.max(0, (p.unsportingFouls || 0) - 1);
                        break;
                    case 'rebound':
                        p.rebounds = Math.max(0, p.rebounds - 1);
                        break;
                    case 'assist':
                        p.assists = Math.max(0, p.assists - 1);
                        break;
                    case 'steal':
                        p.steals = Math.max(0, (p.steals || 0) - 1);
                        break;
                    case 'turnover':
                        p.turnovers = Math.max(0, (p.turnovers || 0) - 1);
                        break;
                    default:
                        break;
                }
                return p;
            });
        });

        // Si el modal de expulsión estaba abierto para este jugador, cerrarlo
        if (showFoulOutModal?.playerId === lastEvent.playerId) {
            setShowFoulOutModal(null);
        }
    };

    const handleSubstituteFouledOut = (fouledOutId: string, replacementId: string) => {
        setOnField((prev) => ({
            ...prev,
            [fouledOutId]: false,
            [replacementId]: true,
        }));
        setSelectedPlayerId(null);
    };

    return (
        <div className="min-h-screen w-full app-bg flex flex-col relative">
            {/* Logo Section - Positioned over gradient background */}
            <div className="w-full px-4 py-8 flex items-center justify-center gap-4">
                {/* Home Team Logo */}
                <div
                    className="relative cursor-pointer flex-shrink-0 z-10"
                    onClick={() => setShowHomeLogoUpload(!showHomeLogoUpload)}
                >
                    <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center shadow-lg border-4 border-white overflow-hidden">
                        {teamLogos.home ? (
                            <img src={teamLogos.home} alt="Home Team Logo" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-2xl font-bold text-gray-400">+</span>
                        )}
                    </div>
                    {showHomeLogoUpload && (
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onload = (event) => {
                                        setTeamLogos({ ...teamLogos, home: event.target?.result as string });
                                        setShowHomeLogoUpload(false);
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                            className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer"
                            onClick={(e) => e.stopPropagation()}
                        />
                    )}
                </div>

                {/* Scoreboard (QuarterTimer) */}
                <div className="flex items-center justify-center">
                    <QuarterTimer
                        quarter={currentQuarter}
                        timer={timer}
                        onToggleTimer={toggleTimer}
                        onResetTimer={resetTimer}
                        onTimeChange={setTimeManually}
                        onQuarterChange={setCurrentQuarter}
                        homeStats={homeStats}
                        awayStats={awayStats}
                        homeTeamName={teamNames.home}
                        awayTeamName={teamNames.away}
                    />
                </div>

                {/* Away Team Logo */}
                <div
                    className="relative cursor-pointer flex-shrink-0 z-10"
                    onClick={() => setShowAwayLogoUpload(!showAwayLogoUpload)}
                >
                    <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center shadow-lg border-4 border-white overflow-hidden">
                        {teamLogos.away ? (
                            <img src={teamLogos.away} alt="Away Team Logo" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-2xl font-bold text-gray-400">+</span>
                        )}
                    </div>
                    {showAwayLogoUpload && (
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onload = (event) => {
                                        setTeamLogos({ ...teamLogos, away: event.target?.result as string });
                                        setShowAwayLogoUpload(false);
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                            className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer"
                            onClick={(e) => e.stopPropagation()}
                        />
                    )}
                </div>
            </div>

            {/* Container for controls - Below logos */}
            <div className="container mx-auto px-4 py-3 flex-shrink-0 z-20">
                {/* Tab Navigation */}
                <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} position="top" />

                {/* Action/Team/Change buttons below tabs (only visible on Acciones tab) */}
                {activeTab === 'actions' && (
                    <div className="w-full flex gap-3 justify-center flex-wrap mt-4 mb-2">
                        <button
                            onClick={handleUndoLastAction}
                            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded text-sm transition border border-white"
                        >
                            ↶ Deshacer
                        </button>
                        <button
                            onClick={() => setShowSubsModal(true)}
                            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded text-sm transition"
                        >
                            🔁 Cambios / Sustituciones
                        </button>
                    </div>
                )}
            </div>

            {/* Main Content Area - Scrollable if needed */}
            <div className="flex-1 overflow-y-auto">
                <div className="container mx-auto px-4 py-2">
                    {activeTab === 'actions' && (
                        <div>
                            {/* Headings row: align 'Jugadores en cancha' and 'Registro de Eventos' */}
                            <div className="grid grid-cols-12 gap-2 mb-2 items-end">
                                <div className="col-span-3 flex justify-center">
                                    <h2 className="text-2xl font-bold section-title">Jugadores en cancha</h2>
                                </div>
                                <div className="col-span-6 flex justify-center">
                                    <h2 className="text-2xl font-bold section-title">Registro de Eventos</h2>
                                </div>
                                <div className="col-span-3"></div>
                            </div>

                            <div className="grid grid-cols-12 gap-2 mb-6 items-start h-96">
                                {/* Left: Two columns for on-field players - larger */}
                                <div className="col-span-3 flex flex-row gap-1 items-start">
                                    <div className="flex-1">
                                        <h4 className="text-xs font-bold mb-1 text-center section-subtle">Local</h4>
                                        <div className="overflow-y-auto max-h-80">
                                            <PlayerActionSelector
                                                players={players.filter((p) => p.team === 'home' && onField[p.id])}
                                                selectedPlayerId={selectedPlayerId}
                                                onSelectPlayer={handleSelectPlayer}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-xs font-bold mb-1 text-center section-subtle">Visitante</h4>
                                        <div className="overflow-y-auto max-h-80">
                                            <PlayerActionSelector
                                                players={players.filter((p) => p.team === 'away' && onField[p.id])}
                                                selectedPlayerId={selectedPlayerId}
                                                onSelectPlayer={handleSelectPlayer}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Center: Event Log */}
                                <div className="col-span-6 flex flex-col">
                                    <div className="bg-white p-3 rounded-lg shadow-lg overflow-y-auto max-h-80">
                                        <GameEventLog
                                            events={events}
                                            onEditEvent={handleEditEvent}
                                            onDeleteEvent={(eventId) => {
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
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Right: Narrow column for Action Buttons - smaller */}
                                <div className="col-span-3 flex flex-col items-center justify-start h-full">
                                    <div className="w-full h-full overflow-y-auto">
                                        <ActionButtons
                                            selectedPlayerId={selectedPlayerId}
                                            onAction={handleAction}
                                            isPlayerOnField={selectedPlayerId ? onField[selectedPlayerId] : false}
                                            size="sm"
                                            columns={2}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Substitutions Modal (simple) */}
                            {showSubsModal && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                                    <div className="w-11/12 md:w-3/4 lg:w-1/2 bg-white rounded-lg p-6">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-lg font-bold">Cambios y Sustituciones</h3>
                                            <button onClick={() => setShowSubsModal(false)} className="text-sm text-gray-600">Cerrar</button>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {(['home', 'away'] as ('home' | 'away')[]).map((team) => {
                                                const teamPlayers = players.filter((p) => p.team === team);
                                                const onFieldPlayers = teamPlayers.filter((p) => onField[p.id]);
                                                return (
                                                    <div key={team} className="p-2 border rounded">
                                                        <h4 className="font-semibold mb-2">{team === 'home' ? teamNames.home : teamNames.away}</h4>
                                                        <p className="text-xs text-gray-600 mb-2">En Campo ({onFieldPlayers.length}/5)</p>
                                                        <div className="space-y-1 mb-3">
                                                            {teamPlayers.map((player) => (
                                                                <div key={player.id} className="flex items-center justify-between">
                                                                    <div>#{player.number} {player.name}</div>
                                                                    <button
                                                                        onClick={() => handleToggleOnField(player.id)}
                                                                        className={`text-sm py-1 px-2 rounded ${onField[player.id] ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
                                                                    >
                                                                        {onField[player.id] ? 'En Campo' : 'Banca'}
                                                                    </button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'teams' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-4 section-title">Editar Equipos</h2>
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {(['home', 'away'] as ('home' | 'away')[]).map((team) => (
                                        <div key={team} className="border rounded p-4">
                                            <h3 className="text-xl font-bold mb-3 section-subtle">{team === 'home' ? teamNames.home : teamNames.away}</h3>
                                            <div className="space-y-3">
                                                {players.filter((p) => p.team === team).map((player) => (
                                                    <div key={player.id} className="flex items-center gap-2 border rounded p-2 bg-gray-50">
                                                        <input
                                                            type="text"
                                                            value={`${player.number}`}
                                                            onChange={(e) => {
                                                                const newNumber = parseInt(e.target.value) || 0;
                                                                handleSavePlayer(player.id, player.name, newNumber);
                                                            }}
                                                            className="w-12 px-2 py-1 border rounded text-center font-bold"
                                                            placeholder="#"
                                                        />
                                                        <input
                                                            type="text"
                                                            value={player.name}
                                                            onChange={(e) => {
                                                                handleSavePlayer(player.id, e.target.value, player.number);
                                                            }}
                                                            className="flex-1 px-2 py-1 border rounded"
                                                            placeholder="Nombre del jugador"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'summary' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-4 section-title">Resumen de Jugadores</h2>
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {['home', 'away'].map((team) => (
                                        <div key={team}>
                                            <h3 className="text-xl font-bold mb-2 section-subtle">{team === 'home' ? teamNames.home : teamNames.away}</h3>
                                            <table className="w-full text-xs">
                                                <thead>
                                                    <tr className="bg-[#222] text-white">
                                                        <th className="p-2">#</th>
                                                        <th className="p-2">Nombre</th>
                                                        <th className="p-2">Pts</th>
                                                        <th className="p-2">Reb</th>
                                                        <th className="p-2">Ast</th>
                                                        <th className="p-2">Rob</th>
                                                        <th className="p-2">Pér</th>
                                                        <th className="p-2">Fal</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {players.filter((p) => p.team === team).map((player) => (
                                                        <tr key={player.id} className="border-b">
                                                            <td className="p-2 font-bold text-[#CE1141]">{player.number}</td>
                                                            <td className="p-2 text-[#222]">{player.name}</td>
                                                            <td className="p-2 text-center text-[#CE1141]">{(player.points1 || 0) * 1 + player.points2 * 2 + player.points3 * 3}</td>
                                                            <td className="p-2 text-center text-[#222]">{player.rebounds}</td>
                                                            <td className="p-2 text-center text-[#222]">{player.assists}</td>
                                                            <td className="p-2 text-center text-[#222]">{player.steals || 0}</td>
                                                            <td className="p-2 text-center text-[#222]">{player.turnovers || 0}</td>
                                                            <td className="p-2 text-center text-[#222]">{player.fouls}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer - Fixed */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 border-t border-gray-700 flex-shrink-0">
                <div className="container mx-auto px-4 py-2 flex justify-center gap-2">
                    <button
                        onClick={handleExportData}
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-sm transition"
                    >
                        📥 Descargar
                    </button>
                    <button
                        onClick={() => {
                            setPlayers(initializePlayers());
                            setEvents([]);
                            setSelectedPlayerId(null);
                            setCurrentQuarter(1);
                            resetTimer();
                            setOnField({});
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-sm transition"
                    >
                        🔄 Nuevo Partido
                    </button>
                </div>
            </div>

            {/* Edit Team Modal */}
            {showEditTeamModal && (
                <EditTeamModal
                    isOpen={!!showEditTeamModal}
                    team={showEditTeamModal}
                    players={players}
                    onClose={() => setShowEditTeamModal(null)}
                    onSavePlayer={handleSavePlayer}
                    onSaveTeamName={handleSaveTeamName}
                    initialTeamName={teamNames[showEditTeamModal as Team]}
                />
            )}

            {/* Foul Out Modal */}
            {showFoulOutModal && (
                <FoulOutModal
                    isOpen={!!showFoulOutModal}
                    fouledOutPlayer={showFoulOutModal}
                    players={players}
                    onField={onField}
                    onSubstitute={handleSubstituteFouledOut}
                    onClose={() => setShowFoulOutModal(null)}
                />
            )}
        </div>
    );
}
