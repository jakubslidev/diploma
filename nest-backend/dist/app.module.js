"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const posts_module_1 = require("./posts/posts.module");
const category_module_1 = require("./category/category.module");
const authz_module_1 = require("./authz/authz.module");
const users_module_1 = require("./users/users.module");
const webpages_module_1 = require("./webpages/webpages.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRootAsync({
                useFactory: () => ({
                    uri: 'mongodb+srv://ryan:ryan@nodeapi.vmsx8pn.mongodb.net/CMS?retryWrites=true&w=majority',
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                }),
            }),
            posts_module_1.PostsModule, category_module_1.CategoryModule, authz_module_1.AuthzModule, users_module_1.UsersModule, webpages_module_1.WebpagesModule
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map