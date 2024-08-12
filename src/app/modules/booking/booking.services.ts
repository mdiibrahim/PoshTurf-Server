import { Facility } from '../facility/facility.model';
import { IBooking } from './booking.interface';
import { Booking } from './booking.model';

const createBookingInDB = async (booking: IBooking) => {
  const { facility, date, startTime, endTime } = booking;
  // Fetch the facility to get the pricePerHour
  const facilityData = await Facility.findById(facility);
  if (!facilityData) {
    throw new Error('Facility not found!!!');
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
    throw new Error('Facility is unavailable during the requested time slot');
  }
  // Calculate payableAmount
  const start = new Date(`${date}T${startTime}`);
  const end = new Date(`${date}T${endTime}`);
  const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
  const payableAmount = hours * facilityData?.pricePerHour;

  // Create booking
  const result = await Booking.create({
    ...booking,
    payableAmount,
  });
  return result;
};

export const BookingServices = {
  createBookingInDB,
};
