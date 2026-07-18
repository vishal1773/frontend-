import { Router } from 'express';
import { officerController } from '../controllers/officerController';
import { authMiddleware, authorizeRoles } from '../middleware/authMiddleware';

const router = Router();
router.use(authMiddleware, authorizeRoles('DISTRICT_OFFICER'));

router.get('/dashboard', officerController.dashboard);
router.get('/shops', officerController.shops);
router.get('/stock-monitoring', officerController.stockMonitoring);
router.get('/analytics', officerController.analytics);

export default router;
