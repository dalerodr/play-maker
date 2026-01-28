import { FC, useState } from 'react';
import { PlayEvent } from '../types';

interface GameEventLogProps {
    events: PlayEvent[];
    onEditEvent?: (eventId: string, newAction: string) => void;
    onDeleteEvent?: (eventId: string) => void;
}

const actionLabels: Record<string, string> = {
    points1: '1 Punto',
    points2: '2 Puntos',
    points3: '3 Puntos',
    foul: 'Falta',
    technical_foul: 'Técnica',
    unsporting_foul: 'Antideportiva',
    rebound: 'Rebote',
    assist: 'Asistencia',
    steal: 'Robo',
    turnover: 'Pérdida',
};

export const GameEventLog: FC<GameEventLogProps> = ({ events, onEditEvent, onDeleteEvent }) => {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingAction, setEditingAction] = useState<string>('');

    const getActionColor = (action: string) => {
        switch (action) {
            case 'points1':
                return 'bg-orange-100 text-orange-800';
            case 'points2':
                return 'bg-blue-100 text-blue-800';
            case 'points3':
                return 'bg-red-100 text-red-800';
            case 'foul':
                return 'bg-yellow-100 text-yellow-800';
            case 'technical_foul':
                return 'bg-yellow-200 text-yellow-900';
            case 'unsporting_foul':
                return 'bg-yellow-300 text-yellow-900';
            case 'rebound':
                return 'bg-green-100 text-green-800';
            case 'assist':
                return 'bg-[#39FF14] text-[#222]';
            case 'steal':
                return 'bg-purple-100 text-purple-800';
            case 'turnover':
                return 'bg-orange-100 text-orange-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const handleEdit = (event: PlayEvent) => {
        if (event.id) {
            setEditingId(event.id);
            setEditingAction(event.action);
        }
    };

    const handleSave = () => {
        if (editingId && onEditEvent) {
            onEditEvent(editingId, editingAction);
            setEditingId(null);
            setEditingAction('');
        }
    };

    const handleDelete = () => {
        if (editingId && onDeleteEvent) {
            onDeleteEvent(editingId);
            setEditingId(null);
            setEditingAction('');
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditingAction('');
    };

    const sortedEvents = [...events].reverse();

    return (
        <div className="space-y-2 max-h-96 overflow-y-auto">
            {sortedEvents.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                    No hay eventos registrados
                </div>
            ) : (
                sortedEvents.map((event) => {
                    const isEditing = editingId === event.id;

                    return (
                        <div
                            key={event.id || Math.random()}
                            className="p-3 bg-gray-50 rounded border-l-4 border-gray-300"
                        >
                            {isEditing ? (
                                <div className="space-y-2">
                                    <div className="flex gap-2">
                                        <select
                                            value={editingAction}
                                            onChange={(e) => setEditingAction(e.target.value)}
                                            className="flex-1 px-2 py-1 border rounded text-sm"
                                        >
                                            <option value="points1">1 Punto</option>
                                            <option value="points2">2 Puntos</option>
                                            <option value="points3">3 Puntos</option>
                                            <option value="foul">Falta</option>
                                            <option value="technical_foul">Técnica</option>
                                            <option value="unsporting_foul">Antideportiva</option>
                                            <option value="rebound">Rebote</option>
                                            <option value="assist">Asistencia</option>
                                            <option value="steal">Robo</option>
                                            <option value="turnover">Pérdida</option>
                                        </select>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleSave}
                                            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded text-sm"
                                        >
                                            ✓ Guardar
                                        </button>
                                        <button
                                            onClick={handleCancel}
                                            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-1 px-2 rounded text-sm"
                                        >
                                            ✕ Cancelar
                                        </button>
                                        <button
                                            onClick={handleDelete}
                                            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded text-sm"
                                        >
                                            🗑 Eliminar
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <div className="font-semibold text-gray-800">
                                            #{event.playerNumber} {event.playerName}
                                        </div>
                                        <div className="text-xs text-gray-600">
                                            Q{event.quarter} - {event.minute}:{String(event.second).padStart(2, '0')}
                                            {event.coordinates && ` @ (${event.coordinates.row}, ${event.coordinates.col})`}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-semibold ${getActionColor(
                                                event.action
                                            )}`}
                                        >
                                            {actionLabels[event.action]}
                                        </span>
                                        <button
                                            onClick={() => handleEdit(event)}
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs"
                                        >
                                            ✎
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })
            )}
        </div>
    );
};
