const catchAsync = require('../utils/catchAsync');
const socketIO = require('../utils/socket');
const Battery = require('../models/batteryModel');
const AppError = require('../utils/appError');

exports.getAllBatteries = catchAsync(async (req, res, next) => {
  const doc = await Battery.find();

  res.status(200).json({
    status: 'success',
    results: doc.length,
    data: {
      data: doc,
    },
  });
});

exports.checkAvaibility = async (req, res, next) => {
  try {
    const battery = await Battery.findById(req.params.id);
    if (!battery || !battery.available)
      throw new AppError('Battery either not found or is unavailable', 400);
  } catch (error) {
    next(error);
  }
  next();
};

exports.reserveBattery = catchAsync(async (req, res, next) => {
  const body = { available: false };

  const doc = await Battery.findByIdAndUpdate(req.params.id, body, {
    new: true, // returns new updated document
    runValidators: true, // run the model schema validator
  });

  socketIO.emitReserveSuccess(doc);

  res.status(200).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});

exports.addBattery = catchAsync(async (req, res, next) => {
  const doc = await Battery.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});
