import { Component, OnInit } from '@angular/core';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { BehaviorSubject } from 'rxjs';
import { WebsiteStateService } from 'src/app/services/website-state/website-state.service';
import { MediaPlayerState } from './mediaplayer-state';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.scss']
})
export class MediaPlayerComponent implements OnInit {

  track = new BehaviorSubject<any>({
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
  });
  readonly nextTrack = {
    aboat_id: 1076,
    podcast_Id: 0,
    id: 'dedb98be11f34a489010ec88ee40cc1d',
    link: 'https://legalspeak.libsyn.com/test?utm_source=listennotes.com&utm_campaign=Listen+Notes&utm_medium=website',
    audio: 'https://www.listennotes.com/e/p/dedb98be11f34a489010ec88ee40cc1d/',
    image: 'https://cdn-images-1.listennotes.com/podcasts/legal-speak-alm-staff-6ZPcY87ITrq-tUocpFnG31O.300x300.jpg',
    title: 'Test',
    podcast: {
      aboat_id: 759,
      id: '27c2735fad5a4746b7b557143b59c432',
      image: 'https://cdn-images-1.listennotes.com/podcasts/legal-speak-alm-staff-6ZPcY87ITrq-tUocpFnG31O.300x300.jpg',
      genre_ids: [67, 93, 95, 127],
      thumbnail: 'https://cdn-images-1.listennotes.com/podcasts/legal-speak-alm-staff-6ZPcY87ITrq-tUocpFnG31O.300x300.jpg',
      title_original: null,
      listennotes_url: 'https://www.listennotes.com/c/27c2735fad5a4746b7b557143b59c432/',
      title_highlighted: null,
      publisher_original: null,
      publisher_highlighted: null,
      listen_score_global_rank: 'Please upgrade to PRO or ENTERPRISE plan to see this field',
      rss: 'Please upgrade to PRO or ENTERPRISE plan to see this field',
      type: 'episodic',
      email: 'Please upgrade to PRO or ENTERPRISE plan to see this field',
      extra: {
      },
      episodes: null,
      title: 'Legal Speak',
      country: 'United States',
      website: 'http://legalspeak.libsyn.com?utm_source=listennotes.com&utm_campaign=Listen+Notes&utm_medium=website',
      language: 'English',
      itunes_id: 1286870904,
      publisher: 'Charles Garnar',
      is_claimed: false,
      description: 'Legal Speak is a weekly podcast that makes sense of what\'s happening in the legal industry. Each episode tackles a subject that\'s worthy of a deep dive—from law firm profit hacks to Supreme Court showdowns to the most promising plays in legal tech. Hosted by Law.com Editor-in-Chief Zack Needles and Newsroom Innovation Director Vanessa Blum, Legal Speak offers straight talk from experts, plus an inside-the-newsroom perspective on market-shaping stories.',
      total_episodes: 168,
      explicit_content: false,
      latest_pub_date_ms: 1645563200000,
      earliest_pub_date_ms: 1532102058099
    },
    thumbnail: 'https://cdn-images-1.listennotes.com/podcasts/legal-speak-alm-staff-6ZPcY87ITrq-tUocpFnG31O.300x300.jpg',
    transcript: 'Please upgrade to PRO or ENTERPRISE plan to see this field',
    description: '<p>Test</p>',
    pub_date_ms: 1642804000000,
    guid_from_rss: '60672b4f-4ad3-4020-a0fd-79a6e0848214',
    listennotes_url: 'https://www.listennotes.com/e/dedb98be11f34a489010ec88ee40cc1d/',
    audio_length_sec: 1281,
    explicit_content: false,
    maybe_audio_invalid: false,
    listennotes_edit_url: 'https://www.listennotes.com/e/dedb98be11f34a489010ec88ee40cc1d/#edit'
  }

  public mediaPlayerState: MediaPlayerState = MediaPlayerState.MAXIMIZED;
  public preload: string = 'auto';
  public api: VgApiService | undefined;
  public readyToPlay: boolean = false;
  public audio: string | undefined;
  public initialized = false;

  constructor(
    private readonly websiteStateService: WebsiteStateService) { }

  ngOnInit(): void {
    this.websiteStateService.onMediaPlayerStateChanged.subscribe((state: MediaPlayerState) => {

    });
  }

  togglePlayer() {
    this.mediaPlayerState = this.mediaPlayerState == MediaPlayerState.MAXIMIZED || this.mediaPlayerState == MediaPlayerState.OPEN ? MediaPlayerState.MINIMIZED : MediaPlayerState.MAXIMIZED;
  }

  onPlayerReady(api: VgApiService) {
    this.api = api;
    this.track.subscribe(value => {
      this.pause();
      this.audio = value.audio;
    });
    this.api.getDefaultMedia().subscriptions.ended.subscribe(
      () => {
        // Set the video to the beginning
        if (this.api) {
          this.api.getDefaultMedia().currentTime = 0;
        }
      }
    );
    this.api.getDefaultMedia().subscriptions.timeUpdate.subscribe(
      (timeUpdate: any) => {
        // do smth on progress, timestamp provided under timeUpdate.timeStamp
      });
    this.api.getDefaultMedia().subscriptions.playing.subscribe(
      // do smth whenever play() is fired, timestamp provided under timeUpdate.timeStamp
    )
    this.api.getDefaultMedia().subscriptions.pause.subscribe(
      // do smth whenever pause() is fired, timestamp provided under timeUpdate.timeStamp
      console.log
    )
    this.api.getDefaultMedia().subscriptions.stalled.subscribe(
      // Fired when the browser is trying to get media data but the data is not available.
    )
    this.api.getDefaultMedia().subscriptions.seeking.subscribe(
      // Fired when a seek operation begins.
    )
    this.api.getDefaultMedia().subscriptions.seeked.subscribe(
      // Fired when a seek operation completes.
    )
    this.api.getDefaultMedia().subscriptions.canPlay.subscribe(
      () => {
        // sets autoplay attribute to only autoplay on changed source, not on initialization
        this.initialized = true;
      }
    );
  }

  play() {
    this.api?.play();
  }

  pause() {
    this.api?.pause();
  }

  skip() {
    if (this.api) {
      this.api.getDefaultMedia().currentTime += 15;
    }
  }

  back() {
    if (this.api) {
      this.api.getDefaultMedia().currentTime -= 15;
    }
  }

  changeSource() {
    this.track.next(this.nextTrack);
  }

}
