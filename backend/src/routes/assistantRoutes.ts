import { Router } from 'express';
import { assistantController } from '../controllers/assistantController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
router.use(authMiddleware);

router.post('/chat', assistantController.chat);
router.post('/voice', assistantController.voice);
router.get('/history', assistantController.history);

export default router;
