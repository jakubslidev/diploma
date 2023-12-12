"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebpageValidationService = void 0;
const common_1 = require("@nestjs/common");
const webpages_service_1 = require("../webpages/webpages.service");
let WebpageValidationService = class WebpageValidationService {
    constructor(webpagesService) {
        this.webpagesService = webpagesService;
    }
    async validateWebpageId(webpageId, userId, jwtRoles) {
        const webpage = await this.webpagesService.findOne(webpageId);
        console.log(webpage);
        if (!webpage) {
            throw new common_1.UnauthorizedException('Webpage not found');
        }
        const userInWebpage = webpage.users.find(user => user.user.toString() === userId);
        if (!userInWebpage) {
            throw new common_1.UnauthorizedException();
        }
        const jwtRole = jwtRoles[webpageId];
        if (userInWebpage.role !== jwtRole) {
            throw new common_1.UnauthorizedException('Role does not match');
        }
        console.log("the role of the user: " + userInWebpage.role);
        return userInWebpage.role;
    }
};
WebpageValidationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [webpages_service_1.WebpagesService])
], WebpageValidationService);
exports.WebpageValidationService = WebpageValidationService;
//# sourceMappingURL=webpage-validation.service.js.map