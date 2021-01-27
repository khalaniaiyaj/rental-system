import { Schema, Types } from 'mongoose';

import { ModelName } from 'src/constant/enum';

export const RentSchema = new Schema(
  {
    item: { type: Types.ObjectId, ref: ModelName.ITEM },
    cost: { type: Number },
    bookedBy: { type: Types.ObjectId, ref: ModelName.USER },
  },
  {
    timestamps: true,
  },
);
