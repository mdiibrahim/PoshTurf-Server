import { IFacility } from './facility.interface';
import { Facility } from './facility.model';

const createFacilityInDB = async (facility: IFacility) => {
  const result = await Facility.create(facility);

  const facilityWithoutSensitiveFields = {
    ...result.toObject(),
    createdAt: undefined,
    updatedAt: undefined,
  };
  return facilityWithoutSensitiveFields;
};

const getAllFacilitiesFromDB = async () => {
  const result = await Facility.find(
    {},
    {
      createdAt: 0,
      updatedAt: 0,
    },
  );
  if (!result) {
    throw new Error('Facility not found!!!');
  }

  return result;
};

const updateFacilityInDB = async (
  id: string,
  facilityData: Partial<IFacility>,
) => {
  const { isDeleted, ...filteredData } = facilityData;
  if (!isDeleted) {
    throw new Error('Facility Cannot delete in this route!!!');
  }
  const result = await Facility.findByIdAndUpdate(id, filteredData, {
    new: true,
  }).select({
    createdAt: 0,
    updatedAt: 0,
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
};
