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
});
