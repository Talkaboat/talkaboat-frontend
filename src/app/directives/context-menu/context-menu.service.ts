import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContextMenuService {

  mousePos$ = new BehaviorSubject<{x: number, y: number}>({x: 0, y: 0});
  contextMenuActive$ = new BehaviorSubject<boolean>(false);
  mouseLeft: boolean = true;
  selectedId$ = new BehaviorSubject<number>(0);

  constructor() {
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

}
