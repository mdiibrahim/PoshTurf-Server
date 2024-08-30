import { Router } from 'express';
import { FacilityController } from './facility.controller';
import validateRequest from '../../middlewares/validateRequest';
import { FacilityValidation } from './facility.validation';
import auth from '../../middlewares/authHandler';

const router = Router();

router.post(
  '/',
  auth('admin'),
  validateRequest(FacilityValidation.facilityValidationSchema),
  FacilityController.createFacility,
);
router.put(
  '/:id',
  auth('admin'),
  validateRequest(FacilityValidation.updateFacilityValidationSchema),
  FacilityController.updateFacility,
);
router.delete('/:id', auth('admin'), FacilityController.softDeleteFacility);
router.get('/', FacilityController.getAllFacilities);
router.get('/:id', FacilityController.getAFacility);

export const FacilityRoutes = router;
