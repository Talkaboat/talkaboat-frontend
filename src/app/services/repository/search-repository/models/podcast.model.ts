import { Episode } from "./episode.model";
import { PodcastExtras } from "./podcast-extras.model";

export interface Podcast {
  aboat_id: number;
  id: string;
  image: string;
  intro_audio?: string;
  genre_ids: number[];
  thumbnail?: string;
  listen_score?: number;
  title_original: string;
  listennotes_url?: string;
  title_highlighted?: string;
  publisher_original: string;
  publisher_highlighted?: string;
  listen_score_global_rank?: string;
  email?: string;
  type?: string;
  rss?: string;
  episodes?: Episode[];
  extra?: PodcastExtras;
  title?: string;
  country?: string;
  website?: string;
  language?: string;
  itunes_id?: number;
  is_claimed?: boolean;
  description?: string;
  total_episodes?: number;
  explicit_content?: boolean;
  latest_pub_date_ms?: number;
  earliest_pub_date_ms?: number;
  isLoading?: boolean;
}
