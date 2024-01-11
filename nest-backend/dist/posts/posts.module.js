"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const posts_controller_1 = require("./posts.controller");
const posts_service_1 = require("./posts.service");
const posts_schema_1 = require("./posts.schema");
const webpage_validation_service_1 = require("../authz/webpage-validation.service");
const webpages_module_1 = require("../webpages/webpages.module");
const common_2 = require("@nestjs/common");
let PostsModule = class PostsModule {
};
PostsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: posts_schema_1.Post.name, schema: posts_schema_1.PostSchema }]), (0, common_2.forwardRef)(() => webpages_module_1.WebpagesModule),
        ],
        controllers: [posts_controller_1.PostsController],
        providers: [posts_service_1.PostsService, webpage_validation_service_1.WebpageValidationService],
        exports: [posts_service_1.PostsService]
    })
], PostsModule);
exports.PostsModule = PostsModule;
//# sourceMappingURL=posts.module.js.map