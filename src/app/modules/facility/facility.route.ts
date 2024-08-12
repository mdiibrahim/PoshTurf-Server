import { Router } from 'express';
import { FacilityController } from './facility.controller';

const router = Router();

router.post('/', FacilityController.createFacility);
router.put('/:id', FacilityController.updateFacility);
router.delete('/:id', FacilityController.softDeleteFacility);
router.get('/', FacilityController.getAllFacilities);

export const FacilityRoutes = router;
