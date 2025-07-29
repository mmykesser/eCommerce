import { IUserDocument } from '../models/user.interface';

declare global {
  namespace Express {
    interface Request {
      user?: IUserDocument;
    }
  }
}
