import { Component, Input, OnInit } from '@angular/core';
import { listAnimation, listItemAnimation } from 'src/app/animations';
import { WebsiteStateService } from 'src/app/services/website-state/website-state.service';
import { EpisodeDetailModel } from '../../models/EpisodeModel';
import { EpisodeDetailService } from '../../services/episode-detail.service';

@Component({
  selector: 'app-episode-detail',
  templateUrl: './episode-detail.component.html',
  styleUrls: ['./episode-detail.component.scss'],
  animations: [listAnimation, listItemAnimation]
})
export class EpisodeDetailComponent implements OnInit {

  canNavigateBack: boolean = false;

  episodes: EpisodeDetailModel[] = [];
  @Input()
  currentEpisode!: EpisodeDetailModel;

  constructor(private readonly websiteStateService: WebsiteStateService,
    private readonly episodeDetailService: EpisodeDetailService) { }

  ngOnInit(): void {
    this.canNavigateBack = this.websiteStateService.canNavigateBack();
    this.episodeDetailService.test().subscribe(res => {
      this.episodes = res;
      this.currentEpisode = this.episodes[0];
    });
  }

  backNavigation() {
    this.websiteStateService.backNavigation();
  }

}
