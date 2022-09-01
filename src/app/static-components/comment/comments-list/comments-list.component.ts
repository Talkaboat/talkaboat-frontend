import { Component, Input, OnInit } from '@angular/core';
import { CommentDtoModel } from '../models/comment-dto-model';
import { CommentRoute } from '../models/comment-route';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss']
})
export class CommentsListComponent implements OnInit {

  @Input()
  public commentRoute: CommentRoute = CommentRoute.episode;
  @Input()
  public id: number = 89;

  public comments: CommentDtoModel[] = [];
  public commentCount: number = 0;

  constructor(private readonly commentService: CommentService) { }

  ngOnInit(): void {
    this.comments = MockComments;
    this.commentService.countComments(this.id, this.commentRoute).subscribe(res => {
      console.log("kommentare gesamt: " + res);
      this.commentCount = res;
    });
  }

  public loggedIn(): boolean {
    return true;
  }

  public readTest(): void {
    this.commentService.readComments(89, 3, 0, 1).subscribe(res => {
      this.comments = res
    })
  }

}

export const MockComments: CommentDtoModel[] = [
  { userId: 21, commentId: 1, content: "first comment", edited: false, username: "Skyrac3", timestamp: new Date().toDateString() },
  { userId: 21, commentId: 2, content: "second comment: ein super langer kommentar um das ghanzte mal suohjasdkjfnsd,mnfvikuh und immer und immer weiter laksjflaskjflköj", edited: false, username: "Skyrac3", timestamp: new Date().toDateString() },
  { userId: 21, commentId: 3, content: "third comment", edited: true, username: "Skyrac3", timestamp: new Date().toDateString() },
  { userId: 21, commentId: 4, content: "fourth comment", edited: false, username: "Skyrac3", timestamp: new Date().toDateString() },
]
