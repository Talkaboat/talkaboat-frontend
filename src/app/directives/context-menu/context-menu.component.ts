import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

  @ViewChild('contextMenu') contextMenuElementRef: ElementRef | undefined;

  constructor(
    private readonly contextMenuService: ContextMenuService
  ) { }

  ngOnInit(): void {
    this.contextMenuService.mousePos.subscribe((value: {x: number, y: number}) => {
      if (this.noSpaceToTheRight(value.x)) {
        this.offsetLeft = value.x - this.contextMenuElementRef?.nativeElement.offsetWidth;
      } else {
        this.offsetLeft = value.x;
      }
      this.offsetTop = value.y;
    });
    this.contextMenuService.contextMenuActive.subscribe(value => this.contextMenuActive = value);
  }

  deactivateContextMenu() {
    this.contextMenuService.deactivateContextMenu();
  }

  noSpaceToTheRight(clickPositionX: number): boolean {
    return window.innerWidth - clickPositionX - 15 < this.contextMenuElementRef?.nativeElement.offsetWidth;
  }

  noSpaceToTheBottom(clickPositionY: number): boolean {
    console.log(window.innerHeight, clickPositionY, this.contextMenuElementRef?.nativeElement.offsetHeight)
    return window.innerHeight - clickPositionY - 15 < this.contextMenuElementRef?.nativeElement.offsetHeight;
  }
}

