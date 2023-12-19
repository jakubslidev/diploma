import { PostsService } from './posts.service';
import { Post as PostModel } from './posts.schema';
import { WebpageValidationService } from '../authz/webpage-validation.service';
export declare class PostsController {
    private readonly postsService;
    private readonly webpageValidationService;
    constructor(postsService: PostsService, webpageValidationService: WebpageValidationService);
    addPostToWebpage(webpageId: string, postData: Partial<PostModel>, categoryId: string, req: any): Promise<PostModel>;
    findAll(): Promise<PostModel[]>;
    findOne(id: string): Promise<PostModel>;
    findAllForWebpageBackOffice(webpageId: string, req: any): Promise<PostModel[]>;
    findAllForWebpageView(webpageId: string, req: any): Promise<PostModel[]>;
    findAllForUserView(webpageId: string, req: any): Promise<PostModel[]>;
    updatePostStatus(id: string, status: string): Promise<PostModel>;
    deletePost(id: string): Promise<void>;
}
