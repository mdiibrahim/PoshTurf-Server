import { Types } from 'mongoose';
import { z } from 'zod';
import { isBooking } from './booking.constant';

const objectIdValidationSchema = z
  .string()
  .refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid ObjectId',
  });

export const bookingValidationSchema = z
  .object({
    facility: objectIdValidationSchema,
    date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format.'),
    startTime: z
      .string()
      .regex(/^\d{2}:\d{2}$/, 'Start time must be in HH:MM format.'),
    endTime: z
      .string()
      .regex(/^\d{2}:\d{2}$/, 'End time must be in HH:MM format.'),
    payableAmount: z.number().optional(),
    isBooked: z
      .enum([...isBooking] as [string, ...string[]])
      .default('confirmed'),
  })
  .refine(
    (data) => {
      const [startHour, startMinute] = data.startTime.split(':').map(Number);
      const [endHour, endMinute] = data.endTime.split(':').map(Number);

      // Convert time to minutes since start of the day for comparison
      const startTimeInMinutes = startHour * 60 + startMinute;
      const endTimeInMinutes = endHour * 60 + endMinute;

      return startTimeInMinutes < endTimeInMinutes;
    },
    {
      message: 'Start time must be before end time',
      path: ['endTime'],
    },
  );

export const BookingValidation = {
  bookingValidationSchema,
};
