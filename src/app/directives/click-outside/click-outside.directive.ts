import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[clickOutside]',
})
export class ClickOutsideDirective {

  isInit = false;
  @Output() clickOutside = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) {
    setTimeout(() => {
      this.isInit = true;
    }, 500);
   }

  @HostListener('document:click', ['$event.target'])
  public onClick(target: any) {
    if (!this.isInit) {
      return;
    }
    const clickedInside = this.elementRef.nativeElement.contains(target);
    if (!clickedInside) {
      this.clickOutside.emit();
    }
  }
}
