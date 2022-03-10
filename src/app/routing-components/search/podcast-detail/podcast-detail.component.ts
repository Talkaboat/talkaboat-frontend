import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { MediaHelperService } from 'src/app/services/media-helper/media-helper.service';
import { Podcast } from 'src/app/services/repository/search-repository/models/podcast.model';
import { PodcastRepositoryService } from 'src/app/services/repository/search-repository/podcast-repository.service';
import { UserService } from 'src/app/services/user/user.service';
import { WebsiteStateService } from 'src/app/services/website-state/website-state.service';
import { PODCAST_DETAIL_MOCK } from 'src/constants/mocks/podcast-detail.mock.constants';

@Component({
  selector: 'app-podcast-detail',
  templateUrl: './podcast-detail.component.html',
  styleUrls: ['./podcast-detail.component.scss']
})
export class PodcastDetailComponent implements OnInit {

  canNavigateBack: boolean = false;
  podcastId: string = '';
  podcastData?: Podcast;
  notFound: boolean = false;
  isLoading = true;
  isDescriptionOpen = false;
  genreNames: string[] = [];
  subscriptions: Subscription[] = [];
  constructor(private readonly websiteStateService: WebsiteStateService, private readonly mediaService: MediaHelperService, private readonly podcastRepository: PodcastRepositoryService, private readonly userService: UserService, private readonly route: ActivatedRoute, private readonly loaderService: LoaderService) { }

  ngOnInit(): void {
    // this.subscriptions.push(this.route.queryParams.subscribe(params => {
    //   if (params["pd"]) {
    //     this.podcastId = params["pd"];
    //     this.loaderService.show();
    //     this.podcastRepository.getPodcast(this.podcastId).subscribe({
    //       next: (responseData: Podcast) => {
    //         this.podcastData = responseData;
    //         this.genreNames = this.mediaService.getGenreNamesFromIds(this.podcastData.genre_ids);
    //       },
    //       error: error => {
    //         this.notFound = true;
    //       },
    //       complete: () => {
    //         this.loaderService.hide();
    //       }
    //     });
    //   }
    // }));
    this.podcastData = JSON.parse(JSON.stringify(PODCAST_DETAIL_MOCK));
    this.canNavigateBack = this.websiteStateService.canNavigateBack();
    this.genreNames = this.mediaService.getGenreNamesFromIds(this.podcastData?.genre_ids);
    console.log(this.podcastData?.episodes!);
  }

  backNavigation() {
    this.websiteStateService.backNavigation();
  }

  play(episodeIndex: number) {
    if (this.podcastData && this.podcastData.episodes && this.podcastData.episodes.length > 0) {

    }
  }

  getDate(date: number) {
    return new Date(date).toLocaleDateString();
  }

  isBookmarked() {
    return this.podcastData ? this.mediaService.isBookmarked(this.podcastData.aboat_id) : false;
  }

  loadMoreEpisodes() {
    if (!this.podcastData || !this.podcastData.episodes || !this.podcastData.total_episodes || this.podcastData.episodes.length >= this.podcastData.total_episodes) {
      return;
    }
    this.podcastRepository.getPodcast(this.podcastId, "asc", this.podcastData.episodes[this.podcastData.episodes.length - 1].pub_date_ms).subscribe((result: Podcast) => {
      if (result && result.episodes) {
        result.episodes.forEach(element => {
          if (this.podcastData && this.podcastData.episodes) {
            this.podcastData.episodes.push(element);
          }
        });
      }
    });
  }

  async bookmark() {
    if (!this.userService.isUserLoggedIn() || !this.podcastData) {
      return;
    }
    if (this.isBookmarked()) {
      this.podcastRepository.removeBookmark(this.podcastData.aboat_id).subscribe(() => {
        this.mediaService.getLibrary();
      });
    } else {
      this.podcastRepository.addBookmark(this.podcastData.aboat_id).subscribe(() => {
        this.mediaService.getLibrary();
      });
    }
  }



}
