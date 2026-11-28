import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CartService } from '../cart.service';
import { CartModel } from '../../models/Cart';
import { ProductModel } from '../../models/Product';
import { NotFoundError, ConflictError } from '../../utils/errors.utils';
import { IProductDocument } from '../../interfaces/entities/product.interface';
import { ICartDocument } from '../../interfaces/entities/cart.interface';

vi.mock('../../models/Cart');
vi.mock('../../models/Product');

describe('CartService', () => {
  let cartService: CartService;

  beforeEach(() => {
    vi.resetAllMocks();
    cartService = new CartService();
  });

  describe('addToCart', () => {
    it('should throw NotFoundError if product does not exist', async () => {
      vi.mocked(ProductModel.findById).mockResolvedValue(null);

      await expect(cartService.addToCart('user-1', 'prod-1', 1)).rejects.toThrow(NotFoundError);
      expect(CartModel.findOne).not.toHaveBeenCalled();
    });

    it('should throw ConflictError if product stock is less than requested quantity', async () => {
      const mockProduct = {
        _id: 'prod-1',
        price: 100,
        stock: 2,
      } as unknown as IProductDocument;

      vi.mocked(ProductModel.findById).mockResolvedValue(mockProduct);

      await expect(cartService.addToCart('user-1', 'prod-1', 5)).rejects.toThrow(ConflictError);
      expect(CartModel.findOne).not.toHaveBeenCalled();
    });

    it('should add a new item to the cart and recalculate total price', async () => {
      const mockProduct = {
        _id: 'prod-1',
        price: 100,
        stock: 10,
      } as unknown as IProductDocument;
      const mockCart = {
        items: [],
        totalPrice: 0,
        save: vi.fn(),
        populate: vi.fn(),
      } as unknown as ICartDocument;

      vi.mocked(ProductModel.findById).mockResolvedValue(mockProduct);
      vi.mocked(CartModel.findOne).mockResolvedValue(mockCart);

      const result = await cartService.addToCart('user-1', 'prod-1', 2);

      expect(result.items).toHaveLength(1);
      expect(result.items[0]).toEqual({ product: 'prod-1', quantity: 2 });
      expect(result.totalPrice).toBe(200);
      expect(mockCart.save).toHaveBeenCalledTimes(1);
      expect(mockCart.populate).toHaveBeenCalledWith('items.product', 'title price images');
    });

    it('should increase quantity if product is already in the cart', async () => {
      const mockProduct = {
        _id: 'prod-1',
        price: 100,
        stock: 10,
      } as unknown as IProductDocument;
      const mockCart = {
        items: [{ product: 'prod-1', quantity: 1 }],
        totalPrice: 100,
        save: vi.fn(),
        populate: vi.fn(),
      } as unknown as ICartDocument;

      vi.mocked(ProductModel.findById).mockResolvedValue(mockProduct);
      vi.mocked(CartModel.findOne).mockResolvedValue(mockCart);

      const result = await cartService.addToCart('user-1', 'prod-1', 2);

      expect(result.items).toHaveLength(1);
      expect(result.items[0].quantity).toBe(3);
      expect(result.totalPrice).toBe(300);
      expect(mockCart.save).toHaveBeenCalledTimes(1);
      expect(mockCart.populate).toHaveBeenCalledWith('items.product', 'title price images');
    });

    it('should throw ConflictError if combined quantity exceeds product stock', async () => {
      const mockProduct = {
        _id: 'prod-1',
        price: 100,
        stock: 3,
      } as unknown as IProductDocument;
      const mockCart = {
        items: [{ product: 'prod-1', quantity: 2 }],
        totalPrice: 200,
        save: vi.fn(),
        populate: vi.fn(),
      } as unknown as ICartDocument;

      vi.mocked(ProductModel.findById).mockResolvedValue(mockProduct);
      vi.mocked(CartModel.findOne).mockResolvedValue(mockCart);

      await expect(cartService.addToCart('user-1', 'prod-1', 2)).rejects.toThrow(ConflictError);
      expect(mockCart.save).not.toHaveBeenCalled();
    });
  });

  describe('updateCart', () => {
    it('should throw NotFoundError if cart does not exist', async () => {
      vi.mocked(CartModel.findOne).mockResolvedValue(null);

      await expect(cartService.updateCart('user-1', 'prod-1', 2)).rejects.toThrow(NotFoundError);
    });

    it('should throw NotFoundError if product is not in the cart', async () => {
      const mockCart = {
        items: [{ product: 'other-prod', quantity: 1 }],
        totalPrice: 100,
        save: vi.fn(),
        populate: vi.fn(),
      } as unknown as ICartDocument;

      vi.mocked(CartModel.findOne).mockResolvedValue(mockCart);

      await expect(cartService.updateCart('user-1', 'prod-1', 2)).rejects.toThrow(NotFoundError);
      expect(mockCart.save).not.toHaveBeenCalled();
    });

    it('should remove item from cart when quantity is 0', async () => {
      const mockCart = {
        items: [{ product: 'prod-1', quantity: 2 }],
        totalPrice: 200,
        save: vi.fn(),
        populate: vi.fn(),
      } as unknown as ICartDocument;

      vi.mocked(CartModel.findOne).mockResolvedValue(mockCart);

      const result = await cartService.updateCart('user-1', 'prod-1', 0);

      expect(result.items).toHaveLength(0);
      expect(result.totalPrice).toBe(0);
      expect(ProductModel.findById).not.toHaveBeenCalled();
      expect(mockCart.save).toHaveBeenCalledTimes(1);
      expect(mockCart.populate).toHaveBeenCalledWith('items.product', 'title price images');
    });

    it('should throw ConflictError if requested quantity exceeds product stock', async () => {
      const mockCart = {
        items: [{ product: 'prod-1', quantity: 1 }],
        totalPrice: 100,
        save: vi.fn(),
        populate: vi.fn(),
      } as unknown as ICartDocument;

      const mockProduct = {
        _id: 'prod-1',
        price: 100,
        stock: 3,
      } as unknown as IProductDocument;

      vi.mocked(CartModel.findOne).mockResolvedValue(mockCart);
      vi.mocked(ProductModel.findById).mockResolvedValue(mockProduct);

      await expect(cartService.updateCart('user-1', 'prod-1', 5)).rejects.toThrow(ConflictError);
      expect(mockCart.save).not.toHaveBeenCalled();
    });

    it('should update item quantity and recalculate total price', async () => {
      const mockCart = {
        items: [{ product: 'prod-1', quantity: 1 }],
        totalPrice: 100,
        save: vi.fn(),
        populate: vi.fn(),
      } as unknown as ICartDocument;

      const mockProduct = {
        _id: 'prod-1',
        price: 100,
        stock: 10,
      } as unknown as IProductDocument;

      vi.mocked(CartModel.findOne).mockResolvedValue(mockCart);
      vi.mocked(ProductModel.findById).mockResolvedValue(mockProduct);

      const result = await cartService.updateCart('user-1', 'prod-1', 4);

      expect(result.items[0].quantity).toBe(4);
      expect(result.totalPrice).toBe(400);
      expect(mockCart.save).toHaveBeenCalledTimes(1);
      expect(mockCart.populate).toHaveBeenCalledWith('items.product', 'title price images');
    });
  });

  describe('removeFromCart', () => {
    it('should throw NotFoundError if cart does not exist', async () => {
      vi.mocked(CartModel.findOne).mockResolvedValue(null);

      await expect(cartService.removeFromCart('user-1', 'prod-1')).rejects.toThrow(NotFoundError);
    });

    it('should remove item from cart and recalculate total price', async () => {
      const mockCart = {
        items: [
          { product: 'prod-1', quantity: 2 },
          { product: 'prod-2', quantity: 1 },
        ],
        totalPrice: 250,
        save: vi.fn(),
        populate: vi.fn(),
      } as unknown as ICartDocument;

      const remainingProduct = {
        _id: 'prod-2',
        price: 50,
        stock: 10,
      } as unknown as IProductDocument;

      vi.mocked(CartModel.findOne).mockResolvedValue(mockCart);
      vi.mocked(ProductModel.findById).mockResolvedValue(remainingProduct);

      const result = await cartService.removeFromCart('user-1', 'prod-1');

      expect(result.items).toHaveLength(1);
      expect(result.items[0]).toEqual({ product: 'prod-2', quantity: 1 });
      expect(result.totalPrice).toBe(50);
      expect(mockCart.save).toHaveBeenCalledTimes(1);
      expect(mockCart.populate).toHaveBeenCalledWith('items.product', 'title price images');
    });
  });

  describe('getCart', () => {
    it('should return existing populated cart', async () => {
      const mockCart = {
        items: [{ product: 'prod-1', quantity: 2 }],
        totalPrice: 200,
      } as unknown as ICartDocument;

      const mockPopulate = vi.fn().mockResolvedValue(mockCart);
      vi.mocked(CartModel.findOne).mockReturnValue({
        populate: mockPopulate,
      } as unknown as ReturnType<typeof CartModel.findOne>);

      const result = await cartService.getCart('user-1');

      expect(result).toBe(mockCart);
      expect(mockPopulate).toHaveBeenCalledWith('items.product', 'title price images');
      expect(CartModel.create).not.toHaveBeenCalled();
    });

    it('should create and return an empty cart if cart does not exist', async () => {
      const newCart = {
        user: 'user-1',
        items: [],
        totalPrice: 0,
      } as unknown as ICartDocument;

      vi.mocked(CartModel.findOne).mockReturnValue({
        populate: vi.fn().mockResolvedValue(null),
      } as unknown as ReturnType<typeof CartModel.findOne>);

      //create() has overloads, cast to avoid a TS error

      vi.mocked(CartModel.create).mockResolvedValue(newCart as never);

      const result = await cartService.getCart('user-1');

      expect(CartModel.create).toHaveBeenCalledWith({
        user: 'user-1',
        items: [],
        totalPrice: 0,
      });
      expect(result).toBe(newCart);
    });
  });

  describe('clearCart', () => {
    it('should throw NotFoundError if cart does not exist', async () => {
      vi.mocked(CartModel.findOne).mockResolvedValue(null);

      await expect(cartService.clearCart('user-1')).rejects.toThrow(NotFoundError);
    });

    it('should clear all items, reset totalPrice to 0 and save cart', async () => {
      const mockCart = {
        items: [{ product: 'prod-1', quantity: 2 }],
        totalPrice: 200,
        save: vi.fn(),
      } as unknown as ICartDocument;

      vi.mocked(CartModel.findOne).mockResolvedValue(mockCart);

      await cartService.clearCart('user-1');

      expect(mockCart.items).toEqual([]);
      expect(mockCart.totalPrice).toBe(0);
      expect(mockCart.save).toHaveBeenCalledTimes(1);
    });
  });
});
