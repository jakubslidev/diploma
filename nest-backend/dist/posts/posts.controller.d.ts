import { PostsService } from './posts.service';
import { Post as PostModel } from './posts.schema';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    addPostToWebpage(webpageId: string, postData: Partial<PostModel>): Promise<PostModel>;
    findAll(): Promise<PostModel[]>;
    findOne(id: string): Promise<PostModel>;
    findAllForWebpage(webpageId: string): Promise<PostModel[]>;
}
