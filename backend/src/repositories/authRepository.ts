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

export const authRepository = {
  async findUserByMobile(mobileNumber: string) {
    const isAvailable = await prismaAvailable();
    if (!isAvailable) {
      return memoryStore.findUserByMobile(mobileNumber);
    }
    return prisma.user.findUnique({ where: { mobileNumber } });
  },

  async findUserById(id: string) {
    const isAvailable = await prismaAvailable();
    if (!isAvailable) {
      return memoryStore.findUserById(id);
    }
    return prisma.user.findUnique({ where: { id } });
  },

  async createUser(data: {
    fullName: string;
    mobileNumber: string;
    email?: string;
    passwordHash: string;
    role: Role;
    districtId?: string;
  }) {
    const isAvailable = await prismaAvailable();
    if (!isAvailable) {
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
    }

    return prisma.user.create({
      data: {
        fullName: data.fullName,
        mobileNumber: data.mobileNumber,
        email: data.email,
        passwordHash: data.passwordHash,
        role: data.role,
        districtId: data.districtId,
      },
    });
  },

  async createOtp(mobileNumber: string, codeHash: string, expiresAt: Date) {
    const isAvailable = await prismaAvailable();
    if (!isAvailable) {
      return memoryStore.createOtp(mobileNumber, codeHash, expiresAt);
    }
    return prisma.otpCode.create({ data: { mobileNumber, codeHash, expiresAt } });
  },

  async findLatestOtp(mobileNumber: string) {
    const isAvailable = await prismaAvailable();
    if (!isAvailable) {
      return memoryStore.findLatestOtp(mobileNumber);
    }
    return prisma.otpCode.findFirst({ where: { mobileNumber }, orderBy: { createdAt: 'desc' } });
  },

  async consumeOtp(id: string) {
    const isAvailable = await prismaAvailable();
    if (!isAvailable) {
      return memoryStore.consumeOtp(id);
    }
    return prisma.otpCode.update({ where: { id }, data: { consumedAt: new Date() } });
  },

  async createRefreshToken(userId: string, tokenHash: string, expiresAt: Date) {
    const isAvailable = await prismaAvailable();
    if (!isAvailable) {
      return memoryStore.createRefreshToken(userId, tokenHash, expiresAt);
    }
    return prisma.refreshToken.create({ data: { userId, tokenHash, expiresAt } });
  },

  async findRefreshToken(tokenHash: string) {
    const isAvailable = await prismaAvailable();
    if (!isAvailable) {
      return memoryStore.findRefreshToken(tokenHash);
    }
    return prisma.refreshToken.findUnique({ where: { tokenHash } });
  },

  async revokeRefreshToken(tokenHash: string) {
    const isAvailable = await prismaAvailable();
    if (!isAvailable) {
      return memoryStore.findRefreshToken(tokenHash);
    }
    return prisma.refreshToken.update({ where: { tokenHash }, data: { revokedAt: new Date() } });
  },

  async revokeAllRefreshTokens(userId: string) {
    const isAvailable = await prismaAvailable();
    if (!isAvailable) {
      return memoryStore.revokeAllRefreshTokens(userId);
    }
    return prisma.refreshToken.updateMany({ where: { userId, revokedAt: null }, data: { revokedAt: new Date() } });
  },
};
