import { Request, Response } from 'express';

import { BookingServices } from './booking.services';

import sendResponse from '../../utilis/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utilis/catchAsync';

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const bookingData = req.body;
  const user = req.user;
  const result = await BookingServices.createBookingInDB(bookingData, user);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking created successfully',
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
const getAUserBookings = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingServices.getAUserBookingsFromDB(req.user);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bookings retrieved successfully',
    data: result,
  });
});
const cancelBooking = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookingServices.cancelBookingFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking cancelled successfully',
    data: result,
  });
});

const checkAvailabileTimeSlots = catchAsync(
  async (req: Request, res: Response) => {
    const date = req.query.date as string;
    const result = await BookingServices.checkAvailabileTimeSlotsFromDB(date);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Availability checked successfully',
      data: result,
    });
  },
);

export const BookingControllers = {
  createBooking,
  getAllBookings,
  getAUserBookings,
  cancelBooking,
  checkAvailabileTimeSlots,
};
