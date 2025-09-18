import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { protect, authorize } from '../middleware/auth.middleware';
import {
  validateCreateProduct,
  validateUpdateProduct,
} from '../middleware/validation/product.validation';
const router = Router();

const productController = new ProductController();

router
  .route('/')
  .get(productController.getAllProducts)
  .post(protect, authorize('admin'), validateCreateProduct, productController.createProduct);

router
  .route('/:id')
  .get(productController.getProductById)
  .put(protect, authorize('admin'), validateUpdateProduct, productController.updateProduct)
  .delete(protect, authorize('admin'), productController.deleteProduct);

export default router;
