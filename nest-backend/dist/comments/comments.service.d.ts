import { Model } from 'mongoose';
import { Comment } from './comment.interface';
export declare class CommentService {
    private readonly commentModel;
    constructor(commentModel: Model<Comment>);
    create(commentData: Comment): Promise<Comment>;
    findAll(postId: string): Promise<Comment[]>;
}
