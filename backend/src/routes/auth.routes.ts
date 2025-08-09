import { Router } from 'express';
import { validateRegistration, validateLogin } from '../middleware/validation/auth.validation';
import { AuthController } from '../controllers/auth.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

const authController = new AuthController();

router.post('/register', validateRegistration, authController.register);
router.post('/login', validateLogin, authController.login);
router.post('/refresh', authController.refresh);
router.get('/profile', protect, authController.getProfile);

export default router;
