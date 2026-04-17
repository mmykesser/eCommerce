import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { ProductService } from '../services/product.service';
import { protect, authorize } from '../middleware/auth.middleware';
import {
  validateCreateProduct,
  validateUpdateProduct,
} from '../middleware/validation/product.validation';
const router = Router();

const productService = new ProductService();
const productController = new ProductController(productService);

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
