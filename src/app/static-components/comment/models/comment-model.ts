export interface CommentModel {
    commentId: number;
    userId: number;
    linkedId: number; //podcastId, episodeId
    timestamp: string;
    content: string;
    edited: boolean;
}