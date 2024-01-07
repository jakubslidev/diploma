import { Model } from 'mongoose';
import { Post } from '../posts/posts.schema';
import { UpdatePostDto } from './update-post.dto';
export declare class PostsService {
    private postModel;
    constructor(postModel: Model<Post>);
    findAll(): Promise<Post[]>;
    findOne(id: string): Promise<Post | null>;
    findAllForWebpage(webpageId: string): Promise<Post[]>;
    findAllActiveForWebpage(webpageId: string): Promise<Post[]>;
    findAllActiveForWebpageLimited(webpageId: string): Promise<Post[]>;
    addPostToWebpage(webpageId: string, postData: Partial<Post>, category: string, status?: string): Promise<Post>;
    updatePostStatus(postId: string, status: string): Promise<Post | null>;
    update(id: string, updatePostDto: UpdatePostDto): Promise<Post>;
    deletePost(postId: string): Promise<void>;
    searchPosts(webpageId: string, query: string): Promise<Post[]>;
}
