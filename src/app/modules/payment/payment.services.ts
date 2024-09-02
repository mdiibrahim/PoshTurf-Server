/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Booking } from '../booking/booking.model';
import { initiatePayment, verifyPayment } from './payment.utils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const initiatePaymentToDB = async (paymentData: any) => {
  try {
    const result = await initiatePayment(paymentData);
    if (result.result) {
      await Booking.findByIdAndUpdate(
        paymentData.bookingId,
        {
          transactionId: paymentData.transactionId,
        },
        {
          new: true,
        },
      );
    }
    return result.payment_url;
  } catch (error) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Payment initiation failed.',
    );
  }
};

const confirmationService = async (transactionId: string) => {
  const verifyResponse = await verifyPayment(transactionId);
  let message = '';

  if (verifyResponse.pay_status === 'Successful') {
    await Booking.findOneAndUpdate(
      { transactionId },
      {
        paymentStatus: 'paid',
        isBooked: 'confirmed',
      },
    );
    message = 'Successfully Paid!';
  } else {
    message = 'Payment Failed!';
  }

  return message;
};

const failedService = async (transactionId: string) => {
  const updatedBooking = await Booking.findOneAndUpdate(
    { transactionId },
    {
      isBooked: 'pending',
    },
    { new: true },
  );

  if (!updatedBooking) {
    throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');
  }

  return updatedBooking;
};

export const PaymentServices = {
  initiatePaymentToDB,
  confirmationService,
  failedService,
};
