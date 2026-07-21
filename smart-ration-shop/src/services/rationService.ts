import { apiClient } from './api';
import { Complaint, QuotaItem, StockItem, Transaction } from '../types';

export const citizenService = {
  getQuota: () => apiClient.get<QuotaItem[]>('/citizen/quota'),
  getTransactions: () => apiClient.get<Transaction[]>('/citizen/transactions'),
  getComplaints: () => apiClient.get<Complaint[]>('/citizen/complaints'),
  submitComplaint: (payload: { title: string; description: string }) =>
    apiClient.post('/citizen/complaints', payload),
};

export const shopkeeperService = {
  scanBeneficiary: (qrData: string) => apiClient.post('/shopkeeper/scan', { qrData }),
  issueRation: (payload: unknown) => apiClient.post('/shopkeeper/issue', payload),
  getStock: () => apiClient.get<StockItem[]>('/shopkeeper/stock'),
  getTransactions: () => apiClient.get<Transaction[]>('/shopkeeper/transactions'),
};

export const districtService = {
  getShops: () => apiClient.get('/district/shops'),
  getStockMonitoring: () => apiClient.get('/district/stock'),
  getComplaints: () => apiClient.get<Complaint[]>('/district/complaints'),
  getAnalytics: () => apiClient.get('/district/analytics'),
};

export const stateAdminService = {
  getUsers: () => apiClient.get('/admin/users'),
  getShops: () => apiClient.get('/admin/shops'),
  getDistricts: () => apiClient.get('/admin/districts'),
  getAnalytics: () => apiClient.get('/admin/analytics'),
};
