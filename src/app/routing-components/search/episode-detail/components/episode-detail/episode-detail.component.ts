import { Component, Input, OnInit } from '@angular/core';
import { listAnimation, listItemAnimation } from 'src/app/animations';
import { WebsiteStateService } from 'src/app/services/website-state/website-state.service';
import { EpisodeDetailModel } from '../../models/EpisodeModel';
import { EpisodeDetailRepositoryService } from '../../../../../services/repository/episode-detail-repository/episode-detail-repository.service';

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
  currentEpisode!: EpisodeDetailModel;
  private podcastId: number = -1;

  constructor(private readonly websiteStateService: WebsiteStateService,
    public readonly episodeDetailService: EpisodeDetailRepositoryService) { }

  ngOnInit(): void {
    this.canNavigateBack = this.websiteStateService.canNavigateBack();
    this.episodeDetailService.currentEpisodeId.subscribe(() => {
      this.getEpisodeDetails();
    });
  }

  private getEpisodeDetails(): void {
    this.episodeDetailService.getEpisodeDetails().subscribe(res => {
      this.currentEpisode = res;

      if (res != undefined && res != null && this.podcastId != res.podcastId) {
        this.getPodcastEpisodeList();
      }
    });
  }

  private getPodcastEpisodeList(): void {
    this.episodeDetailService.getPodcastEpisodesList(this.currentEpisode.podcastId).subscribe(res => {
      this.episodes = res;
    });
  }

  backNavigation() {
    this.websiteStateService.backNavigation();
  }

}
