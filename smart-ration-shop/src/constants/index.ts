export const APP_NAME = 'Smart Ration Shop';

export const ROLES = {
  CITIZEN: 'citizen',
  SHOPKEEPER: 'shopkeeper',
  DISTRICT_OFFICER: 'district_officer',
  STATE_ADMIN: 'state_admin',
} as const;

export const ROLE_LABELS: Record<string, string> = {
  citizen: 'Citizen',
  shopkeeper: 'Shopkeeper',
  district_officer: 'District Officer',
  state_admin: 'State Admin',
};

export const LANGUAGES = {
  EN: 'en',
  TA: 'ta',
} as const;

export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:4000/api';

export const SOCKET_URL = process.env.EXPO_PUBLIC_SOCKET_URL ?? 'http://localhost:4000';

export const STORAGE_KEYS = {
  AUTH_TOKEN: '@srs/auth_token',
  USER: '@srs/user',
  LANGUAGE: '@srs/language',
  OFFLINE_QUEUE: '@srs/offline_queue',
  CACHED_QUOTA: '@srs/cached_quota',
} as const;
