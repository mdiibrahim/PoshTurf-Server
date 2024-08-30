import { z } from 'zod';

const facilityValidationSchema = z.object({
  name: z.string().trim().min(3, 'Name is required.'),
  description: z.string().trim().min(3, 'Description is required.'),
  pricePerHour: z
    .number()
    .min(0, 'Price per hour must be greater than 0.')
    .nonnegative('Price per hour must be a positive number.'),
  location: z.string().trim().min(3, 'Location is required.'),
  image: z.string().trim().min(3, 'Image Link is required.'),
  isDeleted: z.boolean().optional().default(false),
});

const updateFacilityValidationSchema = facilityValidationSchema
  .omit({
    isDeleted: true,
  })
  .partial();

export const FacilityValidation = {
  facilityValidationSchema,
  updateFacilityValidationSchema,
};
