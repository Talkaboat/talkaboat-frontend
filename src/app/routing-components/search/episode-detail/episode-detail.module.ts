import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpisodeListViewComponent } from './components/episode-list-view/episode-list-view.component';
import { EpisodeListItemComponent } from './components/episode-list-item/episode-list-item.component';
import { EpisodeDetailComponent } from './components/episode-detail/episode-detail.component';
import { CommentModule } from 'src/app/static-components/comment/comment.module';
import { EpisodeListViewHeaderComponent } from './components/episode-list-view-header/episode-list-view-header.component';



@NgModule({
  declarations: [
    EpisodeListItemComponent,
    EpisodeListViewComponent,
    EpisodeDetailComponent,
    EpisodeListViewHeaderComponent
  ],
  imports: [
    CommonModule,
    CommentModule
  ]
})
export class EpisodeDetailModule { }
