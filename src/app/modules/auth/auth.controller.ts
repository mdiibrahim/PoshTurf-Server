import httpStatus from 'http-status';
import catchAsync from '../../utilis/catchAsync';
import { AuthServices } from './auth.services';
import sendResponse from '../../utilis/sendResponse';
import config from '../../config';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { refreshToken, accessToken, userWithoutSensitiveFields } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
    token: accessToken,
    data: userWithoutSensitiveFields,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Access token retrieved succesfully',
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
  refreshToken,
};
