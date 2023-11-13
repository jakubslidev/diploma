import { CategoryService } from './category.service';
import { Category } from './category.schema';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    createCategory(categoryData: Partial<Category>): Promise<Category>;
    addSubcategory(id: string, body: {
        name: string;
    }): Promise<Category>;
    findAll(): Promise<Category[]>;
}
