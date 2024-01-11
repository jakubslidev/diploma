import { CommentService } from './comments.service';
import { Comment } from './comment.interface';
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    create(commentData: Comment): Promise<Comment>;
    findAll(postId: string): Promise<Comment[]>;
}
