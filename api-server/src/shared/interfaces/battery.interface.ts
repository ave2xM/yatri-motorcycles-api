import { Document } from 'mongoose';

export interface IBattery extends Document {
  available: boolean;
  location: String;
}
