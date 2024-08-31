import { Types } from 'mongoose';
import { z } from 'zod';
import { isBooking } from './booking.constant';

const objectIdValidationSchema = z
  .string()
  .refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid ObjectId',
  });

const timeSlotValidationSchema = z.object({
  startTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/, 'Start time must be in HH:MM format.'),
  endTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/, 'End time must be in HH:MM format.'),
});

export const bookingValidationSchema = z
  .object({
    facility: objectIdValidationSchema,
    date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format.'),
    timeSlots: z
      .array(timeSlotValidationSchema)
      .min(1, 'At least one time slot is required'),
    payableAmount: z.number().optional(),
    transactionId: z.string().optional(),
    isBooked: z
      .enum([...isBooking] as [string, ...string[]])
      .default('confirmed'),
  })
  .refine(
    (data) => {
      return data.timeSlots.every((slot) => {
        const [startHour, startMinute] = slot.startTime.split(':').map(Number);
        const [endHour, endMinute] = slot.endTime.split(':').map(Number);

        // Convert time to minutes since start of the day for comparison
        const startTimeInMinutes = startHour * 60 + startMinute;
        const endTimeInMinutes = endHour * 60 + endMinute;

        return startTimeInMinutes < endTimeInMinutes;
      });
    },
    {
      message: 'Start time must be before end time',
      path: ['timeSlots'],
    },
  );

export const BookingValidation = {
  bookingValidationSchema,
};
