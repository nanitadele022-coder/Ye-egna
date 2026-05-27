/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Heart, Sparkles, Bell, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import ActivitiesPage from './pages/ActivitiesPage';
import DreamGoalsPage from './pages/DreamGoalsPage';
import MonthlySummaryPage from './pages/MonthlySummaryPage';
import UpdatesPage from './pages/UpdatesPage';
import ProfileSettingsPage from './pages/ProfileSettingsPage';
import Navigation from './components/Navigation';
import AddActivityModal from './components/AddActivityModal';
import { UserProfile, MoneyActivity, DreamGoal, AppUpdateNotification, RoleType, ActivityType, MoneyScope, CategoryType } from './types';

// Predefined mock starting assets for local sandbox demo
const INITIAL_ACTIVITIES: MoneyActivity[] = [
  {
    id: 'act-1',
    amount: 150,
    type: 'out',
    category: 'Food',
    notes: 'Tej coffee date together ☕💕',
    scope: 'shared',
    by: 'wife',
    date: '2026-05-25',
    createdAt: new Date().toISOString(),
    coupleCode: 'OURSPACE',
  },
  {
    id: 'act-2',
    amount: 1200,
    type: 'out',
    category: 'Shopping',
    notes: 'Bought gorgeous traditional dress 👗💕',
    scope: 'personal',
    by: 'wife',
    date: '2026-05-22',
    createdAt: new Date().toISOString(),
    coupleCode: 'OURSPACE',
  },
  {
    id: 'act-3',
    amount: 8000,
    type: 'in',
    category: 'Other',
    notes: 'Habesha freelance project reward 🇪🇹',
    scope: 'shared',
    by: 'husband',
    date: '2026-05-24',
    createdAt: new Date().toISOString(),
    coupleCode: 'OURSPACE',
  },
  {
    id: 'act-4',
    amount: 450,
    type: 'out',
    category: 'Transport',
    notes: 'Ride taxi to Bole Mall 🚗',
    scope: 'shared',
    by: 'husband',
    date: '2026-05-20',
    createdAt: new Date().toISOString(),
    coupleCode: 'OURSPACE',
  },
  {
    id: 'act-5',
    amount: 1800,
    type: 'in',
    category: 'Other',
    notes: 'Monthly side-income bonus in Birr',
    scope: 'personal',
    by: 'husband',
    date: '2026-05-18',
    createdAt: new Date().toISOString(),
    coupleCode: 'OURSPACE',
  }
];

const INITIAL_GOALS: DreamGoal[] = [
  {
    id: 'goal-1',
    title: '👰‍♀️ Our Dream Wedding Nest',
    targetAmount: 250000,
    savedAmount: 98000,
    category: 'other',
    deadline: '2026-12-31',
    createdAt: new Date().toISOString(),
    isCompleted: false,
    coupleCode: 'OURSPACE',
  },
  {
    id: 'goal-2',
    title: '🏡 Cute Family House Fund',
    targetAmount: 850000,
    savedAmount: 185000,
    category: 'house',
    deadline: '2028-06-30',
    createdAt: new Date().toISOString(),
    isCompleted: false,
    coupleCode: 'OURSPACE',
  }
];

const INITIAL_NOTIFICATIONS: AppUpdateNotification[] = [
  {
    id: 'notif-1',
    title: 'Welcome Home 💍',
    message: 'Lydia and Dawit joined and paired! Your joint money staircase adventure starts now. Let’s succeed together!',
    date: new Date(Date.now() - 3600 * 1000 * 5).toISOString(),
    type: 'info',
    read: false,
  },
  {
    id: 'notif-2',
    title: 'Target Breakthrough! 🏡',
    message: 'You saved another 12,000 Birr to your House Fund. Step by step, we rise higher!',
    date: new Date(Date.now() - 3600 * 1000 * 2).toISOString(),
    type: 'success',
    read: false,
  }
];

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [activities, setActivities] = useState<MoneyActivity[]>([]);
  const [goals, setGoals] = useState<DreamGoal[]>([]);
  const [notifications, setNotifications] = useState<AppUpdateNotification[]>([]);
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // 1. Initial Load and State hydration block
  useEffect(() => {
    // Splash screen holding interval
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2200);

    // Load active session from localStorage
    const savedUser = localStorage.getItem('ye_egna_local_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // Load activities list
    const savedActivities = localStorage.getItem('ye_egna_activities');
    if (savedActivities) {
      setActivities(JSON.parse(savedActivities));
    } else {
      setActivities(INITIAL_ACTIVITIES);
      localStorage.setItem('ye_egna_activities', JSON.stringify(INITIAL_ACTIVITIES));
    }

    // Load goals list
    const savedGoals = localStorage.getItem('ye_egna_goals');
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    } else {
      setGoals(INITIAL_GOALS);
      localStorage.setItem('ye_egna_goals', JSON.stringify(INITIAL_GOALS));
    }

    // Load notifications list
    const savedNotifs = localStorage.getItem('ye_egna_notifications');
    if (savedNotifs) {
      setNotifications(JSON.parse(savedNotifs));
    } else {
      setNotifications(INITIAL_NOTIFICATIONS);
      localStorage.setItem('ye_egna_notifications', JSON.stringify(INITIAL_NOTIFICATIONS));
    }

    return () => clearTimeout(timer);
  }, []);

  // Sync state helpers to update localStorage dynamically
  const saveActivities = (updated: MoneyActivity[]) => {
    setActivities(updated);
    localStorage.setItem('ye_egna_activities', JSON.stringify(updated));
  };

  const saveGoals = (updated: DreamGoal[]) => {
    setGoals(updated);
    localStorage.setItem('ye_egna_goals', JSON.stringify(updated));
  };

  const saveNotifications = (updated: AppUpdateNotification[]) => {
    setNotifications(updated);
    localStorage.setItem('ye_egna_notifications', JSON.stringify(updated));
  };

  // 2. State Actions

  // Handle successful login or onboarding signup
  const handleAuthSuccess = (savedProfile: { uid: string; displayName: string; role: RoleType; coupleCode: string }) => {
    const userProfile: UserProfile = {
      ...savedProfile,
      joinedAt: new Date().toISOString(),
    };
    setUser(userProfile);
    localStorage.setItem('ye_egna_local_user', JSON.stringify(userProfile));

    // Add a welcome notification item
    const newNotif: AppUpdateNotification = {
      id: 'welcome-' + Date.now(),
      title: 'Entrance Synchronized 🔑',
      message: `You registered successfully as ${savedProfile.displayName}! Couple link ${savedProfile.coupleCode} is active.`,
      date: new Date().toISOString(),
      type: 'success',
      read: false,
    };
    saveNotifications([newNotif, ...notifications]);
  };

  // Switch character easily in local database preview context
  const handleSwitchCharacter = (role: RoleType) => {
    if (!user) return;
    const switched = {
      ...user,
      uid: role === 'wife' ? 'local-wife-uid' : 'local-husband-uid',
      displayName: role === 'wife' ? 'Lydia' : 'Dawit',
      role: role,
    };
    setUser(switched);
    localStorage.setItem('ye_egna_local_user', JSON.stringify(switched));

    // Notification alert
    const newNotif: AppUpdateNotification = {
      id: 'switch-' + Date.now(),
      title: 'Character Swapped 🎭',
      message: `Switched view mode to ${switched.displayName} (${role === 'wife' ? 'Wife 👗' : 'Husband 👔'}). Check your separate personal balance!`,
      date: new Date().toISOString(),
      type: 'info',
      read: false,
    };
    saveNotifications([newNotif, ...notifications]);
  };

  // Form input Money Activity handler
  const handleAddActivity = (data: {
    amount: number;
    type: ActivityType;
    category: CategoryType;
    notes: string;
    scope: MoneyScope;
    by: RoleType;
    date: string;
  }) => {
    if (!user) return;

    const newActivity: MoneyActivity = {
      id: 'act-' + Math.random().toString(36).substring(2, 9),
      ...data,
      createdAt: new Date().toISOString(),
      coupleCode: user.coupleCode,
    };

    const updated = [newActivity, ...activities];
    saveActivities(updated);

    // Create a beautiful corresponding alert notification
    const nameStr = user.displayName;
    const notifTitle = data.type === 'in' ? 'Added Money In! 💰' : 'Added Money Out! 💸';
    const notifMessage = `${nameStr} recorded ${data.amount.toLocaleString()} Birr for "${data.notes || data.category}" inside ${data.scope === 'shared' ? 'Our Money' : 'Personal Space'}.`;

    const newAlert: AppUpdateNotification = {
      id: 'alert-' + Date.now(),
      title: notifTitle,
      message: notifMessage,
      date: new Date().toISOString(),
      type: data.type === 'in' ? 'success' : 'info',
      read: false,
    };
    saveNotifications([newAlert, ...notifications]);
  };

  // Delete money entry
  const handleDeleteActivity = (id: string) => {
    const deletedItem = activities.find((a) => a.id === id);
    const updated = activities.filter((a) => a.id !== id);
    saveActivities(updated);

    if (deletedItem) {
      const alert: AppUpdateNotification = {
        id: 'del-' + Date.now(),
        title: 'Activity Deleted 🗑️',
        message: `Removed activity of ${deletedItem.amount.toLocaleString()} Birr ("${deletedItem.notes || deletedItem.category}").`,
        date: new Date().toISOString(),
        type: 'warning',
        read: false,
      };
      saveNotifications([alert, ...notifications]);
    }
  };

  // Start Savings goal
  const handleAddGoal = (data: {
    title: string;
    targetAmount: number;
    deadline: string;
    category: 'emergency' | 'baby' | 'house' | 'car' | 'other';
  }) => {
    if (!user) return;
    const newGoal: DreamGoal = {
      id: 'goal-' + Math.random().toString(36).substring(2, 9),
      ...data,
      savedAmount: 0,
      createdAt: new Date().toISOString(),
      isCompleted: false,
      coupleCode: user.coupleCode,
    };

    saveGoals([newGoal, ...goals]);

    const alert: AppUpdateNotification = {
      id: 'alert-g-' + Date.now(),
      title: 'New Dream Goal! 🪄',
      message: `Started a joint goal of ${data.targetAmount.toLocaleString()} Birr for "${data.title}". May our dream progress together!`,
      date: new Date().toISOString(),
      type: 'success',
      read: false,
    };
    saveNotifications([alert, ...notifications]);
  };

  // Add savings amount to goal
  const handleAddSavingsAmount = (goalId: string, parsedAmount: number) => {
    const updated = goals.map((g) => {
      if (g.id === goalId) {
        const nextSaved = g.savedAmount + parsedAmount;
        const met = nextSaved >= g.targetAmount;
        return {
          ...g,
          savedAmount: nextSaved,
          isCompleted: met,
        };
      }
      return g;
    });

    saveGoals(updated);

    const goal = goals.find((g) => g.id === goalId);
    if (goal) {
      const isCompletedNow = (goal.savedAmount + parsedAmount) >= goal.targetAmount;
      const alertTitle = isCompletedNow ? 'Dream Destination Met! 🏆' : 'Added To Dream Goal 🌟';
      const alertMessage = isCompletedNow 
        ? `Incredible unity! You both finally saved ${goal.targetAmount.toLocaleString()} Birr for "${goal.title}". Love wins!` 
        : `Deposited another ${parsedAmount.toLocaleString()} Birr to "${goal.title}". Only ${(goal.targetAmount - (goal.savedAmount + parsedAmount)).toLocaleString()} Birr left to climb!`;

      const alert: AppUpdateNotification = {
        id: 'alert-s-' + Date.now(),
        title: alertTitle,
        message: alertMessage,
        date: new Date().toISOString(),
        type: isCompletedNow ? 'success' : 'info',
        read: false,
      };
      saveNotifications([alert, ...notifications]);
    }
  };

  // Edit User details
  const handleUpdateUser = (data: Partial<UserProfile>) => {
    if (!user) return;
    const updated = {
      ...user,
      ...data,
    };
    setUser(updated);
    localStorage.setItem('ye_egna_local_user', JSON.stringify(updated));
  };

  // Exit Account / Reset session login authentication
  const handleLogout = () => {
    localStorage.removeItem('ye_egna_local_user');
    setUser(null);
    setCurrentTab('dashboard');
  };

  // Reset database values completely to defaults
  const handleResetDatabase = () => {
    localStorage.removeItem('ye_egna_activities');
    localStorage.removeItem('ye_egna_goals');
    localStorage.removeItem('ye_egna_notifications');
    setActivities(INITIAL_ACTIVITIES);
    setGoals(INITIAL_GOALS);
    setNotifications(INITIAL_NOTIFICATIONS);

    if (user) {
      const alert: AppUpdateNotification = {
        id: 'reset-' + Date.now(),
        title: 'Data Re-initialized 🧹',
        message: 'YeEgna local database was pristine cleared. Predefined starting sample items populated.',
        date: new Date().toISOString(),
        type: 'info',
        read: false,
      };
      saveNotifications([alert, ...INITIAL_NOTIFICATIONS]);
    }
  };

  // Mark alerts as read
  const handleMarkRead = (id: string) => {
    const updated = notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
    saveNotifications(updated);
  };

  // Clear alerts list
  const handleClearAllNotifications = () => {
    saveNotifications([]);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="bg-slate-50 min-h-screen antialiased flex flex-col select-none relative pb-safe">
      
      {/* 1. Animated Splash Screen Overlay */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-50 bg-gradient-to-tr from-[#FFF4F7] via-[#FFFBFD] to-[#EEF5FF] flex flex-col justify-between p-10 items-center"
          >
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <motion.div
                initial={{ scale: 0.8, rotate: -8 }}
                animate={{ scale: [0.8, 1.15, 1], rotate: [0, 15, 0] }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-pink-400 via-pink-500 to-indigo-400 flex items-center justify-center shadow-2xl shadow-pink-500/30 transform"
              >
                <Heart className="w-10 h-10 text-white fill-current animate-pulse" />
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-4xl font-black text-slate-800 tracking-tight mt-6"
              >
                YeEgna
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-2 font-mono"
              >
                Our Money, Our Love 🇪🇹
              </motion.p>
            </div>

            {/* Splash Loading Bar */}
            <div className="w-full max-w-xs flex flex-col items-center gap-4">
              <div className="w-[180px] h-1.5 bg-slate-100 rounded-full overflow-hidden relative">
                <motion.div
                  initial={{ left: '-100%' }}
                  animate={{ left: '100%' }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                  className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-pink-400 to-indigo-500 rounded-full"
                />
              </div>
              <span className="text-slate-400 font-medium text-xs font-sans max-w-[220px]">
                “Hand in hand, we build our Habesha future.”
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Main Logic Routing */}
      {!showSplash && (
        <div className="flex-1 flex flex-col w-full h-full relative">
          
          {/* Unauthenticated View */}
          {!user ? (
            <AuthPage onSuccess={handleAuthSuccess} />
          ) : (
            // Authenticated Shell
            <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
              
              {/* Screen Body Router Container */}
              <main className="flex-1 overflow-x-hidden">
                {currentTab === 'dashboard' && (
                  <Dashboard
                    user={user}
                    activities={activities}
                    onOpenAddModal={() => setIsAddModalOpen(true)}
                    onNavigate={(tab) => setCurrentTab(tab)}
                    unreadCount={unreadCount}
                  />
                )}
                
                {currentTab === 'activities' && (
                  <ActivitiesPage
                    activities={activities}
                    onDeleteActivity={handleDeleteActivity}
                    onOpenAddModal={() => setIsAddModalOpen(true)}
                  />
                )}
                
                {currentTab === 'goals' && (
                  <DreamGoalsPage
                    goals={goals}
                    onAddGoal={handleAddGoal}
                    onAddSavings={handleAddSavingsAmount}
                  />
                )}
                
                {currentTab === 'summary' && (
                  <MonthlySummaryPage 
                    activities={activities} 
                  />
                )}
                
                {currentTab === 'updates' && (
                  <UpdatesPage
                    notifications={notifications}
                    onMarkRead={handleMarkRead}
                    onClearAll={handleClearAllNotifications}
                  />
                )}
                
                {currentTab === 'settings' && (
                  <ProfileSettingsPage
                    user={user}
                    onUpdateUser={handleUpdateUser}
                    onLogout={handleLogout}
                    onResetDatabase={handleResetDatabase}
                    onSwitchCharacter={handleSwitchCharacter}
                  />
                )}
              </main>

              {/* Navigation Bar */}
              <Navigation
                currentTab={currentTab}
                onChangeTab={(tab) => setCurrentTab(tab)}
                onOpenAddModal={() => setIsAddModalOpen(true)}
              />

              {/* Add Activity Modal Form */}
              <AddActivityModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAdd={handleAddActivity}
                currentRole={user?.role || 'wife'}
              />
            </div>
          )}
        </div>
      )}

    </div>
  );
}
