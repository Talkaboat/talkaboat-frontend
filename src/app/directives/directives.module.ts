import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContextMenuDirective } from './context-menu/context-menu.directive';
import { ContextMenuComponent } from './context-menu/context-menu.component';





@NgModule({
  declarations: [
    ContextMenuDirective,
    ContextMenuComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ContextMenuDirective,
    ContextMenuComponent
  ]
})
export class DirectivesModule {
}
