import { Document, Types } from 'mongoose';

export interface ItemInterface extends Document {
  name: string;
  rentPrice: number;
  manufactureDate?: Date;
  actualCost: number;
  user?: Types.ObjectId;
  isTaken?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
