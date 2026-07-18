import type { NextFunction, Request, Response } from 'express';
import { env } from '../config/env';
import { AppError } from '../utils/errors';
import { verifyToken } from '../utils/auth';
import { prisma } from '../config/prisma';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) {
      throw new AppError('Authorization token missing', 401);
    }

    const token = header.slice(7);
    const decoded = verifyToken(token, env.JWT_ACCESS_SECRET);
    const user = await prisma.user.findUnique({ where: { id: decoded.sub as string } });

    if (!user) {
      throw new AppError('Invalid user', 401);
    }

    req.user = {
      id: user.id,
      fullName: user.fullName,
      mobileNumber: user.mobileNumber,
      role: user.role as any,
      districtId: user.districtId,
    };

    next();
  } catch (error) {
    next(error);
  }
};

export const authorizeRoles = (...roles: Array<'CITIZEN' | 'SHOPKEEPER' | 'DISTRICT_OFFICER' | 'STATE_ADMIN'>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    next();
  };
};
