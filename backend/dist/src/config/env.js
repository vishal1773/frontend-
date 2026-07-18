"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
require("dotenv/config");
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(['development', 'test', 'production']).default('development'),
    PORT: zod_1.z.coerce.number().int().positive().default(5000),
    DATABASE_URL: zod_1.z.string().url(),
    JWT_ACCESS_SECRET: zod_1.z.string().min(32),
    JWT_REFRESH_SECRET: zod_1.z.string().min(32),
    JWT_ACCESS_TTL: zod_1.z.string().default('15m'),
    JWT_REFRESH_TTL: zod_1.z.string().default('30d'),
    OTP_TTL_MINUTES: zod_1.z.coerce.number().int().positive().default(10),
    CORS_ORIGIN: zod_1.z.string().default('*'),
    LOG_LEVEL: zod_1.z.string().default('info'),
});
exports.env = envSchema.parse(process.env);
