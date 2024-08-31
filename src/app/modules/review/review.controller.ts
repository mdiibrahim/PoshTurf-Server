import { Request, Response } from 'express';
import { ReviewServices } from './review.services';
import catchAsync from '../../utilis/catchAsync';
import sendResponse from '../../utilis/sendResponse';
import httpStatus from 'http-status';

const createReview = catchAsync(async (req: Request, res: Response) => {
  const reviewData = req.body;
  const user = req.user;
  const result = await ReviewServices.createReviewInDB(reviewData, user);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Review created successfully',
    data: result,
  });
});

const getAFacilityReviews = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ReviewServices.getAFacilityReviewsFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Reviews retrieved successfully',
    data: result,
  });
});
const getAllFacilitiesReviews = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ReviewServices.getAllFacilitiesReviewsFromDB();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Reviews retrieved successfully',
      data: result,
    });
  },
);

export const ReviewControllers = {
  getAFacilityReviews,
  createReview,
  getAllFacilitiesReviews,
};
