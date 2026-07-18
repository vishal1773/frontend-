"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errors_1 = require("../utils/errors");
const logger_1 = require("../utils/logger");
const errorHandler = (err, _req, res, _next) => {
    if (err instanceof errors_1.AppError) {
        logger_1.logger.warn({ err, statusCode: err.statusCode }, 'Application error');
        return res.status(err.statusCode).json({ success: false, message: err.message, details: err.details });
    }
    if (err instanceof Error) {
        logger_1.logger.error({ err }, 'Unhandled error');
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
    logger_1.logger.error({ err }, 'Unknown error');
    return res.status(500).json({ success: false, message: 'Internal server error' });
};
exports.errorHandler = errorHandler;
