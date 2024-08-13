import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/user/user.route';
import { FacilityRoutes } from './app/modules/facility/facility.route';
import { BookingRoutes } from './app/modules/booking/booking.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFoundRoute from './app/middlewares/notFoundRoute';
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', UserRoutes);
app.use('/api/facility', FacilityRoutes);
app.use('/api/bookings', BookingRoutes);

app.use(globalErrorHandler);
app.use(notFoundRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Sports-Facility-Booking-Platform!');
});

export default app;
