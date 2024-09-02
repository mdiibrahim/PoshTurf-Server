import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Facility } from '../facility/facility.model';

import { Booking } from './booking.model';
import { User } from '../user/user.model';
import { JwtPayload } from 'jsonwebtoken';

import { IBooking } from './booking.interface';
import getAvailableTimeSlots from './booking.utils';

const createBookingInDB = async (
  bookingData: IBooking,
  payload: JwtPayload,
) => {
  const user = await User.isUserExists(payload.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const { facility, date, timeSlots } = bookingData;

  const facilityData = await Facility.findById(facility);
  if (!facilityData) {
    throw new AppError(httpStatus.NOT_FOUND, 'Facility not found');
  }

  for (const slot of timeSlots) {
    const { startTime, endTime } = slot;

    const existingBooking = await Booking.findOne({
      facility,
      date,
      $or: [
        // Overlap case: start time is within an existing slot
        {
          $and: [
            { 'timeSlots.startTime': { $lte: startTime } },
            { 'timeSlots.endTime': { $gt: startTime } },
          ],
        },
        // Overlap case: end time is within an existing slot
        {
          $and: [
            { 'timeSlots.startTime': { $lt: endTime } },
            { 'timeSlots.endTime': { $gte: endTime } },
          ],
        },
        // Overlap case: existing slot is fully within the new slot
        {
          $and: [
            { 'timeSlots.startTime': { $gte: startTime } },
            { 'timeSlots.endTime': { $lte: endTime } },
          ],
        },
        // Overlap case: new slot fully covers an existing slot
        {
          $and: [
            { 'timeSlots.startTime': { $lte: startTime } },
            { 'timeSlots.endTime': { $gte: endTime } },
          ],
        },
      ],
    });
    if (existingBooking) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `Facility is unavailable during the time slot: ${startTime} - ${endTime}`,
      );
    }
  }

  const totalHours = timeSlots.reduce((acc, slot) => {
    const start = new Date(`${date}T${slot.startTime}`);
    const end = new Date(`${date}T${slot.endTime}`);
    return acc + (end.getTime() - start.getTime()) / (1000 * 60 * 60);
  }, 0);

  const payableAmount = parseFloat(
    (totalHours * facilityData.pricePerHour).toFixed(2),
  );

  const booking = await Booking.create({
    facility,
    date,
    timeSlots,
    user: user._id,
    payableAmount,
  });

  return booking;
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
const getAUserSingleBookingFromDB = async (id: string) => {
  const result = await Booking.find({ _id: id })
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
      isBooked: 'cancelled',
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
  // If no date is provided, use today's date
  const selectedDate = date ? date : new Date().toISOString().split('T')[0];

  // Retrieve bookings from the database for the specified facility and date
  const bookings = await Booking.find({
    date: selectedDate,
    facility: facilityId,
  });

  // Extract the booked time slots
  const bookedSlots = bookings.flatMap((booking) =>
    booking.timeSlots.map((slot) => ({
      startTime: slot.startTime,
      endTime: slot.endTime,
    })),
  );

  // Find available time slots based on booked slots and the current time
  const availableSlots = getAvailableTimeSlots(bookedSlots, selectedDate);

  return availableSlots;
};

export const BookingServices = {
  createBookingInDB,
  getAllBookingsFromDB,
  getAUserBookingsFromDB,
  cancelBookingFromDB,
  checkAvailabileTimeSlotsFromDB,
  getAUserSingleBookingFromDB,
};
