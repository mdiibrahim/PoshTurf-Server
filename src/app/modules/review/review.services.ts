import { JwtPayload } from 'jsonwebtoken';
import { IReview } from './review.interface';
import { Review } from './review.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { Facility } from '../facility/facility.model';

const createReviewInDB = async (review: IReview, payload: JwtPayload) => {
  const { facility } = review;
  const user = await User.isUserExists(payload.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }

  const facilityData = await Facility.findById(facility);
  if (!facilityData) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }

  // Create review
  const result = await Review.create({
    ...review,
    user: user._id,
  });
  return result;
};

const getAFacilityReviewsFromDB = async (facility: string) => {
  const result = await Review.find({ facility })
    .populate('user')
    .populate('facility');
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }

  return result;
};
const getAllFacilitiesReviewsFromDB = async () => {
  const result = await Review.find({}).populate('user').populate('facility');
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }

  return result;
};

export const ReviewServices = {
  createReviewInDB,
  getAFacilityReviewsFromDB,
  getAllFacilitiesReviewsFromDB,
};
