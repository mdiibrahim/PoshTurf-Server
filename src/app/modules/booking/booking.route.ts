import { Router } from 'express';
import { BookingControllers } from './booking.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BookingValidation } from './booking.validation';
import auth from '../../middlewares/authHandler';

const router = Router();

router.post(
  '/',
  auth('user'),
  validateRequest(BookingValidation.bookingValidationSchema),
  BookingControllers.createBooking,
);
router.get('/', auth('admin'), BookingControllers.getAllBookings);
router.get('/user', auth('user'), BookingControllers.getAUserBookings);
router.delete('/:id', auth('user'), BookingControllers.cancelBooking);

export const BookingRoutes = router;
