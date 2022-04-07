import { PlaylistTrack } from "src/app/services/repository/search-repository/models/playlist/playlist-track.model.dto";
import { Playlist } from "src/app/services/repository/search-repository/models/playlist/playlist.model.dto";
import { DefaultEpisode as episode } from "./episode-default.mock.constants";

const tracks : PlaylistTrack[] = [{
    episode_id: 1,
    playlist_id: 1,
    PlaylistTrack_Id: 1,
    episode: episode
},
{
    episode_id: 2,
    playlist_id: 1,
    PlaylistTrack_Id: 2,
    episode: episode
},
{
    episode_id: 3,
    playlist_id: 1,
    PlaylistTrack_Id: 3,
    episode: episode
}];

export const PLAYLIST_ARRAY_MOCK: Playlist[] = [
    {
        name: "Totally valid playlist name",
        image: "https://picsum.photos/200/300",
        playlist_id: 1,
        tracks : tracks
    },
    {
        name: "Totally valid playlist name aswell",
        image: "https://picsum.photos/180/270",
        playlist_id: 2,
        tracks : tracks
    },
    {
        name: "This is a name",
        image: "https://picsum.photos/170/265",
        playlist_id: 3,
        tracks : tracks
    },
    {
        name: "shorty",
        image: "https://picsum.photos/190/285",
        playlist_id: 4,
        tracks : tracks
    },
    {
        name: "short",
        image: "https://picsum.photos/190/285",
        playlist_id: 4,
        tracks : tracks
    },
    {
        name: "sh",
        image: "https://picsum.photos/150/225",
        playlist_id: 4,
        tracks : tracks
    },
];