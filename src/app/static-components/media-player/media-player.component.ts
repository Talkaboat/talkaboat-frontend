import { Component, OnInit } from '@angular/core';
import { WebsiteStateService } from 'src/app/services/website-state/website-state.service';
import { MediaPlayerState } from './mediaplayer-state';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.scss']
})
export class MediaPlayerComponent implements OnInit {

  track: any = {
    aboat_id: 445,
    id: 'd59cca11590d4c4a96bb136bb1d70ad8',
    audio: "https://hwcdn.libsyn.com/p/8/7/4/8746ca78e209687e/Best_Time_Before_Rally_Bitcoin_Surging_To_100k_Double_Bubble.m4a?c_id=109667018&cs_id=109667018&destination_id=2621528&expiration=1629633095&hwt=f5aef0fd81f692a9a34d60565422e078",
    audio_length_sec: 2279,
    pub_date_ms: 1629430183887,
    link: "",
    description_original: "Around the Blockchain is your favorite Cryptocurrency show discussing Bitcoin, Ethereum, Cardano, and the top altcoins. Our four crypto experts include Crypto Face, CryptoJebb, Ian Balina, and Ben Armstrong. Tune in for their insightful crypto analysis! Today we are discussing how the institutions are trying to dominate Bitcoin in the future. Will they be able to? Also, we have seen some CRAZY Ethereum gas fees. We explore why that is. Finally, is Bitcoin in a double bubble? Basically, is the bull run over? Stay tuned to find out!",

    rss: "https://bitboycrypto.libsyn.com/rss",
    title_highlighted: "Best Time Before Rally",
    title_original: "Best Time Before Rally",
    image: "https://production.listennotes.com/podcasts/the-bitboy-crypto-podcast-i9-731d2hAs-hdbAUcOjGzE.1400x1400.jpg",
    itunes_id: 1554097435,
    podcast: {
      aboat_id: 91,
      id: 'eb4fcc627e514645a5dc7d8c6d584685',
      image: "https://production.listennotes.com/podcasts/the-bitboy-crypto-podcast-i9-731d2hAs-hdbAUcOjGzE.1400x1400.jpg",
      genre_ids: [],
      thumbnail: "https://production.listennotes.com/podcasts/the-bitboy-crypto-podcast-i9-731d2hAs-hdbAUcOjGzE.1400x1400.jpg",
      title_original: "The Bitboy Crypto Podcast",
      title_highlighted: "The Bitboy Crypto Podcast",
      publisher_original: "Bitboy Crypto"
    }

  }

  public mediaPlayerState: MediaPlayerState = MediaPlayerState.MAXIMIZED;

  constructor(private readonly websiteStateService: WebsiteStateService) { }

  ngOnInit(): void {
    this.websiteStateService.onMediaPlayerStateChanged.subscribe((state: MediaPlayerState) => {

    })
  }

  togglePlayer() {
    this.mediaPlayerState = this.mediaPlayerState == MediaPlayerState.MAXIMIZED || this.mediaPlayerState == MediaPlayerState.OPEN ? MediaPlayerState.MINIMIZED : MediaPlayerState.MAXIMIZED;
  }

}
