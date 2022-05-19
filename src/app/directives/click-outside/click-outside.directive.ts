import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[clickOutside]',
})
export class ClickOutsideDirective {

  isInit = false;
  @Input() onlyMobile = false;
  @Input() isActive = false;
  @Output() clickOutside = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) {
    setTimeout(() => {
      this.isInit = true;
    }, 1000);
   }

  @HostListener('document:click', ['$event.target'])
  public onClick(target: any) {
    if (!this.isActive || !this.isInit || (this.onlyMobile && window.innerWidth > 768)) {
      return;
    }
    const clickedInside = this.elementRef.nativeElement.contains(target);
    if (!clickedInside) {
      this.clickOutside.emit();
    }
  }
}
