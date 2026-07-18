export type Role = 'CITIZEN' | 'SHOPKEEPER' | 'DISTRICT_OFFICER' | 'STATE_ADMIN';
export type UserStatus = 'ACTIVE' | 'SUSPENDED' | 'PENDING';

export interface AuthUser {
  id: string;
  sub?: string;
  fullName: string;
  mobileNumber: string;
  role: Role;
  districtId?: string | null;
}

export interface RegisterInput {
  fullName: string;
  mobileNumber: string;
  email?: string;
  password: string;
  role: Role;
  districtCode?: string;
  districtName?: string;
}

export interface LoginInput {
  mobileNumber: string;
  password: string;
}

export interface OtpInput {
  mobileNumber: string;
}

export interface VerifyOtpInput {
  mobileNumber: string;
  code: string;
}

export interface RefreshTokenInput {
  refreshToken: string;
}
