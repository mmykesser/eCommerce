import { RequestHandler } from 'express';
import { CartService } from '../services/cart.service';
import { UnauthorizedError } from '../utils/errors.utils';
import { IAddToCartData } from '../interfaces/dto/cart.interface';

export class CartController {
  private cartService = new CartService();

  public getCart: RequestHandler = async (req, res, next) => {
    try {
      if (!req.user) {
        return next(new UnauthorizedError('Authentication is required to get cart'));
      }
      const cart = await this.cartService.getCart(req.user._id);

      res.status(200).json({
        success: true,
        data: cart,
      });
    } catch (err) {
      next(err);
    }
  };

  public addToCart: RequestHandler = async (req, res, next) => {
    try {
      if (!req.user) {
        return next(new UnauthorizedError('Authentication is required to add to cart'));
      }

      const cartData: IAddToCartData = req.body;
      const { productId, quantity } = cartData;
      const cart = await this.cartService.addToCart(req.user._id, productId, quantity);

      res.status(200).json({
        success: true,
        data: cart,
      });
    } catch (err) {
      next(err);
    }
  };

  public updateCart: RequestHandler = async (req, res, next) => {
    try {
      if (!req.user) {
        return next(new UnauthorizedError('Authentication is required to update cart'));
      }

      const { quantity } = req.body;
      const { productId } = req.params;

      const cart = await this.cartService.updateCart(req.user._id, productId, quantity);

      res.status(200).json({
        success: true,
        data: cart,
      });
    } catch (err) {
      next(err);
    }
  };

  public removeFromCart: RequestHandler = async (req, res, next) => {
    try {
      if (!req.user) {
        return next(new UnauthorizedError('Authentication is required to remove from cart'));
      }

      const { productId } = req.params;
      const cart = await this.cartService.removeFromCart(req.user._id, productId);

      res.status(200).json({
        success: true,
        data: cart,
      });
    } catch (err) {
      next(err);
    }
  };
}
