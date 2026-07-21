import { NotificationItem } from '../types';

type AppState = {
  notifications: NotificationItem[];
  unreadCount: number;
};

let state: AppState = {
  notifications: [],
  unreadCount: 0,
};

const listeners = new Set<(state: AppState) => void>();

function emit() {
  listeners.forEach((listener) => listener({ ...state }));
}

export const appStore = {
  getState: () => state,

  subscribe(listener: (state: AppState) => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  setNotifications(notifications: NotificationItem[]) {
    state = {
      notifications,
      unreadCount: notifications.filter((n) => !n.read).length,
    };
    emit();
  },

  markAsRead(id: string) {
    state = {
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n,
      ),
      unreadCount: Math.max(0, state.unreadCount - 1),
    };
    emit();
  },
};
