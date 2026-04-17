import { Router } from 'express';
import { OrderController } from '../controllers/order.controller';
import { OrderService } from '../services/order.service';
import { protect } from '../middleware/auth.middleware';
import { validateCreateOrder } from '../middleware/validation/order.validation';

const router = Router();

const orderService = new OrderService();
const orderController = new OrderController(orderService);

router
  .route('/')
  .post(protect, validateCreateOrder, orderController.createOrder)
  .get(protect, orderController.getOrders);

router
  .route('/:id')
  .get(protect, orderController.getOrderById)
  .delete(protect, orderController.deleteOrder);

export default router;
