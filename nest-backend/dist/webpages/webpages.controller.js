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
let WebpagesController = class WebpagesController {
    constructor(webpagesService, webpageValidationService) {
        this.webpagesService = webpagesService;
        this.webpageValidationService = webpageValidationService;
    }
    async create(webpage) {
        return this.webpagesService.create(webpage);
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
};
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
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
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
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
WebpagesController = __decorate([
    (0, common_1.Controller)('webpages'),
    __metadata("design:paramtypes", [webpages_service_1.WebpagesService,
        webpage_validation_service_1.WebpageValidationService])
], WebpagesController);
exports.WebpagesController = WebpagesController;
//# sourceMappingURL=webpages.controller.js.map