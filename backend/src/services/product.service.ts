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

  public async updateProduct(productId: string, productData: Partial<IProduct>) {
    if (productData.category) {
      const categoryExists = await CategoryModel.findById(productData.category);

      if (!categoryExists) {
        throw new NotFoundError('Category ID not found');
      }
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(productId, productData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      throw new NotFoundError('Product ID not found');
    }
    return updatedProduct;
  }

  public async deleteProduct(productId: string): Promise<void> {
    const deleteProduct = await ProductModel.findByIdAndDelete(productId);

    if (!deleteProduct) {
      throw new NotFoundError('Product ID not found');
    }
  }
}
