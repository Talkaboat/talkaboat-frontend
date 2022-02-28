import { OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { Subscription } from 'rxjs';
import { MediaHelperService } from '../../services/media-helper/media-helper.service';

@Pipe({
  name: 'library',
  pure: false
})
export class LibraryPipe implements PipeTransform, OnDestroy {

  isBookmarked = false;
  shouldRefresh = true;
  subscription = new Subscription();

  constructor(private readonly mediaHelper: MediaHelperService) {
    this.subscription = this.mediaHelper.onLibraryChanged.subscribe(_ => {
      this.shouldRefresh = true;
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  transform(value: number, ...args: unknown[]): boolean {
    if (this.shouldRefresh) {
      this.shouldRefresh = false;
      this.isBookmarked = this.mediaHelper.isBookmarked(value);
    }

    return this.isBookmarked;
  }

}
