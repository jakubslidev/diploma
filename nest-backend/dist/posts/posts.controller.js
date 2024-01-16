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
exports.PostsController = void 0;
const common_1 = require("@nestjs/common");
const posts_service_1 = require("./posts.service");
const passport_1 = require("@nestjs/passport");
const webpage_validation_service_1 = require("../authz/webpage-validation.service");
const update_post_dto_1 = require("./update-post.dto");
let PostsController = class PostsController {
    constructor(postsService, webpageValidationService) {
        this.postsService = postsService;
        this.webpageValidationService = webpageValidationService;
    }
    async addPostToWebpage(webpageId, postData, categoryId, req) {
        const userId = req.user._id;
        const jwtRoles = req.user.roles;
        await this.webpageValidationService.validateWebpageId(webpageId, userId, jwtRoles);
        return this.postsService.addPostToWebpage(webpageId, postData, categoryId);
    }
    getNewestPosts(webpageId) {
        return this.postsService.findNewestPosts(webpageId);
    }
    getPostsByCategory(categoryId, webpageId) {
        return this.postsService.findPostsByCategory(categoryId, webpageId);
    }
    findAll() {
        return this.postsService.findAll();
    }
    findOne(id) {
        return this.postsService.findOne(id);
    }
    async findAllForWebpageBackOffice(webpageId, req) {
        const userId = req.user._id;
        const jwtRoles = req.user.roles;
        await this.webpageValidationService.validateWebpageId(webpageId, userId, jwtRoles);
        return this.postsService.findAllForWebpage(webpageId);
    }
    async findAllForWebpageView(webpageId, req) {
        const userId = req.user._id;
        const jwtRoles = req.user.roles;
        await this.webpageValidationService.validateWebpageId(webpageId, userId, jwtRoles);
        return this.postsService.findAllForWebpage(webpageId);
    }
    async findAllForUserView(webpageId, req) {
        return this.postsService.findAllActiveForWebpage(webpageId);
    }
    async findAllForUserViewLazy(webpageId, skip = 0, limit = 3) {
        return this.postsService.findAllActiveForWebpageLazy(webpageId, skip, limit);
    }
    async findAllForWebpageLimited(webpageId) {
        return this.postsService.findAllActiveForWebpageLimited(webpageId);
    }
    updatePostStatus(id, status) {
        return this.postsService.updatePostStatus(id, status);
    }
    async updatePost(id, updatePostDto) {
        return this.postsService.update(id, updatePostDto);
    }
    deletePost(id) {
        return this.postsService.deletePost(id);
    }
    search(webpageId, query) {
        return this.postsService.searchPosts(webpageId, query);
    }
    getPostsBySubcategory(webpageId, categoryId, subcategory) {
        return this.postsService.findPostsBySubcategory(webpageId, categoryId, subcategory);
    }
    incrementViewCount(id) {
        return this.postsService.incrementViewCount(id);
    }
    incrementLikeCount(postId) {
        return this.postsService.incrementLikeCount(postId);
    }
    incrementDislikeCount(postId) {
        return this.postsService.incrementDislikeCount(postId);
    }
};
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt2')),
    (0, common_1.Post)(':webpageId/addPost'),
    __param(0, (0, common_1.Param)('webpageId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Query)('categoryId')),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "addPostToWebpage", null);
__decorate([
    (0, common_1.Get)('/newest/:webpageId'),
    __param(0, (0, common_1.Param)('webpageId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "getNewestPosts", null);
__decorate([
    (0, common_1.Get)('/category/:categoryId/:webpageId'),
    __param(0, (0, common_1.Param)('categoryId')),
    __param(1, (0, common_1.Param)('webpageId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "getPostsByCategory", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt2')),
    (0, common_1.Get)('/webpage/:webpageId'),
    __param(0, (0, common_1.Param)('webpageId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "findAllForWebpageBackOffice", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt2')),
    (0, common_1.Get)('/view/webpage/:webpageId'),
    __param(0, (0, common_1.Param)('webpageId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "findAllForWebpageView", null);
__decorate([
    (0, common_1.Get)('/view/webpage/:webpageId/withoutauth'),
    __param(0, (0, common_1.Param)('webpageId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "findAllForUserView", null);
__decorate([
    (0, common_1.Get)('/view/webpage/:webpageId/withoutauth/lazy'),
    __param(0, (0, common_1.Param)('webpageId')),
    __param(1, (0, common_1.Query)('skip')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "findAllForUserViewLazy", null);
__decorate([
    (0, common_1.Get)('/view/webpage/:webpageId/limited'),
    __param(0, (0, common_1.Param)('webpageId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "findAllForWebpageLimited", null);
__decorate([
    (0, common_1.Patch)(':id/updateStatus'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "updatePostStatus", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt2')),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_post_dto_1.UpdatePostDto]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "updatePost", null);
__decorate([
    (0, common_1.Delete)(':id/deleteSelected'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "deletePost", null);
__decorate([
    (0, common_1.Get)('/search/:webpageId'),
    __param(0, (0, common_1.Param)('webpageId')),
    __param(1, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "search", null);
__decorate([
    (0, common_1.Get)('/:webpageId/:categoryId/:subcategory'),
    __param(0, (0, common_1.Param)('webpageId')),
    __param(1, (0, common_1.Param)('categoryId')),
    __param(2, (0, common_1.Param)('subcategory')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getPostsBySubcategory", null);
__decorate([
    (0, common_1.Patch)(':id/incrementView'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "incrementViewCount", null);
__decorate([
    (0, common_1.Patch)(':id/incrementLike'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "incrementLikeCount", null);
__decorate([
    (0, common_1.Patch)(':id/incrementDislike'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "incrementDislikeCount", null);
PostsController = __decorate([
    (0, common_1.Controller)('posts'),
    __metadata("design:paramtypes", [posts_service_1.PostsService,
        webpage_validation_service_1.WebpageValidationService])
], PostsController);
exports.PostsController = PostsController;
//# sourceMappingURL=posts.controller.js.map