import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WebpagesController } from './webpages.controller';
import { WebpagesService } from './webpages.service';
import { WebpageSchema } from './webpages.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Webpage', schema: WebpageSchema }])],
  controllers: [WebpagesController],
  providers: [WebpagesService],
  exports: [WebpagesService],
})
export class WebpagesModule {}
