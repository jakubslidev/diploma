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
exports.MediaController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const media_service_1 = require("./media.service");
const multer_config_1 = require("./multer.config");
let MediaController = class MediaController {
    constructor(mediaService) {
        this.mediaService = mediaService;
    }
    async uploadFile(file, res) {
        if (!file) {
            return res.status(400).send('No file uploaded.');
        }
        try {
            const imagePath = await this.mediaService.resizeAndSaveImage(file);
            res.status(201).json({ path: imagePath });
        }
        catch (error) {
            console.error('Failed to resize image:', error);
            res.status(500).send('Failed to process image.');
        }
    }
    async uploadThumbnail(file, res) {
        if (!file) {
            return res.status(400).send('No file uploaded.');
        }
        try {
            const { bigPath, smallPath } = await this.mediaService.resizeAndSaveThumbnail(file);
            console.log(bigPath, smallPath);
            res.status(201).json({ bigPath, smallPath });
        }
        catch (error) {
            console.error('Failed to resize thumbnail:', error);
            res.status(500).send('Failed to process thumbnail.');
        }
    }
};
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', multer_config_1.multerOptions)),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Post)('upload-thumbnail'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('thumbnail', multer_config_1.multerOptions)),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "uploadThumbnail", null);
MediaController = __decorate([
    (0, common_1.Controller)('media'),
    __metadata("design:paramtypes", [media_service_1.MediaService])
], MediaController);
exports.MediaController = MediaController;
//# sourceMappingURL=media.controller.js.map