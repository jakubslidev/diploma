"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInvitationsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_invitations_service_1 = require("./user-invitations.service");
const user_invitations_controller_1 = require("./user-invitations.controller");
const user_invitations_schema_1 = require("./user-invitations.schema");
const users_module_1 = require("../users/users.module");
const webpages_module_1 = require("../webpages/webpages.module");
const webpage_validation_service_1 = require("../authz/webpage-validation.service");
let UserInvitationsModule = class UserInvitationsModule {
};
UserInvitationsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'UserInvitation', schema: user_invitations_schema_1.UserInvitationSchema }]), users_module_1.UsersModule, webpages_module_1.WebpagesModule,
        ],
        controllers: [user_invitations_controller_1.UserInvitationsController],
        providers: [user_invitations_service_1.UserInvitationsService, webpage_validation_service_1.WebpageValidationService],
    })
], UserInvitationsModule);
exports.UserInvitationsModule = UserInvitationsModule;
//# sourceMappingURL=user-invitations.module.js.map