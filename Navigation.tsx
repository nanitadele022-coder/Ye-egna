/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Home, ClipboardList, Target, PieChart, Plus } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

interface NavigationProps {
  currentTab: string;
  onChangeTab: (tab: string) => void;
  onOpenAddModal: () => void;
}

export default function Navigation({ currentTab, onChangeTab, onOpenAddModal }: NavigationProps) {
  const { t } = useLanguage();

  const tabs = [
    { id: 'dashboard', label: t('tab_home'), icon: Home },
    { id: 'activities', label: t('tab_activity'), icon: ClipboardList },
    { id: 'fab', label: '', icon: null }, // Center spacing for FAB
    { id: 'goals', label: t('tab_goals'), icon: Target },
    { id: 'summary', label: t('tab_summary'), icon: PieChart },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-lg border-t border-pink-50/60 shadow-[0_-8px_30px_rgba(244,143,177,0.08)] pb-safe">
      <div className="relative max-w-lg mx-auto h-16 px-4 flex items-center justify-between">
        
        {/* Floating Action Button in Center */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-5">
          <button
            onClick={onOpenAddModal}
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-pink-500 via-rose-500 to-indigo-400 text-white flex items-center justify-center shadow-lg shadow-pink-500/30 hover:shadow-xl hover:shadow-pink-500/40 hover:scale-105 active:scale-95 transition-all outline-none border-2 border-white"
            aria-label="Add transaction"
            id="btn-fab-add"
          >
            <Plus className="w-7 h-7 stroke-[3px]" />
          </button>
        </div>

        {/* Tab Item Elements */}
        {tabs.map((tab, idx) => {
          if (tab.id === 'fab') {
            return <div key="fab-placeholder" className="w-12 h-10" />; // Empty spacer for FAB
          }

          const Icon = tab.icon!;
          const isActive = currentTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className="group flex flex-col items-center justify-center w-14 h-10 select-none outline-none focus:outline-none"
              id={`tab-${tab.id}`}
            >
              <div
                className={`p-1 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'text-pink-600 scale-110'
                    : 'text-slate-400 group-hover:text-slate-600 group-hover:scale-105'
                }`}
              >
                <Icon className="w-5 h-5 stroke-[2.2px]" />
              </div>
              <span
                className={`text-[9.5px] font-sans font-medium mt-0.5 tracking-tight transition-colors ${
                  isActive ? 'text-pink-600 font-semibold' : 'text-slate-400 group-hover:text-slate-600'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
