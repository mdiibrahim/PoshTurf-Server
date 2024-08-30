import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Facility } from '../facility/facility.model';
import { IBooking } from './booking.interface';
import { Booking } from './booking.model';
import { User } from '../user/user.model';
import { JwtPayload } from 'jsonwebtoken';
import getAvailableTimeSlots from './booking.utils';

const createBookingInDB = async (booking: IBooking, payload: JwtPayload) => {
  const { facility, date, startTime, endTime } = booking;
  const user = await User.isUserExists(payload.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }
  // Fetch the facility to get the pricePerHour
  const facilityData = await Facility.findById(facility);
  if (!facilityData) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }
  // Check for conflicting bookings
  const existingBooking = await Booking.findOne({
    facility,
    date,
    $or: [
      { startTime: { $lt: endTime, $gte: startTime } },
      { endTime: { $gt: startTime, $lte: endTime } },
    ],
  });
  if (existingBooking) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Facility is unavailable during the requested time slot',
    );
  }
  // Calculate payableAmount
  const start = new Date(`${date}T${startTime}`);
  const end = new Date(`${date}T${endTime}`);
  const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
  const payableAmount = hours * facilityData?.pricePerHour;

  // Create booking
  const result = await Booking.create({
    ...booking,
    user: user._id,
    payableAmount,
  });
  return result;
};

const getAllBookingsFromDB = async () => {
  const result = await Booking.find({})
    .populate('facility')
    .populate('user')
    .lean();
  if (!result || result.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }

  return result;
};
const getAUserBookingsFromDB = async (payload: JwtPayload) => {
  const { _id } = payload;
  const result = await Booking.find({ user: _id })
    .populate('facility')
    .populate('user');
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }

  return result;
};
const cancelBookingFromDB = async (id: string) => {
  const result = await Booking.findByIdAndUpdate(
    id,
    {
      isBooked: 'canceled',
    },
    {
      new: true,
    },
  ).populate('facility');
  return result;
};

// This function retrieves available time slots for a specific facility on a specific date.
const checkAvailabileTimeSlotsFromDB = async (
  date: string,
  facilityId: string,
) => {
  const selectedDate = date ? date : new Date().toISOString().split('T')[0];

  // Retrieve bookings from the database for the specified facility and date
  const bookings = await Booking.find({
    date: selectedDate,
    facility: facilityId,
  });

  // Extract the booked time slots
  const bookedSlots = bookings.map((booking) => ({
    startTime: booking.startTime,
    endTime: booking.endTime,
  }));

  // Find available time slots based on booked slots
  const availableSlots = getAvailableTimeSlots(bookedSlots);

  return availableSlots;
};

export const BookingServices = {
  createBookingInDB,
  getAllBookingsFromDB,
  getAUserBookingsFromDB,
  cancelBookingFromDB,
  checkAvailabileTimeSlotsFromDB,
};
