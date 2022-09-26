export class EpisodeDetailModel {
    episodeId!: number;
    podcastId!: number;
    website!: string;
    audio!: string;
    image!: string;
    title!: string;
    thumbnail!: string;
    transcript!: string;
    transcriptUrl!: string;
    description!: string;
    shortDescription!: string;
    pubDateInMilliseconds!: number;
    audioLengthInSeconds!: number;
    explicitContent!: boolean;
    audioInvalid!: boolean;
}