import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { listAnimation, listItemAnimation } from 'src/app/animations';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { MediaHelperService } from 'src/app/services/media-helper/media-helper.service';
import { MediaPlayerService } from 'src/app/services/media-player/media-player.service';
import { Episode } from 'src/app/services/repository/search-repository/models/episode.model';
import { Podcast } from 'src/app/services/repository/search-repository/models/podcast.model';
import { PodcastRepositoryService } from 'src/app/services/repository/search-repository/podcast-repository.service';
import { UserService } from 'src/app/services/user/user.service';
import { WebsiteStateService } from 'src/app/services/website-state/website-state.service';

@Component({
  selector: 'app-podcast-detail',
  templateUrl: './podcast-detail.component.html',
  styleUrls: ['./podcast-detail.component.scss'],
  animations: [listAnimation, listItemAnimation]
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
  constructor(private readonly websiteStateService: WebsiteStateService, private readonly mediaService: MediaHelperService, private readonly podcastRepository: PodcastRepositoryService, private readonly userService: UserService, private readonly route: ActivatedRoute, private readonly loaderService: LoaderService, private readonly mediaPlayerService: MediaPlayerService) { }

  ngOnInit(): void {
    this.subscriptions.push(this.route.queryParams.subscribe(params => {
      if (params["pd"]) {
        this.podcastId = params["pd"];
        if (this.mediaService.lastPodcastDetail && this.mediaService.lastPodcastDetail.id === this.podcastId) {
          this.podcastData = this.mediaService.lastPodcastDetail;
          this.genreNames = this.mediaService.getGenreNamesFromIds(this.podcastData.genre_ids);
        } else {
          this.loaderService.show();
          this.podcastRepository.getPodcast(this.podcastId).subscribe({
            next: (responseData: Podcast) => {
              this.podcastData = responseData;
              this.mediaService.lastPodcastDetail = this.podcastData;
              this.genreNames = this.mediaService.getGenreNamesFromIds(this.podcastData.genre_ids);
            },
            error: error => {
              this.notFound = true;
            },
            complete: () => {
              this.loaderService.hide();
            }
          });
        }
      }
    }));
    this.canNavigateBack = this.websiteStateService.canNavigateBack();
  }

  backNavigation() {
    this.websiteStateService.backNavigation();
  }

  play(episode: Episode | undefined) {
    if (!this.podcastData || !this.podcastData.episodes || this.podcastData.episodes.length <= 0) {
      return;
    }
    if (episode) {
      this.mediaPlayerService.setTrack(episode, true, this.podcastData);
    } else {

      this.mediaPlayerService.setTrack(this.podcastData?.episodes[0], true, this.podcastData);
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

  addToPlaylist(episode: Episode) {

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
