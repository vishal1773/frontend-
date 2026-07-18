"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
const prisma_1 = require("./config/prisma");
const logger_1 = require("./utils/logger");
const port = env_1.env.PORT;
app_1.default.listen(port, async () => {
    logger_1.logger.info(`Server listening on port ${port}`);
    await prisma_1.prisma.$connect();
    logger_1.logger.info('Prisma connected');
});
process.on('SIGINT', async () => {
    await prisma_1.prisma.$disconnect();
    process.exit(0);
});
