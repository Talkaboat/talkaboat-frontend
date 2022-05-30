import { Episode } from "../episode.model";

export interface PlaylistTrack {
  playlistTrack_Id?: number;
  playlist_id: number;
  episode_Id: number;
  episode?: Episode;
  position: number;
}
