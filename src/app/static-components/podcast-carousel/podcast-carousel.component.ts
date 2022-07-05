import {
    Component, Input,
    OnInit
} from "@angular/core";
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from "rxjs";
import { MediaHelperService } from "src/app/services/media-helper/media-helper.service";
import { Podcast } from "src/app/services/repository/search-repository/models/podcast.model";
import { UserService } from "src/app/services/user/user.service";

@Component({
  selector: 'app-podcast-carousel',
  templateUrl: './podcast-carousel.component.html',
  styleUrls: ['./podcast-carousel.component.scss']
})
export class PodcastCarouselComponent implements OnInit {
  @Input() items: Podcast[] = [];
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    autoplayHoverPause: true,
    dots: false,
    navSpeed: 600,
    navText: ['&#8249', '&#8250;'],
    responsive: {
      0: {
        items: 2
      },
      500: {
        items: 4
      },
      760: {
        items: 5
      },
      1000: {
        items: 5
      }
    },
    nav: true
  }
  isConnected = false;
  subscriptions: Subscription[] = [];
  constructor(private readonly mediaHelper: MediaHelperService, private readonly userService: UserService) { }

  ngOnInit(): void {
    this.isConnected = this.userService.isUserLoggedIn();
    this.subscriptions.push(this.userService.onUserStateChanged.subscribe(connected => {
      this.isConnected = connected;
    }));
  }

  add(podcast: Podcast) {
    if (podcast) {
      this.mediaHelper.addOrRemoveBookmark(podcast.podcastId);
    }
  }

}
