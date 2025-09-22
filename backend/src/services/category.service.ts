import { CategoryModel } from '../models/Category';
import { ConflictError, NotFoundError } from '../utils/errors.utils';
import { ICategory } from '../interfaces/entities/category.interface';

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

  public async updateCategory(
    categoryId: string,
    categoryData: Partial<Omit<ICategory, 'createdBy'>>,
  ) {
    const updatedCategory = await CategoryModel.findByIdAndUpdate(categoryId, categoryData, {
      new: true,
      runValidators: true,
    });

    if (!updatedCategory) {
      throw new NotFoundError('Category ID not found');
    }
    return updatedCategory;
  }

  public async deleteCategory(categoryId: string): Promise<void> {
    const deleteCategory = await CategoryModel.findByIdAndDelete(categoryId);

    if (!deleteCategory) {
      throw new NotFoundError('Category ID not found');
    }
  }
}
