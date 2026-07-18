import { Router } from 'express';
import { iotController } from '../controllers/iotController';

const router = Router();

router.post('/devices/register', iotController.registerDevice);
router.post('/stock-data', iotController.stockData);
router.post('/sensor-data', iotController.sensorData);
router.get('/live-stock', iotController.liveStock);

export default router;
