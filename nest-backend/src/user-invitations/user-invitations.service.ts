import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserInvitation } from './user-invitation.interface';
import { InviteDto } from './invite.dto';
import { UsersService } from '../users/users.service';
import { WebpagesService } from '../webpages/webpages.service';
import { WebpageValidationService } from '../authz/webpage-validation.service';

@Injectable()
export class UserInvitationsService {
  constructor(
    @InjectModel('UserInvitation') private readonly invitationModel: Model<UserInvitation>,
    private readonly usersService: UsersService,
    private readonly webpagesService: WebpagesService,
    private readonly webpageValidationService: WebpageValidationService
  ) {}

  async inviteUser(inviteDto: InviteDto, invitedBy: string): Promise<UserInvitation> {
    const user = await this.usersService.findByEmail(inviteDto.email);
    if (!user) throw new UnauthorizedException('User not found');

    const invitation = new this.invitationModel({
        webpageId: inviteDto.webpageId,
        invitedBy,
        invitee: user._id,
        role: inviteDto.role,
        status: 'pending',
    });

    return invitation.save();
}


  async listInvitationsForUser(userId: string): Promise<UserInvitation[]> {
    return this.invitationModel.find({ invitee: userId, status: 'pending' }).exec();
  }

  async acceptInvitation(invitationId: string, userId: string): Promise<{ invitation: UserInvitation, accessToken: string }> {
    const invitation = await this.invitationModel.findById(invitationId);
    if (!invitation || invitation.invitee.toString() !== userId || invitation.status !== 'pending') {
      throw new UnauthorizedException('Invalid or already processed invitation');
    }
  
    // Update the User document
    const user = await this.usersService.findById(userId);
    if (!user) throw new UnauthorizedException('User not found');
  
    // Update user's roles
    if (!user.roles) {
      user.roles = {};
    }
    user.roles[invitation.webpageId.toString()] = invitation.role;
    await user.save();
  
    // Update the Webpage document
    const webpage = await this.webpagesService.findById(invitation.webpageId);
    if (!webpage) throw new UnauthorizedException('Webpage not found');
  
    webpage.users.push({ user: new Types.ObjectId(userId), role: invitation.role, email: user.email });
    await webpage.save();
  
    // Update the invitation status
    invitation.status = 'accepted';
    await invitation.save();
  
    // Generate new access token with updated roles
    const accessToken = this.usersService.generateAccessToken(user);
  
    // Return both the updated invitation and the access token
    return {
      invitation,
      accessToken
    };
  }

  async declineInvitation(invitationId: string, userId: string): Promise<UserInvitation> {
    const invitation = await this.invitationModel.findById(invitationId);
    if (!invitation || invitation.invitee.toString() !== userId) throw new UnauthorizedException('Invitation not found or unauthorized');

    invitation.status = 'declined';
    return invitation.save();
  }
}
