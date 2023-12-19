import { UserInvitationsService } from './user-invitations.service';
import { InviteDto } from './invite.dto';
import { WebpageValidationService } from '../authz/webpage-validation.service';
export declare class UserInvitationsController {
    private readonly userInvitationsService;
    private readonly webpageValidationService;
    constructor(userInvitationsService: UserInvitationsService, webpageValidationService: WebpageValidationService);
    inviteUser(inviteDto: InviteDto, req: any): Promise<import("./user-invitation.interface").UserInvitation>;
    listInvitations(userId: string, req: any): Promise<import("./user-invitation.interface").UserInvitation[]>;
    acceptInvitation(invitationId: string, req: any): Promise<import("./user-invitation.interface").UserInvitation>;
    declineInvitation(invitationId: string, req: any): Promise<import("./user-invitation.interface").UserInvitation>;
}
