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

// Main Booking Validation Schema
export const bookingValidationSchema = z.object({
  facility: objectIdValidationSchema,
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format.'),
  timeSlots: z
    .array(timeSlotValidationSchema)
    .min(1, 'At least one time slot is required')
    .refine(
      (timeSlots) => {
        // Ensure no overlapping time slots within the same booking
        for (let i = 0; i < timeSlots.length; i++) {
          for (let j = i + 1; j < timeSlots.length; j++) {
            const slotA = timeSlots[i];
            const slotB = timeSlots[j];

            const slotAStart = new Date(`1970-01-01T${slotA.startTime}:00Z`);
            const slotAEnd = new Date(`1970-01-01T${slotA.endTime}:00Z`);
            const slotBStart = new Date(`1970-01-01T${slotB.startTime}:00Z`);
            const slotBEnd = new Date(`1970-01-01T${slotB.endTime}:00Z`);

            if (slotAStart < slotBEnd && slotAEnd > slotBStart) {
              return false;
            }
          }
        }
        return true;
      },
      {
        message: 'Time slots within the same booking must not overlap',
      },
    ),
  payableAmount: z.number().optional(),
  transactionId: z.string().optional(),
  isBooked: z
    .enum([...isBooking] as [string, ...string[]])
    .default('confirmed'),
});

export const BookingValidation = {
  bookingValidationSchema,
};
