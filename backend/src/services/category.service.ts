import { CategoryModel } from '../models/Category';
import { ConflictError } from '../utils/errors.utils';
import { ICategory } from '../interfaces/models/category.interface';

export class CategoryService {
  public async findAllCategories() {
    return CategoryModel.find().populate('createdBy', 'name email');
  }

  public async createCategory(categoryData: Omit<ICategory, 'createdBy'>, userId: string) {
    const existingCategory = await CategoryModel.findOne({ name: categoryData.name });
    if (existingCategory) {
      throw new ConflictError('Category already exists');
    }

    return await CategoryModel.create({
      ...categoryData,
      createdBy: userId,
    });
  }
}
