import { Router } from 'express';
import { adminController } from '../controllers/adminController';
import { authMiddleware, authorizeRoles } from '../middleware/authMiddleware';

const router = Router();
router.use(authMiddleware, authorizeRoles('STATE_ADMIN'));

router.get('/dashboard', adminController.dashboard);
router.get('/users', adminController.users);
router.get('/shops', adminController.shops);
router.get('/districts', adminController.districts);

export default router;
