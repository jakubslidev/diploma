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
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const posts_schema_1 = require("../posts/posts.schema");
let PostsService = class PostsService {
    constructor(postModel) {
        this.postModel = postModel;
    }
    async findAll() {
        return this.postModel.find().exec();
    }
    async findOne(id) {
        return this.postModel.findById(id).exec();
    }
    async findAllForWebpage(webpageId) {
        return this.postModel.find({ webpage: new mongoose_2.Types.ObjectId(webpageId) }).exec();
    }
    async findAllActiveForWebpage(webpageId) {
        return this.postModel.find({ webpage: new mongoose_2.Types.ObjectId(webpageId), status: 'Active' }).exec();
    }
    async findAllActiveForWebpageLimited(webpageId) {
        return this.postModel.find({ webpage: new mongoose_2.Types.ObjectId(webpageId), status: 'Active' })
            .sort({ createdAt: -1 })
            .limit(7)
            .exec();
    }
    async addPostToWebpage(webpageId, postData, category, status = 'Draft') {
        const post = new this.postModel(Object.assign(Object.assign({}, postData), { status }));
        post.webpage = new mongoose_2.Types.ObjectId(webpageId);
        return await post.save();
    }
    async updatePostStatus(postId, status) {
        return this.postModel.findByIdAndUpdate(postId, { $set: { status } }, { new: true }).exec();
    }
    async update(id, updatePostDto) {
        return this.postModel.findByIdAndUpdate(id, updatePostDto, { new: true }).exec();
    }
    async deletePost(postId) {
        await this.postModel.findByIdAndDelete(postId).exec();
    }
    async searchPosts(webpageId, query) {
        const searchRegex = new RegExp(query, 'i');
        try {
            const searchResults = await this.postModel.find({
                webpage: new mongoose_2.Types.ObjectId(webpageId),
                status: 'Active',
                $or: [
                    { title: { $regex: searchRegex } },
                    { content: { $regex: searchRegex } },
                ],
            }).exec();
            return searchResults;
        }
        catch (error) {
            console.error('Error during post search:', error);
            throw error;
        }
    }
};
PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(posts_schema_1.Post.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PostsService);
exports.PostsService = PostsService;
//# sourceMappingURL=posts.service.js.map