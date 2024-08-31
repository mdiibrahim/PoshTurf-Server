import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(process.cwd(), '.env'),
});

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  node_env: process.env.NODE_ENV,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  aamar_pay_url: process.env.AAMARPAY_PAYMENT_URL,
  aamar_pay_store_id: process.env.AAMARPAY_STORE_ID,
  aamar_pay_signature_id: process.env.AAMARPAY_SIGNATURE_KEY,
  base_url: process.env.BASE_URL,
  aamar_pay_verify_url: process.env.PAYMENT_VERIFY_URL,
};
