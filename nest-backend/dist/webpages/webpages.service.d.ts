import { Model } from 'mongoose';
import { Webpage } from './webpages.schema';
import { JwtPayload } from '../authz/jwt-payload.interface';
export declare class WebpagesService {
    private readonly webpageModel;
    constructor(webpageModel: Model<Webpage>);
    create(webpage: Webpage): Promise<Webpage>;
    findAll(): Promise<Webpage[]>;
    findById(id: string): Promise<Webpage>;
    getWebpagesForUser(payload: JwtPayload): Promise<any[]>;
    findOne(webpageId: string): Promise<Webpage>;
    isUserInWebpage(userID: string, webpageId: string): Promise<boolean>;
}
