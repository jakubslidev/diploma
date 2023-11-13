import { Model } from 'mongoose';
export declare class UsersService {
    private readonly userModel;
    constructor(userModel: Model<any>);
    findByEmail(email: string): Promise<any>;
    create(userData: any): Promise<any>;
    login(email: string, password: string): Promise<string>;
}
