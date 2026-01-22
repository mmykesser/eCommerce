import { Types } from 'mongoose';
import { CartModel } from '../models/Cart';
import { ProductModel } from '../models/Product';
import { NotFoundError, ConflictError } from '../utils/errors.utils';
import { ICartDocument } from '../interfaces/entities/cart.interface';

export class CartService {
  public async getCart(userId: string | Types.ObjectId) {
    let cart = await CartModel.findOne({ user: userId }).populate(
      'items.product',
      'title price images',
    );
    if (!cart) {
      cart = await CartModel.create({ user: userId, items: [], totalPrice: 0 });
    }
    return cart;
  }

  public async addToCart(userId: string | Types.ObjectId, productId: string, quantity: number) {
    const product = await ProductModel.findById(productId);
    if (!product) {
      throw new NotFoundError('Product not found');
    }

    if (product.stock < quantity) {
      throw new ConflictError(`Not enough stock. Available: ${product.stock}`);
    }

    let cart = await CartModel.findOne({ user: userId });
    if (!cart) {
      cart = await CartModel.create({ user: userId, items: [], totalPrice: 0 });
    }

    const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);

    if (itemIndex > -1) {
      const newTotalQuantity = cart.items[itemIndex].quantity + quantity;

      if (product.stock < newTotalQuantity) {
        throw new ConflictError(
          `Not enough stock. Available: ${product.stock}, in cart: ${cart.items[itemIndex].quantity}`,
        );
      }
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: product._id, quantity });
    }

    await this._recalculateCart(cart);

    return cart;
  }

  public async updateCart(userId: string | Types.ObjectId, productId: string, quantity: number) {
    const cart = await CartModel.findOne({ user: userId });
    if (!cart) {
      throw new NotFoundError('Cart not found');
    }

    const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);
    if (itemIndex === -1) {
      throw new NotFoundError('Product not found in cart');
    }

    if (quantity === 0) {
      cart.items.splice(itemIndex, 1);
      await this._recalculateCart(cart);
      return cart;
    }

    const product = await ProductModel.findById(productId);
    if (!product) {
      throw new NotFoundError('Product not found');
    }
    if (product.stock < quantity) {
      throw new ConflictError(`Not enough stock. Available: ${product.stock}`);
    }

    cart.items[itemIndex].quantity = quantity;

    await this._recalculateCart(cart);
    return cart;
  }

  public async removeFromCart(userId: string | Types.ObjectId, productId: string) {
    const cart = await CartModel.findOne({ user: userId });
    if (!cart) {
      throw new NotFoundError('Cart not found');
    }

    cart.items = cart.items.filter((item) => item.product.toString() !== productId);

    await this._recalculateCart(cart);
    return cart;
  }

  private async _recalculateCart(cart: ICartDocument) {
    let total = 0;
    const validItems = [];

    for (const item of cart.items) {
      const product = await ProductModel.findById(item.product);
      if (product) {
        total += product.price * item.quantity;
        validItems.push(item);
      }
    }
    cart.items = validItems;
    cart.totalPrice = total;
    await cart.save();

    return cart.populate('items.product', 'title price images');
  }
}
