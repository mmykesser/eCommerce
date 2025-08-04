import { Router } from 'express';
import { validateRegistration, validateLogin } from '../middleware/validation/auth.validation';
import { AuthController } from '../controllers/auth.controller';

const router = Router();

const authController = new AuthController();

router.post('/register', validateRegistration, authController.register);
router.post('/login', validateLogin, authController.login);

export default router;
