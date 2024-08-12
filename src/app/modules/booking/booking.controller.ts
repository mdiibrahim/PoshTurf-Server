import { Request, Response } from 'express';
import { BookingValidation } from './booking.validation';
import { BookingServices } from './booking.services';
import { Types } from 'mongoose';

const createBooking = async (req: Request, res: Response) => {
  try {
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
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Facility added successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error!!!',
      err,
    });
  }
};

export const BookingControllers = {
  createBooking,
};
