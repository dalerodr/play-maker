import { FC } from 'react';

interface TabNavigationProps {
    activeTab: 'actions' | 'teams' | 'summary';
    onTabChange: (tab: 'actions' | 'teams' | 'summary') => void;
    position?: 'top' | 'bottom';
}

export const TabNavigation: FC<TabNavigationProps> = ({
    activeTab,
    onTabChange,
    position = 'bottom'
}) => {
    const tabs = [
        { id: 'actions' as const, label: 'Acciones' },
        { id: 'teams' as const, label: 'Editar Equipos' },
        { id: 'summary' as const, label: 'Resumen' },
    ];

    return (
        <div className={`flex border-b bg-white rounded-lg shadow-lg overflow-hidden ${position === 'top' ? 'mb-4' : 'mt-4'}`}>
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`flex-1 py-2 px-3 font-bold text-sm transition border-b-4
                        ${activeTab === tab.id
                            ? 'bg-[#CE1141] text-white border-[#000]'
                            : 'bg-gray-100 text-[#222] border-transparent hover:bg-[#F5E6C8] hover:text-[#CE1141]'
                        }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};
