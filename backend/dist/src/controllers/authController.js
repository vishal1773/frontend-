"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const authService_1 = require("../services/authService");
const auth_validation_1 = require("../validations/auth.validation");
const errors_1 = require("../utils/errors");
exports.authController = {
    async register(req, res, next) {
        try {
            const payload = auth_validation_1.registerSchema.parse(req.body);
            const result = await authService_1.authService.register(payload);
            res.status(201).json({ success: true, message: 'User registered successfully', data: result });
        }
        catch (error) {
            next(error);
        }
    },
    async login(req, res, next) {
        try {
            const payload = auth_validation_1.loginSchema.parse(req.body);
            const result = await authService_1.authService.login(payload);
            res.json({ success: true, message: 'Login successful', data: result });
        }
        catch (error) {
            next(error);
        }
    },
    async sendOtp(req, res, next) {
        try {
            const payload = auth_validation_1.otpSchema.parse(req.body);
            const result = await authService_1.authService.sendOtp(payload);
            res.json({ success: true, message: 'OTP sent successfully', data: result });
        }
        catch (error) {
            next(error);
        }
    },
    async verifyOtp(req, res, next) {
        try {
            const payload = auth_validation_1.verifyOtpSchema.parse(req.body);
            const result = await authService_1.authService.verifyOtp(payload);
            res.json({ success: true, message: 'OTP verified successfully', data: result });
        }
        catch (error) {
            next(error);
        }
    },
    async refreshToken(req, res, next) {
        try {
            const payload = auth_validation_1.refreshTokenSchema.parse(req.body);
            const result = await authService_1.authService.refreshToken(payload);
            res.json({ success: true, message: 'Token refreshed successfully', data: result });
        }
        catch (error) {
            next(error);
        }
    },
    async logout(req, res, next) {
        try {
            if (!req.user)
                throw new errors_1.AppError('Authentication required', 401);
            const result = await authService_1.authService.logout(req.user.id);
            res.json({ success: true, message: 'Logged out successfully', data: result });
        }
        catch (error) {
            next(error);
        }
    },
};
