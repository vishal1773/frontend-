import { Router } from 'express';
import { shopkeeperController } from '../controllers/shopkeeperController';
import { authMiddleware, authorizeRoles } from '../middleware/authMiddleware';

const router = Router();
router.use(authMiddleware, authorizeRoles('SHOPKEEPER'));

router.get('/dashboard', shopkeeperController.dashboard);
router.post('/scan-beneficiary', shopkeeperController.scanBeneficiary);
router.post('/issue-ration', shopkeeperController.issueRation);
router.get('/stock', shopkeeperController.stock);
router.get('/reports', shopkeeperController.reports);

export default router;
