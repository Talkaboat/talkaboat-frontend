import { Component, Input, OnInit } from '@angular/core';
import { CommentDtoModel } from '../models/comment-dto-model';
import { CommentRoute } from '../models/comment-route';
import { CommentRepositoryService } from '../../../services/repository/comment-repository/comment-repository.service';

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

  public currentOffset: number = 0;
  public amount: number = 10;

  constructor(private readonly commentService: CommentRepositoryService) { }

  ngOnInit(): void {
    this.comments = MockComments;
    this.commentService.countComments(this.id, this.commentRoute).subscribe(res => this.commentCount = res);
  }

  public loggedIn(): boolean {
    return true;
  }

  public readComments(): void {
    this.commentService.readComments(this.id, this.amount, this.currentOffset, this.commentRoute).subscribe(res => {
      if (res != undefined && res != null && res.length > 0) {
        res.forEach(element => {
          this.comments.push(element);
        });
        this.currentOffset += this.amount;
        console.log(this.currentOffset)
      }
    })
  }
}

export const MockComments: CommentDtoModel[] = [
  { userId: 21, commentId: 1, content: "first comment", edited: false, userName: "Skyrac3", timestamp: new Date().toDateString() },
  { userId: 21, commentId: 2, content: "second comment: ein super langer kommentar um das ghanzte mal suohjasdkjfnsd,mnfvikuh und immer und immer weiter laksjflaskjflköj", edited: false, userName: "Skyrac3", timestamp: new Date().toDateString() },
  { userId: 21, commentId: 3, content: "third comment", edited: true, userName: "Skyrac3", timestamp: new Date().toDateString() },
  { userId: 21, commentId: 4, content: "fourth comment", edited: false, userName: "Skyrac3", timestamp: new Date().toDateString() },
]
