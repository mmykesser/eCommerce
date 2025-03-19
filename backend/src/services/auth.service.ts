import { UserModel } from '../models/User';
import { IUser } from '../types/user.types';
import { ConflictError } from '../utils/errors.utils';

export const registerUser = async (
  email: string,
  password: string,
  name: string,
): Promise<IUser> => {
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new ConflictError('Email already exists');
  }

  const user = new UserModel({ email, password, name, role: 'user' });
  await user.save();
  return user;
};
