import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFoundRoute from './app/middlewares/notFoundRoute';
import router from './app/routes';
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api', router);

app.use(globalErrorHandler);
app.use(notFoundRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Sports-Facility-Booking-Platform!');
});

export default app;
