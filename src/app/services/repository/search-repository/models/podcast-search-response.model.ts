import { PodcastSearchResult } from "./podcast-search-result.model";

export interface PodcastSearchResponse {
    took: number;
    count: number;
    total: number;
    results: PodcastSearchResult[];
    next_offset: number;
}