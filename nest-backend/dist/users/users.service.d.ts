import { Model } from 'mongoose';
export declare class UsersService {
    private readonly userModel;
    constructor(userModel: Model<any>);
    findByEmail(email: string): Promise<any>;
    findById(_id: string): Promise<any>;
    create(userData: any): Promise<any>;
    verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean>;
    generateAccessToken(user: any): string;
}
