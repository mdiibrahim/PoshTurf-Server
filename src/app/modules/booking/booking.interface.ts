import { Types } from 'mongoose';

export type IIsBooking = 'confirmed' | 'pending' | 'cancelled';

export interface ITimeSlot {
  startTime: string;
  endTime: string;
}

export interface IBooking {
  facility: Types.ObjectId;
  date: string;
  timeSlots: ITimeSlot[];
  payableAmount?: number;
  isBooked?: IIsBooking;
  user: Types.ObjectId;
}
