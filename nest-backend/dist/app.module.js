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
const users_module_1 = require("./users/users.module");
const webpages_module_1 = require("./webpages/webpages.module");
const authz_module_1 = require("./authz/authz.module");
const user_invitations_module_1 = require("./user-invitations/user-invitations.module");
const media_module_1 = require("./media/media.module");
const path_1 = require("path");
const serve_static_1 = require("@nestjs/serve-static");
const no_cache_middleware_1 = require("./no-cache.middleware");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(no_cache_middleware_1.NoCacheMiddleware)
            .forRoutes({ path: 'uploads/*', method: common_1.RequestMethod.GET });
    }
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
            posts_module_1.PostsModule, category_module_1.CategoryModule, authz_module_1.AuthzModule, users_module_1.UsersModule, webpages_module_1.WebpagesModule, user_invitations_module_1.UserInvitationsModule, media_module_1.MediaModule, serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'uploads'),
                serveRoot: '/uploads',
            }),
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map