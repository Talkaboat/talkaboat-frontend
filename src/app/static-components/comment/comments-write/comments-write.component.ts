import { Component, OnInit } from '@angular/core';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-comments-write',
  templateUrl: './comments-write.component.html',
  styleUrls: ['./comments-write.component.scss']
})
export class CommentsWriteComponent implements OnInit {

  public isFocused = false;
  public content = '';

  constructor(private readonly commentService: CommentService) { }

  ngOnInit(): void {
  }

  public send(): void {
    console.log("Senden");
    this.commentService.post<object>(this.content)
      .subscribe(res => {
        console.log(res);
      });
  }

  public onFocus(): void {
    console.log("Hallo")
    this.isFocused = true;
  }

  public looseFocus(): void {
    this.isFocused = false;
  }

}
