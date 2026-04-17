import { Router } from 'express';
import { validateRegistration, validateLogin } from '../middleware/validation/auth.validation';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { protect } from '../middleware/auth.middleware';

const router = Router();

const authService = new AuthService();
const authController = new AuthController(authService);

router.post('/register', validateRegistration, authController.register);
router.post('/login', validateLogin, authController.login);
router.post('/refresh', authController.refresh);
router.get('/profile', protect, authController.getProfile);

export default router;
