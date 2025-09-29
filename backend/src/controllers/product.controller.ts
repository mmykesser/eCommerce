import { RequestHandler } from 'express';
import { ProductService } from '../services/product.service';
import { IProduct } from '../interfaces/entities/product.interface';
import { UnauthorizedError } from '../utils/errors.utils';

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
      if (!req.user) {
        return next(new UnauthorizedError('Authorization is required to create a product'));
      }

      const productData: IProduct = req.body;
      const newProduct = await this.productService.createProduct(productData);

      res.status(201).json({
        success: true,
        data: newProduct,
      });
    } catch (err) {
      next(err);
    }
  };

  public updateProduct: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;

      const productData: Partial<IProduct> = req.body;
      const updatedProduct = await this.productService.updateProduct(id, productData);

      res.status(200).json({
        success: true,
        data: updatedProduct,
      });
    } catch (err) {
      next(err);
    }
  };

  public deleteProduct: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;

      await this.productService.deleteProduct(id);

      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };
}
