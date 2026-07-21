import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants';

type QueuedAction = {
  id: string;
  type: string;
  payload: unknown;
  createdAt: string;
};

export async function getOfflineQueue(): Promise<QueuedAction[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEYS.OFFLINE_QUEUE);
  return raw ? (JSON.parse(raw) as QueuedAction[]) : [];
}

export async function enqueueOfflineAction(type: string, payload: unknown) {
  const queue = await getOfflineQueue();
  queue.push({
    id: `${Date.now()}`,
    type,
    payload,
    createdAt: new Date().toISOString(),
  });
  await AsyncStorage.setItem(STORAGE_KEYS.OFFLINE_QUEUE, JSON.stringify(queue));
}

export async function clearOfflineQueue() {
  await AsyncStorage.removeItem(STORAGE_KEYS.OFFLINE_QUEUE);
}

export async function cacheData<T>(key: string, data: T) {
  await AsyncStorage.setItem(key, JSON.stringify(data));
}

export async function getCachedData<T>(key: string): Promise<T | null> {
  const raw = await AsyncStorage.getItem(key);
  return raw ? (JSON.parse(raw) as T) : null;
}
