"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = exports.authMiddleware = void 0;
const env_1 = require("../config/env");
const errors_1 = require("../utils/errors");
const auth_1 = require("../utils/auth");
const prisma_1 = require("../config/prisma");
const authMiddleware = async (req, res, next) => {
    try {
        const header = req.headers.authorization;
        if (!header?.startsWith('Bearer ')) {
            throw new errors_1.AppError('Authorization token missing', 401);
        }
        const token = header.slice(7);
        const decoded = (0, auth_1.verifyToken)(token, env_1.env.JWT_ACCESS_SECRET);
        const user = await prisma_1.prisma.user.findUnique({ where: { id: decoded.sub } });
        if (!user) {
            throw new errors_1.AppError('Invalid user', 401);
        }
        req.user = {
            id: user.id,
            fullName: user.fullName,
            mobileNumber: user.mobileNumber,
            role: user.role,
            districtId: user.districtId,
        };
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.authMiddleware = authMiddleware;
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ success: false, message: 'Forbidden' });
        }
        next();
    };
};
exports.authorizeRoles = authorizeRoles;
