import { RequestHandler } from 'express';
import { OrderService } from '../services/order.service';
import { IOrderData } from '../interfaces/dto/order.interface';
import { UnauthorizedError } from '../utils/errors.utils';

export class OrderController {
  private orderService = new OrderService();

  public createOrder: RequestHandler = async (req, res, next) => {
    try {
      if (!req.user) {
        return next(new UnauthorizedError('Authorization is required to create an order'));
      }

      const orderData: IOrderData = req.body;
      const newOrder = await this.orderService.createOrder(
        req.user._id,
        orderData.products,
        orderData.shippingDetails,
      );

      res.status(201).json({
        success: true,
        data: newOrder,
      });
    } catch (err) {
      next(err);
    }
  };
}
