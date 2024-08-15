import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Facility } from '../facility/facility.model';
import { IBooking } from './booking.interface';
import { Booking } from './booking.model';
import { User } from '../user/user.model';
import { JwtPayload } from 'jsonwebtoken';

const createBookingInDB = async (booking: IBooking, payload: JwtPayload) => {
  const { facility, date, startTime, endTime } = booking;
  const user = await User.isUserExists(payload.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // Fetch the facility to get the pricePerHour
  const facilityData = await Facility.findById(facility);
  if (!facilityData) {
    throw new AppError(httpStatus.NOT_FOUND, 'Facility not found!!!');
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
    throw new AppError(httpStatus.NOT_FOUND, 'Booking not found!!!');
  }

  return result;
};
const getAUserBookingsFromDB = async (payload: JwtPayload) => {
  const { _id } = payload;
  const result = await Booking.find({ user: _id }).populate('facility');
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Booking not found!!!');
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

function getAvailableTimeSlots(
  bookedSlots: Array<{ startTime: string; endTime: string }>,
): Array<{ startTime: string; endTime: string }> {
  const openingTime = '00:00';
  const closingTime = '23:59';

  // Initialize with one big slot for 24 hours
  let availableSlots = [{ startTime: openingTime, endTime: closingTime }];

  // Loop through each booked slot and adjust the available slots
  bookedSlots.forEach((booked) => {
    availableSlots = availableSlots.flatMap((slot) => {
      // No overlap
      if (
        booked.endTime <= slot.startTime ||
        booked.startTime >= slot.endTime
      ) {
        return [slot];
      }

      // Overlap at the start of the available slot
      if (booked.startTime <= slot.startTime && booked.endTime < slot.endTime) {
        return [{ startTime: booked.endTime, endTime: slot.endTime }];
      }

      // Overlap at the end of the available slot
      if (booked.startTime > slot.startTime && booked.endTime >= slot.endTime) {
        return [{ startTime: slot.startTime, endTime: booked.startTime }];
      }

      // Booked slot is within the available slot (splitting it into two)
      if (booked.startTime > slot.startTime && booked.endTime < slot.endTime) {
        return [
          { startTime: slot.startTime, endTime: booked.startTime },
          { startTime: booked.endTime, endTime: slot.endTime },
        ];
      }

      // Booked slot completely overlaps the available slot (removes the slot)
      return [];
    });
  });

  return availableSlots;
}
const checkAvailabileTimeSlotsFromDB = async (date: string) => {
  const selectedDate = date ? date : new Date().toISOString().split('T')[0];

  // Retrieve bookings from the database for the specified date
  const bookings = await Booking.find({ date: selectedDate });

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
