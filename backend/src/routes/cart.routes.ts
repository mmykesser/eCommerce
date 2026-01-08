import { Router } from 'express';
import { CartController } from '../controllers/cart.controller';
import { protect } from '../middleware/auth.middleware';
import { validateAddToCart } from '../middleware/validation/cart.validation';

const router = Router();
const cartController = new CartController();

router
  .route('/')
  .get(protect, cartController.getCart)
  .post(protect, validateAddToCart, cartController.addToCart);

router.route('/:productId').delete(protect, cartController.removeFromCart);

export default router;
