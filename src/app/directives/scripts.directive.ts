import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[script]'
})
export class ScriptDirective{

  @Input('script') script: string = "";
  private isInitialized = false;

  constructor(private readonly element: ElementRef) {
  }

  ngOnInit() {
    if (this.isInitialized) return;
    this.isInitialized = true;
    const scriptElement = document.createElement("script");
    scriptElement.src = this.script;
    this.element.nativeElement.appendChild(scriptElement);
  }



}
