import { z } from 'zod';

export const userValidationSchema = z.object({
  name: z.string().trim().min(1, 'Name is required.'),
  email: z.string().email('Invalid email address.').min(1, 'Email is required.'),
  password: z.string().min(6, 'Password must be at least 6 characters long.'),
  phone: z
  .string()
  .length(11, 'Phone number must be exactly 11 digits.')
  .regex(/^\d{11}$/, 'Phone number must contain only digits.'),
  role: z.enum(['admin', 'user'], {
    errorMap: () => ({ message: 'Role must be either "admin" or "user".' }),
  }),
  address: z.string().min(1, 'Address is required.'),
});

export const UserValidation = {
  userValidationSchema,
};
