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

export const FacilityServices = {
  createFacilityInDB,
};
