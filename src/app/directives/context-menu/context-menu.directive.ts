import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appContextMenu]'
})
export class ContextMenuDirective {
  mousePos: {x: number, y: number} = {x: 0, y: 0};
  constructor(private el: ElementRef) {
 }

 @HostListener('mouseup', ['$event'])
 onMouseClick(event: MouseEvent) {
  this.mousePos.x = event.pageX;
  this.mousePos.y = event.pageY;
  console.log(this.mousePos, event.pageX)
 }

}
