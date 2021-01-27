import { Document, Types } from 'mongoose';

export interface RentInterface extends Document {
  item: Types.ObjectId;
  cost?: number;
  bookedBy?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
