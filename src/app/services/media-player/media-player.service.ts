import { EventEmitter, Injectable } from '@angular/core';
import { Episode } from '../repository/search-repository/models/episode.model';
import { PodcastSearchResult } from '../repository/search-repository/models/podcast-search-result.model';

@Injectable({
  providedIn: 'root'
})
export class MediaPlayerService {
  public rewardPerMin: number = 0;
  public time: number = 0;
  public isPlaying: boolean = false;
  public track?: Episode;
  public estimatedReward: number = 0;
  public onTrackChanged = new EventEmitter<Episode>();
  public changedPlayState = new EventEmitter<boolean>();
  constructor() {

    const trackJson = localStorage.getItem("last_track");
    if (trackJson) {
      this.track = JSON.parse(trackJson);
      this.onTrackChanged.emit(this.track);
    }
  }

  async setTrackFromPodcastSearchResult(track: PodcastSearchResult, autoplay: boolean = false) {
    const episode: Episode | undefined = this.getEpisodeFromPodcastSearchResult(track);
    if (episode) {
      this.setTrack(episode, autoplay);
    }
  }

  async setTrack(episodeData: Episode, autoplay: boolean, podcastData: any = null) {
    if (podcastData) {
      episodeData.podcast = podcastData;
    }
    localStorage.setItem("last_track", JSON.stringify(episodeData));
    this.track = episodeData;
    this.onTrackChanged.emit(this.track);
    await this.delay(500);
    this.setPlayState(autoplay);
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
      aboat_id: podcastSearchResult.aboat_id,
      podcast_id: podcastSearchResult.podcast?.aboat_id,
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

  //#endregion
}
