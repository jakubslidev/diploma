import { Model } from 'mongoose';
import { Webpage } from './webpages.schema';
import { JwtPayload } from '../authz/jwt-payload.interface';
import { UsersService } from '../users/users.service';
export declare class WebpagesService {
    private readonly webpageModel;
    private usersService;
    constructor(webpageModel: Model<Webpage>, usersService: UsersService);
    create(webpage: Webpage): Promise<Webpage>;
    findAll(): Promise<Webpage[]>;
    findById(id: string): Promise<Webpage>;
    getWebpagesForUser(payload: JwtPayload): Promise<any[]>;
    findOne(webpageId: string): Promise<Webpage>;
    isUserInWebpage(userID: string, webpageId: string): Promise<boolean>;
    findAllUsersForWebpage(webpageId: string): Promise<any[]>;
    removeUserFromWebpage(userEmail: string, webpageId: string): Promise<Webpage>;
}
