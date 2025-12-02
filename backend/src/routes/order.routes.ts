import { Router } from 'express';
import { OrderController } from '../controllers/order.controller';
import { protect } from '../middleware/auth.middleware';
import { validateCreateOrder } from '../middleware/validation/order.validation';

const router = Router();
const orderController = new OrderController();

router
  .route('/')
  .post(protect, validateCreateOrder, orderController.createOrder)
  .get(protect, orderController.getOrders);

export default router;
