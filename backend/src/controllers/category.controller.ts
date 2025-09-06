import { RequestHandler } from 'express';
import { CategoryService } from '../services/category.service';
import { ICategory } from '../interfaces/models/category.interface';

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
      const newCategory = await this.categoryService.createCategory(
        req.body as Omit<ICategory, 'createdBy'>,
        req.user.id,
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
