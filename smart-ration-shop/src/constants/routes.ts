export const ROUTES = {
  // Auth
  SPLASH: 'Splash',
  ONBOARDING: 'Onboarding',
  LOGIN: 'Login',
  OTP: 'OTP',
  REGISTER: 'Register',
  SELECT_ROLE: 'SelectRole',

  // Citizen
  CITIZEN_HOME: 'CitizenHome',
  CITIZEN_QUOTA: 'CitizenQuota',
  CITIZEN_TRANSACTIONS: 'CitizenTransactions',
  CITIZEN_COMPLAINTS: 'CitizenComplaints',
  CITIZEN_NOTIFICATIONS: 'CitizenNotifications',
  CITIZEN_VOICE: 'CitizenVoice',
  CITIZEN_PROFILE: 'CitizenProfile',
  CITIZEN_EDIT_PROFILE: 'CitizenEditProfile',

  // Shopkeeper
  SHOPKEEPER_HOME: 'ShopkeeperHome',
  SHOPKEEPER_SCAN: 'ShopkeeperScan',
  SHOPKEEPER_ISSUE: 'ShopkeeperIssue',
  SHOPKEEPER_STOCK: 'ShopkeeperStock',
  SHOPKEEPER_TRANSACTIONS: 'ShopkeeperTransactions',
  SHOPKEEPER_REPORTS: 'ShopkeeperReports',
  SHOPKEEPER_NOTIFICATIONS: 'ShopkeeperNotifications',
  SHOPKEEPER_PROFILE: 'ShopkeeperProfile',

  // District Officer
  DISTRICT_HOME: 'DistrictHome',
  DISTRICT_SHOPS: 'DistrictShops',
  DISTRICT_STOCK: 'DistrictStock',
  DISTRICT_COMPLAINTS: 'DistrictComplaints',
  DISTRICT_ANALYTICS: 'DistrictAnalytics',
  DISTRICT_REPORTS: 'DistrictReports',
  DISTRICT_PROFILE: 'DistrictProfile',

  // State Admin
  STATE_HOME: 'StateHome',
  STATE_USERS: 'StateUsers',
  STATE_SHOPS: 'StateShops',
  STATE_DISTRICTS: 'StateDistricts',
  STATE_ANALYTICS: 'StateAnalytics',
  STATE_REPORTS: 'StateReports',
  STATE_SETTINGS: 'StateSettings',
  STATE_PROFILE: 'StateProfile',
} as const;
