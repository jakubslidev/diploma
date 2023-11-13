import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.schema';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async createCategory(@Body() categoryData: Partial<Category>) {
    return this.categoryService.createCategory(categoryData);
  }

  @Post(':id/subcategory')
  async addSubcategory(@Param('id') id: string, @Body() body: { name: string }) {
    return this.categoryService.addSubcategory(id, body.name);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }
}
