import { FC } from 'react';

interface TabNavigationProps {
    activeTab: 'actions' | 'summary';
    onTabChange: (tab: 'actions' | 'summary') => void;
    position?: 'top' | 'bottom';
}

export const TabNavigation: FC<TabNavigationProps> = ({
    activeTab,
    onTabChange,
    position = 'bottom'
}) => {
    const tabs = [
        { id: 'actions' as const, label: 'Acciones' },
        { id: 'summary' as const, label: 'Resumen' },
    ];

    return (
        <div className={`inline-flex rounded-xl overflow-hidden border border-white/10 shadow-premium ${position === 'top' ? 'mb-3' : 'mt-3'}`}>
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`px-5 py-2 font-bold text-xs sm:text-sm transition-all duration-200 ${
                        activeTab === tab.id
                            ? 'bg-bulls-red text-white shadow-glow-red'
                            : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                    }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};
