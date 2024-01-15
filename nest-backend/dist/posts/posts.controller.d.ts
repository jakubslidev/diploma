import { PostsService } from './posts.service';
import { Post as PostModel } from './posts.schema';
import { WebpageValidationService } from '../authz/webpage-validation.service';
import { UpdatePostDto } from './update-post.dto';
export declare class PostsController {
    private readonly postsService;
    private readonly webpageValidationService;
    constructor(postsService: PostsService, webpageValidationService: WebpageValidationService);
    addPostToWebpage(webpageId: string, postData: Partial<PostModel>, categoryId: string, req: any): Promise<PostModel>;
    getNewestPosts(webpageId: string): Promise<PostModel[]>;
    getPostsByCategory(categoryId: string, webpageId: string): Promise<PostModel[]>;
    findAll(): Promise<PostModel[]>;
    findOne(id: string): Promise<PostModel>;
    findAllForWebpageBackOffice(webpageId: string, req: any): Promise<PostModel[]>;
    findAllForWebpageView(webpageId: string, req: any): Promise<PostModel[]>;
    findAllForUserView(webpageId: string, req: any): Promise<PostModel[]>;
    findAllForUserViewLazy(webpageId: string, skip?: number, limit?: number): Promise<PostModel[]>;
    findAllForWebpageLimited(webpageId: string): Promise<PostModel[]>;
    updatePostStatus(id: string, status: string): Promise<PostModel>;
    updatePost(id: string, updatePostDto: UpdatePostDto): Promise<PostModel>;
    deletePost(id: string): Promise<void>;
    search(webpageId: string, query: string): Promise<PostModel[]>;
    getPostsBySubcategory(webpageId: string, categoryId: string, subcategory: string): Promise<PostModel[]>;
}
