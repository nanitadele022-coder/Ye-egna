/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { Target, Calendar, ChevronsUp, PlusCircle, CheckCircle, Heart, X, Sparkles, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DreamGoal } from '../types';
import { useLanguage } from '../lib/LanguageContext';

interface DreamGoalsPageProps {
  goals: DreamGoal[];
  onAddGoal: (data: {
    title: string;
    targetAmount: number;
    deadline: string;
    category: 'emergency' | 'baby' | 'house' | 'car' | 'other';
  }) => void;
  onAddSavings: (goalId: string, amount: number) => void;
}

const CATEGORY_EMOJIS: Record<string, string> = {
  emergency: '🛡️',
  baby: '👶',
  house: '🏡',
  car: '🚗',
  other: '✨',
};

const CATEGORY_NAMES: Record<string, { en: string; am: string }> = {
  emergency: { en: 'Emergency Fund', am: 'የአደጋ ጊዜ ፈንድ' },
  baby: { en: 'Baby Fund', am: 'የልጅ ፈንድ' },
  house: { en: 'House Fund', am: 'የቤት እቅድ' },
  car: { en: 'Car Fund', am: 'የመኪና እቅድ' },
  other: { en: 'ልዩ ፕሮግራም ቁጠባ', am: 'የልዩ ፕሮግራም ቁጠባ' },
};

export default function DreamGoalsPage({ goals, onAddGoal, onAddSavings }: DreamGoalsPageProps) {
  const { t, language } = useLanguage();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTarget, setNewTarget] = useState('');
  const [newCategory, setNewCategory] = useState<'emergency' | 'baby' | 'house' | 'car' | 'other'>('emergency');
  const [newDeadline, setNewDeadline] = useState('');
  
  // Savings adjustment variables
  const [activeGoalIdForSavings, setActiveGoalIdForSavings] = useState<string | null>(null);
  const [savingsInflow, setSavingsInflow] = useState('');

  // Celebration state
  const [celebratedGoal, setCelebratedGoal] = useState<DreamGoal | null>(null);

  const handleCreateGoal = (e: FormEvent) => {
    e.preventDefault();
    const parsedTarget = parseFloat(newTarget);
    if (newTitle.trim() === '' || isNaN(parsedTarget) || parsedTarget <= 0) return;
    
    onAddGoal({
      title: newTitle.trim(),
      targetAmount: parsedTarget,
      category: newCategory,
      deadline: newDeadline || new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString().split('T')[0],
    });

    setNewTitle('');
    setNewTarget('');
    setShowAddForm(false);
  };

  const handleAddSavingsSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!activeGoalIdForSavings) return;
    const parsedSavings = parseFloat(savingsInflow);
    if (isNaN(parsedSavings) || parsedSavings <= 0) return;

    const goal = goals.find((g) => g.id === activeGoalIdForSavings);
    if (!goal) return;

    onAddSavings(activeGoalIdForSavings, parsedSavings);

    // If adding this pushes the goal to completed (or higher), trigger custom overlay celebration!
    const newSaved = goal.savedAmount + parsedSavings;
    if (newSaved >= goal.targetAmount && !goal.isCompleted) {
      setCelebratedGoal({
        ...goal,
        savedAmount: newSaved,
        isCompleted: true,
      });
    }

    setSavingsInflow('');
    setActiveGoalIdForSavings(null);
  };

  return (
    <div className="pt-4 pb-24 px-4 max-w-lg mx-auto min-h-screen bg-gradient-to-tr from-[#FFF7FA] via-[#FFFBFD] to-[#EDF4FF] font-sans">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <span className="text-slate-400 text-xs font-semibold block uppercase tracking-wider font-mono">{t('goal_header_mono')}</span>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight leading-none">{t('goal_header_title')}</h1>
        </div>
        
        <button
          onClick={() => setShowAddForm(true)}
          className="py-2.5 px-3 bg-pink-500 hover:bg-pink-600 font-bold text-xs text-white rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
          id="btn-trigger-add-goal"
        >
          <PlusCircle className="w-4 h-4" /> {t('goal_start_btn')}
        </button>
      </div>

      {/* Goal creation modal form */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-sm bg-white rounded-3xl p-6 border border-slate-100 shadow-2xl space-y-4 animate-slide-up">
            <div className="flex justify-between items-center pb-2 border-b border-pink-50">
              <div className="flex items-center gap-1.5">
                <Target className="w-5 h-5 text-pink-500" />
                <h3 className="font-bold text-slate-800">{t('goal_modal_title')}</h3>
              </div>
              <button onClick={() => setShowAddForm(false)} className="p-1 rounded-full text-slate-400 hover:bg-slate-50">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateGoal} className="space-y-4 text-left">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider mb-1">{t('goal_name_label')}</label>
                <input
                  type="text"
                  placeholder={language === 'am' ? 'ለምሳሌ፤ የአደጋ ጊዜ ፈንድ፣ የልጅ ፈንድ፣ የቤት ማሰሪያ' : 'E.g., Emergency Fund, Baby Fund, Car Plan'}
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-sans focus:outline-none focus:ring-1 focus:ring-pink-300 focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider mb-1">{t('goal_target_label')}</label>
                <div className="relative">
                  <span className="absolute left-3 inset-y-0 flex items-center text-xs font-bold text-slate-400">{t('currency_short')}</span>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={newTarget}
                    onChange={(e) => setNewTarget(e.target.value)}
                    className="w-full p-3 pl-12 bg-slate-50 border border-slate-200 rounded-xl text-xs font-sans focus:outline-none focus:ring-1 focus:ring-pink-300 focus:bg-white font-bold"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider mb-1">{t('goal_category_label')}</label>
                  <select
                    value={newCategory}
                    onChange={(e: any) => setNewCategory(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-sans"
                  >
                    <option value="emergency">🛡️ {language === 'am' ? 'የአደጋ ጊዜ ፈንድ' : 'Emergency Fund'}</option>
                    <option value="baby">👶 {language === 'am' ? 'የልጅ ፈንድ' : 'Baby Fund'}</option>
                    <option value="house">🏡 {language === 'am' ? 'የቤት እቅድ' : 'House Fund'}</option>
                    <option value="car">🚗 {language === 'am' ? 'የመኪና እቅድ' : 'Car Fund'}</option>
                    <option value="other">✨ {language === 'am' ? 'የልዩ ፕሮግራም ቁጠባ' : 'Special Occasion'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider mb-1">{t('goal_deadline_label')}</label>
                  <input
                    type="date"
                    value={newDeadline}
                    onChange={(e) => setNewDeadline(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-sans"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold rounded-xl shadow-md transition-all mt-2 cursor-pointer"
                id="btn-create-goal-submit"
              >
                {t('goal_start_submit')}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Adding savings inflow Modal form */}
      {activeGoalIdForSavings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-sm bg-white rounded-3xl p-6 border border-slate-100 shadow-2xl space-y-4 animate-slide-up">
            <div className="flex justify-between items-center pb-2 border-b border-pink-50">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-5 h-5 text-amber-500 fill-current" />
                <h3 className="font-bold text-slate-800">{t('goal_add_savings_title')}</h3>
              </div>
              <button onClick={() => setActiveGoalIdForSavings(null)} className="p-1 rounded-full text-slate-400 hover:bg-slate-50">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddSavingsSubmit} className="space-y-4 text-left">
              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                {t('goal_add_savings_sub')}
              </p>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider mb-1">{t('goal_add_savings_amount')}</label>
                <div className="relative">
                  <span className="absolute left-3 inset-y-0 flex items-center text-xs font-bold text-slate-400">{t('currency_short')}</span>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={savingsInflow}
                    onChange={(e) => setSavingsInflow(e.target.value)}
                    className="w-full p-3.5 pl-12 bg-slate-50 border border-slate-200 rounded-xl text-sm font-sans focus:outline-none focus:ring-1 focus:ring-pink-300 focus:bg-white font-bold"
                    required
                    autoFocus
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-pink-500 to-indigo-500 text-white text-xs font-bold rounded-xl shadow-md transition-all mt-2 cursor-pointer"
                id="btn-add-savings-submit"
              >
                {t('goal_add_savings_submit')}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Dreams Summary Dashboard Box */}
      {goals.length > 0 && (
        <div className="p-5 rounded-3xl bg-white border border-pink-100 shadow-[0_4px_24px_rgba(244,143,177,0.01)] mb-6 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-widest block">{t('goal_total_title')}</span>
            <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-indigo-600 font-sans">
              {goals.reduce((sum, g) => sum + g.savedAmount, 0).toLocaleString()} {t('currency_short')} {t('goal_total_saved')}
            </h2>
            <span className="text-[10px] text-slate-500 block">
              {t('goal_total_across', { num: goals.length })}
            </span>
          </div>
          <div className="p-3 bg-pink-100 rounded-2xl text-pink-500 shrink-0 transform rotate-3">
            <Target className="w-5 h-5 fill-current animate-pulse" />
          </div>
        </div>
      )}

      {/* Goals List Grid */}
      <div className="space-y-4 font-sans">
        {goals.length === 0 ? (
          <div className="text-center py-20 bg-white/40 border border-pink-50 rounded-3xl p-6 font-sans">
            <Trophy className="w-12 h-12 text-amber-300 mx-auto opacity-60 mb-3 animate-bounce-slow" />
            <h3 className="text-base font-bold text-slate-700">{t('goal_no_goals')}</h3>
            <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1 leading-relaxed">
              {t('goal_no_goals_sub')}
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="mt-4 py-2 px-4 bg-pink-500 text-white font-bold rounded-xl text-xs shadow-md cursor-pointer"
              id="btn-no-goals"
            >
              {t('goal_no_goals_btn')}
            </button>
          </div>
        ) : (
          goals.map((goal) => {
            const rawPercentage = (goal.savedAmount / goal.targetAmount) * 100;
            const progressPercent = Math.min(100, Math.max(0, parseFloat(rawPercentage.toFixed(1))));
            const isCompleted = progressPercent >= 100;
            const deadlineDate = new Date(goal.deadline);
            const formattedDeadline = deadlineDate.toLocaleDateString(language === 'am' ? 'am-ET' : 'en-US', { month: 'short', year: 'numeric' });

            return (
              <div
                key={goal.id}
                className={`p-5 rounded-3xl border font-sans ${
                  isCompleted 
                    ? 'border-emerald-200 bg-emerald-50/20' 
                    : 'border-pink-50 bg-white/70'
                } shadow-[0_2px_12px_rgba(244,143,177,0.01)] space-y-4 flex flex-col justify-between`}
              >
                
                {/* Info block */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl p-2.5 bg-slate-100 rounded-2xl">
                      {CATEGORY_EMOJIS[goal.category] || '✨'}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-slate-800 tracking-tight font-sans flex items-center gap-1.5">
                        {goal.title}
                        {isCompleted && (
                          <CheckCircle className="w-4 h-4 text-emerald-500 fill-current" />
                        )}
                      </h3>
                      
                      <span className="text-[10.5px] text-slate-400 font-sans flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3 h-3 text-slate-300" />
                        {language === 'am' ? 'እስከ' : 'By'} {formattedDeadline}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-pink-500 bg-pink-50 px-2 py-0.5 rounded-full">
                      {t('goal_saved_percent', { percent: progressPercent })}
                    </span>
                  </div>
                </div>

                {/* Progress bar and numeric tracking */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-600 mb-2 font-sans">
                    <span>{goal.savedAmount.toLocaleString()} {t('currency_short')}</span>
                    <span className="text-slate-400">/ {language === 'am' ? 'ከ ' : 'of '} {goal.targetAmount.toLocaleString()} {t('currency_short')}</span>
                  </div>

                  {/* Tailwind Progress slide */}
                  <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden w-full relative">
                    <div
                      style={{ width: `${progressPercent}%` }}
                      className={`h-full rounded-full transition-all duration-700 ${
                        isCompleted 
                          ? 'bg-gradient-to-r from-emerald-400 to-teal-500' 
                          : 'bg-gradient-to-r from-pink-400 via-rose-500 to-indigo-400'
                      }`}
                    />
                  </div>
                </div>

                {/* Actions row */}
                <div className="flex justify-between items-center gap-2 pt-2 border-t border-dashed border-pink-100 font-sans">
                  <span className="text-[10px] text-slate-400 italic font-mono flex items-center gap-1">
                    <Heart className="w-3 h-3 text-pink-500 shrink-0 fill-pink-500" />
                    {t('goal_future_quote')}
                  </span>

                  <button
                    onClick={() => setActiveGoalIdForSavings(goal.id)}
                    className={`py-1.5 px-3 rounded-lg text-[10.5px] font-bold tracking-tight shadow-xs transition-all flex items-center gap-1 cursor-pointer ${
                      isCompleted 
                        ? 'bg-slate-100 text-slate-500 hover:bg-slate-200' 
                        : 'bg-pink-50 hover:bg-pink-100 text-pink-600'
                    }`}
                    id={`btn-add-savings-${goal.id}`}
                  >
                    <ChevronsUp className="w-3.5 h-3.5 text-pink-500" /> {language === 'am' ? 'ገንዘብ ጨምር' : 'Add Money'}
                  </button>
                </div>

              </div>
            );
          })
        )}
      </div>

      {/* Goal Reached Confetti Congratulatory Celebration Screen */}
      <AnimatePresence>
        {celebratedGoal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCelebratedGoal(null)}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="max-w-sm w-full bg-white rounded-3xl p-8 border border-white/20 shadow-2xl relative overflow-hidden text-center font-sans"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-pink-500 via-amber-400 to-emerald-500" />
              
              <div className="w-20 h-20 bg-amber-100 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-5 border-4 border-amber-50 text-3xl shadow-lg relative animate-bounce-slow">
                🏆
                <div className="absolute -top-1 -right-1 p-1 bg-pink-500 text-white rounded-full">
                  <Sparkles className="w-4 h-4 fill-current" />
                </div>
              </div>

              <span className="text-[10px] font-extrabold text-pink-500 uppercase tracking-widest font-mono">{t('goal_celebration_title')}</span>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight mt-1.5">{t('goal_celebration_sub')}</h2>
              
              <div className="my-4 p-4 bg-slate-50 border border-pink-50 rounded-2xl font-sans">
                <p className="text-sm font-bold text-indigo-700">“{celebratedGoal.title}”</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {t('goal_celebration_desc', { amount: celebratedGoal.targetAmount.toLocaleString() })}
                </p>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed italic max-w-xs mx-auto">
                {t('goal_celebration_quote')}
              </p>

              <button
                onClick={() => setCelebratedGoal(null)}
                className="w-full mt-6 py-3.5 bg-gradient-to-r from-pink-500 via-rose-500 to-indigo-500 text-white font-bold text-xs rounded-2xl transition-all shadow-md shadow-pink-500/20 cursor-pointer"
                id="btn-close-celebration"
              >
                {t('goal_celebration_btn')}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
