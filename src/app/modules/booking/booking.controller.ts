import { Request, Response } from 'express';
import { BookingValidation } from './booking.validation';
import { BookingServices } from './booking.services';
import { Types } from 'mongoose';
import sendResponse from '../../utilis/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utilis/catchAsync';

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const bookingData = req.body;
  const zodParseBookingData =
    BookingValidation.bookingValidationSchema.parse(bookingData);
  //convert the productId into mongoDB ObjectId format
  const bookingDataWithObjectId = {
    ...zodParseBookingData,
    facility: new Types.ObjectId(zodParseBookingData.facility),
  };
  const result = await BookingServices.createBookingInDB(
    bookingDataWithObjectId,
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Facility added successfully',
    data: result,
  });
});

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingServices.getAllBookingsFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bookings retrieved successfully',
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
  getAllBookings,
};
