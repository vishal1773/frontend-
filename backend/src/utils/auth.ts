import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { env } from '../config/env';
import type { AuthUser, Role } from '../types';

export const hashPassword = (password: string) => bcrypt.hash(password, 12);
export const comparePassword = (password: string, hash: string) => bcrypt.compare(password, hash);

export const signAccessToken = (user: AuthUser) =>
  jwt.sign({ sub: user.id, id: user.id, fullName: user.fullName, mobileNumber: user.mobileNumber, role: user.role, districtId: user.districtId }, env.JWT_ACCESS_SECRET as any, { expiresIn: env.JWT_ACCESS_TTL as any });

export const signRefreshToken = (user: AuthUser) =>
  jwt.sign({ sub: user.id, type: 'refresh' }, env.JWT_REFRESH_SECRET as any, { expiresIn: env.JWT_REFRESH_TTL as any });

export const verifyToken = (token: string, secret: string) => jwt.verify(token, secret) as jwt.JwtPayload;

export const requireRole = (allowedRoles: Role[]) => (user?: AuthUser) => {
  if (!user) return false;
  return allowedRoles.includes(user.role);
};
