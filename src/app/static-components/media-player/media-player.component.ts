import { Component, OnInit, ViewChild } from '@angular/core';
import { VgMuteComponent } from '@videogular/ngx-videogular/controls';
import { VgApiService, VgUtilsService } from '@videogular/ngx-videogular/core';
import { BehaviorSubject } from 'rxjs';
import { MediaPlayerService } from 'src/app/services/media-player/media-player.service';
import { MediaRepositoryService } from 'src/app/services/repository/media-repository/media-repository.service';
import { Episode } from 'src/app/services/repository/search-repository/models/episode.model';
import { Reward } from 'src/app/services/repository/user-repository/models/reward.model';
import { UserService } from 'src/app/services/user/user.service';
import { DefaultEpisode } from 'src/constants/mocks/episode-default.mock.constants';
import { Volume } from '../../../constants/media/enums/volume.enum';
import { MediaPlayerState } from './mediaplayer-state';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.scss']
})
export class MediaPlayerComponent implements OnInit {

  currentTrack: any;
  track = new BehaviorSubject<Episode>(DefaultEpisode);
  currentVolume: Volume = Volume.Loud;

  public mediaPlayerState: MediaPlayerState = MediaPlayerState.MAXIMIZED;
  public preload: string = 'auto';
  public api: VgApiService | undefined;
  public readyToPlay: boolean = false;
  public audio: string | undefined;
  public initialized = false;
  public isPlaying = false;
  public rewards: Reward = { total: 0, vested: 0, unvested: 0 };
  public currentTime: any;
  public totalTime: any;
  public isMobile: any;
  public isLoggedIn = false;
  @ViewChild('volume') volumeComponent: VgMuteComponent | undefined;

  private readonly updatesBetweenHeartbeat = 10;
  private updates: number = 0;

  constructor(
    private readonly mediaPlayerService: MediaPlayerService,
    private readonly mediaRepositoryService: MediaRepositoryService,
    private readonly userService: UserService) { }

  ngOnInit(): void {
    this.isMobile = VgUtilsService.isMobileDevice() || VgUtilsService.isiOSDevice();
    this.userService.userLoggedIn.subscribe(value => this.isLoggedIn = value);
    this.userService.onRewardsChanged.subscribe((rewards: Reward) => {
      this.rewards = rewards;
    })
    this.mediaPlayerService.changedPlayState.subscribe(state => {
      if (state) {
        this.play();
      } else {
        this.pause();
      }
    });

    this.mediaPlayerService.onTrackChanged.subscribe(nextTrack => {
      this.changeSource(nextTrack);
    });

    if (this.mediaPlayerService.track) {
      this.changeSource(this.mediaPlayerService.track);
    }

    this.track.subscribe(value => {
      this.pause();
      this.audio = value.audio;
      this.currentTrack = value;
    });
  }

  togglePlayer() {
    this.mediaPlayerState = this.mediaPlayerState == MediaPlayerState.MAXIMIZED || this.mediaPlayerState == MediaPlayerState.OPEN ? MediaPlayerState.MINIMIZED : MediaPlayerState.MAXIMIZED;
  }

  onPlayerReady(api: VgApiService) {
    this.api = api;
    this.api.getDefaultMedia().subscriptions.ended.subscribe(
      () => {
        // Set the video to the beginning
        if (this.api) {
          this.mediaRepositoryService.stop(this.track.value.podcast_id, this.track.value.aboat_id).subscribe(
            rewards => this.userService.updateRewards(rewards)
          );
          this.api.getDefaultMedia().currentTime = 0;
        }
        this.mediaPlayerService.nextTrack();
      }
    );
    this.api.getDefaultMedia().subscriptions.timeUpdate.subscribe(
      (timeUpdate: any) => {
        this.updates++;
        if (this.updates > this.updatesBetweenHeartbeat) {
          this.updates = 0;
          this.mediaRepositoryService.heartbeat(this.track.value.podcast_id, this.track.value.aboat_id).subscribe(
            rewards => this.userService.updateRewards(rewards)
          );
        }
      });
    this.api.getDefaultMedia().subscriptions.playing.subscribe(
      () => {
        this.mediaRepositoryService.play(this.track.value.podcast_id, this.track.value.aboat_id).subscribe(
          result => this.userService.updateRewards(result)
        );
        this.isPlaying = true;
      }
    )
    this.api.getDefaultMedia().subscriptions.pause.subscribe(
      () => {
        this.mediaRepositoryService.pause(this.track.value.podcast_id, this.track.value.aboat_id).subscribe(
          result => this.userService.updateRewards(result)
        );
        this.isPlaying = false;
      }
    )
    this.api.getDefaultMedia().subscriptions.volumeChange.subscribe(
      () => {
        if (this.api?.volume === 0) {
          if (this.currentVolume != Volume.Muted) {
            this.mediaRepositoryService.mute(this.track.value.podcast_id, this.track.value.aboat_id).subscribe(
              result => this.userService.updateRewards(result)
            );
          }
          this.currentVolume = Volume.Muted

        } else if (this.api?.volume > 0) {
          if (this.currentVolume == Volume.Muted) {
            this.mediaRepositoryService.unmute(this.track.value.podcast_id, this.track.value.aboat_id).subscribe(
              result => this.userService.updateRewards(result)
            );
          }
          if (this.api?.volume < 0.33) {
            this.currentVolume = Volume.Reduced
          } else if (this.api?.volume > 0.66) {
            this.currentVolume = Volume.Loud
          } else {
            this.currentVolume = Volume.Normal
          }
        }
      }
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

  forward() {
    if (this.api) {
      this.api.getDefaultMedia().currentTime += 15;
    }
  }

  backward() {
    if (this.api) {
      this.api.getDefaultMedia().currentTime -= 15;
    }
  }

  toggleMute() {
    this.volumeComponent?.changeMuteState();
  }

  getRoundedTotalReward(): number {
    return Math.round(this.rewards.total);
  }

  changeSource(nextTrack: Episode) {
    this.track.next(nextTrack);
  }

}
