import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';
import { protect } from '../middleware/auth.middleware';
import { validateCreateCategory } from '../middleware/validation/category.validation';

const router = Router();

const categoryController = new CategoryController();

router.get('/', categoryController.getAllCategories);
router.post('/', protect, validateCreateCategory, categoryController.createCategory);

export default router;
