import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';
import { protect, authorize } from '../middleware/auth.middleware';
import {
  validateCreateCategory,
  validateUpdateCategory,
} from '../middleware/validation/category.validation';

const router = Router();

const categoryController = new CategoryController();

router
  .route('/')
  .get(categoryController.getAllCategories)
  .post(protect, authorize('admin'), validateCreateCategory, categoryController.createCategory);

router
  .route('/:id')
  .put(protect, authorize('admin'), validateUpdateCategory, categoryController.updateCategory)
  .delete(protect, authorize('admin'), categoryController.deleteCategory);

export default router;
