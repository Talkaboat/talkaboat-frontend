export interface CommentDtoModel {
    commentId: number;
    userId: number;
    username: string;
    timestamp: string;
    content: string;
    edited: boolean;
}