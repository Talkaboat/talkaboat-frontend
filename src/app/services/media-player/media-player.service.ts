import { EventEmitter, Injectable } from '@angular/core';
import { Episode } from '../repository/search-repository/models/episode.model';
import { Playlist } from '../repository/search-repository/models/playlist/playlist.model.dto';
import { PodcastSearchResult } from '../repository/search-repository/models/podcast-search-result.model';
import { Podcast } from '../repository/search-repository/models/podcast.model';

@Injectable({
  providedIn: 'root'
})
export class MediaPlayerService {
  public rewardPerMin: number = 0;
  public time: number = 0;
  public isPlaying: boolean = false;
  public track?: Episode;
  public playlist: Episode[] = [];
  public playlistId: any = -1;
  public currentTrackIndex = 0;
  public estimatedReward: number = 0;
  public onTrackChanged = new EventEmitter<Episode>();
  public changedPlayState = new EventEmitter<boolean>();
  constructor() {

    this.currentTrackIndex = Number.parseInt(localStorage.getItem("last_track_index") || "0");
    this.playlistId = Number.parseInt(localStorage.getItem("last_playlist_id") || "0") ;
    const playlistJson = localStorage.getItem("playlist");
    if (playlistJson) {
      this.playlist = JSON.parse(playlistJson);
      this.track = this.playlist[this.currentTrackIndex];
      this.onTrackChanged.emit(this.track);
    }
  }

  async setTrackFromPodcastSearchResult(track: PodcastSearchResult, autoplay: boolean = false) {
    const episode: Episode | undefined = this.getEpisodeFromPodcastSearchResult(track);
    if (episode) {
      this.setTrack(episode, autoplay);
    }
  }

  nextTrack() {
    this.currentTrackIndex += 1;
    localStorage.setItem("last_track_index", this.currentTrackIndex >= this.playlist.length ? "0" : this.currentTrackIndex.toString());
    if (this.playlist && this.playlist.length > 1 && this.currentTrackIndex < this.playlist.length) {
      this.setTrack(this.playlist[this.currentTrackIndex], true)
   }
  }

  isCurrentlyPlayedFromPodcast(podcastId: any): boolean {
    if (!this.track) return false;
    return this.track && this.track.podcastId == podcastId;
  }

  isCurrentlyPlayedTrack(episodeId: any): boolean {
    if (!this.track) return false;
    return this.track.episodeId == episodeId;
  }

  async setTrack(episodeData: Episode, autoplay: boolean, podcastData: any = null, clearPlaylist?: boolean) {
    if (podcastData) {
      episodeData.podcast = this.podcastConverted(podcastData);
    }
    if (clearPlaylist) {
      this.playlist = [];
      this.playlist.push(episodeData);
      localStorage.setItem("playlist", JSON.stringify(this.playlist));
    }
    localStorage.setItem("last_track_index", this.currentTrackIndex.toString());

    this.track = episodeData;

    this.onTrackChanged.emit(this.track);
    await this.delay(500);
    this.setPlayState(autoplay);
  }

  updateLocalStoragePlaylist(currentTrackData: Episode) {
    this.playlist[this.currentTrackIndex] = currentTrackData;
    localStorage.setItem("last_track_index", this.currentTrackIndex.toString());
    localStorage.setItem("playlist", JSON.stringify(this.playlist));
  }

  SetPlaylist(playlist: Playlist, autoplay: boolean, startFromTrack = 0) {

    this.playlistId = playlist.playlistId;
    localStorage.setItem("last_playlist_id", this.playlistId);
    this.currentTrackIndex = startFromTrack;
    var init = 0;
    if (playlist.tracks) {
      for (var track of playlist.tracks) {
        if (!track.episode) {
          continue;
        }
        if (init == startFromTrack) {
          this.setTrack(track.episode, autoplay, track.episode.podcast, true);
        } else {
          this.AddEpisodesToList([track.episode], track.episode.podcast);
        }
        init++;
      }
    }
  }

  async AddEpisodesToList(playlistEpisodes: Episode[], podcastData: any = null, relyingEpisode?: Episode) {

    if (relyingEpisode) {
      if (this.track?.episodeId != relyingEpisode.episodeId) {
        return;
      }
    }
    let podcast: any = null;
    if (podcastData) {
      podcast = this.podcastConverted(podcastData);
    }
    playlistEpisodes.forEach(episode => {
      episode.podcast = podcast;
      this.playlist.push(episode);
    });
  }

  async setPlayState(to: boolean) {
    this.isPlaying = to;
    this.changedPlayState.emit(to);
  }

  //#region Helper
  delay(ms: number) : Promise<any> {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  getEpisodeFromPodcastSearchResult(podcastSearchResult: PodcastSearchResult): Episode | undefined {
    if (!podcastSearchResult.podcast || !podcastSearchResult.audio) {
      return undefined;
    }
    return {
      episodeId: podcastSearchResult.aboat_id,
      podcastId: podcastSearchResult.podcast?.podcastId,
      id: podcastSearchResult.id,
      link: podcastSearchResult.link!,
      audio: podcastSearchResult.audio,
      image: podcastSearchResult.image,
      title: podcastSearchResult.title_original,
      description: podcastSearchResult.description_original,
      thumbnail: podcastSearchResult.thumbnail!,
      transcript: '',
      podcast: podcastSearchResult.podcast,
      pub_date_ms: podcastSearchResult.pub_date_ms,
      audio_length_sec: podcastSearchResult.audio_length_sec,
    }
  }

  public podcastConverted(podcast: Podcast): Podcast {
    return {
      podcastId: podcast.podcastId,
      id: podcast.id,
      image: podcast.image,
      intro: podcast.intro,
      genre_ids: podcast.genre_ids,
      thumbnail: podcast.thumbnail,
      listen_score: podcast.listen_score,
      title_original: podcast.title_original ? podcast.title_original! : podcast.title!,
      title: podcast.title,
      listennotes_url: podcast.listennotes_url,
      publisher_original: podcast.publisher_original,
      description: podcast.description
    };
  }

  //#endregion
}
