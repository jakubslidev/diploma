"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthzModule = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const jwt_strategy_1 = require("./jwt.strategy");
const jwt_strategy2_1 = require("./jwt.strategy2");
const users_module_1 = require("../users/users.module");
const webpages_module_1 = require("../webpages/webpages.module");
let AuthzModule = class AuthzModule {
};
AuthzModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            users_module_1.UsersModule,
            webpages_module_1.WebpagesModule,
        ],
        providers: [jwt_strategy_1.JwtStrategy, jwt_strategy2_1.JwtStrategy2],
        exports: [passport_1.PassportModule],
    })
], AuthzModule);
exports.AuthzModule = AuthzModule;
//# sourceMappingURL=authz.module.js.map