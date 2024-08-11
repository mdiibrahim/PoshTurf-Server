import { Request, Response } from 'express';
import { FacilityServices } from './facility.services';

const createFacility = async (req: Request, res: Response) => {
  const facility = req.body;
  const result = await FacilityServices.createFacilityInDB(facility);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Facility added successfully',
    data: result,
  });
};

export const FacilityController = {
  createFacility,
};
