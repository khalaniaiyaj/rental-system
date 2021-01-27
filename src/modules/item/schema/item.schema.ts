import { Schema, Types } from 'mongoose';

import { ModelName } from 'src/constant/enum';

export const ItemSchema = new Schema(
  {
    name: { type: String, trim: true },
    rentPrice: { type: Number },
    manufactureDate: { type: Date, default: new Date() },
    actualCost: { type: Number },
    user: { type: Types.ObjectId, ref: ModelName.USER },
    isTaken: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);
