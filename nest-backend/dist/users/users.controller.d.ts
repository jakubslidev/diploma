import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    register(userData: any): Promise<any>;
    login(loginData: any): Promise<any>;
}
