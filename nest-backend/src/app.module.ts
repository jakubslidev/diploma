import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from './posts/posts.module';
import {CategoryModule} from './category/category.module';
import { UsersModule } from './users/users.module';
import { WebpagesModule } from './webpages/webpages.module';
import { AuthzModule } from './authz/authz.module';
import { UserInvitationsModule } from './user-invitations/user-invitations.module';
import { MediaModule } from './media/media.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static'; // Adjust the path according to your structure
import { NoCacheMiddleware } from './no-cache.middleware';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb+srv://ryan:ryan@nodeapi.vmsx8pn.mongodb.net/CMS?retryWrites=true&w=majority',
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
    PostsModule, CategoryModule, AuthzModule, UsersModule, WebpagesModule, UserInvitationsModule, MediaModule, ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',}), CommentsModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(NoCacheMiddleware)
      .forRoutes({ path: 'uploads/*', method: RequestMethod.GET }); // Apply only to uploads route
  }
}
