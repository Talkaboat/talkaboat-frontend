import { Component, Input, OnInit } from '@angular/core';
import { listAnimation, listItemAnimation } from 'src/app/animations';
import { WebsiteStateService } from 'src/app/services/website-state/website-state.service';
import { EpisodeDetailModel } from '../../models/EpisodeDetailModel';
import { EpisodeDetailRepositoryService } from '../../../../../services/repository/episode-detail-repository/episode-detail-repository.service';
import { CommentRepositoryService } from 'src/app/services/repository/comment-repository/comment-repository.service';
import { BehaviorSubject } from 'rxjs';
import { MediaRepositoryService } from 'src/app/services/repository/media-repository/media-repository.service';
import { MediaPlayerService } from 'src/app/services/media-player/media-player.service';

@Component({
  selector: 'app-episode-detail',
  templateUrl: './episode-detail.component.html',
  styleUrls: ['./episode-detail.component.scss'],
  animations: [listAnimation, listItemAnimation]
})
export class EpisodeDetailComponent implements OnInit {

  canNavigateBack: boolean = false;

  episodes: EpisodeDetailModel[] = []; //TODO vorschau model erstellen
  @Input()
  currentEpisode: BehaviorSubject<EpisodeDetailModel> = new BehaviorSubject(new EpisodeDetailModel());
  private podcastId: number = -1;

  constructor(private readonly websiteStateService: WebsiteStateService,
    public readonly episodeDetailRepositoryService: EpisodeDetailRepositoryService,
    private readonly mediaService: MediaPlayerService) { }

  ngOnInit(): void {
    this.canNavigateBack = this.websiteStateService.canNavigateBack();
    this.episodeDetailRepositoryService.currentEpisodeId.subscribe(() => {
      this.getEpisodeDetails();
    });
  }

  public play(): void { //TODO anders machen
    console.log(this.currentEpisode);
    this.mediaService.setTrack({
      episodeId: this.currentEpisode.value.episodeId,
      podcastId: this.currentEpisode.value.podcastId,
      id: '',
      audio: this.currentEpisode.value.audio,
      image: this.currentEpisode.value.image,
      title: this.currentEpisode.value.title,
      podcast: { genre_ids: [], id: '', image: '', podcastId: this.currentEpisode.value.podcastId },
      description: this.currentEpisode.value.description,
      audio_length_sec: this.currentEpisode.value.audioLengthInSeconds
    }, false);
  }

  private getEpisodeDetails(): void {
    this.episodeDetailRepositoryService.getEpisodeDetails().subscribe(res => {
      this.currentEpisode.next(res);

      if (res != undefined && res != null && this.podcastId != res.podcastId) {
        this.getPodcastEpisodeList();
      }
    });
  }

  private getPodcastEpisodeList(): void {
    this.episodeDetailRepositoryService.getPodcastEpisodesList(this.currentEpisode.value.podcastId).subscribe(res => {
      this.episodes = res;
    });
  }

  backNavigation() {
    this.websiteStateService.backNavigation();
  }

}
