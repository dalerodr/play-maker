import { memo } from 'react';
import { Player, PlayEvent } from '../../types';
import { PlayerActionSelector } from '../PlayerActionSelector';
import { GameEventLog } from '../GameEventLog';
import { ActionButtons } from '../ActionButtons';

interface ActionsTabProps {
    players: Player[];
    selectedPlayerId: string | null;
    onSelectPlayer: (playerId: string) => void;
    onField: { [key: string]: boolean };
    events: PlayEvent[];
    onEditEvent: (eventId: string, newAction: string) => void;
    onDeleteEvent: (eventId: string) => void;
    onAction: (action: string) => void;
    isPlayerOnField: boolean;
}

const ActionsTab = memo(({ 
    players, 
    selectedPlayerId, 
    onSelectPlayer, 
    onField, 
    events, 
    onEditEvent, 
    onDeleteEvent, 
    onAction, 
    isPlayerOnField 
}: ActionsTabProps) => {
    return (
        <div className="animate-slide-up">
            {/* Desktop: 3 columns layout */}
            <div className="hidden lg:grid lg:grid-cols-12 lg:gap-3 lg:items-start lg:h-[28rem]">
                {/* Left: Players on field */}
                <div className="col-span-3 flex flex-row gap-2 items-start">
                    <div className="flex-1 glass-card p-2">
                        <h4 className="text-[10px] font-semibold mb-1.5 text-center text-bulls-red uppercase tracking-wider">Local</h4>
                        <div className="overflow-y-auto max-h-64 scrollbar-thin">
                            <PlayerActionSelector
                                players={players.filter((p) => p.team === 'home' && onField[p.id])}
                                selectedPlayerId={selectedPlayerId}
                                onSelectPlayer={onSelectPlayer}
                            />
                        </div>
                    </div>
                    <div className="flex-1 glass-card p-2">
                        <h4 className="text-[10px] font-semibold mb-1.5 text-center text-bulls-red uppercase tracking-wider">Visitante</h4>
                        <div className="overflow-y-auto max-h-64 scrollbar-thin">
                            <PlayerActionSelector
                                players={players.filter((p) => p.team === 'away' && onField[p.id])}
                                selectedPlayerId={selectedPlayerId}
                                onSelectPlayer={onSelectPlayer}
                            />
                        </div>
                    </div>
                </div>

                {/* Center: Event Log */}
                <div className="col-span-6 flex flex-col">
                    <div className="glass-card p-3 overflow-y-auto max-h-80">
                        <GameEventLog
                            events={events}
                            onEditEvent={onEditEvent}
                            onDeleteEvent={onDeleteEvent}
                        />
                    </div>
                </div>

                {/* Right: Action Buttons */}
                <div className="col-span-3 flex flex-col items-center justify-start">
                    <div className="w-full glass-card p-2">
                        <ActionButtons
                            selectedPlayerId={selectedPlayerId}
                            onAction={onAction}
                            isPlayerOnField={isPlayerOnField}
                            size="sm"
                            columns={2}
                        />
                    </div>
                </div>
            </div>

            {/* Tablet: 2 columns layout */}
            <div className="hidden md:grid md:grid-cols-2 md:gap-3 md:lg:hidden">
                {/* Left: Players on field */}
                <div className="space-y-2">
                    <div className="glass-card p-2">
                        <h4 className="text-[10px] font-semibold mb-1.5 text-center text-bulls-red uppercase tracking-wider">Local</h4>
                        <div className="overflow-y-auto max-h-48 scrollbar-thin">
                            <PlayerActionSelector
                                players={players.filter((p) => p.team === 'home' && onField[p.id])}
                                selectedPlayerId={selectedPlayerId}
                                onSelectPlayer={onSelectPlayer}
                            />
                        </div>
                    </div>
                    <div className="glass-card p-2">
                        <h4 className="text-[10px] font-semibold mb-1.5 text-center text-bulls-red uppercase tracking-wider">Visitante</h4>
                        <div className="overflow-y-auto max-h-48 scrollbar-thin">
                            <PlayerActionSelector
                                players={players.filter((p) => p.team === 'away' && onField[p.id])}
                                selectedPlayerId={selectedPlayerId}
                                onSelectPlayer={onSelectPlayer}
                            />
                        </div>
                    </div>
                </div>

                {/* Right: Event Log + Action Buttons */}
                <div className="space-y-2">
                    <div className="glass-card p-2 overflow-y-auto max-h-56">
                        <GameEventLog
                            events={events}
                            onEditEvent={onEditEvent}
                            onDeleteEvent={onDeleteEvent}
                        />
                    </div>
                    <div className="glass-card p-2">
                        <ActionButtons
                            selectedPlayerId={selectedPlayerId}
                            onAction={onAction}
                            isPlayerOnField={isPlayerOnField}
                            size="sm"
                            columns={2}
                        />
                    </div>
                </div>
            </div>

            {/* Mobile: stacked layout */}
            <div className="flex flex-col gap-2 md:hidden">
                {/* Action Buttons - first on mobile for easy access */}
                <div className="glass-card p-2">
                    <ActionButtons
                        selectedPlayerId={selectedPlayerId}
                        onAction={onAction}
                        isPlayerOnField={isPlayerOnField}
                        size="sm"
                        columns={4}
                    />
                </div>

                {/* Players on field - horizontal scroll */}
                <div className="flex gap-2 overflow-x-auto pb-1">
                    <div className="glass-card p-2 min-w-[140px] flex-shrink-0">
                        <h4 className="text-[10px] font-semibold mb-1 text-center text-bulls-red uppercase tracking-wider">Local</h4>
                        <PlayerActionSelector
                            players={players.filter((p) => p.team === 'home' && onField[p.id])}
                            selectedPlayerId={selectedPlayerId}
                            onSelectPlayer={onSelectPlayer}
                        />
                    </div>
                    <div className="glass-card p-2 min-w-[140px] flex-shrink-0">
                        <h4 className="text-[10px] font-semibold mb-1 text-center text-bulls-red uppercase tracking-wider">Visitante</h4>
                        <PlayerActionSelector
                            players={players.filter((p) => p.team === 'away' && onField[p.id])}
                            selectedPlayerId={selectedPlayerId}
                            onSelectPlayer={onSelectPlayer}
                        />
                    </div>
                </div>

                {/* Event Log */}
                <div className="glass-card p-2 max-h-60 overflow-y-auto">
                    <GameEventLog
                        events={events}
                        onEditEvent={onEditEvent}
                        onDeleteEvent={onDeleteEvent}
                    />
                </div>
            </div>
        </div>
    );
});

ActionsTab.displayName = 'ActionsTab';

export default ActionsTab;
