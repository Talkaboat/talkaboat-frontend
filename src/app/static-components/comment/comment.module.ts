import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsListComponent } from './comments-list/comments-list.component';
import { CommentsWriteComponent } from './comments-write/comments-write.component';
import { CommentItemComponent } from './comment-item/comment-item.component';



@NgModule({
  exports: [CommentsListComponent],
  declarations: [
    CommentsListComponent,
    CommentsWriteComponent,
    CommentItemComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CommentModule { }
