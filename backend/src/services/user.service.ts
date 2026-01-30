import { UserModel } from '../models/User';
import { IUserDocument } from '../interfaces/entities/user.interface';
import { NotFoundError } from '../utils/errors.utils';
import { IUpdateUserData } from '../interfaces/dto/user.interface';

export class UserService {
  public async findAllUsers(): Promise<IUserDocument[]> {
    return UserModel.find().select('-password -refreshToken');
  }

  public async findUserById(userId: string): Promise<IUserDocument> {
    const user = await UserModel.findById(userId).select('-password -refreshToken');
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  }

  public async updateUser(userId: string, userData: IUpdateUserData) {
    const updatedUser = await UserModel.findByIdAndUpdate(userId, userData, {
      new: true,
      runValidators: true,
    }).select('-password -refreshToken');

    if (!updatedUser) {
      throw new NotFoundError('User not found');
    }
    return updatedUser;
  }

  public async deleteUser(userId: string): Promise<void> {
    const user = await UserModel.findByIdAndDelete(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }
  }
}
