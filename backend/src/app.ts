import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/authRoutes';
import citizenRoutes from './routes/citizenRoutes';
import shopkeeperRoutes from './routes/shopkeeperRoutes';
import officerRoutes from './routes/officerRoutes';
import adminRoutes from './routes/adminRoutes';
import assistantRoutes from './routes/assistantRoutes';
import iotRoutes from './routes/iotRoutes';
import { errorHandler } from './middleware/errorHandler';
import { env } from './config/env';

const app = express();

app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN === '*' ? true : env.CORS_ORIGIN.split(',') }));
app.use(express.json({ limit: '1mb' }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));

app.get('/health', (_req, res) => {
  res.json({ success: true, message: 'Backend is healthy' });
});

app.use('/api/auth', authRoutes);
app.use('/api/citizen', citizenRoutes);
app.use('/api/shopkeeper', shopkeeperRoutes);
app.use('/api/officer', officerRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/assistant', assistantRoutes);
app.use('/api/iot', iotRoutes);

app.get('/api/v1', (_req, res) => {
  res.json({ success: true, message: 'Smart Ration API is live' });
});

app.use(errorHandler);

export default app;
