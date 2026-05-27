/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { Target, TrendingUp, Sparkles, Heart, HelpCircle, ArrowRightLeft, ShieldCheck, Footprints, AlertTriangle } from 'lucide-react';
import { MoneyActivity, CategoryType } from '../types';
import { useLanguage } from '../lib/LanguageContext';
import { getTranslatedCategory } from '../lib/translations';

interface MonthlySummaryProps {
  activities: MoneyActivity[];
}

export default function MonthlySummaryPage({ activities }: MonthlySummaryProps) {
  const { t, language } = useLanguage();

  // Category totals
  const categorySummary = useMemo(() => {
    const categories: Record<CategoryType, { in: number; out: number }> = {
      Food: { in: 0, out: 0 },
      Transport: { in: 0, out: 0 },
      Shopping: { in: 0, out: 0 },
      Rent: { in: 0, out: 0 },
      Internet: { in: 0, out: 0 },
      Entertainment: { in: 0, out: 0 },
      Gifts: { in: 0, out: 0 },
      Bills: { in: 0, out: 0 },
      Healthcare: { in: 0, out: 0 },
      Emergency: { in: 0, out: 0 },
      Other: { in: 0, out: 0 },
    };

    activities.forEach((act) => {
      if (categories[act.category]) {
        if (act.type === 'in') {
          categories[act.category].in += act.amount;
        } else {
          categories[act.category].out += act.amount;
        }
      }
    });

    return Object.entries(categories)
      .map(([name, val]) => ({
        name: name as CategoryType,
        in: val.in,
        out: val.out,
        total: val.out, // Standardize on spending representation
      }))
      .filter((c) => c.out > 0 || c.in > 0)
      .sort((a, b) => b.out - a.out);
  }, [activities]);

  // Aggregate totals
  const totalIn = activities.filter((a) => a.type === 'in').reduce((sum, a) => sum + a.amount, 0);
  const totalOut = activities.filter((a) => a.type === 'out').reduce((sum, a) => sum + a.amount, 0);
  const totalSaved = Math.max(0, totalIn - totalOut);

  // Derive smart AI suggestions & summaries based on actual user activities
  const aiTips = useMemo(() => {
    const highestSpend = categorySummary[0];
    const isAm = language === 'am';

    const tips = {
      summary: isAm 
        ? "የቁጠባ ደረጃዎን በጥሩ ሁኔታ እየወጣችሁ ነው! እጅ ለእጅ ተያይዛችሁ ምርጥ ክትትል እያደረጋችሁ ነው።" 
        : "You are climbing your money stairs beautifully! Hand in hand, you maintain stellar tracking.",
      highestCategory: isAm ? "አልተገኘም" : "None yet",
      suggestion: isAm 
        ? "ጥልቅ የገንዘብ ግንዛቤዎችን ለማግኘት እባክዎ ተጨማሪ ምዝገባዎችን ያክሉ። ለምሳሌ የሳምንታዊ ገበያ ወጪን መመዝገብ መጀመር ይችላሉ!" 
        : "Let's record more entries to unlock deep financial wisdom. Try adding your weekly market trip details!",
      teamworkScore: 85,
    };

    if (highestSpend && highestSpend.out > 0) {
      const catTranslated = getTranslatedCategory(highestSpend.name, language).replace(/🍔|🚗|🛍️|🏡|🌐|🎬|🎁|📄|🏥|🛡️|✨/g, '').trim();
      tips.highestCategory = catTranslated;
      
      if (highestSpend.name === 'Food') {
        tips.summary = isAm 
          ? "በማእድ ቤታችን ውስጥ ብዙ ፍቅር እየተሰራጨ ነው! በዚህ ወር ምግብ ዋነኛ ወጪያችሁ ነው።" 
          : "A lot of love spreads through our kitchen! Food is your main Money Out this month.";
        tips.suggestion = isAm 
          ? "ወጪዎችን ለማመጣጠን ውጭ ከመብላት ይልቅ በቤት ውስጥ ጣፋጭ የኢትዮጵያ ቡና ☕ እና ባልና ሚስት የሚጋሩት እራት ማዘጋጀት ይሞክሩ! ከፍተኛ ቁጠባ፣ ከፍተኛ ፍቅር!" 
          : "To optimize, try making delicious Ethiopian coffee ☕ and dinner dates together at home rather than ordering out! High savings, high romance.";
      } else if (highestSpend.name === 'Shopping') {
        tips.summary = isAm 
          ? "ካርቶኖቹ በሙሉ እየተሞሉ ነው! ሸመታ በዚህ ወር ትልቁ ወጪያችሁ ነው።" 
          : "Bags are looking full! Shopping represents your biggest money output.";
        tips.suggestion = isAm 
          ? "የ'24-ሰዓት ስሜትን ማቀዝቀዣ' ህግ እናውጣ! ማንኛውንም አስፈላጊ ያልሆነ እቃ ከመግዛትዎ በፊት 24 ሰዓታት ይጠብቁ እና አብራችሁ በሻይ ሰዓት ተወያዩበት።" 
          : "Let's establish a '24-hour sweet cooldown' rule! Wait 24 hours before buying non-essential items and discuss them together over tea.";
      } else if (highestSpend.name === 'Rent' || highestSpend.name === 'Bills') {
        tips.summary = isAm 
          ? "የቤታችንን ደህንነት መጠበቅ በጣም አስፈላጊ ነው። የቤተሰብ ቋሚ ሂሳቦች ቀዳሚ መሆን አለባቸው።" 
          : "Securing our home space is crucial. Base family bills take precedence.";
        tips.suggestion = isAm 
          ? "እነዚህ በቁጠባ መሰላል ላይ የማይቀሩ እርምጃዎች ናቸው። ኪራይ የግድ ስለሆነ ከሌሎች እንደ መዝናኛ ወይም የኢንተርኔት ካርዶች ላይ ጥቃቅንን ቁጠባ ለመፈለግ እንሞክር!" 
          : "These are fixed steps in our staircase. Since rent is essential, let's seek tiny savings in variable activities like Entertainment or Internet packages!";
      } else {
        tips.summary = isAm 
          ? `በዚህ ወር በ"${catTranslated}" ላይ ያደረጋችሁትን ወጪ አስተውለናል።` 
          : "We noticed a high focus on high spending activities this month.";
        tips.suggestion = isAm 
          ? `የ"${catTranslated}" ወጪዎች በሙሉ አስፈላጊ መሆናቸውን አብራችሁ ገምግሙ፣ ወይም የተወሰነውን ወደ ቁምነገር ህልም እቅዶቻችሁ ላይ አስገቡት!` 
          : "Consider reviewing if all elements are necessary, or allocate some of this to your active Dream Goals!";
      }
    }

    if (totalOut > totalIn && totalIn > 0) {
      tips.summary = isAm 
        ? "ውድ አጋሮች፣ በዚህ ወር ከገቢያችሁ የበለጠ ወጪ አድርጋችኋል።" 
        : "A minor warning, sweethearts: You spent more than your incoming funds this month.";
      tips.suggestion = isAm 
        ? "አንድ ላይ ረጋ ብለን እንተንፍስ! ዛሬ ማታ ተቀምጠን የወጪ ዝርዝራችንን እንመልከትና በሚቀጥለው ወር ልናቆማቸው የምንችላቸውን 3 ጥቃቅን ነገሮች እንለይ።" 
        : "Take a breath together! Sit down tonight, view your Money Activity list, and identify 3 trivial flows you can pause for next month.";
      tips.teamworkScore = 65;
    } else if (totalSaved > 1000) {
      tips.teamworkScore = 95;
    }

    return tips;
  }, [categorySummary, totalIn, totalOut, totalSaved, language]);

  return (
    <div className="pt-4 pb-24 px-4 max-w-lg mx-auto min-h-screen bg-gradient-to-tr from-[#FFF7FA] via-[#FFFBFD] to-[#EDF4FF] font-sans">
      
      {/* Header */}
      <div className="mb-6">
        <span className="text-slate-400 text-xs font-semibold block uppercase tracking-wider font-mono">{t('sum_header_mono')}</span>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight leading-none">{t('sum_header_title')}</h1>
      </div>

      {/* Aggregate Balance Display card */}
      <div className="p-5 rounded-3xl bg-white border border-pink-50 shadow-[0_4px_24px_rgba(244,143,177,0.01)] mb-6 space-y-4">
        <div className="flex items-center gap-2 pb-2.5 border-b border-pink-50">
          <Footprints className="w-5 h-5 text-pink-500" />
          <h3 className="text-sm font-bold text-slate-700 font-sans">{t('sum_shared_steps')}</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-3.5 bg-emerald-50/40 rounded-2xl border border-emerald-100/50">
            <span className="text-[10px] font-bold text-emerald-700 tracking-wider font-mono uppercase block">{t('money_in')}</span>
            <span className="text-base font-extrabold text-slate-800 block mt-1">{totalIn.toLocaleString()} {t('currency_short')}</span>
          </div>

          <div className="p-3.5 bg-rose-50/40 rounded-2xl border border-rose-100/50">
            <span className="text-[10px] font-bold text-rose-700 tracking-wider font-mono uppercase block">{t('money_out')}</span>
            <span className="text-base font-extrabold text-slate-800 block mt-1">{totalOut.toLocaleString()} {t('currency_short')}</span>
          </div>
        </div>

        {/* Savings Growth */}
        <div className="p-4 bg-gradient-to-tr from-pink-50/50 to-indigo-50/50 rounded-2xl flex items-center justify-between border border-pink-100/30">
          <div>
            <span className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wide block">{t('sum_growth_surplus')}</span>
            <span className="text-lg font-black text-slate-800 font-sans">{totalSaved.toLocaleString()} {t('currency_short')}</span>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">
              {t('sum_badge')}
            </span>
          </div>
        </div>
      </div>

      {/* Modern Bar Chart (Custom dynamic SVG bar metrics representation) */}
      <div className="p-5 rounded-3xl bg-white border border-pink-50 mb-6 font-sans">
        <div className="flex justify-between items-center pb-3 border-b border-pink-50 mb-4">
          <h3 className="text-xs font-bold text-slate-600 uppercase tracking-widest font-mono">{t('sum_where_spent')}</h3>
          <span className="text-[10px] text-slate-400 font-mono uppercase">{t('sum_currency_spent')}</span>
        </div>

        {categorySummary.length === 0 ? (
          <div className="text-center py-10 text-slate-400 text-xs font-sans">
            {t('sum_no_activities')} 📊
          </div>
        ) : (
          <div className="space-y-4 font-sans">
            {categorySummary.map((cat) => {
              // Calculate proportion ratio width
              const maxVal = Math.max(...categorySummary.map((c) => c.out));
              const widthRatio = maxVal > 0 ? (cat.out / maxVal) * 100 : 0;
              
              return (
                <div key={cat.name} className="space-y-1 font-sans">
                  <div className="flex justify-between text-xs font-bold text-slate-700 font-sans">
                    <span className="flex items-center gap-1 font-sans">
                      <span>🏷️</span>
                      {getTranslatedCategory(cat.name, language)}
                    </span>
                    <span className="font-sans">{cat.out.toLocaleString()} {t('currency_short')}</span>
                  </div>

                  {/* Horizontal Bar segment representation */}
                  <div className="h-5 bg-slate-100 rounded-lg overflow-hidden w-full relative group">
                    <div
                      style={{ width: `${widthRatio}%` }}
                      className="h-full bg-gradient-to-r from-pink-400 via-rose-500 to-indigo-400 rounded-lg transition-all duration-500"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Interactive AI Money Tips engine card */}
      <div className="p-6 bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white rounded-[32px] border border-slate-700/30 relative overflow-hidden shadow-xl mb-4 font-sans">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl" />
        
        {/* Header */}
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800/80 mb-4 font-sans">
          <Sparkles className="w-5 h-5 text-amber-300 fill-current animate-pulse" />
          <h3 className="text-sm font-black text-slate-100 font-sans uppercase tracking-wider">{t('sum_ai_title')}</h3>
        </div>

        {/* Content body based on rules */}
        <div className="space-y-4 font-sans">
          <div className="p-3 bg-slate-800/40 rounded-2xl border border-slate-800 text-left font-sans">
            <span className="text-[9px] font-bold text-slate-400 font-mono uppercase tracking-widest block">{t('sum_ai_label')}</span>
            <p className="text-xs text-indigo-100 leading-relaxed font-sans font-medium mt-1">
              "{aiTips.summary}"
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-1 font-sans">
            <div className="p-3 bg-slate-800/40 rounded-xl font-sans">
              <span className="text-[9px] font-bold text-slate-400 font-mono uppercase tracking-widest block">{t('sum_ai_peak')}</span>
              <span className="text-xs font-bold text-rose-300 mt-1 block capitalize font-sans">{aiTips.highestCategory}</span>
            </div>

            <div className="p-3 bg-slate-800/40 rounded-xl text-center font-sans">
              <span className="text-[9px] font-bold text-slate-400 font-mono uppercase tracking-widest block">{t('sum_ai_score')}</span>
              <span className="text-base font-black text-amber-300 mt-1 block font-mono">💍 {aiTips.teamworkScore}%</span>
            </div>
          </div>

          <div className="p-3 bg-slate-800/40 rounded-2xl border border-slate-800 text-left font-sans">
            <span className="text-[9px] font-bold text-slate-400 font-mono uppercase tracking-widest block">{t('sum_ai_strategy')}</span>
            <p className="text-xs text-amber-100 leading-relaxed font-sans font-medium mt-1">
              💡 {aiTips.suggestion}
            </p>
          </div>
        </div>

        {/* Team motivation message */}
        <div className="mt-5 text-center text-[10.5px] text-slate-400 italic font-medium pt-3.5 border-t border-slate-800/80 font-sans">
          {t('sum_ai_footer')}
        </div>
      </div>

    </div>
  );
}
