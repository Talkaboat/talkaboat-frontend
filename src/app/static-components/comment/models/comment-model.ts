export interface CommentModel {
    commentId: number;
    userId: number;
    linkedId: number; //podcastId, episodeId
    timestamp: Date;
    content: string;
    edited: boolean;
}