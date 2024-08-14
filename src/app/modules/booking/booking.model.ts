import { Schema, model } from 'mongoose';
import { IBooking } from './booking.interface';
import { isBooking } from './booking.constant';

const bookingSchema = new Schema<IBooking>(
  {
    facility: {
      type: Schema.Types.ObjectId,
      ref: 'Facility',
      required: true,
      trim: true,
    },
    date: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    payableAmount: {
      type: Number,
      required: false,
    },
    isBooked: {
      type: String,
      enum: isBooking,
      default: 'confirmed',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const Booking = model<IBooking>('Booking', bookingSchema);
