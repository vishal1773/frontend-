import AsyncStorage from '@react-native-async-storage/async-storage';

export type StoredCandidate = {
  id: string;
  phone: string;
  fullName: string;
  aadhaar: string;
  address: string;
  role: 'Citizen';
  createdAt: string;
};

const STORAGE_KEY = 'smart-ration-candidates';

export async function saveCandidate(candidate: StoredCandidate) {
  const existing = await getCandidates();
  const next = [candidate, ...existing.filter((item) => item.phone !== candidate.phone)];
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export async function getCandidates(): Promise<StoredCandidate[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function findCandidateByPhone(phone: string) {
  const candidates = await getCandidates();
  return candidates.find((candidate) => candidate.phone === phone) || null;
}

export async function clearCandidates() {
  await AsyncStorage.removeItem(STORAGE_KEY);
}
