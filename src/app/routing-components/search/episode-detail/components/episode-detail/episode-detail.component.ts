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

  constructor(private readonly websiteStateService: WebsiteStateService,
    public readonly episodeDetailService: EpisodeDetailRepositoryService) { }

  ngOnInit(): void {
    this.canNavigateBack = this.websiteStateService.canNavigateBack();
    this.episodeDetailService.getEpisodeDetails().subscribe(res => {
      console.log("episode single");
      console.log(res);

      this.currentEpisode = res;

      if (res != undefined && res != null) {
        this.episodeDetailService.getPodcastEpisodesList(this.currentEpisode.podcastId).subscribe(res => {
          console.log("podcast list");
          console.log(res);
          this.episodes = res;
        });
      }
    });

  }

  backNavigation() {
    this.websiteStateService.backNavigation();
  }

}
