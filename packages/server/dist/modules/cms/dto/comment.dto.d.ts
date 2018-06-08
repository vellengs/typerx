export declare class CreateCommentDto {
}
export declare class EditCommentDto {
    id: string;
}
export declare class CommentResponse {
}
export interface PaginateComment {
    error?: Error;
    list: Array<CommentResponse>;
    total: number;
}
