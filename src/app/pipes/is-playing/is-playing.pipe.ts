import { OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { Subscription } from 'rxjs';
import { MediaPlayerService } from 'src/app/services/media-player/media-player.service';

@Pipe({
  name: 'isPlaying',
  pure: false
})
export class IsPlaying implements PipeTransform, OnDestroy {

  private shouldToggle = true;
  private changedTrack: Subscription[] = []
  private value: boolean = false;

  constructor(private readonly mediaPlayerService: MediaPlayerService) {
    this.changedTrack.push(mediaPlayerService.onTrackChanged.subscribe(_ => {
      this.shouldToggle = true;
    }));
    this.changedTrack.push(mediaPlayerService.changedPlayState.subscribe(_ => {
      this.shouldToggle = true;
    }));
  }
  ngOnDestroy(): void {
    this.changedTrack.forEach(sub => sub.unsubscribe());
  }

  transform(value: number, playType: number, currentlyPlaying = false): boolean {
    if (!this.shouldToggle) {
      return this.value;
    }
    switch (playType) {
      case 0: this.value = this.mediaPlayerService.isCurrentlyPlayedFromPodcast(value) && (!currentlyPlaying || this.mediaPlayerService.isPlaying);
        break;
      case 1: this.value = this.mediaPlayerService.isCurrentlyPlayedTrack(value) && (!currentlyPlaying || this.mediaPlayerService.isPlaying);
        break;
      case 2: this.value = value == this.mediaPlayerService.playlistId && (!currentlyPlaying || this.mediaPlayerService.isPlaying);
    }
    this.shouldToggle = false;
    return this.value;
  }



}
