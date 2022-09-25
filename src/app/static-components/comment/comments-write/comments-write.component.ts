import { Component, OnInit } from '@angular/core';
import { CommentRepositoryService } from '../../../services/repository/comment-repository/comment-repository.service';
import { CommentDtoModel } from '../models/comment-dto-model';

@Component({
  selector: 'app-comments-write',
  templateUrl: './comments-write.component.html',
  styleUrls: ['./comments-write.component.scss']
})
export class CommentsWriteComponent implements OnInit {

  public isFocused = false;
  public content = '';

  constructor(private readonly commentService: CommentRepositoryService) { }

  ngOnInit(): void {
  }

  public send(): void {
    console.log("Senden");
    if (this.content !== "") {
      this.commentService.writeComment(this.content)
        .subscribe(res => {
          this.commentService.comments.push(res as CommentDtoModel);
          this.commentService.commentCount += 1;
        });
    }
  }

  public onFocus(): void {
    this.isFocused = true;
  }

  public looseFocus(): void {
    this.isFocused = false;
  }

}
