import { Model } from 'mongoose';
import { Webpage } from './webpages.schema';
import { JwtPayload } from '../authz/jwt-payload.interface';
import { Types } from 'mongoose';
import { UsersService } from '../users/users.service';
import { Post } from 'src/posts/posts.schema';
import { PostsService } from 'src/posts/posts.service';
export declare class WebpagesService {
    private readonly webpageModel;
    private usersService;
    private readonly postService;
    constructor(webpageModel: Model<Webpage>, usersService: UsersService, postService: PostsService);
    create(webpageData: any, payload: JwtPayload): Promise<{
        savedWebpage: Webpage;
        accessToken: string;
    }>;
    findAll(): Promise<Webpage[]>;
    findById(id: string): Promise<Webpage>;
    getWebpagesForUser(payload: JwtPayload): Promise<any[]>;
    findOne(webpageId: string): Promise<Webpage>;
    isUserInWebpage(userID: string, webpageId: string): Promise<boolean>;
    findAllUsersForWebpage(webpageId: string): Promise<any[]>;
    removeUserFromWebpage(userEmail: string, webpageId: string): Promise<Webpage>;
    setMainPost(webpageId: string, postId: Types.ObjectId): Promise<Webpage>;
    addTrendingPost(webpageId: string, postId: Types.ObjectId): Promise<Webpage>;
    removeTrendingPost(webpageId: string, postId: Types.ObjectId): Promise<Webpage>;
    getTrendingAndMainPosts(webpageId: string): Promise<{
        trendingPosts: Post[];
        mainPost: Post | null;
    }>;
    changeWebpageStatus(webpageId: string, newStatus: string, newTitle: string, userId: string): Promise<Webpage>;
    deleteWebpage(webpageId: string, userId: string): Promise<void>;
    getWebpageStatus(webpageId: string): Promise<{
        status: string;
    }>;
}
