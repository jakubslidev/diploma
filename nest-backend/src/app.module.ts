import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from './posts/posts.module';
import {CategoryModule} from './category/category.module';
import { UsersModule } from './users/users.module';
import { WebpagesModule } from './webpages/webpages.module';
import { AuthzModule } from './authz/authz.module';
import { UserInvitationsModule } from './user-invitations/user-invitations.module';


@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb+srv://ryan:ryan@nodeapi.vmsx8pn.mongodb.net/CMS?retryWrites=true&w=majority',
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
    PostsModule, CategoryModule, AuthzModule, UsersModule, WebpagesModule, UserInvitationsModule
  ],
})
export class AppModule {}
