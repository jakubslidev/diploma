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
exports.WebpagesController = void 0;
const common_1 = require("@nestjs/common");
const webpages_service_1 = require("./webpages.service");
const passport_1 = require("@nestjs/passport");
const webpage_validation_service_1 = require("../authz/webpage-validation.service");
const mongoose_1 = require("mongoose");
const mongoose = require("mongoose");
let WebpagesController = class WebpagesController {
    constructor(webpagesService, webpageValidationService) {
        this.webpagesService = webpagesService;
        this.webpageValidationService = webpageValidationService;
    }
    async create(webpageData, req) {
        const user = req.user;
        return this.webpagesService.create(webpageData, user);
    }
    async findAll() {
        return this.webpagesService.findAll();
    }
    async findById(id) {
        return this.webpagesService.findById(id);
    }
    async getUserWebpages(req) {
        const user = req.user;
        console.log(user);
        const webpages = await this.webpagesService.getWebpagesForUser(user);
        return webpages;
    }
    async getUserRole(webpageId, req) {
        const userId = req.user._id;
        const jwtRoles = req.user.roles;
        const role = await this.webpageValidationService.validateWebpageId(webpageId, userId, jwtRoles);
        return { role };
    }
    async findAllUsersForWebpage(webpageId) {
        try {
            const users = await this.webpagesService.findAllUsersForWebpage(webpageId);
            console.log(users);
            return users;
        }
        catch (error) {
            throw new common_1.NotFoundException('Webpage not found or error fetching users: ' + error.message);
        }
    }
    async removeUser(webpageId, userId) {
        return this.webpagesService.removeUserFromWebpage(userId, webpageId);
    }
    async setMainPost(webpageId, postId) {
        return this.webpagesService.setMainPost(webpageId, postId);
    }
    async addTrendingPost(webpageId, postId) {
        return this.webpagesService.addTrendingPost(webpageId, postId);
    }
    async removeTrendingPost(webpageId, postId) {
        const objectIdPostId = new mongoose.Types.ObjectId(postId);
        return this.webpagesService.removeTrendingPost(webpageId, objectIdPostId);
    }
    async getPostsForWebpage(webpageId) {
        return this.webpagesService.getTrendingAndMainPosts(webpageId);
    }
    async getPostsForWebpageNoAuth(webpageId) {
        return this.webpagesService.getTrendingAndMainPosts(webpageId);
    }
    async changeStatus(webpageId, status, webpageTitle, req) {
        const userId = req.user._id;
        const jwtRoles = req.user.roles;
        const role = await this.webpageValidationService.validateWebpageId(webpageId, userId, jwtRoles);
        if (role !== 'Admin') {
            throw new common_1.UnauthorizedException('Only admins can change webpage status');
        }
        return this.webpagesService.changeWebpageStatus(webpageId, status, webpageTitle, userId);
    }
    async deleteWebpage(webpageId, req) {
        const userId = req.user._id;
        const jwtRoles = req.user.roles;
        const role = await this.webpageValidationService.validateWebpageId(webpageId, userId, jwtRoles);
        if (role !== 'Admin') {
            throw new common_1.UnauthorizedException('Only admins can delete webpages');
        }
        await this.webpagesService.deleteWebpage(webpageId, userId);
    }
    async getWebpageStatus(webpageId) {
        console.log(this.webpagesService.getWebpageStatus(webpageId));
        return this.webpagesService.getWebpageStatus(webpageId);
    }
};
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt2')),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], WebpagesController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WebpagesController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt2')),
    (0, common_1.Get)('/pages/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WebpagesController.prototype, "findById", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt2')),
    (0, common_1.Get)('user-webpages'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WebpagesController.prototype, "getUserWebpages", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt2')),
    (0, common_1.Get)(':webpageId/role'),
    __param(0, (0, common_1.Param)('webpageId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], WebpagesController.prototype, "getUserRole", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt2')),
    (0, common_1.Get)(':webpageId/users'),
    __param(0, (0, common_1.Param)('webpageId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WebpagesController.prototype, "findAllUsersForWebpage", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt2')),
    (0, common_1.Delete)(':webpageId/remove-user/:userId'),
    __param(0, (0, common_1.Param)('webpageId')),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], WebpagesController.prototype, "removeUser", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt2')),
    (0, common_1.Post)(':webpageId/main-post'),
    __param(0, (0, common_1.Param)('webpageId')),
    __param(1, (0, common_1.Body)('postId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], WebpagesController.prototype, "setMainPost", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt2')),
    (0, common_1.Post)(':webpageId/trending-posts'),
    __param(0, (0, common_1.Param)('webpageId')),
    __param(1, (0, common_1.Body)('postId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], WebpagesController.prototype, "addTrendingPost", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt2')),
    (0, common_1.Delete)(':webpageId/remove-trending-post/:postId'),
    __param(0, (0, common_1.Param)('webpageId')),
    __param(1, (0, common_1.Param)('postId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], WebpagesController.prototype, "removeTrendingPost", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt2')),
    (0, common_1.Get)(':webpageId/posts'),
    __param(0, (0, common_1.Param)('webpageId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WebpagesController.prototype, "getPostsForWebpage", null);
__decorate([
    (0, common_1.Get)(':webpageId/posts/noauth'),
    __param(0, (0, common_1.Param)('webpageId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WebpagesController.prototype, "getPostsForWebpageNoAuth", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt2')),
    (0, common_1.Patch)(':webpageId/status'),
    __param(0, (0, common_1.Param)('webpageId')),
    __param(1, (0, common_1.Body)('status')),
    __param(2, (0, common_1.Body)('title')),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], WebpagesController.prototype, "changeStatus", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt2')),
    (0, common_1.Delete)(':webpageId'),
    __param(0, (0, common_1.Param)('webpageId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], WebpagesController.prototype, "deleteWebpage", null);
__decorate([
    (0, common_1.Get)(':webpageId/status'),
    __param(0, (0, common_1.Param)('webpageId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WebpagesController.prototype, "getWebpageStatus", null);
WebpagesController = __decorate([
    (0, common_1.Controller)('webpages'),
    __metadata("design:paramtypes", [webpages_service_1.WebpagesService,
        webpage_validation_service_1.WebpageValidationService])
], WebpagesController);
exports.WebpagesController = WebpagesController;
//# sourceMappingURL=webpages.controller.js.map