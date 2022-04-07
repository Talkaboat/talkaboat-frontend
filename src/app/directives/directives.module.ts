import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContextMenuDirective } from './context-menu/context-menu.directive';
import { ClickOutsideDirective } from './click-outside/click-outside.directive';





@NgModule({
  declarations: [
    ContextMenuDirective,
    ClickOutsideDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ContextMenuDirective,
    ClickOutsideDirective
  ]
})
export class DirectivesModule {
}
