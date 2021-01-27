import { Document } from 'mongoose';

export interface UserInterface extends Document {
  userName: string;
  email: string;
  password: string;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
