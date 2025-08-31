import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { protect } from '../middleware/auth.middleware';
import { validateCreateProduct } from '../middleware/validation/product.validation';

const router = Router();

const productController = new ProductController();

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', protect, validateCreateProduct, productController.createProduct);

export default router;
