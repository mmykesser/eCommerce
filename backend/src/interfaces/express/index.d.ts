import { PublicUser } from '../services/auth.service.interface';

declare global {
  namespace Express {
    interface Request {
      user?: PublicUser;
    }
  }
}
