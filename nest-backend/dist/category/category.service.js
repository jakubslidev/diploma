"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const category_schema_1 = require("./category.schema");
const common_2 = require("@nestjs/common");
let CategoryService = class CategoryService {
    constructor(categoryModel) {
        this.categoryModel = categoryModel;
    }
    async addSubcategory(categoryId, subcategoryName) {
        const category = await this.categoryModel.findById(categoryId);
        if (!category) {
            throw new Error('Category not found');
        }
        category.subcategories.push(subcategoryName);
        return category.save();
    }
    async createCategory(categoryData, webpageId) {
        const createdCategory = new this.categoryModel(Object.assign(Object.assign({}, categoryData), { webpage: webpageId }));
        console.log(createdCategory);
        return createdCategory.save();
    }
    async removeCategory(categoryId) {
        const result = await this.categoryModel.deleteOne({ _id: categoryId }).exec();
        if (result.deletedCount === 0) {
            throw new common_2.NotFoundException('Category not found');
        }
        return { id: categoryId };
    }
    async removeSubcategory(categoryId, subcategoryName) {
        const category = await this.categoryModel.findById(categoryId);
        if (!category) {
            throw new common_2.NotFoundException('Category not found');
        }
        category.subcategories = category.subcategories.filter((subcategory) => subcategory !== subcategoryName);
        return category.save();
    }
    async findAll() {
        return this.categoryModel.find().exec();
    }
    async findAllForPage(webpageId) {
        return this.categoryModel.find({ webpage: new mongoose_2.Types.ObjectId(webpageId) }).exec();
    }
};
CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(category_schema_1.Category.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map