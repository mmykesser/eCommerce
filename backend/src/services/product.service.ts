import { ProductModel } from '../models/Product';
import { NotFoundError } from '../utils/errors.utils';
import { IProduct } from '../interfaces/models/product.interface';
import { CategoryModel } from '../models/Category';

export class ProductService {
  public async findAllProducts() {
    return ProductModel.find().populate('category');
  }

  public async findProductById(id: string) {
    const product = await ProductModel.findById(id).populate('category');
    if (!product) {
      throw new NotFoundError('Product not found');
    }
    return product;
  }

  public async createProduct(productData: IProduct) {
    const categoryExists = await CategoryModel.findById(productData.category);
    if (!categoryExists) {
      throw new NotFoundError('Category ID not found');
    }
    return ProductModel.create(productData);
  }
}
