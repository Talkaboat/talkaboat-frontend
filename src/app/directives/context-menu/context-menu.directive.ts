import { ContextMenuService } from './context-menu.service';
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appContextMenu]'
})
export class ContextMenuDirective {
  mousePos: { x: number, y: number } = { x: 0, y: 0 };
  @Input()
  podcastId = 0;

  constructor(
    private el: ElementRef,
    private readonly contextMenuService: ContextMenuService
  ) { }

  @HostListener('mouseup', ['$event'])
  onMouseClick(event: MouseEvent) {
    this.mousePos.x = event.pageX;
    this.mousePos.y = event.pageY;
    this.contextMenuService.selectedId$.next(this.podcastId);
    this.contextMenuService.activateContextMenu(this.mousePos);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.contextMenuService.mouseLeft = true;
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.contextMenuService.mouseLeft = false;
  }
}
