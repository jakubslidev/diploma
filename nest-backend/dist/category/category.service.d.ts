import { Model } from 'mongoose';
import { Category } from './category.schema';
export declare class CategoryService {
    private categoryModel;
    constructor(categoryModel: Model<Category>);
    addSubcategory(categoryId: string, subcategoryName: string): Promise<Category>;
    createCategory(categoryData: Partial<Category>, webpageId: string): Promise<Category>;
    findAll(): Promise<Category[]>;
    findAllForPage(webpageId: string): Promise<Category[]>;
}
