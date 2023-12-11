import { UsersService } from './users.service';
import { Request } from 'express';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    register(userData: any): Promise<any>;
    login(loginData: any, req: Request): Promise<any>;
}
