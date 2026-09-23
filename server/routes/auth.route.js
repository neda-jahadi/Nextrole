import express from 'express';
import {
  loginUser,
  registerUser,
  logoutUser,
  getMe,
  startGoogleOAuth,
  googleOAuthCallback,
} from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { loginSchema, registerSchema } from '../validators/authValidators.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import {
  authLimiter,
  registrationLimiter,
} from '../middlewares/rateLimitMiddleware.js';

const router = express.Router();

router.post(
  '/register',
  registrationLimiter,
  validateRequest(registerSchema),
  registerUser,
);
router.post('/login', authLimiter, validateRequest(loginSchema), loginUser);
router.post('/logout', logoutUser);
router.get('/me', authMiddleware, getMe);
router.get('/google', startGoogleOAuth);
router.get('/google/callback', googleOAuthCallback);

export default router;
