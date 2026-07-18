"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenSchema = exports.verifyOtpSchema = exports.otpSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    fullName: zod_1.z.string().min(2),
    mobileNumber: zod_1.z.string().min(8),
    email: zod_1.z.string().email().optional().or(zod_1.z.literal('')),
    password: zod_1.z.string().min(8),
    role: zod_1.z.enum(['CITIZEN', 'SHOPKEEPER', 'DISTRICT_OFFICER', 'STATE_ADMIN']).default('CITIZEN'),
    districtCode: zod_1.z.string().optional(),
});
exports.loginSchema = zod_1.z.object({
    mobileNumber: zod_1.z.string().min(8),
    password: zod_1.z.string().min(8),
});
exports.otpSchema = zod_1.z.object({
    mobileNumber: zod_1.z.string().min(8),
});
exports.verifyOtpSchema = zod_1.z.object({
    mobileNumber: zod_1.z.string().min(8),
    code: zod_1.z.string().length(6),
});
exports.refreshTokenSchema = zod_1.z.object({
    refreshToken: zod_1.z.string().min(10),
});
