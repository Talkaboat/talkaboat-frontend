import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Episode } from 'src/app/services/repository/search-repository/models/episode.model';
import { PodcastRepositoryService } from 'src/app/services/repository/search-repository/podcast-repository.service';
import { UserService } from 'src/app/services/user/user.service';
import { DEFAULT_EPISODES } from 'src/constants/mocks/episode-default.mock.constants';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {

  subscriptions : Subscription[] = [];
  userLibrary : number[] | null = null;
  userLibraryEpisodes : Episode[] | null = null;
  loggedIn : boolean | null = null;
  fetchedLibrary : boolean | null = null;
  brandnewEpisodes : Episode[] | null = null;
  recommendationEpisodes : Episode[] | null = null;

  constructor(private podcastService : PodcastRepositoryService, private readonly userService: UserService) { }

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
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(item => item.unsubscribe());
  }
}
