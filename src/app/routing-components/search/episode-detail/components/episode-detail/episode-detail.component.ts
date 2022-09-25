import { Component, Input, OnInit } from '@angular/core';
import { listAnimation, listItemAnimation } from 'src/app/animations';
import { WebsiteStateService } from 'src/app/services/website-state/website-state.service';
import { EpisodeDetailModel } from '../../models/EpisodeModel';
import { EpisodeDetailRepositoryService } from '../../../../../services/repository/episode-detail-repository/episode-detail-repository.service';
import { CommentRepositoryService } from 'src/app/services/repository/comment-repository/comment-repository.service';
import { BehaviorSubject } from 'rxjs';

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
    public readonly episodeDetailRepositoryService: EpisodeDetailRepositoryService) { }

  ngOnInit(): void {
    this.canNavigateBack = this.websiteStateService.canNavigateBack();
    this.episodeDetailRepositoryService.currentEpisodeId.subscribe(() => {
      this.getEpisodeDetails();
    });
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
