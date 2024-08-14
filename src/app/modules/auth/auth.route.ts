import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthControllers } from './auth.controller';
import { AuthValidation } from './auth.validation';
import { UserValidation } from '../user/user.validation';
import { UserController } from '../user/user.controller';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidation.SignUpUserValidationSchema),
  UserController.signUpUser,
);
router.post(
  '/login',
  validateRequest(AuthValidation.logInUserValidationSchema),
  AuthControllers.loginUser,
);

router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);

export const AuthRoutes = router;
