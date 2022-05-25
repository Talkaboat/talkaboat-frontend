import { OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { Subscription } from 'rxjs';
import { MediaPlayerService } from 'src/app/services/media-player/media-player.service';

@Pipe({
  name: 'isPlaying',
  pure: false
})
export class IsPlaying implements PipeTransform, OnDestroy {

  private shouldToggle = true;
  private changedTrack: Subscription = new Subscription();
  private value: boolean = false;

  constructor(private readonly mediaPlayerService: MediaPlayerService) {
    this.changedTrack = mediaPlayerService.onTrackChanged.subscribe(_ => {
      this.shouldToggle = true;
    });
  }
  ngOnDestroy(): void {
    this.changedTrack.unsubscribe();
  }

  transform(value: number, playType: number): boolean {
    if (!this.shouldToggle) {
      return this.value;
    }
    switch (playType) {
      case 0: this.value = this.mediaPlayerService.isCurrentlyPlayedFromPodcast(value);
        break;
      case 1: this.value = this.mediaPlayerService.isCurrentlyPlayedTrack(value);
        break;
      case 2: this.value = value == this.mediaPlayerService.playlistId;
    }
    this.shouldToggle = false;
    return this.value;
  }



}
