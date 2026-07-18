"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = exports.verifyToken = exports.signRefreshToken = exports.signAccessToken = exports.comparePassword = exports.hashPassword = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const env_1 = require("../config/env");
const hashPassword = (password) => bcrypt_1.default.hash(password, 12);
exports.hashPassword = hashPassword;
const comparePassword = (password, hash) => bcrypt_1.default.compare(password, hash);
exports.comparePassword = comparePassword;
const signAccessToken = (user) => jsonwebtoken_1.default.sign({ sub: user.id, id: user.id, fullName: user.fullName, mobileNumber: user.mobileNumber, role: user.role, districtId: user.districtId }, env_1.env.JWT_ACCESS_SECRET, { expiresIn: env_1.env.JWT_ACCESS_TTL });
exports.signAccessToken = signAccessToken;
const signRefreshToken = (user) => jsonwebtoken_1.default.sign({ sub: user.id, type: 'refresh' }, env_1.env.JWT_REFRESH_SECRET, { expiresIn: env_1.env.JWT_REFRESH_TTL });
exports.signRefreshToken = signRefreshToken;
const verifyToken = (token, secret) => jsonwebtoken_1.default.verify(token, secret);
exports.verifyToken = verifyToken;
const requireRole = (allowedRoles) => (user) => {
    if (!user)
        return false;
    return allowedRoles.includes(user.role);
};
exports.requireRole = requireRole;
