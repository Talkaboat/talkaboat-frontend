import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Episode } from 'src/app/services/repository/search-repository/models/episode.model';
import { PodcastRepositoryService } from 'src/app/services/repository/search-repository/podcast-repository.service';
import { UserService } from 'src/app/services/user/user.service';
import { DEFAULT_EPISODES } from 'src/constants/mocks/episode-default.mock.constants';
import { MediaPlayerService } from 'src/app/services/media-player/media-player.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {

  currentlyPlayingEpisode : Episode | null = null;
  subscriptions : Subscription[] = [];
  userLibrary : number[] | null = null;
  userLibraryEpisodes : Episode[] | null = null;
  loggedIn : boolean | null = null;
  fetchedLibrary : boolean | null = null;
  brandnewEpisodes : Episode[] | null = null;
  recommendationEpisodes : Episode[] | null = null;

  constructor(private readonly podcastService : PodcastRepositoryService, private readonly userService: UserService, private readonly mediaPlayer : MediaPlayerService) { }

  ngOnInit(): void {
    this.brandnewEpisodes = DEFAULT_EPISODES;
    this.recommendationEpisodes = DEFAULT_EPISODES;
    this.loggedIn = this.userService.isUserLoggedIn();
    this.subscriptions.push(this.podcastService.getLibrary().subscribe((data) => {
      this.fetchedLibrary = true;
      if (data.length > 0) {
        this.userLibrary = data;
        // TODO: FETCH THE ACTUAL EPISODE DATA FOR EACH NUMBER -> CHECKOUT API?!
        // TODO: USE PODCAST DETAIL CALL INSTEAD
      }
    }, (error) => {
      console.error(error);
      this.fetchedLibrary = false;
    }));
    this.subscriptions.push(this.mediaPlayer
      .onTrackChanged
      .subscribe(episode => {
        this.currentlyPlayingEpisode = episode;
      }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(item => item.unsubscribe());
  }

  handleEpisodePlayClicked(clickedEpisode : Episode) {
    this.mediaPlayer.setTrack(clickedEpisode, true);
  }
}
