import { UserModel } from '../models/User';
import { IUser } from '../interfaces/models/user.interface';
import { IRegistrationData } from '../interfaces/dto/auth.interface';
import { ConflictError } from '../utils/errors.utils';

export const registerUser = async (data: IRegistrationData): Promise<IUser> => {
  const { email } = data;
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new ConflictError('Email already exists');
  }

  const user = new UserModel({ ...data, role: 'user' });
  await user.save();
  return user;
};
