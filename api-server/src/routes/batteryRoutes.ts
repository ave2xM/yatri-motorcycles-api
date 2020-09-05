import express, { Router } from 'express';
const batteryController = require('../controllers/batteryController');

const router: Router = express.Router();

router
  .route('/')
  .get(batteryController.getAllBatteries)
  .post(batteryController.addBattery);

router.route('/reset').post(batteryController.resetAvaibility);

router
  .route('/reserve/:id')
  .post(batteryController.checkAvaibility, batteryController.reserveBattery);

export default router;
