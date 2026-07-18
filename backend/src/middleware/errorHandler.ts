import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/errors';
import { logger } from '../utils/logger';

export const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    logger.warn({ err, statusCode: err.statusCode }, 'Application error');
    return res.status(err.statusCode).json({ success: false, message: err.message, details: err.details });
  }

  if (err instanceof Error) {
    logger.error({ err }, 'Unhandled error');
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }

  logger.error({ err }, 'Unknown error');
  return res.status(500).json({ success: false, message: 'Internal server error' });
};
