import type { Request, Response, NextFunction } from 'express';
import { authService } from '../services/authService';
import { registerSchema, loginSchema, otpSchema, verifyOtpSchema, refreshTokenSchema } from '../validations/auth.validation';
import { AppError } from '../utils/errors';

export const authController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = registerSchema.parse(req.body);
      const result = await authService.register(payload);
      res.status(201).json({ success: true, message: 'User registered successfully', data: result });
    } catch (error) {
      next(error);
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = loginSchema.parse(req.body);
      const result = await authService.login(payload);
      res.json({ success: true, message: 'Login successful', data: result });
    } catch (error) {
      next(error);
    }
  },

  async sendOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = otpSchema.parse(req.body);
      const result = await authService.sendOtp(payload);
      res.json({ success: true, message: 'OTP sent successfully', data: result });
    } catch (error) {
      next(error);
    }
  },

  async verifyOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = verifyOtpSchema.parse(req.body);
      const result = await authService.verifyOtp(payload);
      res.json({ success: true, message: 'OTP verified successfully', data: result });
    } catch (error) {
      next(error);
    }
  },

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = refreshTokenSchema.parse(req.body);
      const result = await authService.refreshToken(payload);
      res.json({ success: true, message: 'Token refreshed successfully', data: result });
    } catch (error) {
      next(error);
    }
  },

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      const result = await authService.logout(req.user.id);
      res.json({ success: true, message: 'Logged out successfully', data: result });
    } catch (error) {
      next(error);
    }
  },
};
