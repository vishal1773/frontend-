"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const citizenRoutes_1 = __importDefault(require("./routes/citizenRoutes"));
const shopkeeperRoutes_1 = __importDefault(require("./routes/shopkeeperRoutes"));
const officerRoutes_1 = __importDefault(require("./routes/officerRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const assistantRoutes_1 = __importDefault(require("./routes/assistantRoutes"));
const iotRoutes_1 = __importDefault(require("./routes/iotRoutes"));
const errorHandler_1 = require("./middleware/errorHandler");
const env_1 = require("./config/env");
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({ origin: env_1.env.CORS_ORIGIN === '*' ? true : env_1.env.CORS_ORIGIN.split(',') }));
app.use(express_1.default.json({ limit: '1mb' }));
app.use((0, express_rate_limit_1.default)({ windowMs: 15 * 60 * 1000, max: 200 }));
app.get('/health', (_req, res) => {
    res.json({ success: true, message: 'Backend is healthy' });
});
app.use('/api/auth', authRoutes_1.default);
app.use('/api/citizen', citizenRoutes_1.default);
app.use('/api/shopkeeper', shopkeeperRoutes_1.default);
app.use('/api/officer', officerRoutes_1.default);
app.use('/api/admin', adminRoutes_1.default);
app.use('/api/assistant', assistantRoutes_1.default);
app.use('/api/iot', iotRoutes_1.default);
app.get('/api/v1', (_req, res) => {
    res.json({ success: true, message: 'Smart Ration API is live' });
});
app.use(errorHandler_1.errorHandler);
exports.default = app;
