import { DashboardCardItem, NotificationItem, QuickActionItem } from '../types';

export const dashboardCards: DashboardCardItem[] = [
  { title: 'Rice Balance', value: '20 kg', hint: 'Remaining this month', icon: '🌾', color: '#0F766E' },
  { title: 'Wheat Entitlement', value: '15 kg', hint: 'Allocated', icon: '🌾', color: '#2563EB' },
  { title: 'Pending Complaints', value: '2', hint: 'Awaiting review', icon: '📝', color: '#F59E0B' },
  { title: 'Last Transaction', value: '2 days ago', hint: 'Collected ration', icon: '✅', color: '#16A34A' },
];

export const quickActions: QuickActionItem[] = [
  { id: 'quota', label: 'Quota', icon: '📦', route: 'Quota' },
  { id: 'transactions', label: 'Transactions', icon: '🧾', route: 'Transaction' },
  { id: 'complaints', label: 'Complaints', icon: '⚠️', route: 'Complaint' },
  { id: 'profile', label: 'Profile', icon: '👤', route: 'Profile' },
];

export const notifications: NotificationItem[] = [
  { id: '1', title: 'Ration update', message: 'Your monthly quota has been updated.', time: '10 min ago', type: 'info' },
  { id: '2', title: 'Complaint status', message: 'Your complaint is now under review.', time: '1 hour ago', type: 'alert' },
  { id: '3', title: 'Collection reminder', message: 'Please collect your ration before Friday.', time: 'Today', type: 'success' },
];
