import { Request, Response } from 'express';
import { FacilityServices } from './facility.services';
import { FacilityValidation } from './facility.validation';

const createFacility = async (req: Request, res: Response) => {
  try {
    const facility = req.body;
    const zodParseFacilityData =
      FacilityValidation.facilityValidationSchema.parse(facility);
    const result =
      await FacilityServices.createFacilityInDB(zodParseFacilityData);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Facility added successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error!!!',
      err,
    });
  }
};
const getAllFacilities = async (req: Request, res: Response) => {
  try {
    const result = await FacilityServices.getAllFacilitiesFromDB();
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Facilities retrieved successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error!!!',
      err,
    });
  }
};
const updateFacility = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const facilityData = req.body;
    const zodParseUpdatedFacilityData =
      FacilityValidation.updateFacilityValidationSchema.parse(facilityData);
    const result = await FacilityServices.updateFacilityInDB(
      id,
      zodParseUpdatedFacilityData,
    );
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Facility updated successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error!!!',
      err,
    });
  }
};

const softDeleteFacility = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await FacilityServices.softDeleteFacilityFromDB(id);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Facility updated successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error!!!',
      err,
    });
  }
};

export const FacilityController = {
  createFacility,
  getAllFacilities,
  updateFacility,
  softDeleteFacility,
};
