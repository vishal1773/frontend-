import crypto from 'crypto';
import { authRepository } from '../repositories/authRepository';
import { AppError } from '../utils/errors';
import { comparePassword, hashPassword, signAccessToken, signRefreshToken, verifyToken } from '../utils/auth';
import { env } from '../config/env';
import type { LoginInput, OtpInput, RefreshTokenInput, RegisterInput, VerifyOtpInput } from '../types';

export const authService = {
  async register(input: RegisterInput) {
    const existing = await authRepository.findUserByMobile(input.mobileNumber);
    if (existing) throw new AppError('User already exists', 409);

    const passwordHash = await hashPassword(input.password);
    const user = await authRepository.createUser({
      fullName: input.fullName,
      mobileNumber: input.mobileNumber,
      email: input.email,
      passwordHash,
      role: input.role,
      districtId: input.districtCode ? undefined : undefined,
    });

    const accessToken = signAccessToken({ id: user.id, fullName: user.fullName, mobileNumber: user.mobileNumber, role: user.role as any, districtId: user.districtId });
    const refreshToken = signRefreshToken({ id: user.id, fullName: user.fullName, mobileNumber: user.mobileNumber, role: user.role as any, districtId: user.districtId });
    const refreshExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    await authRepository.createRefreshToken(user.id, crypto.createHash('sha256').update(refreshToken).digest('hex'), refreshExpiresAt);

    return { user, accessToken, refreshToken };
  },

  async login(input: LoginInput) {
    const user = await authRepository.findUserByMobile(input.mobileNumber);
    if (!user?.passwordHash) throw new AppError('Invalid credentials', 401);

    const validPassword = await comparePassword(input.password, user.passwordHash);
    if (!validPassword) throw new AppError('Invalid credentials', 401);

    const accessToken = signAccessToken({ id: user.id, fullName: user.fullName, mobileNumber: user.mobileNumber, role: user.role as any, districtId: user.districtId });
    const refreshToken = signRefreshToken({ id: user.id, fullName: user.fullName, mobileNumber: user.mobileNumber, role: user.role as any, districtId: user.districtId });
    const refreshExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    await authRepository.createRefreshToken(user.id, crypto.createHash('sha256').update(refreshToken).digest('hex'), refreshExpiresAt);

    return { user, accessToken, refreshToken };
  },

  async sendOtp(input: OtpInput) {
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const codeHash = crypto.createHash('sha256').update(otp).digest('hex');
    const expiresAt = new Date(Date.now() + env.OTP_TTL_MINUTES * 60 * 1000);

    await authRepository.createOtp(input.mobileNumber, codeHash, expiresAt);
    return { otp }; 
  },

  async verifyOtp(input: VerifyOtpInput) {
    const latestOtp = await authRepository.findLatestOtp(input.mobileNumber);
    if (!latestOtp || latestOtp.expiresAt < new Date() || latestOtp.consumedAt) {
      throw new AppError('OTP expired or invalid', 401);
    }

    const hash = crypto.createHash('sha256').update(input.code).digest('hex');
    if (hash !== latestOtp.codeHash) {
      throw new AppError('Invalid OTP', 401);
    }

    await authRepository.consumeOtp(latestOtp.id);

    const token = signAccessToken({
      id: input.mobileNumber,
      fullName: 'Verified User',
      mobileNumber: input.mobileNumber,
      role: 'CITIZEN' as any,
      districtId: undefined,
    });

    return { verified: true, token };
  },

  async refreshToken(input: RefreshTokenInput) {
    const tokenHash = crypto.createHash('sha256').update(input.refreshToken).digest('hex');
    const record = await authRepository.findRefreshToken(tokenHash);
    if (!record || record.revokedAt || record.expiresAt < new Date()) {
      throw new AppError('Refresh token invalid', 401);
    }

    const payload = verifyToken(input.refreshToken, env.JWT_REFRESH_SECRET);
    const user = await authRepository.findUserById(payload.sub as string);
    if (!user) throw new AppError('Invalid user', 401);

    const accessToken = signAccessToken({ id: user.id, fullName: user.fullName, mobileNumber: user.mobileNumber, role: user.role as any, districtId: user.districtId });
    return { accessToken };
  },

  async logout(userId: string) {
    await authRepository.revokeAllRefreshTokens(userId);
    return { success: true };
  },
};
