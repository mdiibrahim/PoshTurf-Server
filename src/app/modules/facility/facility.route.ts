import { Router } from 'express';
import { FacilityController } from './facility.controller';

const router = Router();

router.post('/', FacilityController.createFacility);

export const FacilityRoutes = router;
