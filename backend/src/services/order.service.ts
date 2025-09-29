import { Types } from 'mongoose';
import { IOrderProduct, IShippingDetails } from '../interfaces/entities/order.interface';
import { ProductModel } from '../models/Product';
import { OrderModel } from '../models/Order';
import { NotFoundError, ValidationError } from '../utils/errors.utils';
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
      totalPrice += productDetails.price * orderProduct.quantity;
    }

    return await OrderModel.create({
      user: userId,
      products: productsData,
      totalPrice,
      shippingDetails,
    });
  }
}
