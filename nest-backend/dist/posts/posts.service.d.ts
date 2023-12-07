import { Model } from 'mongoose';
import { Post } from '../posts/posts.schema';
export declare class PostsService {
    private postModel;
    constructor(postModel: Model<Post>);
    findAll(): Promise<Post[]>;
    findOne(id: string): Promise<Post | null>;
    findAllForWebpage(webpageId: string): Promise<Post[]>;
    addPostToWebpage(webpageId: string, postData: Partial<Post>, category: string, status?: string): Promise<Post>;
    updatePostStatus(postId: string, status: string): Promise<Post | null>;
    deletePost(postId: string): Promise<void>;
}
