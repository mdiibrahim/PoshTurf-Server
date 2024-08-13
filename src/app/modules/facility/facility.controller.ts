import { Request, Response } from 'express';
import { FacilityServices } from './facility.services';
import { FacilityValidation } from './facility.validation';
import sendResponse from '../../utilis/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utilis/catchAsync';

const createFacility = catchAsync(async (req: Request, res: Response) => {
  const facility = req.body;
  const zodParseFacilityData =
    FacilityValidation.facilityValidationSchema.parse(facility);
  const result =
    await FacilityServices.createFacilityInDB(zodParseFacilityData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Facility added successfully',
    data: result,
  });
});
const getAllFacilities = catchAsync(async (req: Request, res: Response) => {
  const result = await FacilityServices.getAllFacilitiesFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Facilities retrieved successfully',
    data: result,
  });
});
const updateFacility = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const facilityData = req.body;
  const zodParseUpdatedFacilityData =
    FacilityValidation.updateFacilityValidationSchema.parse(facilityData);
  const result = await FacilityServices.updateFacilityInDB(
    id,
    zodParseUpdatedFacilityData,
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Facility updated successfully',
    data: result,
  });
});

const softDeleteFacility = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await FacilityServices.softDeleteFacilityFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Facility deleted successfully',
    data: result,
  });
});

export const FacilityController = {
  createFacility,
  getAllFacilities,
  updateFacility,
  softDeleteFacility,
};
