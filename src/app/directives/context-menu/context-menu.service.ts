import { PodcastRepositoryService } from 'src/app/services/repository/search-repository/podcast-repository.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PLAYLIST_ARRAY_MOCK } from 'src/constants/mocks/playlist.mock.constants';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ContextMenuService {

  mousePos$ = new BehaviorSubject<{x: number, y: number}>({x: 0, y: 0});
  contextMenuActive$ = new BehaviorSubject<boolean>(false);
  mouseLeft: boolean = true;
  selectedId$ = new BehaviorSubject<number>(0);

  constructor(
    private readonly router: Router
  ) {
  }

  activateContextMenu(mousePos: { x: number; y: number; }) {
    this.mousePos$.next(mousePos);
    this.contextMenuActive$.next(true);
  }
  deactivateContextMenu() {
    if(this.mouseLeft) {
      this.contextMenuActive$.next(false);
    }
  }
  navigateToCreateNewPlaylist() {
    this.router.navigate(['search/podcast/episode']);
    this.deactivateContextMenu();
  }

}
