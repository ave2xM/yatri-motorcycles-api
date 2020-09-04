const express = require('express');
const batteryController = require('../controllers/batteryController');

const router = express.Router();

router
  .route('/')
  .get(batteryController.getAllBatteries)
  .post(batteryController.addBattery);

router
  .route('/:id')
  .post(batteryController.checkAvaibility, batteryController.reserveBattery);

module.exports = router;
