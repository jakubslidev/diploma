import { HttpService } from '@nestjs/axios';
export declare class UsersController {
    private httpService;
    constructor(httpService: HttpService);
    register(registrationData: any): Promise<void>;
    private verifyRecaptcha;
}
