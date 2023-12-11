"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtPayload = void 0;
const common_1 = require("@nestjs/common");
exports.JwtPayload = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});
//# sourceMappingURL=jwt.decorator.js.map