import { Router } from 'express';
import { CartController } from '../controllers/cart.controller';
import { protect } from '../middleware/auth.middleware';
import { validateAddToCart, validateUpdateCart } from '../middleware/validation/cart.validation';

const router = Router();
const cartController = new CartController();

router
  .route('/')
  .get(protect, cartController.getCart)
  .post(protect, validateAddToCart, cartController.addToCart)
  .delete(protect, cartController.clearCart);

router
  .route('/:productId')
  .delete(protect, cartController.removeFromCart)
  .patch(protect, validateUpdateCart, cartController.updateCart);

export default router;
