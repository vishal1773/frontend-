export type DashboardCardItem = {
  title: string;
  value: string;
  hint: string;
  icon: string;
  color: string;
};

export type NotificationItem = {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'alert' | 'success';
};

export type QuickActionItem = {
  id: string;
  label: string;
  icon: string;
  route: string;
};
