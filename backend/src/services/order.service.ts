import { Types } from 'mongoose';
import { IOrderProduct, IShippingDetails } from '../interfaces/entities/order.interface';
import { ProductModel } from '../models/Product';
import { OrderModel } from '../models/Order';
import {
  ForbiddenError,
  NotFoundError,
  ValidationError,
  ConflictError,
} from '../utils/errors.utils';
import { IProductDocument } from '../interfaces/entities/product.interface';

export class OrderService {
  public async createOrder(
    userId: string | Types.ObjectId,
    productsData: IOrderProduct[],
    shippingDetails: IShippingDetails,
  ) {
    if (!productsData || productsData.length === 0) {
      throw new ValidationError('No products provided');
    }

    const productIds = productsData.map((p) => p.product);

    const foundProducts = await ProductModel.find({ _id: { $in: productIds } });

    if (foundProducts.length !== productIds.length) {
      throw new NotFoundError('One or more products not found');
    }

    let totalPrice = 0;

    for (const orderProduct of productsData) {
      const productDetails = foundProducts.find(
        (p) => p._id.toString() === orderProduct.product.toString(),
      ) as IProductDocument;

      if (productDetails.stock < orderProduct.quantity) {
        throw new ConflictError(`Not enough stock for: ${productDetails.title}`);
      }
      totalPrice += productDetails.price * orderProduct.quantity;

      productDetails.stock -= orderProduct.quantity;
      await productDetails.save();
    }

    return OrderModel.create({
      user: userId,
      products: productsData,
      totalPrice,
      shippingDetails,
    });
  }
  public async findUserOrders(userId: string | Types.ObjectId) {
    return OrderModel.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate('user', 'name email')
      .populate('products.product', 'title price');
  }

  public async findAllOrders() {
    return OrderModel.find()
      .sort({ createdAt: -1 })
      .populate('user', 'name email')
      .populate('products.product', 'title price');
  }

  public async findOrderById(orderId: string, userId: string, userRole: string) {
    const order = await OrderModel.findById(orderId)
      .populate('user', 'name email')
      .populate('products.product', 'title price');

    if (!order) {
      throw new NotFoundError('Order not found');
    }

    if (userRole !== 'admin' && order.user._id.toString() !== userId.toString()) {
      throw new ForbiddenError('Not authorized to view this order');
    }
    return order;
  }

  public async deleteOrder(orderId: string, userId: string, userRole: string) {
    const order = await OrderModel.findById(orderId);

    if (!order) {
      throw new NotFoundError('Order not found');
    }

    if (userRole !== 'admin' && order.user.toString() !== userId.toString()) {
      throw new ForbiddenError('Not authorized to delete this order');
    }

    for (const orderProduct of order.products) {
      const product = await ProductModel.findById(orderProduct.product);
      if (product) {
        product.stock += orderProduct.quantity;
        await product.save();
      }
    }
    await OrderModel.findByIdAndDelete(orderId);
  }
}
