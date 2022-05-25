import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslateService } from 'src/app/services/i18n/translate.service';
import { MediaPlayerService } from 'src/app/services/media-player/media-player.service';
import { Episode } from 'src/app/services/repository/search-repository/models/episode.model';
import { Podcast } from 'src/app/services/repository/search-repository/models/podcast.model';
import { PodcastRepositoryService } from 'src/app/services/repository/search-repository/podcast-repository.service';
import { UserService } from 'src/app/services/user/user.service';
import { DEFAULT_EPISODES } from 'src/constants/mocks/episode-default.mock.constants';
import { PODCAST_MOCK } from 'src/constants/mocks/podcast-detail.mock.constants';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {

  currentlyPlayingEpisode : Episode | null = null;
  subscriptions : Subscription[] = [];
  userLibrary : number[] | null = null;
  userLibraryEpisodes : Podcast[] | null = null;

  loggedIn : boolean | null = null;
  fetchedLibrary : boolean | null = null;
  brandnewEpisodes : Episode[] | null = null;
  recommendationPodcasts : Podcast[] | null = null;

  constructor(private readonly translateService: TranslateService, private readonly podcastService : PodcastRepositoryService, private readonly userService: UserService, private readonly mediaPlayer : MediaPlayerService) { }

  ngOnInit(): void {
    this.recommendationPodcasts = [PODCAST_MOCK, PODCAST_MOCK];
    this.brandnewEpisodes = DEFAULT_EPISODES;
    this.loggedIn = this.userService.isUserLoggedIn();
    if (this.loggedIn) {
      this.fetchUserLibrary();
    }

    // keep track of currently played episode
    this.subscriptions.push(this.mediaPlayer
      .onTrackChanged
      .subscribe(episode => {
        this.currentlyPlayingEpisode = episode;
      }));

    // watch user status
    this.subscriptions.push(this.userService.onUserStateChanged.subscribe((data) => {
      if (data) {
        this.fetchUserLibrary();
        this.loggedIn = true;
      } else {
        this.userLibraryEpisodes = null;
        this.loggedIn = false;
      }
    }));
  }

  fetchUserLibrary(): void {
    this.subscriptions.push(this.podcastService.getLibraryDetails().subscribe((data) => {
      this.fetchedLibrary = true;
      if (data.length > 0) {
        this.userLibraryEpisodes = data;
      }
    }, (error) => {
      this.fetchedLibrary = false;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(item => item.unsubscribe());
  }

  windowSize() {
    return window.innerWidth;
  }

  handleLibraryPodcastRemoved(removedItem : Podcast) {
    if(this.userLibraryEpisodes) {
      for(let i = 0; i < this.userLibraryEpisodes.length; i++) {
        if (this.userLibraryEpisodes[i].aboat_id === removedItem.aboat_id) {
            this.userLibraryEpisodes.splice(i,1);
            break;
        }
      }
    }
  }

  handleEpisodePlayClicked(clickedEpisode : Episode) {
    this.mediaPlayer.setTrack(clickedEpisode, true);
  }
}
