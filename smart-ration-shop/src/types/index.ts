export type UserRole = 'citizen' | 'shopkeeper' | 'district_officer' | 'state_admin';

export type AuthUser = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: UserRole;
  token: string;
};

export type QuotaItem = {
  id: string;
  itemName: string;
  allocated: number;
  consumed: number;
  unit: string;
  month: string;
};

export type Transaction = {
  id: string;
  date: string;
  shopName: string;
  items: string;
  status: 'completed' | 'pending' | 'failed';
};

export type Complaint = {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved';
  createdAt: string;
};

export type NotificationItem = {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'alert' | 'success';
  read: boolean;
};

export type StockItem = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  threshold: number;
  lastUpdated: string;
};

export type Shop = {
  id: string;
  name: string;
  district: string;
  address: string;
  status: 'active' | 'inactive';
};

export type DashboardStat = {
  title: string;
  value: string;
  hint: string;
  icon: string;
  color: string;
};
