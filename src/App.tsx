import { useState, Suspense, lazy, useCallback } from 'react';
import { Team } from './types';
import { useQuarterTimer } from './hooks/useQuarterTimer';
import { useGameState } from './hooks/useGameState';
import { usePlayerActions } from './hooks/usePlayerActions';
import { useBodyScrollLock } from './hooks/useBodyScrollLock';
import { TabNavigation } from './components/TabNavigation';
import { QuarterTimer } from './components/QuarterTimer';
import { EditTeamsModal } from './components/EditTeamsModal';
import { FoulOutModal } from './components/FoulOutModal';
import './App.css';

// Lazy load tab content for code splitting
const ActionsTab = lazy(() => import('./components/tabs/ActionsTab'));
const SummaryTab = lazy(() => import('./components/tabs/SummaryTab'));

function App() {
    const {
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
    } = useGameState();

    const { timer, toggleTimer, resetTimer, setTimeManually } = useQuarterTimer();

    const {
        handleSelectPlayer,
        handleToggleOnField,
        handleAction,
        handleEditEvent,
        handleDeleteEvent,
        handleUndoLastAction,
        handleSubstituteFouledOut,
    } = usePlayerActions({
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
    });

    const [activeTab, setActiveTab] = useState<'actions' | 'summary'>('actions');
    const [showSubsModal, setShowSubsModal] = useState(false);
    const [showEditTeamsModal, setShowEditTeamsModal] = useState(false);
    const [showHomeLogoUpload, setShowHomeLogoUpload] = useState(false);
    const [showAwayLogoUpload, setShowAwayLogoUpload] = useState(false);
    const [showFoulOutModal, setShowFoulOutModal] = useState<{ playerId: string; playerName: string; team: Team; reason?: string } | null>(null);

    // Lock body scroll when subs modal is open
    useBodyScrollLock(showSubsModal);

    const handleActionWithFoulOut = useCallback((action: string) => {
        const result = handleAction(action);
        if (result) {
            const { updatedPlayer } = result;
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
        }
    }, [handleAction]);

    const handleSubsOverlayClick = useCallback((e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            setShowSubsModal(false);
        }
    }, []);

    const handleSubsContentClick = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
    }, []);

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

    const handleResetGame = () => {
        resetGame(players, teamNames);
        resetTimer();
        setShowFoulOutModal(null);
    };

    const handleFoulOutSubstitute = (fouledOutId: string, replacementId: string) => {
        handleSubstituteFouledOut(fouledOutId, replacementId);
        setShowFoulOutModal(null);
    };

    return (
        <div className="min-h-screen w-full app-bg flex flex-col relative">
            {/* Logo Section - Responsive */}
            <div className="w-full px-3 py-3 md:py-4 flex items-center justify-center gap-2 md:gap-4 animate-fade-in">
                {/* Home Team Logo */}
                <div
                    className="relative cursor-pointer flex-shrink-0 z-10 group"
                    onClick={() => setShowHomeLogoUpload(!showHomeLogoUpload)}
                >
                    <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-white/10 backdrop-blur-sm rounded-lg md:rounded-xl flex items-center justify-center shadow-premium border border-white/20 overflow-hidden transition-all duration-300 group-hover:shadow-glow-red group-hover:border-bulls-red/30 group-hover:scale-105">
                        {teamLogos.home ? (
                            <img src={teamLogos.home} alt="Home Team Logo" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-lg sm:text-xl md:text-2xl font-bold text-white/40 group-hover:text-bulls-red transition-colors">+</span>
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

                {/* Scoreboard */}
                <div className="flex items-center justify-center flex-shrink-0">
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
                    className="relative cursor-pointer flex-shrink-0 z-10 group"
                    onClick={() => setShowAwayLogoUpload(!showAwayLogoUpload)}
                >
                    <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-white/10 backdrop-blur-sm rounded-lg md:rounded-xl flex items-center justify-center shadow-premium border border-white/20 overflow-hidden transition-all duration-300 group-hover:shadow-glow-red group-hover:border-bulls-red/30 group-hover:scale-105">
                        {teamLogos.away ? (
                            <img src={teamLogos.away} alt="Away Team Logo" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-lg sm:text-xl md:text-2xl font-bold text-white/40 group-hover:text-bulls-red transition-colors">+</span>
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

            {/* Container for controls */}
            <div className="container mx-auto px-4 py-2 flex-shrink-0 z-20 animate-slide-down flex flex-col items-center">
                <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} position="top" />

                {activeTab === 'actions' && (
                    <div className="w-full flex gap-2 justify-center flex-wrap mt-3 mb-1">
                        <button
                            onClick={handleUndoLastAction}
                            className="btn-premium bg-orange-500/90 hover:bg-orange-600 text-white font-bold py-1.5 px-4 rounded-lg text-xs transition-all duration-200 border border-orange-400/30 shadow-lg hover:shadow-orange-500/20 hover:-translate-y-0.5"
                        >
                            ↶ Deshacer
                        </button>
                        <button
                            onClick={() => setShowSubsModal(true)}
                            className="btn-premium bg-white/10 hover:bg-white/15 text-white font-bold py-1.5 px-4 rounded-lg text-xs transition-all duration-200 border border-white/20 shadow-lg hover:shadow-white/10 hover:-translate-y-0.5 backdrop-blur-sm"
                        >
                            🔁 Cambios
                        </button>
                        <button
                            onClick={() => setShowEditTeamsModal(true)}
                            className="btn-premium bg-white/10 hover:bg-white/15 text-white font-bold py-1.5 px-4 rounded-lg text-xs transition-all duration-200 border border-white/20 shadow-lg hover:shadow-white/10 hover:-translate-y-0.5 backdrop-blur-sm"
                        >
                            👥 Editar Equipos
                        </button>
                    </div>
                )}
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto">
                <div className="container mx-auto px-4 py-2">
                    <Suspense fallback={
                        <div className="flex items-center justify-center py-20">
                            <div className="w-12 h-12 border-4 border-bulls-red/30 border-t-bulls-red rounded-full animate-spin"></div>
                        </div>
                    }>
                        {activeTab === 'actions' && (
                            <ActionsTab
                                players={players}
                                selectedPlayerId={selectedPlayerId}
                                onSelectPlayer={handleSelectPlayer}
                                onField={onField}
                                events={events}
                                onEditEvent={handleEditEvent}
                                onDeleteEvent={handleDeleteEvent}
                                onAction={handleActionWithFoulOut}
                                isPlayerOnField={selectedPlayerId ? onField[selectedPlayerId] : false}
                            />
                        )}

                        {activeTab === 'summary' && (
                            <SummaryTab
                                players={players}
                                teamNames={teamNames}
                            />
                        )}
                    </Suspense>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-black/50 backdrop-blur-sm border-t border-white/10 flex-shrink-0">
                <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3 flex justify-center gap-2 sm:gap-3">
                    <button
                        onClick={handleExportData}
                        className="btn-premium bg-emerald-600/90 hover:bg-emerald-500 text-white font-bold py-1.5 sm:py-2 px-3 sm:px-5 rounded-lg text-xs sm:text-sm transition-all duration-200 border border-emerald-400/30 shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-0.5"
                    >
                        📥 Descargar
                    </button>
                    <button
                        onClick={handleResetGame}
                        className="btn-premium bg-red-600/90 hover:bg-red-500 text-white font-bold py-1.5 sm:py-2 px-3 sm:px-5 rounded-lg text-xs sm:text-sm transition-all duration-200 border border-red-400/30 shadow-lg hover:shadow-red-500/20 hover:-translate-y-0.5"
                    >
                        🔄 Nuevo Partido
                    </button>
                </div>
            </div>

            {/* Substitutions Modal */}
            {showSubsModal && (
                <div 
                    className="modal-overlay"
                    onClick={handleSubsOverlayClick}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="subs-title"
                >
                    <div className="modal-overlay-bg" />
                    
                    <div 
                        className="modal-content max-w-4xl"
                        onClick={handleSubsContentClick}
                    >
                        {/* Header */}
                        <div className="modal-header">
                            <h3 id="subs-title" className="text-base sm:text-lg font-bold text-white uppercase tracking-wider">
                                Cambios y Sustituciones
                            </h3>
                            <button 
                                onClick={() => setShowSubsModal(false)} 
                                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 active:bg-white/40 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                                aria-label="Cerrar modal"
                            >
                                ✕
                            </button>
                        </div>
                        
                        {/* Content */}
                        <div className="modal-body">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 h-full min-h-0">
                                {(['home', 'away'] as ('home' | 'away')[]).map((team) => {
                                    const teamPlayers = players.filter((p) => p.team === team);
                                    const onFieldPlayers = teamPlayers.filter((p) => onField[p.id]);
                                    return (
                                        <div key={team} className="bg-gray-800/80 rounded-xl border border-white/10 flex flex-col h-full min-h-0">
                                            <div className="bg-gradient-to-r from-bulls-red/30 to-transparent px-3 py-2.5 border-b border-white/10 flex-shrink-0">
                                                <h4 className="font-bold text-white text-sm">{team === 'home' ? teamNames.home : teamNames.away}</h4>
                                                <p className="text-xs text-green-400 font-semibold">En Campo: {onFieldPlayers.length}/5</p>
                                            </div>
                                            <div className="flex-1 overflow-y-auto p-2 min-h-0 overscroll-contain">
                                                <div className="space-y-1.5">
                                                    {teamPlayers.map((player) => (
                                                        <div key={player.id} className="flex items-center justify-between py-2 px-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] active:bg-white/[0.12] transition-colors min-h-[44px]">
                                                            <span className="text-white/80 text-xs font-medium truncate mr-2">#{player.number} {player.name}</span>
                                                            <button
                                                                onClick={() => handleToggleOnField(player.id)}
                                                                className={`text-[10px] py-1.5 px-3 rounded-full font-bold transition-colors flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-gray-800 ${
                                                                    onField[player.id] 
                                                                        ? 'bg-green-500 text-black focus:ring-green-400' 
                                                                        : 'bg-gray-600 text-white/60 hover:bg-gray-500 hover:text-white focus:ring-gray-400'
                                                                }`}
                                                                aria-label={`${onField[player.id] ? 'Sacar de cancha a' : 'Poner en cancha a'} ${player.name}`}
                                                            >
                                                                {onField[player.id] ? '● CANCHA' : '○ BANCA'}
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        
                        {/* Footer */}
                        <div className="modal-footer">
                            <button
                                onClick={() => setShowSubsModal(false)}
                                className="bg-bulls-red hover:bg-bulls-red-dark active:bg-bulls-red text-white font-bold py-2.5 px-8 rounded-lg text-sm transition-colors shadow-lg hover:shadow-glow-red focus:outline-none focus:ring-2 focus:ring-bulls-red focus:ring-offset-2 focus:ring-offset-gray-900"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Teams Modal */}
            {showEditTeamsModal && (
                <EditTeamsModal
                    isOpen={showEditTeamsModal}
                    players={players}
                    teamNames={teamNames}
                    onClose={() => setShowEditTeamsModal(false)}
                    onSavePlayer={(playerId, newName, newNumber) => {
                        setPlayers((prev) =>
                            prev.map((p) =>
                                p.id === playerId ? { ...p, name: newName, number: newNumber } : p
                            )
                        );
                    }}
                    onSaveTeamName={(team, teamName) => {
                        setTeamNames((prev) => ({
                            ...prev,
                            [team]: teamName,
                        }));
                    }}
                />
            )}

            {/* Foul Out Modal */}
            {showFoulOutModal && (
                <FoulOutModal
                    isOpen={!!showFoulOutModal}
                    fouledOutPlayer={showFoulOutModal}
                    players={players}
                    onField={onField}
                    onSubstitute={handleFoulOutSubstitute}
                    onClose={() => setShowFoulOutModal(null)}
                />
            )}
        </div>
    );
}

export default App;
