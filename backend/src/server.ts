import app from './app';
import { env } from './config/env';
import { prisma } from './config/prisma';
import { logger } from './utils/logger';

const port = env.PORT;

const startServer = async () => {
  try {
    await prisma.$connect();
    logger.info('Prisma connected');
  } catch (error) {
    logger.warn({ error }, 'Prisma not available; starting server without database connection');
  }

  app.listen(port, () => {
    logger.info(`Server listening on port ${port}`);
  });
};

startServer();

process.on('SIGINT', async () => {
  await prisma.$disconnect().catch(() => undefined);
  process.exit(0);
});
