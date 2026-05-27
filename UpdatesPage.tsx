/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Bell, Heart, AlertTriangle, CheckCircle, Check } from 'lucide-react';
import { AppUpdateNotification } from '../types';
import { useLanguage } from '../lib/LanguageContext';

interface UpdatesPageProps {
  notifications: AppUpdateNotification[];
  onMarkRead: (id: string) => void;
  onClearAll: () => void;
}

export default function UpdatesPage({ notifications, onMarkRead, onClearAll }: UpdatesPageProps) {
  const { t, language } = useLanguage();

  return (
    <div className="pt-4 pb-24 px-4 max-w-lg mx-auto min-h-screen bg-gradient-to-tr from-[#FFF7FA] via-[#FFFBFD] to-[#EDF4FF] font-sans">
      
      {/* Page Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <span className="text-slate-400 text-xs font-semibold block uppercase tracking-wider font-mono">{t('updates_header_mono')}</span>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight leading-none">{t('updates_header_title')}</h1>
        </div>
        
        {notifications.length > 0 && (
          <button
            onClick={onClearAll}
            className="text-xs font-bold text-red-500 hover:text-red-600 hover:underline cursor-pointer"
            id="btn-clear-notifications"
          >
            {t('updates_clear_all')}
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="text-center py-20 bg-white/40 border border-pink-50 rounded-3xl p-6">
            <Bell className="w-12 h-12 text-pink-300 mx-auto opacity-50 mb-3 animate-pulse" />
            <h3 className="text-sm font-bold text-slate-700 font-sans">{t('updates_empty_title')}</h3>
            <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1 leading-relaxed">
              {t('updates_empty_sub')}
            </p>
          </div>
        ) : (
          notifications.map((notif) => {
            const dateObj = new Date(notif.date);
            const relativeTime = dateObj.toLocaleTimeString(language === 'am' ? 'am-ET' : 'en-US', { hour: 'numeric', minute: '2-digit' });

            // Dynamically translate notification details if they correspond to built-in templates
            let translatedTitle = notif.title;
            let translatedMsg = notif.message;
            if (language === 'am') {
              if (notif.title.includes("Budget Step Registered")) {
                translatedTitle = "አዲስ የገንዘብ እንቅስቃሴ ተመዝግቧል";
                translatedMsg = notif.message
                  .replace("added out activity", "የወጪ እንቅስቃሴ መዝግቧል")
                  .replace("added in activity", "የገቢ እንቅስቃሴ መዝግቧል")
                  .replace("for", "ለ")
                  .replace("Birr", "ብር");
              } else if (notif.title.includes("Budget Limit Alert")) {
                translatedTitle = "የበጀት ማስጠንቀቂያ";
                translatedMsg = "ውድ ሊዲያ/ዳዊት፣ ወርሃዊ ወጪያችሁ ከተመደበው ገቢ 80% ደርሷል። ወጪዎችን አብራችሁ ተወያዩበት! ⚠️";
              } else if (notif.title.includes("Dream Pot Seeded")) {
                translatedTitle = "የህልም እቅድ ቁጠባ ጨምሯል";
                translatedMsg = notif.message
                  .replace("saved custom steps under", "የህልም እቅድ ቁጠባ ጨምሯል በ")
                  .replace("of", "በ")
                  .replace("Birr", "ብር");
              }
            }

            return (
              <div
                key={notif.id}
                className={`p-4 rounded-2xl border transition-all relative flex gap-3.5 ${
                  notif.read 
                    ? 'bg-white/40 border-pink-50/50 opacity-75' 
                    : 'bg-white border-pink-100 shadow-[0_4px_16px_rgba(244,143,177,0.02)]'
                }`}
              >
                {/* Visual Category symbol */}
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  notif.type === 'success' 
                    ? 'bg-emerald-50 text-emerald-500' 
                    : notif.type === 'warning'
                      ? 'bg-amber-50 text-amber-500'
                      : 'bg-pink-50 text-pink-500'
                }`}>
                  {notif.type === 'success' ? (
                    <CheckCircle className="w-5 h-5 fill-current text-white text-emerald-500" />
                  ) : notif.type === 'warning' ? (
                    <AlertTriangle className="w-5 h-5" />
                  ) : (
                    <Heart className="w-5 h-5 fill-current" />
                  )}
                </div>

                {/* Message body */}
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center justify-between gap-2.5">
                    <h4 className={`text-xs font-bold font-sans ${notif.read ? 'text-slate-600' : 'text-slate-800'}`}>
                      {translatedTitle}
                    </h4>
                    <span className="text-[9.5px] font-mono text-slate-400 shrink-0">{relativeTime}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed font-sans font-medium pr-6">
                    {translatedMsg}
                  </p>
                </div>

                {/* Inline Mark as Read action */}
                {!notif.read && (
                  <button
                    onClick={() => onMarkRead(notif.id)}
                    className="absolute top-4 right-4 p-1 rounded-full text-pink-400 hover:text-pink-600 hover:bg-pink-50 transition-colors cursor-pointer"
                    title={t('updates_read_all') || "Mark as read"}
                    id={`btn-read-flag-${notif.id}`}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3px]" />
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
