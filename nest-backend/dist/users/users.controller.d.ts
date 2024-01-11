import { UsersService } from './users.service';
import { Request } from 'express';
import { HttpService } from '@nestjs/axios';
export declare class UsersController {
    private readonly usersService;
    private httpService;
    constructor(usersService: UsersService, httpService: HttpService);
    register(userData: any): Promise<any>;
    login(loginData: any, req: Request): Promise<any>;
}
