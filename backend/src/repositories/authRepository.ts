import { prisma } from '../config/prisma';
import type { Role } from '../types';
import { memoryStore } from './memoryStore';

const prismaAvailable = async () => {
  try {
    await prisma.$connect();
    return true;
  } catch {
    return false;
  }
};

const handleFallback = async <T>(callback: () => Promise<T>, fallback: () => Promise<T>) => {
  try {
    const available = await prismaAvailable();
    if (!available) {
      return fallback();
    }
    return callback();
  } catch {
    return fallback();
  }
};

export const authRepository = {
  async findUserByMobile(mobileNumber: string) {
    return handleFallback(
      () => prisma.user.findUnique({ where: { mobileNumber } }),
      () => memoryStore.findUserByMobile(mobileNumber),
    );
  },

  async findUserById(id: string) {
    return handleFallback(
      () => prisma.user.findUnique({ where: { id } }),
      () => memoryStore.findUserById(id),
    );
  },

  async createUser(data: {
    fullName: string;
    mobileNumber: string;
    email?: string;
    passwordHash: string;
    role: Role;
    districtId?: string;
  }) {
    return handleFallback(
      () => prisma.user.create({
        data: {
          fullName: data.fullName,
          mobileNumber: data.mobileNumber,
          email: data.email,
          passwordHash: data.passwordHash,
          role: data.role,
          districtId: data.districtId,
        },
      }),
      async () => {
        const user = {
          id: `${Date.now()}`,
          fullName: data.fullName,
          mobileNumber: data.mobileNumber,
          email: data.email,
          passwordHash: data.passwordHash,
          role: data.role,
          districtId: data.districtId,
        };
        return memoryStore.upsertUser(user);
      },
    );
  },

  async createOtp(mobileNumber: string, codeHash: string, expiresAt: Date) {
    return handleFallback(
      () => prisma.otpCode.create({ data: { mobileNumber, codeHash, expiresAt } }),
      () => memoryStore.createOtp(mobileNumber, codeHash, expiresAt),
    );
  },

  async findLatestOtp(mobileNumber: string) {
    return handleFallback(
      () => prisma.otpCode.findFirst({ where: { mobileNumber }, orderBy: { createdAt: 'desc' } }),
      () => memoryStore.findLatestOtp(mobileNumber),
    );
  },

  async consumeOtp(id: string) {
    return handleFallback(
      () => prisma.otpCode.update({ where: { id }, data: { consumedAt: new Date() } }),
      () => memoryStore.consumeOtp(id),
    );
  },

  async createRefreshToken(userId: string, tokenHash: string, expiresAt: Date) {
    return handleFallback(
      () => prisma.refreshToken.create({ data: { userId, tokenHash, expiresAt } }),
      () => memoryStore.createRefreshToken(userId, tokenHash, expiresAt),
    );
  },

  async findRefreshToken(tokenHash: string) {
    return handleFallback(
      () => prisma.refreshToken.findUnique({ where: { tokenHash } }),
      () => memoryStore.findRefreshToken(tokenHash),
    );
  },

  async revokeRefreshToken(tokenHash: string) {
    return handleFallback(
      () => prisma.refreshToken.update({ where: { tokenHash }, data: { revokedAt: new Date() } }),
      () => memoryStore.findRefreshToken(tokenHash),
    );
  },

  async revokeAllRefreshTokens(userId: string) {
    return handleFallback(
      () => prisma.refreshToken.updateMany({ where: { userId, revokedAt: null }, data: { revokedAt: new Date() } }),
      () => memoryStore.revokeAllRefreshTokens(userId),
    );
  },
};
