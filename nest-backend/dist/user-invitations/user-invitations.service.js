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
exports.UserInvitationsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const users_service_1 = require("../users/users.service");
const webpages_service_1 = require("../webpages/webpages.service");
const webpage_validation_service_1 = require("../authz/webpage-validation.service");
let UserInvitationsService = class UserInvitationsService {
    constructor(invitationModel, usersService, webpagesService, webpageValidationService) {
        this.invitationModel = invitationModel;
        this.usersService = usersService;
        this.webpagesService = webpagesService;
        this.webpageValidationService = webpageValidationService;
    }
    async inviteUser(inviteDto, invitedBy) {
        const user = await this.usersService.findByEmail(inviteDto.email);
        if (!user)
            throw new common_1.UnauthorizedException('User not found');
        const invitation = new this.invitationModel({
            webpageId: inviteDto.webpageId,
            invitedBy,
            invitee: user._id,
            role: inviteDto.role,
            status: 'pending',
        });
        return invitation.save();
    }
    async listInvitationsForUser(userId) {
        return this.invitationModel.find({ invitee: userId, status: 'pending' }).exec();
    }
    async acceptInvitation(invitationId, userId) {
        const invitation = await this.invitationModel.findById(invitationId);
        if (!invitation || invitation.invitee.toString() !== userId || invitation.status !== 'pending') {
            throw new common_1.UnauthorizedException('Invalid or already processed invitation');
        }
        const user = await this.usersService.findById(userId);
        if (!user)
            throw new common_1.UnauthorizedException('User not found');
        if (!user.roles) {
            user.roles = {};
        }
        user.roles[invitation.webpageId.toString()] = invitation.role;
        await user.save();
        const webpage = await this.webpagesService.findById(invitation.webpageId);
        if (!webpage)
            throw new common_1.UnauthorizedException('Webpage not found');
        webpage.users.push({ user: new mongoose_2.Types.ObjectId(userId), role: invitation.role, email: user.email });
        await webpage.save();
        invitation.status = 'accepted';
        await invitation.save();
        const accessToken = this.usersService.generateAccessToken(user);
        return {
            invitation,
            accessToken
        };
    }
    async declineInvitation(invitationId, userId) {
        const invitation = await this.invitationModel.findById(invitationId);
        if (!invitation || invitation.invitee.toString() !== userId)
            throw new common_1.UnauthorizedException('Invitation not found or unauthorized');
        invitation.status = 'declined';
        return invitation.save();
    }
};
UserInvitationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('UserInvitation')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        users_service_1.UsersService,
        webpages_service_1.WebpagesService,
        webpage_validation_service_1.WebpageValidationService])
], UserInvitationsService);
exports.UserInvitationsService = UserInvitationsService;
//# sourceMappingURL=user-invitations.service.js.map