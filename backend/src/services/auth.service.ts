import { UserModel } from '../models/User';
import { IUser } from '../types/user.types';
import { RegistrationData } from '../types/auth.types';
import { ConflictError } from '../utils/errors.utils';

export const registerUser = async (data: RegistrationData): Promise<IUser> => {
  const { email } = data;
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new ConflictError('Email already exists');
  }

  const user = new UserModel({ ...data, role: 'user' });
  await user.save();
  return user;
};
