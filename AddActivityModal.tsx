/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { X, Heart, Sparkles, AlertCircle, ShoppingBag, Car, Home, Globe, Film, Gift, FileText, HeartPulse, ShieldAlert, Layers } from 'lucide-react';
import { CategoryType, ActivityType, MoneyScope, RoleType } from '../types';
import { useLanguage } from '../lib/LanguageContext';
import { getTranslatedCategory } from '../lib/translations';

interface AddActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: {
    amount: number;
    type: ActivityType;
    category: CategoryType;
    notes: string;
    scope: MoneyScope;
    by: RoleType;
    date: string;
  }) => void;
  currentRole: RoleType;
  partnerName?: string;
}

const CATEGORY_ICONS: Record<CategoryType, any> = {
  Food: ShoppingBag,
  Transport: Car,
  Shopping: ShoppingBag,
  Rent: Home,
  Internet: Globe,
  Entertainment: Film,
  Gifts: Gift,
  Bills: FileText,
  Healthcare: HeartPulse,
  Emergency: ShieldAlert,
  Other: Layers,
};

export default function AddActivityModal({ isOpen, onClose, onAdd, currentRole, partnerName = "My Partner" }: AddActivityModalProps) {
  const { t, language } = useLanguage();
  const [type, setType] = useState<ActivityType>('out');
  const [amount, setAmount] = useState<string>('');
  const [category, setCategory] = useState<CategoryType>('Food');
  const [by, setBy] = useState<RoleType>(currentRole);
  const [scope, setScope] = useState<MoneyScope>('shared');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState<string>('');
  const [error, setError] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setError(language === 'am' ? 'እባክዎን ከ 0 በላይ የሆነ ትክክለኛ የብር መጠን ያስገቡ።' : 'Please write a real number greater than 0');
      return;
    }
    setError('');
    onAdd({
      amount: numAmount,
      type,
      category,
      notes: notes.trim(),
      scope,
      by,
      date,
    });
    // Reset inputs
    setAmount('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300">
      {/* Background click to dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main panel */}
      <div className="relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[92vh] sm:max-h-[85vh] animate-slide-up sm:animate-fade-in font-sans">
        
        {/* Decorative Top Bar (Pinterest Soft Pink/Blue) */}
        <div className="h-2 bg-gradient-to-r from-pink-300 via-pink-400 to-blue-400" />
        
        {/* Header */}
        <div className="p-5 flex items-center justify-between border-b border-pink-50/50 bg-gradient-to-b from-pink-50/20 to-transparent">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-pink-100 text-pink-500">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 tracking-tight font-sans">{t('modal_header')}</h3>
              <p className="text-xs text-slate-500">{t('modal_sub')}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors focus:outline-none"
            id="btn-close-activity"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 flex-1 overflow-y-auto space-y-5">
          {error && (
            <div className="p-3 bg-red-50 border border-red-100 rounded-xl flex items-start gap-2 text-red-600 text-xs">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Toggle Type: Money Out (Expense) vs Money In (Income) */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2 font-mono">{t('modal_act_type')}</label>
            <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl gap-1">
              <button
                type="button"
                onClick={() => setType('out')}
                className={`py-3 text-center text-sm font-bold rounded-xl transition-all ${
                  type === 'out'
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/10'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {t('money_out')}
              </button>
              <button
                type="button"
                onClick={() => setType('in')}
                className={`py-3 text-center text-sm font-bold rounded-xl transition-all ${
                  type === 'in'
                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/10'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {t('money_in')}
              </button>
            </div>
          </div>

          {/* Amount input in ETB */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2 font-mono">{t('modal_birr_amount')}</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-slate-400 font-bold font-sans">{t('currency_short')}</span>
              </div>
              <input
                type="number"
                pattern="[0-9]*"
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="block w-full pl-14 pr-12 py-4 text-2xl font-bold bg-slate-50 rounded-2xl border border-slate-200 text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:bg-white transition-all font-sans"
                required
                id="input-activity-amount"
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <Sparkles className="w-5 h-5 text-amber-400 fill-current animate-pulse" />
              </div>
            </div>
          </div>

          {/* Scope selection: Shared ("Our Money") or Personal ("My Money") */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2 font-mono">{t('modal_scope_label')}</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setScope('shared')}
                className={`p-3 rounded-2xl border-2 text-left flex flex-col justify-between transition-all ${
                  scope === 'shared'
                    ? 'border-pink-300 bg-pink-50/40 text-pink-700'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100/50'
                }`}
              >
                <div className="flex justify-between w-full items-center">
                  <span className="text-xs font-mono font-bold tracking-wider">{t('shared').toUpperCase()}</span>
                  <div className={`w-2 h-2 rounded-full ${scope === 'shared' ? 'bg-pink-500' : 'bg-slate-300'}`} />
                </div>
                <span className="text-base font-bold mt-2 font-sans">💕 {t('our_money')}</span>
                <span className="text-[10px] opacity-70 mt-1 font-sans">
                  {language === 'am' ? 'የሁለታችንም የጋራ ገንዘብ' : 'Belongs to both of us'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setScope('personal')}
                className={`p-3 rounded-2xl border-2 text-left flex flex-col justify-between transition-all ${
                  scope === 'personal'
                    ? 'border-blue-300 bg-blue-50/40 text-blue-700'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100/50'
                }`}
              >
                <div className="flex justify-between w-full items-center">
                  <span className="text-xs font-mono font-bold tracking-wider">{t('personal').toUpperCase()}</span>
                  <div className={`w-2 h-2 rounded-full ${scope === 'personal' ? 'bg-blue-500' : 'bg-slate-300'}`} />
                </div>
                <span className="text-base font-bold mt-2 font-sans">👤 {t('my_money')}</span>
                <span className="text-[10px] opacity-70 mt-1 font-sans">
                  {language === 'am' ? 'የኔ የግል ስልኬ ማጠራቀሚያ' : 'Unique to my wallet'}
                </span>
              </button>
            </div>
          </div>

          {/* Attributed to: Wife vs Husband */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2 font-mono">{t('modal_attribute_label')}</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setBy('husband')}
                className={`py-2 px-3 rounded-xl border text-sm font-medium transition-all flex items-center justify-center gap-1.5 ${
                  by === 'husband'
                    ? 'border-blue-300 bg-blue-50/20 text-blue-700 font-bold'
                    : 'border-slate-200 text-slate-600'
                }`}
              >
                {t('husband')}
              </button>
              <button
                type="button"
                onClick={() => setBy('wife')}
                className={`py-2 px-3 rounded-xl border text-sm font-medium transition-all flex items-center justify-center gap-1.5 ${
                  by === 'wife'
                    ? 'border-pink-300 bg-pink-50/20 text-pink-700 font-bold'
                    : 'border-slate-200 text-slate-600'
                }`}
              >
                {t('wife')}
              </button>
            </div>
          </div>

          {/* Categories Grid Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2 font-mono">{t('goal_category_label')}</label>
            <div className="grid grid-cols-3 gap-2">
              {(Object.keys(CATEGORY_ICONS) as CategoryType[]).map((catName) => {
                const IconComponent = CATEGORY_ICONS[catName];
                const isSelected = category === catName;
                return (
                  <button
                    key={catName}
                    type="button"
                    onClick={() => setCategory(catName)}
                    className={`py-2.5 px-2 rounded-xl border text-center flex flex-col items-center justify-center transition-all gap-1 ${
                      isSelected
                        ? 'border-pink-400 bg-pink-50 text-pink-700 font-bold scale-[1.02] shadow-sm'
                        : 'border-slate-100 bg-slate-50 text-slate-500 hover:bg-slate-100/50'
                    }`}
                  >
                    <IconComponent className={`w-4 h-4 ${isSelected ? 'stroke-pink-500' : 'stroke-slate-400'}`} />
                    <span className="text-[11px] font-sans truncate w-full">
                      {getTranslatedCategory(catName, language)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Date Picker */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2 font-mono">{t('goal_deadline_label')}</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="block w-full p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 focus:outline-none focus:ring-1 focus:ring-pink-300 text-sm font-sans"
              required
            />
          </div>

          {/* Notes / Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2 font-mono">{t('modal_note_label')}</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={language === 'am' ? 'ለምሳሌ፤ ቀይ አበባ ገዛሁላት 🌹 ፣ ሻይ ጠጣን ☕' : 'E.g., Bought roses for her 🌹, Shahi tea for us ☕'}
              rows={2}
              className="block w-full p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-pink-300 text-sm font-sans resize-none"
              maxLength={200}
            />
          </div>

          {/* Submit button */}
          <div className="pt-2">
            <button
              type="submit"
              className={`w-full py-4 text-center font-bold text-white rounded-2xl shadow-lg transition-all transform hover:scale-[1.01] active:scale-[0.99] ${
                type === 'out'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 shadow-rose-500/20 hover:from-pink-600 hover:to-rose-600'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-500 shadow-emerald-500/20 hover:from-emerald-600 hover:to-teal-600'
              }`}
              id="btn-add-activity-submit"
            >
              {type === 'out' ? t('modal_submit_out') : t('modal_submit_in')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
