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
exports.UserInvitationsController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const user_invitations_service_1 = require("./user-invitations.service");
const invite_dto_1 = require("./invite.dto");
const webpage_validation_service_1 = require("../authz/webpage-validation.service");
let UserInvitationsController = class UserInvitationsController {
    constructor(userInvitationsService, webpageValidationService) {
        this.userInvitationsService = userInvitationsService;
        this.webpageValidationService = webpageValidationService;
    }
    async inviteUser(inviteDto, req) {
        const userId = req.user._id;
        const jwtRoles = req.user.roles;
        const role = await this.webpageValidationService.validateWebpageId(inviteDto.webpageId, userId, jwtRoles);
        if (role !== 'Admin') {
            throw new common_1.UnauthorizedException('Only admins can invite users');
        }
        return this.userInvitationsService.inviteUser(inviteDto, userId);
    }
    async listInvitations(userId, req) {
        console.log(req.user._id);
        return this.userInvitationsService.listInvitationsForUser(req.user._id);
    }
    async acceptInvitation(invitationId, req) {
        return this.userInvitationsService.acceptInvitation(invitationId, req.user._id);
    }
    async declineInvitation(invitationId, req) {
        return this.userInvitationsService.declineInvitation(invitationId, req.user._id);
    }
};
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt2')),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [invite_dto_1.InviteDto, Object]),
    __metadata("design:returntype", Promise)
], UserInvitationsController.prototype, "inviteUser", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt2')),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserInvitationsController.prototype, "listInvitations", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt2')),
    (0, common_1.Post)('accept/:invitationId'),
    __param(0, (0, common_1.Param)('invitationId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserInvitationsController.prototype, "acceptInvitation", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt2')),
    (0, common_1.Post)('decline/:invitationId'),
    __param(0, (0, common_1.Param)('invitationId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserInvitationsController.prototype, "declineInvitation", null);
UserInvitationsController = __decorate([
    (0, common_1.Controller)('user-invitations'),
    __metadata("design:paramtypes", [user_invitations_service_1.UserInvitationsService,
        webpage_validation_service_1.WebpageValidationService])
], UserInvitationsController);
exports.UserInvitationsController = UserInvitationsController;
//# sourceMappingURL=user-invitations.controller.js.map