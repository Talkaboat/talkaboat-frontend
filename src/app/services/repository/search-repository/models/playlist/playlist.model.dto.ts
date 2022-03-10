import { PlaylistTrack } from "./playlist-track.model.dto";

export interface Playlist {
  playlist_id?: number;
  name: string;
  image?: string;
  tracks?: PlaylistTrack[];
}
