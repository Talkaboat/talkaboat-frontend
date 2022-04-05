import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContextMenuService {


  mousePos = new BehaviorSubject<{x: number, y: number}>({x: 0, y: 0});


  constructor() {}

  activateContextMenu(mousePos: { x: number; y: number; }) {
    this.mousePos.next(mousePos);
  }

}
