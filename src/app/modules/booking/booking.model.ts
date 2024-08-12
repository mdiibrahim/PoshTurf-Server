import { Schema, model } from 'mongoose';
import { IBooking } from './booking.interface';

const bookingSchema = new Schema<IBooking>(
  {
    facility: {
      type: Schema.Types.ObjectId,
      ref: 'Facility',
      required: true,
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
      enum: ['confirmed', 'canceled'],
      default: 'confirmed',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const Booking = model<IBooking>('Booking', bookingSchema);
