import { WebpagesService } from './webpages.service';
import { Webpage } from './webpages.schema';
import { WebpageValidationService } from '../authz/webpage-validation.service';
import { Types } from 'mongoose';
import { BackendPost } from 'src/posts/post.interface';
export declare class WebpagesController {
    private readonly webpagesService;
    private readonly webpageValidationService;
    constructor(webpagesService: WebpagesService, webpageValidationService: WebpageValidationService);
    create(webpageData: any, req: any): Promise<{
        savedWebpage: Webpage;
        accessToken: string;
    }>;
    findAll(): Promise<Webpage[]>;
    findById(id: string): Promise<Webpage>;
    getUserWebpages(req: any): Promise<any[]>;
    getUserRole(webpageId: string, req: any): Promise<{
        role: string;
    }>;
    findAllUsersForWebpage(webpageId: string): Promise<any[]>;
    removeUser(webpageId: string, userId: string): Promise<Webpage>;
    setMainPost(webpageId: string, postId: Types.ObjectId): Promise<Webpage>;
    addTrendingPost(webpageId: string, postId: Types.ObjectId): Promise<Webpage>;
    removeTrendingPost(webpageId: string, postId: string): Promise<Webpage>;
    getPostsForWebpage(webpageId: string): Promise<{
        trendingPosts: BackendPost[];
        mainPost: BackendPost | null;
    }>;
    getPostsForWebpageNoAuth(webpageId: string): Promise<{
        trendingPosts: BackendPost[];
        mainPost: BackendPost | null;
    }>;
}
