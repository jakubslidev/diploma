import { PostsService } from './posts.service';
import { Post as PostModel } from './posts.schema';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    addPostToWebpage(webpageId: string, postData: Partial<PostModel>, categoryId: string): Promise<PostModel>;
    findAll(): Promise<PostModel[]>;
    findOne(id: string): Promise<PostModel>;
    findAllForWebpageBackOffice(webpageId: string): Promise<PostModel[]>;
    findAllForWebpageView(webpageId: string): Promise<PostModel[]>;
}
