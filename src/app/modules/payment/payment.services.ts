import { join } from 'path';
import { verifyPayment } from './payment.utils';
import { readFileSync } from 'fs';
import { Booking } from '../booking/booking.model';

const confirmationService = async (transactionId: string) => {
  const verifyResponse = await verifyPayment(transactionId);
  let result;
  let message = '';

  if (verifyResponse && verifyResponse.pay_status === 'Successful') {
    result = await Booking.findOneAndUpdate(
      { transactionId },
      {
        paymentStatus: 'Paid',
      },
    );
    message = 'Successfully Paid!';
  } else {
    message = 'Payment Failed!';
  }

  const filePath = join(__dirname, '../../utilis/confirmation.html');
  let template = readFileSync(filePath, 'utf-8');

  template = template.replace('{{message}}', message);

  return template;
};

export const paymentServices = {
  confirmationService,
};
