import { Router } from 'express';
import { citizenController } from '../controllers/citizenController';
import { authMiddleware, authorizeRoles } from '../middleware/authMiddleware';

const router = Router();
router.use(authMiddleware, authorizeRoles('CITIZEN'));

router.get('/dashboard', citizenController.dashboard);
router.get('/quota', citizenController.quota);
router.get('/transactions', citizenController.transactions);
router.get('/complaints', citizenController.complaints);
router.get('/notifications', citizenController.notifications);
router.get('/profile', citizenController.profile);

export default router;
