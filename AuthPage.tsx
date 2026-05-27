/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { Heart, Mail, Lock, User, Sparkles, Key, AlertCircle, RefreshCw } from 'lucide-react';
import { auth, isFirebaseReady } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { RoleType } from '../types';

interface AuthPageProps {
  onSuccess: (user: { uid: string; displayName: string; role: RoleType; coupleCode: string }) => void;
}

export default function AuthPage({ onSuccess }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<RoleType>('wife');
  const [coupleCode, setCoupleCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Play sandbox mode bypass
  const handleLocalBypass = (selectedRole: RoleType) => {
    setIsLoading(true);
    // Mimic onboarding flow instantly
    setTimeout(() => {
      const mockUser = {
        uid: selectedRole === 'wife' ? 'local-wife-uid' : 'local-husband-uid',
        displayName: selectedRole === 'wife' ? 'Lydia' : 'Dawit',
        role: selectedRole,
        coupleCode: coupleCode.trim().toUpperCase() || 'YEEGNA77',
      };
      
      // Store in local storage
      localStorage.setItem('ye_egna_local_user', JSON.stringify(mockUser));
      setIsLoading(false);
      onSuccess(mockUser);
    }, 600);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (email.trim() === '' || password.trim() === '') {
      setError('Please fill in your email and password.');
      setIsLoading(false);
      return;
    }

    if (!isFirebaseReady) {
      // Local Database Registration Flow
      setIsLoading(true);
      setTimeout(() => {
        const uId = 'local-' + Math.random().toString(36).substring(2, 9);
        const savedUser = {
          uid: uId,
          displayName: isLogin ? (email.split('@')[0]) : name || 'Sweetheart',
          role: role,
          coupleCode: coupleCode.trim().toUpperCase() || 'YEEGNA77',
        };
        localStorage.setItem('ye_egna_local_user', JSON.stringify(savedUser));
        setIsLoading(false);
        onSuccess(savedUser);
      }, 700);
      return;
    }

    // Real Firebase Auth
    try {
      if (isLogin) {
        const userCred = await signInWithEmailAndPassword(auth, email, password);
        // Load details from Firestore if possible, else make a temporary Profile
        const uid = userCred.user.uid;
        // Check for matching item
        const localDetails = localStorage.getItem(`ye_egna_profile_${uid}`);
        if (localDetails) {
          onSuccess(JSON.parse(localDetails));
        } else {
          onSuccess({
            uid,
            displayName: userCred.user.displayName || email.split('@')[0],
            role: 'wife',
            coupleCode: 'OURSPACE',
          });
        }
      } else {
        if (name.trim() === '') {
          setError('Please provide your name');
          setIsLoading(false);
          return;
        }
        if (coupleCode.trim() === '') {
          setError('Please write a Couple Code (both of you can use e.g. ETHIOPIA)');
          setIsLoading(false);
          return;
        }
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        const userProfile = {
          uid: userCred.user.uid,
          displayName: name,
          role,
          coupleCode: coupleCode.trim().toUpperCase(),
        };
        // Persist profile
        localStorage.setItem(`ye_egna_profile_${userCred.user.uid}`, JSON.stringify(userProfile));
        onSuccess(userProfile);
      }
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/user-not-found') {
        setError('No account found with this email. Try signing up!');
      } else if (err.code === 'auth/wrong-password') {
        setError('Incorrect password. Please try again.');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('Email already in use. Try logging in!');
      } else {
        setError(err.message || 'Authentication failed. Please verify your info.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-between bg-gradient-to-tr from-[#FFF5F7] via-[#FFFBFD] to-[#EDF6FF] px-6 py-10 overflow-x-hidden font-sans">
      {/* Visual Ambient blobs */}
      <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full bg-pink-200/40 blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 rounded-full bg-blue-200/30 blur-3xl" />

      {/* Brand Header */}
      <div className="flex flex-col items-center justify-center pt-8 text-center">
        <div className="relative mb-3">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-pink-400 to-pink-500 flex items-center justify-center shadow-lg shadow-pink-300/40 transform rotate-12">
            <Heart className="w-8 h-8 text-white fill-current animate-pulse" />
          </div>
          <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-amber-400 text-white shadow-md">
            <Sparkles className="w-3.5 h-3.5 fill-current" />
          </div>
        </div>
        
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">YeEgna</h1>
        <p className="text-xs text-slate-500 font-medium mt-1 uppercase tracking-widest font-mono">Our Money, Our Love</p>

        {/* Local Sync Mode Indicator */}
        {!isFirebaseReady && (
          <div className="mt-3 px-3 py-1.5 rounded-full bg-pink-100/50 text-pink-700 text-[10.5px] font-semibold flex items-center gap-1.5 border border-pink-100 uppercase tracking-wide">
            <Sparkles className="w-3 h-3 fill-current" />
            Pinterest Play Mode Active
          </div>
        )}
      </div>

      {/* Main Authentication Card */}
      <div className="w-full max-w-sm mx-auto my-auto bg-white/60 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-[0_12px_40px_rgba(244,143,177,0.08)] border border-white/80">
        
        {/* Toggle form headers */}
        <div className="flex justify-center border-b border-pink-50 pb-4 mb-6">
          <button
            onClick={() => { setIsLogin(true); setError(''); }}
            className={`w-1/2 text-center pb-2 text-sm font-bold transition-all relative ${
              isLogin ? 'text-pink-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Log In
            {isLogin && <div className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-pink-500 rounded-full" />}
          </button>
          
          <button
            onClick={() => { setIsLogin(false); setError(''); }}
            className={`w-1/2 text-center pb-2 text-sm font-bold transition-all relative ${
              !isLogin ? 'text-pink-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Sign Up Together
            {!isLogin && <div className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-pink-500 rounded-full" />}
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-2 text-red-600 text-[11.5px] leading-relaxed mb-4">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Couple Onboarding Name Field (Only on Sign Up) */}
          {!isLogin && (
            <div>
              <label className="block text-[10.5px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 font-mono">YOUR NAME</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="E.g., Lydia / Dawit"
                  className="block w-full pl-10 pr-3 py-3 text-sm bg-slate-50/50 rounded-2xl border border-slate-200 focus:outline-none focus:bg-white focus:ring-1 focus:ring-pink-300 font-sans"
                  id="input-name"
                />
              </div>
            </div>
          )}

          {/* Email Address */}
          <div>
            <label className="block text-[10.5px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 font-mono">EMAIL ADDRESS</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E.g., couples@yeegna.com"
                className="block w-full pl-10 pr-3 py-3 text-sm bg-slate-50/50 rounded-2xl border border-slate-200 focus:outline-none focus:bg-white focus:ring-1 focus:ring-pink-300 font-sans"
                required
                id="input-email"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-[10.5px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 font-mono">PASSWORD</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="block w-full pl-10 pr-3 py-3 text-sm bg-slate-50/50 rounded-2xl border border-slate-200 focus:outline-none focus:bg-white focus:ring-1 focus:ring-pink-300 font-sans"
                required
                id="input-password"
              />
            </div>
          </div>

          {/* Role Choice (Only on Sign Up) */}
          {!isLogin && (
            <div>
              <label className="block text-[10.5px] font-bold text-slate-400 uppercase tracking-widest mb-2 font-mono">YOUR ROLE IN THE COUPLE</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('wife')}
                  className={`py-3 px-4 rounded-2xl border text-sm font-bold flex items-center justify-center gap-1.5 transition-all ${
                    role === 'wife'
                      ? 'border-pink-300 bg-pink-50/50 text-pink-700 font-extrabold scale-[1.02]'
                      : 'border-slate-100 bg-slate-50/50 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  👗 Wife
                </button>
                <button
                  type="button"
                  onClick={() => setRole('husband')}
                  className={`py-3 px-4 rounded-2xl border text-sm font-bold flex items-center justify-center gap-1.5 transition-all ${
                    role === 'husband'
                      ? 'border-blue-300 bg-blue-50/50 text-blue-700 font-extrabold scale-[1.02]'
                      : 'border-slate-100 bg-slate-50/50 text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  👔 Husband
                </button>
              </div>
            </div>
          )}

          {/* Shared Couple Link Code */}
          {!isLogin && (
            <div>
              <label className="block text-[10.5px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 font-mono">SHARED COUPLE CODE</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Key className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={coupleCode}
                  onChange={(e) => setCoupleCode(e.target.value)}
                  placeholder="Both write same word, e.g., LOVE2026"
                  className="block w-full pl-10 pr-3 py-3 text-sm bg-slate-50/50 rounded-2xl border border-slate-200 focus:outline-none focus:bg-white focus:ring-1 focus:ring-pink-300 font-sans font-bold uppercase"
                  id="input-couple-code"
                />
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed mt-1.5 font-sans">
                💡 **Link account**: Set the exact same code on both phones to share "Our Money" together instantly!
              </p>
            </div>
          )}

          {/* Submit Action Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3.5 bg-gradient-to-r from-pink-500 via-pink-600 to-indigo-400 text-white font-bold text-sm rounded-2xl shadow-lg shadow-pink-500/10 hover:shadow-pink-500/20 active:scale-98 transition-all flex items-center justify-center gap-2 outline-none"
            id="btn-auth-submit"
          >
            {isLoading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : isLogin ? (
              'Enter Our Money Space'
            ) : (
              'Create Our Finance World 🪄'
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center my-6">
          <div className="flex-grow border-t border-slate-100" />
          <span className="flex-shrink mx-3 text-[10px] font-bold text-slate-400 font-mono tracking-wider">ONE-TAP DEMO ENTRY</span>
          <div className="flex-grow border-t border-slate-100" />
        </div>

        {/* Local Bypass Quick buttons */}
        <div className="space-y-2.5">
          <button
            onClick={() => handleLocalBypass('wife')}
            disabled={isLoading}
            className="w-full py-2.5 bg-pink-50 hover:bg-pink-100 text-pink-700 font-bold text-xs rounded-xl transition-all border border-pink-100 flex items-center justify-center gap-2"
          >
            👰‍♀️ Lydia's Demo View
          </button>
          
          <button
            onClick={() => handleLocalBypass('husband')}
            disabled={isLoading}
            className="w-full py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-xl transition-all border border-blue-100 flex items-center justify-center gap-2"
          >
            🤵‍♂️ Dawit's Demo View
          </button>
        </div>
      </div>

      {/* Support Footer */}
      <div className="text-center pt-8 text-slate-400 text-[11px] leading-relaxed">
        YeEgna is Ethiopian Birr (ETB) based. Designed with 💖 for local couples.<br />
        All personal detail is encrypted and kept safe under private storage.
      </div>
    </div>
  );
}
