/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Search, Filter, Trash2, SlidersHorizontal, ArrowUpDown, Tag, Calendar, Heart } from 'lucide-react';
import { MoneyActivity, CategoryType, ActivityType, MoneyScope, RoleType } from '../types';
import { useLanguage } from '../lib/LanguageContext';
import { getTranslatedCategory } from '../lib/translations';

interface ActivitiesPageProps {
  activities: MoneyActivity[];
  onDeleteActivity: (id: string) => void;
  onOpenAddModal: () => void;
}

export default function ActivitiesPage({ activities, onDeleteActivity, onOpenAddModal }: ActivitiesPageProps) {
  const { t, language } = useLanguage();
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<ActivityType | 'all'>('all');
  const [filterScope, setFilterScope] = useState<MoneyScope | 'all'>('all');
  const [filterBy, setFilterBy] = useState<RoleType | 'all'>('all');
  const [showFilters, setShowFilters] = useState(false);

  // Apply filters
  const filtered = activities.filter((act) => {
    // Translate category to check search correctly
    const translatedCat = getTranslatedCategory(act.category, language).toLowerCase();
    const matchesSearch =
      act.notes.toLowerCase().includes(search.toLowerCase()) ||
      act.category.toLowerCase().includes(search.toLowerCase()) ||
      translatedCat.includes(search.toLowerCase());
    
    const matchesType = filterType === 'all' || act.type === filterType;
    const matchesScope = filterScope === 'all' || act.scope === filterScope;
    const matchesBy = filterBy === 'all' || act.by === filterBy;

    return matchesSearch && matchesType && matchesScope && matchesBy;
  });

  return (
    <div className="pt-4 pb-24 px-4 max-w-lg mx-auto min-h-screen bg-gradient-to-tr from-[#FFF7FA] via-[#FFFBFD] to-[#EDF4FF] font-sans">
      
      {/* Page Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <span className="text-slate-400 text-xs font-semibold block uppercase tracking-wider font-mono">{t('act_header_mono')}</span>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight leading-none">{t('act_header_title')}</h1>
        </div>
        <button
          onClick={onOpenAddModal}
          className="py-2 px-3 bg-pink-500 hover:bg-pink-600 font-bold text-xs text-white rounded-xl transition-all shadow-sm flex items-center gap-1 cursor-pointer"
          id="btn-add-activity-log"
        >
          {t('act_add_steps')}
        </button>
      </div>

      {/* Search Bar & Toggle Filter */}
      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('act_search_placeholder')}
            className="block w-full pl-9 pr-3 py-3 text-xs bg-white rounded-xl border border-pink-100 focus:outline-none focus:ring-1 focus:ring-pink-300 font-sans shadow-xs"
            id="input-activity-search"
          />
        </div>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`p-3 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
            showFilters 
              ? 'border-pink-300 bg-pink-50 text-pink-600' 
              : 'border-pink-100 bg-white text-slate-500 hover:bg-slate-50'
          }`}
          id="btn-toggle-filters"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Expandable Advanced Filters Drawer */}
      {showFilters && (
        <div className="p-4 bg-white border border-pink-50 rounded-2xl mb-4 space-y-3 shadow-xs animate-slide-up">
          <h4 className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-widest flex items-center gap-1.5 pb-2 border-b border-pink-50">
            <Filter className="w-3" /> {t('act_filter_panel')}
          </h4>
          
          <div className="grid grid-cols-3 gap-2 text-center">
            {/* Type */}
            <div>
              <span className="block text-[9.5px] font-bold text-slate-400 mb-1 font-mono uppercase">{t('act_filter_flow')}</span>
              <select
                value={filterType}
                onChange={(e: any) => setFilterType(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-100 rounded-lg text-[11px] font-sans"
              >
                <option value="all">{t('all_flows')}</option>
                <option value="in">{t('money_in')}</option>
                <option value="out">{t('money_out')}</option>
              </select>
            </div>

            {/* Scope */}
            <div>
              <span className="block text-[9.5px] font-bold text-slate-400 mb-1 font-mono uppercase">{t('act_filter_space')}</span>
              <select
                value={filterScope}
                onChange={(e: any) => setFilterScope(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-100 rounded-lg text-[11px] font-sans"
              >
                <option value="all">{t('all_spaces')}</option>
                <option value="shared">{t('our_money')}</option>
                <option value="personal">{t('my_money')}</option>
              </select>
            </div>

            {/* Attribution */}
            <div>
              <span className="block text-[9.5px] font-bold text-slate-400 mb-1 font-mono uppercase">{t('act_filter_partner')}</span>
              <select
                value={filterBy}
                onChange={(e: any) => setFilterBy(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-100 rounded-lg text-[11px] font-sans"
              >
                <option value="all">{t('everyone')}</option>
                <option value="wife">👗 {language === 'am' ? 'ሊዲያ (ሚስት)' : 'Lydia (Wife)'}</option>
                <option value="husband">👔 {language === 'am' ? 'ዳዊት (ባል)' : 'Dawit (Husband)'}</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Money Activities Ledger List */}
      <div className="space-y-3 font-sans">
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-white/40 border border-pink-50 rounded-3xl p-6 font-sans">
            <Heart className="w-10 h-10 text-pink-300 fill-current mx-auto opacity-50 mb-3 animate-pulse" />
            <p className="text-sm font-bold text-slate-700">{t('act_no_activities')}</p>
            <p className="text-xs text-slate-400 mt-1">{t('act_no_activities_sub')}</p>
          </div>
        ) : (
          filtered.map((act) => {
            const dateObj = new Date(act.date);
            const formattedDate = dateObj.toLocaleDateString(language === 'am' ? 'am-ET' : 'en-US', { weekday: 'short', month: 'short', day: 'numeric' });
            const isOut = act.type === 'out';

            return (
              <div
                key={act.id}
                className="group relative flex items-center justify-between p-4 bg-white/70 hover:bg-white rounded-2xl border border-pink-50/50 hover:border-pink-100 shadow-[0_2px_12px_rgba(244,143,177,0.01)] transition-all font-sans"
              >
                <div className="flex items-center gap-3 min-w-0 pr-4">
                  {/* Category icon plate with color distinction */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-xl font-bold shadow-xs ${
                    isOut ? 'bg-rose-50' : 'bg-emerald-50'
                  }`}>
                    {isOut ? '💸' : '💰'}
                  </div>

                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-800 truncate font-sans">
                      {act.notes || getTranslatedCategory(act.category, language)}
                    </h4>
                    
                    {/* Metadata indicators */}
                    <div className="flex flex-wrap gap-x-2 gap-y-0.5 mt-0.5 text-[10px] text-slate-400 font-sans items-center">
                      <span className={`px-1.5 py-0.2 rounded-full font-bold text-[9px] ${
                        act.scope === 'shared' 
                          ? 'bg-pink-50 text-pink-600' 
                          : 'bg-blue-50 text-blue-600'
                      }`}>
                        {act.scope === 'shared' ? t('our_money') : t('my_money')}
                      </span>
                      
                      <span className="text-[11px] text-slate-300">•</span>
                      
                      <span className="font-semibold text-slate-500">
                        {act.by === 'wife' ? (language === 'am' ? 'ሊዲያ' : 'Lydia') : (language === 'am' ? 'ዳዊት' : 'Dawit')}
                      </span>

                      <span className="text-[11px] text-slate-300">•</span>

                      <span className="flex items-center gap-0.5 font-sans font-medium">
                        <Calendar className="w-2.5 h-2.5 text-slate-300" />
                        {formattedDate}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Amount Display & Action buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  <div className="text-right">
                    <span className={`text-sm font-extrabold font-sans leading-none block ${
                      isOut ? 'text-rose-500' : 'text-emerald-500'
                    }`}>
                      {isOut ? '-' : '+'}{act.amount.toLocaleString()} {t('currency_short')}
                    </span>
                    <span className="text-[9.5px] font-mono capitalize tracking-wide text-slate-400 mt-0.5 block">
                      {getTranslatedCategory(act.category, language).replace(/🍔|🚗|🛍️|🏡|🌐|🎬|🎁|📄|🏥|🛡️|✨/g, '').trim()}
                    </span>
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={() => {
                      if (confirm(t('act_delete_title'))) {
                        onDeleteActivity(act.id);
                      }
                    }}
                    className="p-1.5 rounded-full text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all outline-none cursor-pointer"
                    title={t('act_delete_title')}
                    id={`btn-delete-${act.id}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
