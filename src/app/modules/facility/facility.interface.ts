import { Model } from 'mongoose';
/* eslint-disable no-unused-vars */
export interface IFacility {
  name: string;
  description: string;
  pricePerHour: number;
  location: string;
  image: string;
  isDeleted?: boolean;
  isFeatured?: boolean;
}
export interface FacilityModel extends Model<IFacility> {
  isFacilityExists(name: string): Promise<IFacility> | null;
}
