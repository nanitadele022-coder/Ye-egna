/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { User, LogOut, Sparkles, Heart, ShieldAlert, Trash2, Globe } from 'lucide-react';
import { UserProfile, RoleType } from '../types';
import { useLanguage } from '../lib/LanguageContext';

interface ProfileSettingsPageProps {
  user: UserProfile;
  partnerName?: string;
  onUpdateUser: (data: Partial<UserProfile>) => void;
  onLogout: () => void;
  onResetDatabase: () => void;
  onSwitchCharacter: (role: RoleType) => void;
}

export default function ProfileSettingsPage({
  user,
  partnerName = 'My Partner',
  onUpdateUser,
  onLogout,
  onResetDatabase,
  onSwitchCharacter,
}: ProfileSettingsPageProps) {
  const { t, language, setLanguage } = useLanguage();
  const [editingName, setEditingName] = useState(user.displayName);
  const [editingCode, setEditingCode] = useState(user.coupleCode);
  const [savedMessage, setSavedMessage] = useState('');

  const handleSaveProfile = (e: FormEvent) => {
    e.preventDefault();
    if (editingName.trim() === '' || editingCode.trim() === '') return;
    
    onUpdateUser({
      displayName: editingName.trim(),
      coupleCode: editingCode.trim().toUpperCase(),
    });

    setSavedMessage(t('settings_profile_saved'));
    setTimeout(() => setSavedMessage(''), 2500);
  };

  const isLocalUser = user.uid.startsWith('local-');

  return (
    <div className="pt-4 pb-24 px-4 max-w-lg mx-auto min-h-screen bg-gradient-to-tr from-[#FFF7FA] via-[#FFFBFD] to-[#EDF4FF] font-sans">
      
      {/* Header */}
      <div className="mb-6">
        <span className="text-slate-400 text-xs font-semibold block uppercase tracking-wider font-mono">{t('settings_header_mono')}</span>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight leading-none">{t('settings_header_title')}</h1>
      </div>

      {savedMessage && (
        <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-center gap-2 text-indigo-700 text-xs font-bold mb-4 font-sans animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-500 fill-current" />
          <span>{savedMessage}</span>
        </div>
      )}

      {/* Profile Overview card */}
      <div className="p-5 rounded-3xl bg-white border border-pink-50 shadow-[0_4px_24px_rgba(244,143,177,0.01)] mb-6">
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold text-white shadow-xs ${
            user.role === 'wife' 
              ? 'bg-gradient-to-br from-pink-300 to-pink-500 shadow-pink-300/30' 
              : 'bg-gradient-to-br from-blue-300 to-blue-500 shadow-blue-300/30'
          }`}>
            {user.displayName.charAt(0).toUpperCase()}
          </div>
          <div className="text-left font-sans">
            <h3 className="text-sm font-extrabold text-slate-800 tracking-tight font-sans block">{user.displayName}</h3>
            <p className="text-xs text-slate-400 flex flex-wrap items-center gap-1.5 font-sans mt-0.5">
              <span>{t('settings_role_label')} {user.role === 'wife' ? t('wife_emoji') : t('husband_emoji')}</span>
              <span>•</span>
              <span className="font-bold text-pink-500 uppercase font-mono tracking-wide">{user.coupleCode}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Language Section Inside Settings */}
      <div className="bg-white border border-pink-50 rounded-3xl p-5 shadow-[0_4px_24px_rgba(244,143,177,0.01)] mb-6 font-sans">
        <div className="flex items-center gap-2 pb-3 border-b border-pink-50 mb-4 font-sans">
          <Globe className="w-4.5 h-4.5 text-pink-500" />
          <h3 className="text-xs font-bold text-slate-600 uppercase tracking-widest font-mono">{t('settings_lang_title')}</h3>
        </div>

        <div className="flex items-center justify-between font-sans">
          <span className="text-xs text-slate-500 font-sans">{t('settings_lang_select')}</span>
          
          <div className="flex gap-2 font-sans">
            <button
              onClick={() => setLanguage('en')}
              className={`py-1.5 px-3 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-gradient-to-tr from-pink-500 to-pink-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
              }`}
              id="lang-btn-en"
            >
              🇺🇸 English
            </button>
            <button
              onClick={() => setLanguage('am')}
              className={`py-1.5 px-3 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                language === 'am'
                  ? 'bg-gradient-to-tr from-pink-500 to-pink-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
              }`}
              id="lang-btn-am"
            >
              🇪🇹 አማርኛ
            </button>
          </div>
        </div>
      </div>

      {/* Switch Character Simulator (ONLY in Local Mode to test multi-user sync) */}
      {isLocalUser && (
        <div className="p-5 bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white rounded-3xl mb-6 relative overflow-hidden border border-slate-700/30 text-left shadow-lg">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl" />
          
          <div className="flex items-center gap-2 pb-2.5 border-b border-indigo-800 mb-3">
            <Sparkles className="w-4.5 h-4.5 text-amber-300 fill-current animate-pulse shrink-0" />
            <span className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-widest leading-none">{t('settings_test_mono')}</span>
          </div>

          <h4 className="text-xs font-black text-slate-100 tracking-tight">{t('settings_test_title')}</h4>
          <p className="text-[11px] text-indigo-200 mt-1 leading-relaxed font-sans font-medium">
            {t('settings_test_desc')}
          </p>

          <div className="grid grid-cols-2 mt-4 gap-2.5">
            <button
              onClick={() => onSwitchCharacter('wife')}
              className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition-all cursor-pointer ${
                user.role === 'wife'
                  ? 'bg-pink-500 text-white shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              👩 {language === 'am' ? 'ሊዲያ (ሚስት)' : 'Lydia (Wife)'}
            </button>
            <button
              onClick={() => onSwitchCharacter('husband')}
              className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition-all cursor-pointer ${
                user.role === 'husband'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              👨 {language === 'am' ? 'ዳዊት (ባል)' : 'Dawit (Husband)'}
            </button>
          </div>
        </div>
      )}

      {/* Edit Profile details */}
      <div className="bg-white border border-pink-50 rounded-3xl p-5 shadow-[0_4px_24px_rgba(244,143,177,0.01)] mb-6 font-sans">
        <div className="flex items-center gap-2 pb-3 border-b border-pink-50 mb-4 font-sans">
          <User className="w-4.5 h-4.5 text-pink-500" />
          <h3 className="text-xs font-bold text-slate-600 uppercase tracking-widest font-mono">{t('settings_profile_fields_title')}</h3>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-4 text-left">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider mb-1">{t('settings_profile_edit_name')}</label>
            <input
              type="text"
              value={editingName}
              onChange={(e) => setEditingName(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-sans font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-pink-300 focus:bg-white"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider mb-1">{t('settings_profile_edit_code')}</label>
            <input
              type="text"
              value={editingCode}
              onChange={(e) => setEditingCode(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-sans font-black uppercase text-pink-600 focus:outline-none focus:ring-1 focus:ring-pink-300 focus:bg-white"
              required
            />
            <p className="text-[10px] text-slate-400 mt-1 pb-1 font-sans">
              💡 {t('settings_profile_edit_code_sub')}
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-indigo-500 hover:from-pink-600 hover:to-indigo-600 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
            id="btn-save-settings"
          >
            {t('settings_profile_submit_btn')}
          </button>
        </form>
      </div>

      {/* Help section */}
      <div className="bg-white border border-pink-50 rounded-3xl p-5 shadow-[0_4px_24px_rgba(244,143,177,0.01)] mb-6 text-left font-sans">
        <div className="flex items-center gap-2 pb-3 border-b border-pink-50 mb-4">
          <Heart className="w-4.5 h-4.5 text-pink-500" />
          <h3 className="text-xs font-bold text-slate-600 uppercase tracking-widest font-mono">{t('settings_agreement_title')}</h3>
        </div>
        <ul className="space-y-2 text-xs text-slate-500 font-sans leading-relaxed list-disc list-inside">
          <li>{t('settings_agreement_1')}</li>
          <li>{t('settings_agreement_2')}</li>
          <li>{t('settings_agreement_3')}</li>
        </ul>
      </div>

      {/* System Actions */}
      <div className="bg-white border border-pink-50 rounded-3xl p-5 shadow-[0_4px_24px_rgba(244,143,177,0.01)] space-y-3.5 text-left font-sans">
        <div className="flex items-center gap-2 pb-3 border-b border-pink-50">
          <ShieldAlert className="w-4.5 h-4.5 text-rose-500" />
          <h3 className="text-xs font-bold text-slate-600 uppercase tracking-widest font-mono">{t('settings_system_title')}</h3>
        </div>

        <div className="flex items-center justify-between py-1 font-sans">
          <div className="text-left font-sans">
            <span className="text-xs font-bold text-slate-700 block">{t('settings_system_reset')}</span>
            <span className="text-[10px] text-slate-400 font-sans leading-relaxed block mt-0.5">{t('settings_system_reset_sub')}</span>
          </div>
          <button
            onClick={() => {
              if (window.confirm(t('settings_system_reset_confirm'))) {
                onResetDatabase();
              }
            }}
            className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-all cursor-pointer"
            id="btn-reset-db"
            title={t('settings_system_reset')}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <div className="border-t border-slate-100 pt-3.5 flex items-center justify-between py-1 font-sans">
          <div className="text-left font-sans">
            <span className="text-xs font-bold text-slate-700 block text-left">{t('settings_system_logout')}</span>
            <span className="text-[10px] text-slate-400 font-sans leading-relaxed block mt-0.5">{t('settings_system_logout_sub')}</span>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 px-3 rounded-xl text-xs font-bold cursor-pointer"
            id="btn-logout"
          >
            <LogOut className="w-3.5 h-3.5" /> {t('settings_system_logout_btn')}
          </button>
        </div>
      </div>

    </div>
  );
}
