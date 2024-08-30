import { Schema } from 'mongoose';

export interface IReview {
  comment: string;
  facility: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  rating: number;
}
