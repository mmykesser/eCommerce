import { RequestHandler } from 'express';
import { CategoryService } from '../services/category.service';
import { ICategory } from '../interfaces/models/category.interface';
import { UnauthorizedError } from '../utils/errors.utils';

export class CategoryController {
  private categoryService = new CategoryService();

  public getAllCategories: RequestHandler = async (_req, res, next) => {
    try {
      const categories = await this.categoryService.findAllCategories();
      res.status(200).json({
        success: true,
        data: categories,
      });
    } catch (err) {
      next(err);
    }
  };

  public createCategory: RequestHandler = async (req, res, next) => {
    try {
      if (!req.user) {
        return next(new UnauthorizedError('Unauthorized'));
      }

      const newCategory = await this.categoryService.createCategory(
        req.body as Omit<ICategory, 'createdBy'>,
        req.user._id,
      );
      res.status(201).json({
        success: true,
        data: newCategory,
      });
    } catch (err) {
      next(err);
    }
  };
}
