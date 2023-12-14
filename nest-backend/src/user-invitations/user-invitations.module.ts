import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserInvitationsService } from './user-invitations.service';
import { UserInvitationsController } from './user-invitations.controller';
import { UserInvitationSchema } from './user-invitations.schema';
import { UsersModule } from '../users/users.module';
import { WebpagesModule } from '../webpages/webpages.module';
import { WebpageValidationService } from '../authz/webpage-validation.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'UserInvitation', schema: UserInvitationSchema }]), UsersModule, WebpagesModule,
  ],
  controllers: [UserInvitationsController],
  providers: [UserInvitationsService, WebpageValidationService],
})
export class UserInvitationsModule {}
