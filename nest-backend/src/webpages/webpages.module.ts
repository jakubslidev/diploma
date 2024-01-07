import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WebpagesController } from './webpages.controller';
import { WebpagesService } from './webpages.service';
import { WebpageSchema } from './webpages.schema';
import { WebpageValidationService } from '../authz/webpage-validation.service';
import { UsersModule } from 'src/users/users.module';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'Webpage', schema: WebpageSchema }]), forwardRef(() => UsersModule)],
  controllers: [WebpagesController],
  providers: [WebpagesService, WebpageValidationService],
  exports: [WebpagesService, MongooseModule],
})
export class WebpagesModule {}
