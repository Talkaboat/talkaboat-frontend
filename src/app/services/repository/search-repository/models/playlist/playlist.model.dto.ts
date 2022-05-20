import { PlaylistTrack } from "./playlist-track.model.dto";

export interface Playlist {
  playlist_Id: number;
  name: string;
  image?: string;
  tracks?: PlaylistTrack[];
}
