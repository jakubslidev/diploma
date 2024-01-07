"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebpagesModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const webpages_controller_1 = require("./webpages.controller");
const webpages_service_1 = require("./webpages.service");
const webpages_schema_1 = require("./webpages.schema");
const webpage_validation_service_1 = require("../authz/webpage-validation.service");
const users_module_1 = require("../users/users.module");
let WebpagesModule = class WebpagesModule {
};
WebpagesModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: 'Webpage', schema: webpages_schema_1.WebpageSchema }]), (0, common_1.forwardRef)(() => users_module_1.UsersModule)],
        controllers: [webpages_controller_1.WebpagesController],
        providers: [webpages_service_1.WebpagesService, webpage_validation_service_1.WebpageValidationService],
        exports: [webpages_service_1.WebpagesService, mongoose_1.MongooseModule],
    })
], WebpagesModule);
exports.WebpagesModule = WebpagesModule;
//# sourceMappingURL=webpages.module.js.map