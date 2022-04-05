import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContextMenuDirective } from './context-menu/context-menu.directive';





@NgModule({
  declarations: [
    ContextMenuDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ContextMenuDirective
  ]
})
export class DirectivesModule {
}
