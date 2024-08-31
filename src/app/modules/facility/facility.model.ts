import { model, Schema } from 'mongoose';
import { FacilityModel, IFacility } from './facility.interface';

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
    image: {
      type: String,
      required: [true, 'Image Link is required.'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  },
);

facilitySchema.pre('find', function (next) {
  this.find({
    isDeleted: false,
  });
  next();
});

facilitySchema.statics.isFacilityExists = async function (name: string) {
  return await Facility.findOne({ name });
};

export const Facility = model<IFacility, FacilityModel>(
  'Facility',
  facilitySchema,
);
