/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Eye, EyeOff, Heart, Sparkles, TrendingUp, HelpCircle, ArrowUpRight, ArrowDownRight, Bell, Settings } from 'lucide-react';
import AnimatedStaircase from '../components/AnimatedStaircase';
import { MoneyActivity, RoleType, UserProfile } from '../types';
import { useLanguage } from '../lib/LanguageContext';
import { getTranslatedCategory } from '../lib/translations';

interface DashboardProps {
  user: UserProfile;
  activities: MoneyActivity[];
  onOpenAddModal: () => void;
  onNavigate: (tab: string) => void;
  unreadCount?: number;
}

export default function Dashboard({ user, activities, onOpenAddModal, onNavigate, unreadCount = 0 }: DashboardProps) {
  const { t, language } = useLanguage();
  const [showBalances, setShowBalances] = useState(true);

  // Derive Balances
  // Wife's personal money: in minus out
  const wifePersonalIn = activities
    .filter(a => a.scope === 'personal' && a.by === 'wife' && a.type === 'in')
    .reduce((sum, a) => sum + a.amount, 0);
  const wifePersonalOut = activities
    .filter(a => a.scope === 'personal' && a.by === 'wife' && a.type === 'out')
    .reduce((sum, a) => sum + a.amount, 0);
  const wifeBalance = wifePersonalIn - wifePersonalOut;

  // Husband's personal money: in minus out
  const husbandPersonalIn = activities
    .filter(a => a.scope === 'personal' && a.by === 'husband' && a.type === 'in')
    .reduce((sum, a) => sum + a.amount, 0);
  const husbandPersonalOut = activities
    .filter(a => a.scope === 'personal' && a.by === 'husband' && a.type === 'out')
    .reduce((sum, a) => sum + a.amount, 0);
  const husbandBalance = husbandPersonalIn - husbandPersonalOut;

  // Our money (Shared): in minus out
  const sharedIn = activities
    .filter(a => a.scope === 'shared' && a.type === 'in')
    .reduce((sum, a) => sum + a.amount, 0);
  const sharedOut = activities
    .filter(a => a.scope === 'shared' && a.type === 'out')
    .reduce((sum, a) => sum + a.amount, 0);
  const sharedBalance = sharedIn - sharedOut;

  // Quick statistics for current week
  const recentActivities = activities.slice(0, 3);

  // Sweet custom motivational greetings based on balances
  const getLoveNote = () => {
    if (sharedBalance < 500) {
      return language === 'am' 
        ? "ዛሬ ወደ የጋራ ገንዘባችን ቦታ የተወሰነ ገንዘብ ለመጨመር አብረን እንስራ! ☕" 
        : "Let's work together to add some funds to 'Our Money' space today! ☕";
    }
    if (activities.length > 5) {
      return language === 'am' 
        ? "ሁለታችሁም ገንዘቡን በመመዝገብ ረገድ አስደናቂ ስራ እየሰራችሁ ነው! ትብብር ህልምን እውን ያደርጋል። 🌸" 
        : "You both are doing amazing tracking money activities! Teamwork makes the dream work. 🌸";
    }
    return language === 'am' 
      ? "የወደፊት የጋራ ህይወታችንን የተቃና ለማድረግ ደረጃ በደረጃ እያንዳንዱ እርምጃ ትልቅ ትርጉም አለው! 💍" 
      : "Every small step on this money staircase is a step closer to our happy future! 💍";
  };

  const formatBirr = (num: number) => {
    if (!showBalances) return '••••••';
    return `${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${t('currency')}`;
  };

  return (
    <div className="pt-4 pb-24 px-4 max-w-lg mx-auto min-h-screen bg-gradient-to-tr from-[#FFF7FA] via-[#FFFBFD] to-[#EDF4FF] font-sans">
      
      {/* Top Header Row */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-base shadow-sm ${
              user.role === 'wife' 
                ? 'bg-gradient-to-br from-pink-300 to-pink-400 text-white' 
                : 'bg-gradient-to-br from-blue-300 to-blue-400 text-white'
            }`}>
              {user.displayName.charAt(0).toUpperCase()}
            </div>
            <div className="absolute -bottom-1 -right-1 bg-amber-400 text-[9px] px-1 rounded-full font-bold text-white border border-white animate-pulse">
              {user.role === 'wife' ? t('wife').replace(/👗/g, '').trim() : t('husband').replace(/👔/g, '').trim()}
            </div>
          </div>
          <div>
            <span className="text-slate-400 text-xs font-semibold block uppercase tracking-wider font-mono">{t('brand')} Hub</span>
            <h2 className="text-base font-bold text-slate-800 tracking-tight leading-tight">
              {t('dash_hello', { name: user.displayName })}
            </h2>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onNavigate('updates')}
            className="p-2.5 rounded-full hover:bg-slate-100/50 bg-white/40 border border-pink-100 text-slate-500 hover:text-pink-500 relative transition-all cursor-pointer"
            id="btn-nav-updates"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-3 h-3 bg-red-500 text-[8px] font-bold text-white rounded-full flex items-center justify-center border border-white animate-bounce-slow">
                {unreadCount}
              </span>
            )}
          </button>
          
          <button
            onClick={() => onNavigate('settings')}
            className="p-2.5 rounded-full hover:bg-slate-100/50 bg-white/40 border border-pink-100 text-slate-500 hover:text-pink-500 transition-all cursor-pointer"
            id="btn-nav-settings"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Hero Staircase Illustration Column */}
      <div className="bg-white/40 backdrop-blur-md rounded-3xl p-4 mb-6 border border-white shadow-[0_8px_30px_rgba(244,143,177,0.03)] text-center relative overflow-hidden">
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-pink-100/50 text-pink-700 font-bold font-mono text-[9px] py-0.5 px-2 rounded-full border border-pink-100 uppercase tracking-widest">
          <Sparkles className="w-2.5 h-2.5 fill-current text-pink-500" />
          {t('dash_climb_banner')}
        </div>
        
        {/* Animated illustration container */}
        <AnimatedStaircase />

        <div className="mt-1">
          <h3 className="text-base font-extrabold text-slate-800 tracking-tight flex items-center justify-center gap-1.5">
            {t('dash_staircase_title')}
            <Heart className="w-4 h-4 text-pink-500 fill-current animate-pulse" />
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto mt-1 px-4">
            {t('dash_staircase_subtitle')}
          </p>
        </div>
      </div>

      {/* Main Money Box (Our Money Spaces) */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white rounded-[32px] p-6 mb-6 shadow-xl shadow-slate-900/10 relative overflow-hidden border border-slate-700/30">
        
        {/* Decorative ambient glowing backdrops inside the dark card */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />

        <div className="flex items-center justify-between border-b border-slate-700/50 pb-4 mb-5">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-pink-400 fill-current animate-pulse" />
            <span className="text-[10.5px] font-bold tracking-widest uppercase text-slate-400 font-mono">{t('budget_spaces')}</span>
          </div>
          
          <button
            onClick={() => setShowBalances(!showBalances)}
            className="p-1 px-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-[11px] flex items-center gap-1.5 transition-all outline-none cursor-pointer"
            id="btn-toggle-eye"
          >
            {showBalances ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            {showBalances ? t('dash_hide_bal') : t('dash_show_bal')}
          </button>
        </div>

        {/* Big Shared Wallet Space (Our Family Balance) */}
        <div className="text-center py-2 mb-6 font-sans">
          <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider font-mono">💕 {t('our_money')}</span>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-amber-200 to-blue-200 tracking-tight mt-1 font-sans">
            {formatBirr(sharedBalance)}
          </h1>
          <p className="text-[10px] text-slate-500 mt-1 flex items-center justify-center gap-1.5 font-sans">
            <span>{language === 'am' ? 'ገቢ፦' : 'In:'} {showBalances ? `${sharedIn.toLocaleString()} ${t('currency')}` : '•••'}</span>
            <span className="text-slate-700">•</span>
            <span>{language === 'am' ? 'ወጪ፦' : 'Out:'} {showBalances ? `${sharedOut.toLocaleString()} ${t('currency')}` : '•••'}</span>
          </p>
        </div>

        {/* Dual Personal Spaces Grid */}
        <div className="grid grid-cols-2 gap-4 border-t border-slate-700/40 pt-4">
          
          {/* Wife's Wallet */}
          <div className="p-3 bg-slate-800/40 rounded-2xl border border-slate-700/20 text-center relative font-sans">
            <div className="absolute top-1 left-2 text-[9px] font-bold text-pink-400 tracking-wide font-mono uppercase">
              {t('dash_lydia_space')}
            </div>
            <div className="pt-2">
              <span className="text-[10.5px] text-slate-400 tracking-tight font-sans block">{t('my_money')}</span>
              <span className="text-sm font-bold text-pink-200 block mt-0.5 truncate">{formatBirr(wifeBalance)}</span>
            </div>
          </div>

          {/* Husband's Wallet */}
          <div className="p-3 bg-slate-800/40 rounded-2xl border border-slate-700/20 text-center relative font-sans">
            <div className="absolute top-1 left-2 text-[9px] font-bold text-blue-400 tracking-wide font-mono uppercase">
              {t('dash_dawit_space')}
            </div>
            <div className="pt-2">
              <span className="text-[10.5px] text-slate-400 tracking-tight font-sans block">{t('my_money')}</span>
              <span className="text-sm font-bold text-blue-200 block mt-0.5 truncate">{formatBirr(husbandBalance)}</span>
            </div>
          </div>

        </div>
      </div>

      {/* Love encouragement note card */}
      <div className="p-4 bg-pink-50/50 border border-pink-100 rounded-3xl mb-6 flex items-start gap-3">
        <div className="p-2 bg-pink-100 rounded-2xl text-pink-500 transform -rotate-6 shrink-0 mt-0.5">
          <Heart className="w-4 h-4 fill-current" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-pink-800 tracking-wide uppercase font-mono">{t('dash_sweet_reminder')}</h4>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed font-sans font-medium">
            {getLoveNote()}
          </p>
        </div>
      </div>

      {/* Quick Action Buttons Grid */}
      <div className="mb-6">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono mb-3">{t('dash_quick_action')}</h4>
        <div className="grid grid-cols-2 gap-3">
          
          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-2.5 p-4 bg-gradient-to-tr from-pink-50 to-pink-100/30 hover:bg-pink-100 border border-pink-100/80 rounded-2xl text-left transition-all max-w-full font-sans cursor-pointer"
            id="btn-quick-out"
          >
            <div className="p-2 h-9 w-9 bg-pink-100 text-pink-600 rounded-xl flex items-center justify-center font-bold">💸</div>
            <div>
              <span className="text-xs font-extrabold text-slate-800 block leading-tight font-sans">{t('money_out')}</span>
              <span className="text-[10px] text-slate-500 block font-sans mt-0.5">{language === 'am' ? 'ወጪዎችን መመዝገቢያ' : 'Record expense'}</span>
            </div>
          </button>

          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-2.5 p-4 bg-gradient-to-tr from-emerald-50 to-emerald-100/30 hover:bg-emerald-100 border border-emerald-100/80 rounded-2xl text-left transition-all max-w-full font-sans cursor-pointer"
            id="btn-quick-in"
          >
            <div className="p-2 h-9 w-9 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center font-bold">💰</div>
            <div>
              <span className="text-xs font-extrabold text-slate-800 block leading-tight font-sans">{t('money_in')}</span>
              <span className="text-[10px] text-slate-500 block font-sans mt-0.5">{language === 'am' ? 'ገቢዎችን መመዝገቢያ' : 'Record income'}</span>
            </div>
          </button>

        </div>
      </div>

      {/* Recent money activities List */}
      <div className="bg-white/50 border border-pink-50 rounded-3xl p-5 shadow-[0_4px_24px_rgba(244,143,177,0.02)]">
        <div className="flex items-center justify-between pb-3 border-b border-pink-50 mb-3">
          <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider font-mono">{t('dash_recent_activity')}</h4>
          <button
            onClick={() => onNavigate('activities')}
            className="text-[11px] font-bold text-pink-500 hover:text-pink-600 transition-colors cursor-pointer"
            id="btn-see-all-recent"
          >
            {t('dash_see_all')}
          </button>
        </div>

        {recentActivities.length === 0 ? (
          <div className="text-center py-6 font-sans">
            <p className="text-xs text-slate-400">{language === 'am' ? 'እስካሁን የተመዘገበ እንቅስቃሴ የለም።' : 'No activities recorded yet.'}</p>
            <button
              onClick={onOpenAddModal}
              className="mt-2 text-xs font-bold text-pink-500 hover:underline cursor-pointer"
              id="btn-no-act"
            >
              {t('dash_add_first_activity')}
            </button>
          </div>
        ) : (
          <div className="space-y-3 font-sans">
            {recentActivities.map((act) => {
              const dateObj = new Date(act.date);
              const formattedDate = dateObj.toLocaleDateString(language === 'am' ? 'am-ET' : 'en-US', { month: 'short', day: 'numeric' });
              const isOut = act.type === 'out';
              
              return (
                <div
                  key={act.id}
                  className="flex items-center justify-between p-2.5 hover:bg-slate-50/50 rounded-xl transition-all border border-transparent hover:border-slate-100 font-sans"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-xl p-1 bg-slate-100 rounded-lg shrink-0">
                      {isOut ? '💸' : '💰'}
                    </span>
                    <div className="min-w-0 font-sans">
                      <h5 className="text-xs font-bold text-slate-700 truncate font-sans">
                        {act.notes || getTranslatedCategory(act.category, language)}
                      </h5>
                      <span className="text-[10px] text-slate-400 flex items-center gap-1 font-sans">
                        <span>{language === 'am' ? (act.scope === 'shared' ? 'የጋራ' : 'የግል') : act.scope}</span>
                        <span>•</span>
                        <span>{language === 'am' ? 'በ' : 'By'} {act.by === 'wife' ? t('wife').replace(/👗/g, '').trim() : t('husband').replace(/👔/g, '').trim()}</span>
                        <span>•</span>
                        <span>{formattedDate}</span>
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right shrink-0 ml-2 font-sans">
                    <span className={`text-xs font-bold font-sans ${isOut ? 'text-rose-500' : 'text-emerald-500'}`}>
                      {isOut ? '-' : '+'}{act.amount.toLocaleString()} {t('currency_short')}
                    </span>
                    <span className="text-[9px] text-slate-400 block font-mono capitalize">
                      {getTranslatedCategory(act.category, language).replace(/🍔|🚗|🛍️|🏡|🌐|🎬|🎁|📄|🏥|🛡️|✨/g, '').trim()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
