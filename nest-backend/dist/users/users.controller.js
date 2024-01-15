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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const axios_1 = require("@nestjs/axios");
let UsersController = class UsersController {
    constructor(usersService, httpService) {
        this.usersService = usersService;
        this.httpService = httpService;
    }
    async register(userData) {
        const existingUser = await this.usersService.findByEmail(userData.email);
        console.log("existingUser" + existingUser);
        if (existingUser) {
            throw new common_1.HttpException('User already exists', common_1.HttpStatus.BAD_REQUEST);
        }
        const newUser = await this.usersService.create(userData);
        const accessToken = this.usersService.generateAccessToken(newUser);
        console.log("ACCESS TOKEN" + accessToken);
        return { user: newUser, accessToken };
    }
    async login(loginData, req) {
        try {
            const user = await this.usersService.findByEmail(loginData.email);
            console.log(user);
            if (!user) {
                throw new common_1.HttpException('User not found', common_1.HttpStatus.UNAUTHORIZED);
            }
            const isPasswordValid = await this.usersService.verifyPassword(loginData.password, user.password);
            if (!isPasswordValid) {
                throw new common_1.HttpException('Invalid password', common_1.HttpStatus.UNAUTHORIZED);
            }
            req.session.user = { _id: user._id, email: user.email, roles: user.roles };
            console.log(req.session.user);
            const accessToken = this.usersService.generateAccessToken(user);
            return { accessToken };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.UNAUTHORIZED);
        }
    }
};
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService, axios_1.HttpService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map