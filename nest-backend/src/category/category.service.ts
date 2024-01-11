// category.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Category } from './category.schema';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) {}

  async addSubcategory(categoryId: string, subcategoryName: string): Promise<Category> {
    const category = await this.categoryModel.findById(categoryId);

    if (!category) {
      throw new Error('Category not found');
    }

    category.subcategories.push(subcategoryName);
    return category.save();
  }

  async createCategory(categoryData: Partial<Category>, webpageId: string): Promise<Category> {
    const createdCategory = new this.categoryModel({
      ...categoryData,
      webpage: webpageId, // Set the webpage reference
    });
    console.log(createdCategory);
    return createdCategory.save();
  }

  async removeCategory(categoryId: string): Promise<{ id: string }> {
    const result = await this.categoryModel.deleteOne({ _id: categoryId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Category not found');
    }
    return { id: categoryId };
  }

  async removeSubcategory(categoryId: string, subcategoryName: string): Promise<Category> {
    const category = await this.categoryModel.findById(categoryId);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    category.subcategories = category.subcategories.filter((subcategory) => subcategory !== subcategoryName);
    return category.save();
  }
  

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async findAllForPage(webpageId: string): Promise<Category[]> {
    return this.categoryModel.find({ webpage: new Types.ObjectId(webpageId) }).exec();
  }
}
