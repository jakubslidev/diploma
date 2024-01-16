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
    async findPostsByIds(postIds) {
        return this.postModel.find({ _id: { $in: postIds } }).exec();
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
    async findAllActiveForWebpageLazy(webpageId, skip, limit) {
        return this.postModel.find({ webpage: new mongoose_2.Types.ObjectId(webpageId), status: 'Active' })
            .skip(skip)
            .limit(limit)
            .exec();
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
        console.log('Updating post with ID:', id);
        console.log('Update data:', updatePostDto);
        const updatedPost = await this.postModel.findByIdAndUpdate(id, updatePostDto, { new: true }).exec();
        console.log('Updated post:', updatedPost);
        return updatedPost;
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
    async findNewestPosts(webpageId) {
        return this.postModel.find({ webpage: new mongoose_2.Types.ObjectId(webpageId) })
            .sort({ createdAt: -1 })
            .limit(5)
            .exec();
    }
    async findPostsByCategory(categoryId, webpageId) {
        return this.postModel.find({ category: categoryId, webpage: new mongoose_2.Types.ObjectId(webpageId) })
            .exec();
    }
    async findPostsBySubcategory(webpageId, categoryId, subcategory) {
        const caseInsensitiveSubcategory = new RegExp(subcategory, 'i');
        return this.postModel.find({
            webpage: new mongoose_2.default.Types.ObjectId(webpageId),
            category: new mongoose_2.default.Types.ObjectId(categoryId),
            subcategories: { $regex: caseInsensitiveSubcategory },
            status: 'Active',
        }).exec();
    }
    async incrementViewCount(postId) {
        return this.postModel.findByIdAndUpdate(postId, { $inc: { viewCount: 1 } }, { new: true }).exec();
    }
    async incrementLikeCount(postId) {
        return this.postModel.findByIdAndUpdate(postId, { $inc: { likeCount: 1 } }, { new: true }).exec();
    }
    async incrementDislikeCount(postId) {
        return this.postModel.findByIdAndUpdate(postId, { $inc: { dislikeCount: 1 } }, { new: true }).exec();
    }
};
PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(posts_schema_1.Post.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PostsService);
exports.PostsService = PostsService;
//# sourceMappingURL=posts.service.js.map