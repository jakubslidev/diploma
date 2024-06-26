"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const path_1 = require("path");
const path_2 = require("path");
const jimp = require("jimp");
let MediaService = class MediaService {
    constructor() {
        this.uploadPath = 'uploads';
    }
    async resizeAndSaveThumbnail(file) {
        const filename = (0, uuid_1.v4)() + (0, path_1.extname)(file.originalname);
        const bigPath = (0, path_2.join)(this.uploadPath, 'big_' + filename);
        const smallPath = (0, path_2.join)(this.uploadPath, 'small_' + filename);
        const image = await jimp.read(file.path);
        await image
            .resize(598, 312)
            .writeAsync(bigPath);
        await image
            .resize(398, 312)
            .writeAsync(smallPath);
        return {
            bigPath: `${this.uploadPath}/big_${filename}`,
            smallPath: `${this.uploadPath}/small_${filename}`
        };
    }
    async resizeAndSaveImage(file) {
        const imagePath = `${this.uploadPath}/${file.filename}`;
        const image = await jimp.read(file.path);
        if (image.bitmap.width > 800 || image.bitmap.height > 600) {
            await image
                .resize(800, jimp.AUTO)
                .quality(80);
            await image.writeAsync(imagePath);
        }
        else {
            const originalImage = await jimp.read(file.path);
            await originalImage.writeAsync(imagePath);
        }
        return imagePath;
    }
    saveImageFile(file) {
        const fileExtName = (0, path_1.extname)(file.originalname);
        const randomName = (0, uuid_1.v4)();
        const fullPath = `${this.uploadPath}/${randomName}${fileExtName}`;
        return fullPath;
    }
};
MediaService = __decorate([
    (0, common_1.Injectable)()
], MediaService);
exports.MediaService = MediaService;
//# sourceMappingURL=media.service.js.map