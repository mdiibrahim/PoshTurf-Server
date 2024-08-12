import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/user/user.route';
import { FacilityRoutes } from './app/modules/facility/facility.route';
import { BookingRoutes } from './app/modules/booking/booking.route';
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', UserRoutes);
app.use('/api/facility', FacilityRoutes);
app.use('/api/bookings', BookingRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Sports-Facility-Booking-Platform!');
});

//Not Found Route
app.get('/*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

export default app;
