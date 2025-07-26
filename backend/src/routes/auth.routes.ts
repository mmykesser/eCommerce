import { Router } from 'express';
import { validateRegistration, validateLogin } from '../middleware/validation/auth.validation';
import { register } from '../controllers/auth/register.controller';
import { login } from '../controllers/auth/login.controller';

const router = Router();

router.post('/register', validateRegistration, register);

router.post('/login', validateLogin, login);

export default router;
