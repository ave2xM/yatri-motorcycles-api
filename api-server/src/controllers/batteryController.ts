import { Request, Response, NextFunction } from 'express';
import catchAsync from '../utils/catchAsync';
import socketIO from '../utils/socket';
import Battery from '../models/battery.model';
import AppError from '../utils/appError';

exports.getAllBatteries = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // console.log(new MyClass('Manjil'));
    const doc = await Battery.find();
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc,
      },
    });
  }
);

exports.checkAvaibility = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const battery = await Battery.findById(req.params.id);
    if (!battery || !battery.available)
      throw new AppError('Battery either not found or is unavailable', 400);
  } catch (error) {
    next(error);
  }
  next();
};

exports.reserveBattery = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
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
  }
);

exports.addBattery = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Battery.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  }
);

exports.resetAvaibility = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await Battery.updateMany({}, { available: true });
    res.status(204).json({
      status: 'success',
      data: null,
    });
  }
);
