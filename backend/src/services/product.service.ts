import { ProductModel } from '../models/Product';
import { NotFoundError } from '../utils/errors.utils';

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
}
