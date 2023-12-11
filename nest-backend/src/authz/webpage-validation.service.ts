// webpage-validation.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { WebpagesService } from '../webpages/webpages.service';

@Injectable()
export class WebpageValidationService {
  constructor(private readonly webpagesService: WebpagesService) {}

  async validateWebpageId(webpageId: string, userId: string) {
    const webpage = await this.webpagesService.findOne(webpageId);
    console.log(webpage);

    if (!webpage) {
      throw new UnauthorizedException('Webpage not found');
    }

    const userIsInWebpage = webpage.users.some(user => user.user.toString() === userId);

    if (!userIsInWebpage) {
      throw new UnauthorizedException();
    }
  }
}