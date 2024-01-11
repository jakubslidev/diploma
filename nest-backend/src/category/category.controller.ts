// category.controller.ts
import { Controller, Get, Post, Param, Body, Query, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.schema';


@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async createCategory(@Body() categoryData: Partial<Category>, @Query('webpageId') webpageId: string) {
    return this.categoryService.createCategory(categoryData, webpageId);
  }

  @Post(':id/subcategory')
  async addSubcategory(@Param('id') id: string, @Body() body: { name: string }) {
    return this.categoryService.addSubcategory(id, body.name);
  }

  @Delete(':id')
  removeCategory(@Param('id') id: string) {
    return this.categoryService.removeCategory(id);
  }

  @Delete(':id/subcategory')
  removeSubcategory(@Param('id') id: string, @Body() body: { name: string }) {
    return this.categoryService.removeSubcategory(id, body.name);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get('/webpage/:webpageId') // New endpoint to retrieve categories for a specific webpage
  findAllForPage(@Param('webpageId') webpageId: string) {
    return this.categoryService.findAllForPage(webpageId);
  }
}