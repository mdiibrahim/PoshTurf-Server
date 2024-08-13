import { Types } from 'mongoose';
import { z } from 'zod';
import { isBooking } from './booking.constant';

const objectIdValidationSchema = z
  .string()
  .refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid ObjectId',
  });

export const bookingValidationSchema = z.object({
  facility: objectIdValidationSchema,
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format.'),
  startTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/, 'Start time must be in HH:mm format.'),
  endTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/, 'End time must be in HH:mm format.'),
  payableAmount: z.number().optional(),
  isBooked: z
    .enum([...isBooking] as [string, ...string[]])
    .default('confirmed'),
});

export const BookingValidation = {
  bookingValidationSchema,
};
