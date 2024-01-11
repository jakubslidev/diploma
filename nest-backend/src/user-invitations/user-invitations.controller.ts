// user-invitations.controller.ts
import { Body, Controller, Get, Param, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserInvitationsService } from './user-invitations.service';
import { InviteDto } from './invite.dto';
import { WebpagesService } from '../webpages/webpages.service';
import { WebpageValidationService } from '../authz/webpage-validation.service';

@Controller('user-invitations')
export class UserInvitationsController {
  constructor(private readonly userInvitationsService: UserInvitationsService, 
    private readonly webpageValidationService: WebpageValidationService) {}

  @UseGuards(AuthGuard('jwt2'))
@Post()
async inviteUser(@Body() inviteDto: InviteDto, @Req() req) {
    const userId = req.user._id;
    const jwtRoles = req.user.roles;
    const role = await this.webpageValidationService.validateWebpageId(inviteDto.webpageId, userId, jwtRoles);

    if (role !== 'Admin') {
        throw new UnauthorizedException('Only admins can invite users');
    }

    console.log(inviteDto);

    return this.userInvitationsService.inviteUser(inviteDto, userId);
}

  @UseGuards(AuthGuard('jwt2'))
  @Get()
  async listInvitations(@Param('userId') userId: string, @Req() req) {
    console.log(req.user._id);
    return this.userInvitationsService.listInvitationsForUser(req.user._id);
  }

  @UseGuards(AuthGuard('jwt2'))
  @Post('accept/:invitationId')
  async acceptInvitation(@Param('invitationId') invitationId: string, @Req() req) {
    return this.userInvitationsService.acceptInvitation(invitationId, req.user._id);
  }

  @UseGuards(AuthGuard('jwt2'))
  @Post('decline/:invitationId')
  async declineInvitation(@Param('invitationId') invitationId: string, @Req() req) {
    return this.userInvitationsService.declineInvitation(invitationId, req.user._id);
  }
}
