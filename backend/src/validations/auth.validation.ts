import { z } from 'zod';

export const registerSchema = z.object({
  fullName: z.string().min(2),
  mobileNumber: z.string().min(8),
  email: z.string().email().optional().or(z.literal('')),
  password: z.string().min(8),
  role: z.enum(['CITIZEN', 'SHOPKEEPER', 'DISTRICT_OFFICER', 'STATE_ADMIN']).default('CITIZEN'),
  districtCode: z.string().optional(),
});

export const loginSchema = z.object({
  mobileNumber: z.string().min(8),
  password: z.string().min(8),
});

export const otpSchema = z.object({
  mobileNumber: z.string().min(8),
});

export const verifyOtpSchema = z.object({
  mobileNumber: z.string().min(8),
  code: z.string().length(6),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(10),
});
