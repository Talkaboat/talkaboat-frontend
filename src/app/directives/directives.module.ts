import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClickOutsideDirective } from './click-outside/click-outside.directive';



@NgModule({
  declarations: [
    ClickOutsideDirective
  ],
  imports: [
    CommonModule
  ], exports: [
    ClickOutsideDirective
  ]
})
export class DirectivesModule { }
