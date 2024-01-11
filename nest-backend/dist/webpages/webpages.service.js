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
exports.WebpagesService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const users_service_1 = require("../users/users.service");
const posts_service_1 = require("../posts/posts.service");
let WebpagesService = class WebpagesService {
    constructor(webpageModel, usersService, postService) {
        this.webpageModel = webpageModel;
        this.usersService = usersService;
        this.postService = postService;
    }
    async create(webpageData, payload) {
        const createdWebpage = new this.webpageModel(Object.assign(Object.assign({}, webpageData), { users: [{ user: payload._id, role: 'Admin', email: payload.email }] }));
        const savedWebpage = await createdWebpage.save();
        const user = await this.usersService.findById(payload._id);
        if (!user)
            throw new common_1.UnauthorizedException('User not found');
        user.roles = user.roles || {};
        user.roles.set(savedWebpage._id.toString(), "Admin");
        await user.save();
        const accessToken = this.usersService.generateAccessToken(user);
        return {
            savedWebpage,
            accessToken,
        };
    }
    async findAll() {
        return this.webpageModel.find().exec();
    }
    async findById(id) {
        return this.webpageModel.findById(id).exec();
    }
    async getWebpagesForUser(payload) {
        const userWebpages = await this.webpageModel.find({ 'users.user': payload._id }).exec();
        console.log(payload._id);
        const userWebpagesWithRole = userWebpages.map(webpage => {
            const userInWebpage = webpage.users.find(user => user.user.toString() === payload._id);
            return Object.assign(Object.assign({}, webpage.toObject()), { role: userInWebpage ? userInWebpage.role : null });
        });
        return userWebpagesWithRole;
    }
    async findOne(webpageId) {
        return this.webpageModel.findById(webpageId).exec();
    }
    async isUserInWebpage(userID, webpageId) {
        try {
            const webpage = await this.webpageModel.findById(webpageId).exec();
            if (!webpage) {
                return false;
            }
            const userInWebpage = webpage.users.some((user) => user.user.equals(userID));
            return userInWebpage;
        }
        catch (error) {
            return false;
        }
    }
    async findAllUsersForWebpage(webpageId) {
        try {
            const webpage = await this.webpageModel.findById(webpageId).exec();
            if (!webpage) {
                return [];
            }
            return webpage.users;
        }
        catch (error) {
            throw new Error('Error fetching users for webpage: ' + error.message);
        }
    }
    async removeUserFromWebpage(userEmail, webpageId) {
        const user = await this.usersService.findByEmail(userEmail);
        if (!user) {
            throw new Error('User not found');
        }
        if (user.roles && user.roles.has(webpageId)) {
            user.roles.delete(webpageId);
            await user.save();
        }
        return this.webpageModel.findOneAndUpdate({ _id: webpageId }, { $pull: { users: { email: userEmail } } }, { new: true }).exec();
    }
    async setMainPost(webpageId, postId) {
        return this.webpageModel.findByIdAndUpdate(webpageId, { $set: { mainPost: postId } }, { new: true }).exec();
    }
    async addTrendingPost(webpageId, postId) {
        return this.webpageModel.findByIdAndUpdate(webpageId, { $addToSet: { trendingPosts: postId } }, { new: true }).exec();
    }
    async removeTrendingPost(webpageId, postId) {
        return this.webpageModel.findByIdAndUpdate(webpageId, { $pull: { trendingPosts: postId } }, { new: true }).exec();
    }
    async getTrendingAndMainPosts(webpageId) {
        const webpage = await this.webpageModel
            .findById(webpageId)
            .populate('trendingPosts')
            .populate('mainPost')
            .exec();
        if (!webpage) {
            throw new Error('Webpage not found');
        }
        const trendingPostsIds = webpage.trendingPosts.map(post => post._id.toString());
        const mainPostId = webpage.mainPost ? webpage.mainPost._id.toString() : null;
        console.log(trendingPostsIds);
        console.log(mainPostId);
        const mainPost = mainPostId ? await this.postService.findOne(mainPostId) : null;
        console.log("mainPOST" + mainPost);
        console.log(this.postService.findPostsByIds(trendingPostsIds));
        const trendingPosts = await this.postService.findPostsByIds(trendingPostsIds);
        return {
            trendingPosts,
            mainPost
        };
    }
};
WebpagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('Webpage')),
    __metadata("design:paramtypes", [mongoose_1.Model, users_service_1.UsersService, posts_service_1.PostsService])
], WebpagesService);
exports.WebpagesService = WebpagesService;
//# sourceMappingURL=webpages.service.js.map