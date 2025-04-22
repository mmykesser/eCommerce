import { Router } from 'express';
import { validateRegistration } from '../middleware/validation/auth.validation';
import { register } from '../controllers/auth/register.controller';

const router = Router();

router.post('/register', validateRegistration, register);

export default router;
