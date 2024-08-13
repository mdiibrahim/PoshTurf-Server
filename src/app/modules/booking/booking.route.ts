import { Router } from 'express';
import { BookingControllers } from './booking.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BookingValidation } from './booking.validation';

const router = Router();

router.post(
  '/',
  validateRequest(BookingValidation.bookingValidationSchema),
  BookingControllers.createBooking,
);
router.get('/', BookingControllers.getAllBookings);

export const BookingRoutes = router;
