"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRepository = void 0;
const prisma_1 = require("../config/prisma");
exports.authRepository = {
    async findUserByMobile(mobileNumber) {
        return prisma_1.prisma.user.findUnique({ where: { mobileNumber } });
    },
    async findUserById(id) {
        return prisma_1.prisma.user.findUnique({ where: { id } });
    },
    async createUser(data) {
        return prisma_1.prisma.user.create({
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
    async createOtp(mobileNumber, codeHash, expiresAt) {
        return prisma_1.prisma.otpCode.create({ data: { mobileNumber, codeHash, expiresAt } });
    },
    async findLatestOtp(mobileNumber) {
        return prisma_1.prisma.otpCode.findFirst({
            where: { mobileNumber },
            orderBy: { createdAt: 'desc' },
        });
    },
    async consumeOtp(id) {
        return prisma_1.prisma.otpCode.update({ where: { id }, data: { consumedAt: new Date() } });
    },
    async createRefreshToken(userId, tokenHash, expiresAt) {
        return prisma_1.prisma.refreshToken.create({ data: { userId, tokenHash, expiresAt } });
    },
    async findRefreshToken(tokenHash) {
        return prisma_1.prisma.refreshToken.findUnique({ where: { tokenHash } });
    },
    async revokeRefreshToken(tokenHash) {
        return prisma_1.prisma.refreshToken.update({ where: { tokenHash }, data: { revokedAt: new Date() } });
    },
    async revokeAllRefreshTokens(userId) {
        return prisma_1.prisma.refreshToken.updateMany({ where: { userId, revokedAt: null }, data: { revokedAt: new Date() } });
    },
};
