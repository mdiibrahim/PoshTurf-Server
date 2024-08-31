import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { IFacility } from './facility.interface';
import { Facility } from './facility.model';

const createFacilityInDB = async (facility: IFacility) => {
  const existingFacility = await Facility.isFacilityExists(facility.name);
  if (existingFacility) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Facility with same name already exists!!!',
    );
  }
  const result = await Facility.create(facility);
  return result;
};

const getAllFacilitiesFromDB = async () => {
  const result = await Facility.find({});
  if (!result.length) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }

  return result;
};
const getAllFeaturedFacilitiesFromDB = async () => {
  const result = await Facility.find({ isFeatured: 'true' });
  if (!result.length) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }

  return result;
};
const getAFacilityFromDB = async (id: string) => {
  const result = await Facility.findById({ _id: id });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }

  return result;
};

const updateFacilityInDB = async (
  id: string,
  facilityData: Partial<IFacility>,
) => {
  if (facilityData.isDeleted) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Facility Cannot delete in this route!!!',
    );
  }
  const result = await Facility.findByIdAndUpdate(id, facilityData, {
    new: true,
  });

  return result;
};

const softDeleteFacilityFromDB = async (id: string) => {
  const result = await Facility.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    },
  ).select({
    createdAt: 0,
    updatedAt: 0,
  });
  return result;
};

export const FacilityServices = {
  createFacilityInDB,
  getAllFacilitiesFromDB,
  updateFacilityInDB,
  softDeleteFacilityFromDB,
  getAFacilityFromDB,
  getAllFeaturedFacilitiesFromDB,
};
