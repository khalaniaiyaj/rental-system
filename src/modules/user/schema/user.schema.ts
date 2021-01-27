import { Schema } from 'mongoose';

export const UserSchema = new Schema(
  {
    userName: { type: String, trim: true },
    email: { type: String, trim: true },
    password: { type: String, trim: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);
