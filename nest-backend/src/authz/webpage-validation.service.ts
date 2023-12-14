// webpage-validation.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { WebpagesService } from '../webpages/webpages.service';

@Injectable()
export class WebpageValidationService {
  constructor(private readonly webpagesService: WebpagesService) {}

  async validateWebpageId(webpageId: string, userId: string, jwtRoles: Record<string, string>) {
    const webpage = await this.webpagesService.findOne(webpageId);

    if (!webpage) {
      throw new UnauthorizedException('Webpage not found');
    }

    const userInWebpage = webpage.users.find(user => user.user.toString() === userId);

    if (!userInWebpage) {
      throw new UnauthorizedException();
    }

    const jwtRole = jwtRoles[webpageId];
    if (userInWebpage.role !== jwtRole) {
      throw new UnauthorizedException('Role does not match');
    }

    console.log("the role of the user: " + userInWebpage.role);

    // Return the user's role
    return userInWebpage.role;
  }
}