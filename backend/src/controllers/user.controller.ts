import { RequestHandler } from 'express';
import { UserService } from '../services/user.service';
import { IUpdateUserData } from '../interfaces/dto/user.interface';

export class UserController {
  private userService = new UserService();

  public getAllUsers: RequestHandler = async (_req, res, next) => {
    try {
      const users = await this.userService.findAllUsers();

      res.status(200).json({
        success: true,
        data: users,
      });
    } catch (err) {
      next(err);
    }
  };

  public getUserById: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await this.userService.findUserById(id);

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (err) {
      next(err);
    }
  };

  public updateUser: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const userData: IUpdateUserData = req.body;
      const updatedUser = await this.userService.updateUser(id, userData);

      res.status(200).json({
        success: true,
        data: updatedUser,
      });
    } catch (err) {
      next(err);
    }
  };

  public deleteUser: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.userService.deleteUser(id);

      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };
}
