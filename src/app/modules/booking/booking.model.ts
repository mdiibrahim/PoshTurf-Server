import { Schema, model } from 'mongoose';
import { IBooking, ITimeSlot } from './booking.interface';
import { isBooking } from './booking.constant';

const timeSlotSchema = new Schema<ITimeSlot>({
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
});

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
    timeSlots: {
      type: [timeSlotSchema],
      required: true,
      _id: false,
    },
    payableAmount: {
      type: Number,
      required: false,
    },
    transactionId: {
      type: String,
      required: false,
    },

    isBooked: {
      type: String,
      enum: isBooking,
      default: 'pending',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: false,
  },
);

bookingSchema.pre('find', function (next) {
  this.find({
    isBooked: ['confirmed', 'pending'],
  });
  next();
});

export const Booking = model<IBooking>('Booking', bookingSchema);
