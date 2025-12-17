import { RequestHandler } from 'express';
import { OrderService } from '../services/order.service';
import { ICreateOrderData } from '../interfaces/dto/order.interface';
import { UnauthorizedError } from '../utils/errors.utils';

export class OrderController {
  private orderService = new OrderService();

  public createOrder: RequestHandler = async (req, res, next) => {
    try {
      if (!req.user) {
        return next(new UnauthorizedError('Authorization is required to create an order'));
      }

      const orderData: ICreateOrderData = req.body;
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

  public getOrders: RequestHandler = async (req, res, next) => {
    try {
      if (!req.user) {
        return next(new UnauthorizedError('Authorization is required to get orders'));
      }
      let orders;

      if (req.user.role === 'admin') {
        orders = await this.orderService.findAllOrders();
      } else {
        orders = await this.orderService.findUserOrders(req.user._id);
      }

      res.status(200).json({
        success: true,
        data: orders,
      });
    } catch (err) {
      next(err);
    }
  };

  public getOrderById: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!req.user) {
        return next(new UnauthorizedError('Authorization is required to get order'));
      }

      const order = await this.orderService.findOrderById(id, req.user._id, req.user.role);

      res.status(200).json({
        success: true,
        data: order,
      });
    } catch (err) {
      next(err);
    }
  };

  public deleteOrder: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!req.user) {
        return next(new UnauthorizedError('Authorization is required to delete order'));
      }
      await this.orderService.deleteOrder(id, req.user._id, req.user.role);

      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };
}
