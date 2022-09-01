export interface CommentDtoModel {
    commentId: number;
    userId: number;
    userName: string;
    timestamp: string;
    content: string;
    edited: boolean;
}