import { Component, OnInit } from '@angular/core';
import { listAnimation, listItemAnimation } from 'src/app/animations';
import { WebsiteStateService } from 'src/app/services/website-state/website-state.service';

@Component({
  selector: 'app-episode-detail',
  templateUrl: './episode-detail.component.html',
  styleUrls: ['./episode-detail.component.scss'],
  animations: [listAnimation, listItemAnimation]
})
export class EpisodeDetailComponent implements OnInit {

  canNavigateBack: boolean = false;

  constructor(private readonly websiteStateService: WebsiteStateService) { }

  ngOnInit(): void {
    this.canNavigateBack = this.websiteStateService.canNavigateBack();
  }

  backNavigation() {
    this.websiteStateService.backNavigation();
  }

}
