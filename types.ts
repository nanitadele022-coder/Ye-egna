/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type RoleType = 'husband' | 'wife';
export type ActivityType = 'in' | 'out'; // Money In or Money Out
export type MoneyScope = 'personal' | 'shared'; // My Money vs Our Money

export type CategoryType =
  | 'Food'
  | 'Transport'
  | 'Shopping'
  | 'Rent'
  | 'Internet'
  | 'Entertainment'
  | 'Gifts'
  | 'Bills'
  | 'Healthcare'
  | 'Emergency'
  | 'Other';

export interface UserProfile {
  uid: string;
  displayName: string;
  role: RoleType;
  partnerUid?: string;
  coupleCode: string;
  joinedAt: string;
}

export interface MoneyActivity {
  id: string;
  amount: number;
  type: ActivityType;
  category: CategoryType;
  date: string;
  notes: string;
  scope: MoneyScope;
  by: RoleType;
  createdAt: string;
  coupleCode: string;
}

export interface DreamGoal {
  id: string;
  title: string;
  targetAmount: number;
  savedAmount: number;
  category: 'emergency' | 'baby' | 'house' | 'car' | 'other';
  deadline: string;
  createdAt: string;
  isCompleted: boolean;
  coupleCode: string;
}

export interface SpendingPlan {
  id: string; // coupleCode_monthYyyy
  coupleCode: string;
  monthYyyy: string; // "YYYY-MM"
  limits: Record<CategoryType, number>;
}

export interface AppUpdateNotification {
  id: string;
  title: string;
  message: string;
  date: string;
  type: 'info' | 'warning' | 'success';
  read: boolean;
}
