"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const crypto_1 = __importDefault(require("crypto"));
const authRepository_1 = require("../repositories/authRepository");
const errors_1 = require("../utils/errors");
const auth_1 = require("../utils/auth");
const env_1 = require("../config/env");
exports.authService = {
    async register(input) {
        const existing = await authRepository_1.authRepository.findUserByMobile(input.mobileNumber);
        if (existing)
            throw new errors_1.AppError('User already exists', 409);
        const passwordHash = await (0, auth_1.hashPassword)(input.password);
        const user = await authRepository_1.authRepository.createUser({
            fullName: input.fullName,
            mobileNumber: input.mobileNumber,
            email: input.email,
            passwordHash,
            role: input.role,
            districtId: input.districtCode ? undefined : undefined,
        });
        const accessToken = (0, auth_1.signAccessToken)({ id: user.id, fullName: user.fullName, mobileNumber: user.mobileNumber, role: user.role, districtId: user.districtId });
        const refreshToken = (0, auth_1.signRefreshToken)({ id: user.id, fullName: user.fullName, mobileNumber: user.mobileNumber, role: user.role, districtId: user.districtId });
        const refreshExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        await authRepository_1.authRepository.createRefreshToken(user.id, crypto_1.default.createHash('sha256').update(refreshToken).digest('hex'), refreshExpiresAt);
        return { user, accessToken, refreshToken };
    },
    async login(input) {
        const user = await authRepository_1.authRepository.findUserByMobile(input.mobileNumber);
        if (!user?.passwordHash)
            throw new errors_1.AppError('Invalid credentials', 401);
        const validPassword = await (0, auth_1.comparePassword)(input.password, user.passwordHash);
        if (!validPassword)
            throw new errors_1.AppError('Invalid credentials', 401);
        const accessToken = (0, auth_1.signAccessToken)({ id: user.id, fullName: user.fullName, mobileNumber: user.mobileNumber, role: user.role, districtId: user.districtId });
        const refreshToken = (0, auth_1.signRefreshToken)({ id: user.id, fullName: user.fullName, mobileNumber: user.mobileNumber, role: user.role, districtId: user.districtId });
        const refreshExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        await authRepository_1.authRepository.createRefreshToken(user.id, crypto_1.default.createHash('sha256').update(refreshToken).digest('hex'), refreshExpiresAt);
        return { user, accessToken, refreshToken };
    },
    async sendOtp(input) {
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        const codeHash = crypto_1.default.createHash('sha256').update(otp).digest('hex');
        const expiresAt = new Date(Date.now() + env_1.env.OTP_TTL_MINUTES * 60 * 1000);
        await authRepository_1.authRepository.createOtp(input.mobileNumber, codeHash, expiresAt);
        return { otp };
    },
    async verifyOtp(input) {
        const latestOtp = await authRepository_1.authRepository.findLatestOtp(input.mobileNumber);
        if (!latestOtp || latestOtp.expiresAt < new Date() || latestOtp.consumedAt) {
            throw new errors_1.AppError('OTP expired or invalid', 401);
        }
        const hash = crypto_1.default.createHash('sha256').update(input.code).digest('hex');
        if (hash !== latestOtp.codeHash) {
            throw new errors_1.AppError('Invalid OTP', 401);
        }
        await authRepository_1.authRepository.consumeOtp(latestOtp.id);
        return { verified: true };
    },
    async refreshToken(input) {
        const tokenHash = crypto_1.default.createHash('sha256').update(input.refreshToken).digest('hex');
        const record = await authRepository_1.authRepository.findRefreshToken(tokenHash);
        if (!record || record.revokedAt || record.expiresAt < new Date()) {
            throw new errors_1.AppError('Refresh token invalid', 401);
        }
        const payload = (0, auth_1.verifyToken)(input.refreshToken, env_1.env.JWT_REFRESH_SECRET);
        const user = await authRepository_1.authRepository.findUserById(payload.sub);
        if (!user)
            throw new errors_1.AppError('Invalid user', 401);
        const accessToken = (0, auth_1.signAccessToken)({ id: user.id, fullName: user.fullName, mobileNumber: user.mobileNumber, role: user.role, districtId: user.districtId });
        return { accessToken };
    },
    async logout(userId) {
        await authRepository_1.authRepository.revokeAllRefreshTokens(userId);
        return { success: true };
    },
};
