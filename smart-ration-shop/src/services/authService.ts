import { AuthUser, UserRole } from '../types';

const mockUsers: Record<string, AuthUser> = {
  '9876543210': {
    id: '1',
    name: 'Demo Citizen',
    phone: '9876543210',
    role: 'citizen',
    token: 'mock-jwt-token',
  },
};

export const authService = {
  async sendOtp(phone: string): Promise<void> {
    // Phase 3: POST /auth/send-otp
    if (!phone || phone.length < 10) {
      throw new Error('Invalid phone number');
    }
  },

  async verifyOtp(phone: string, otp: string): Promise<AuthUser> {
    // Phase 3: POST /auth/verify-otp
    if (otp !== '123456') {
      throw new Error('Invalid OTP');
    }
    return mockUsers[phone] ?? {
      id: Date.now().toString(),
      name: 'New User',
      phone,
      role: 'citizen',
      token: 'mock-jwt-token',
    };
  },

  async register(payload: {
    name: string;
    phone: string;
    role: UserRole;
    rationCardNumber?: string;
    shopId?: string;
    districtId?: string;
  }): Promise<AuthUser> {
    // Phase 3: POST /auth/register
    return {
      id: Date.now().toString(),
      name: payload.name,
      phone: payload.phone,
      role: payload.role,
      token: 'mock-jwt-token',
    };
  },
};
