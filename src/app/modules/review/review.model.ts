import { model, Schema } from 'mongoose';
import { IReview } from './review.interface';

const reviewSchema = new Schema<IReview>(
  {
    comment: {
      type: String,
      required: true,
    },
    facility: {
      type: Schema.Types.ObjectId,
      ref: 'Facility',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  {
    versionKey: false,
    timestamps: false,
  },
);

export const Review = model<IReview>('Review', reviewSchema);
