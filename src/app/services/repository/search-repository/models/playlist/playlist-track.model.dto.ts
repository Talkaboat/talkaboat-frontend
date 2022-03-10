import { Episode } from "../episode.model";

export interface PlaylistTrack {
  PlaylistTrack_Id?: number;
  playlist_id: number;
  episode_id: number;
  episode?: Episode;
}
