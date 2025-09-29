import { IOrderProduct, IShippingDetails } from '../entities/order.interface';

export interface IOrderData {
  products: IOrderProduct[];
  shippingDetails: IShippingDetails;
}
