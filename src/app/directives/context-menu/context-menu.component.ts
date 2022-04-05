import { Component, OnInit } from '@angular/core';
import { ContextMenuService } from './context-menu.service';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent implements OnInit {

  offsetLeft: number = 0;
  offsetTop: number = 0;
  contextMenuActive: boolean = false;

  constructor(
    private readonly contextMenuService: ContextMenuService
  ) { }

  ngOnInit(): void {
    this.contextMenuService.mousePos.subscribe((value: {x: number, y: number}) => {
      this.offsetLeft = value.x;
      this.offsetTop = value.y;
    });
    this.contextMenuService.contextMenuActive.subscribe(value => this.contextMenuActive = value);
  }

  deactivateContextMenu() {
    this.contextMenuService.deactivateContextMenu();
  }

}
