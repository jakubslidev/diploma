import { Model } from 'mongoose';
import { UserInvitation } from './user-invitation.interface';
import { InviteDto } from './invite.dto';
import { UsersService } from '../users/users.service';
import { WebpagesService } from '../webpages/webpages.service';
import { WebpageValidationService } from '../authz/webpage-validation.service';
export declare class UserInvitationsService {
    private readonly invitationModel;
    private readonly usersService;
    private readonly webpagesService;
    private readonly webpageValidationService;
    constructor(invitationModel: Model<UserInvitation>, usersService: UsersService, webpagesService: WebpagesService, webpageValidationService: WebpageValidationService);
    inviteUser(inviteDto: InviteDto, invitedBy: string): Promise<UserInvitation>;
    listInvitationsForUser(userId: string): Promise<UserInvitation[]>;
    acceptInvitation(invitationId: string, userId: string): Promise<{
        invitation: UserInvitation;
        accessToken: string;
    }>;
    declineInvitation(invitationId: string, userId: string): Promise<UserInvitation>;
}
