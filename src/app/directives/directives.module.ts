import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContextMenuDirective } from './context-menu/context-menu.directive';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { ClickOutsideDirective } from './click-outside/click-outside.directive';





@NgModule({
  declarations: [
    ContextMenuDirective,
    ContextMenuComponent,
    ClickOutsideDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ContextMenuDirective,
    ContextMenuComponent,
    ClickOutsideDirective
  ]
})
export class DirectivesModule {
}
