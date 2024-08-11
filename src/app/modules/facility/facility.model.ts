import { model, Schema } from 'mongoose';
import { IFacility } from './facility.interface';

const facilitySchema = new Schema<IFacility>(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required.'],
      trim: true,
    },
    pricePerHour: {
      type: Number,
      required: [true, 'Price per hour is required.'],
      min: [0, 'Price per hour must be Greater than 0.'],
    },
    location: {
      type: String,
      required: [true, 'Location is required.'],
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Facility = model<IFacility>('Facility', facilitySchema);
