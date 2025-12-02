import { IOrderProduct, IShippingDetails } from '../entities/order.interface';

export interface ICreateOrderData {
  products: IOrderProduct[];
  shippingDetails: IShippingDetails;
}
