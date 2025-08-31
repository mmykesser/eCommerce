import { RequestHandler } from 'express';
import { ProductService } from '../services/product.service';
import { IProduct } from '../interfaces/models/product.interface';

export class ProductController {
  private productService = new ProductService();

  public getAllProducts: RequestHandler = async (_req, res, next) => {
    try {
      const products = await this.productService.findAllProducts();
      res.status(200).json({
        success: true,
        data: products,
      });
    } catch (err) {
      next(err);
    }
  };

  public getProductById: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await this.productService.findProductById(id);
      res.status(200).json({
        success: true,
        data: product,
      });
    } catch (err) {
      next(err);
    }
  };

  public createProduct: RequestHandler = async (req, res, next) => {
    try {
      const newProduct = await this.productService.createProduct(req.body as IProduct);
      res.status(201).json({
        success: true,
        data: newProduct,
      });
    } catch (err) {
      next(err);
    }
  };
}
