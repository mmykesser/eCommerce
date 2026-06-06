export interface IUser {
  _id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

export interface ICategory {
  _id: string;
  name: string;
  image: string;
  createdBy: string | IUser;
  createdAt: string;
  updatedAt: string;
}

export interface IProduct {
  _id: string;
  title: string;
  price: number;
  description: string;
  stock: number;
  category: string | ICategory;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ICartItem {
  product: IProduct;
  quantity: number;
}

export interface ICart {
  _id: string;
  user: string;
  items: ICartItem[];
  totalPrice: number;
}

export interface IOrderProduct {
  product: IProduct;
  quantity: number;
}

export interface IShippingDetails {
  type: 'inpost_paczkomat';
  address: string;
}

export interface IOrder {
  _id: string;
  user: string | IUser;
  products: IOrderProduct[];
  totalPrice: number;
  shippingDetails: IShippingDetails;
  createdAt: string;
  updatedAt: string;
}

export interface IApiResponse<T> {
  success: boolean;
  data: T;
}

export interface IApiError {
  success: false;
  message: string;
}

export interface IAuthResponse {
  user: IUser;
  accessToken: string;
}
