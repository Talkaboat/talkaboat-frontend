import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpisodeListViewComponent } from './components/episode-list-view/episode-list-view.component';
import { EpisodeListItemComponent } from './components/episode-list-item/episode-list-item.component';
import { EpisodeDetailComponent } from './components/episode-detail/episode-detail.component';
import { CommentModule } from 'src/app/static-components/comment/comment.module';



@NgModule({
  declarations: [
    EpisodeListItemComponent,
    EpisodeListViewComponent,
    EpisodeDetailComponent
  ],
  imports: [
    CommonModule,
    CommentModule
  ]
})
export class EpisodeDetailModule { }
