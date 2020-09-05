import { model, Schema } from 'mongoose';
import { IBattery } from '../shared/interfaces';

const batterySchema = new Schema({
  available: {
    type: Boolean,
    default: false,
  },
  location: {
    type: String,
    required: [true, 'Please provide the location'],
  },
});

const Battery = model<IBattery>('Battery', batterySchema);

export default Battery;
