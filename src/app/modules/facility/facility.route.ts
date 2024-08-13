import { Router } from 'express';
import { FacilityController } from './facility.controller';
import validateRequest from '../../middlewares/validateRequest';
import { FacilityValidation } from './facility.validation';

const router = Router();

router.post(
  '/',
  validateRequest(FacilityValidation.facilityValidationSchema),
  FacilityController.createFacility,
);
router.put(
  '/:id',
  validateRequest(FacilityValidation.updateFacilityValidationSchema),
  FacilityController.updateFacility,
);
router.delete('/:id', FacilityController.softDeleteFacility);
router.get('/', FacilityController.getAllFacilities);

export const FacilityRoutes = router;
