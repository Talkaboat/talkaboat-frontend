import { Component, Input, OnInit } from '@angular/core';
import { CommentDtoModel } from '../models/comment-dto-model';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss']
})
export class CommentsListComponent implements OnInit {

  public comments: CommentDtoModel[] = [];

  constructor() { }

  ngOnInit(): void {
    this.comments = MockComments;
  }

  public loggedIn(): boolean {
    return true;
  }

}

export const MockComments: CommentDtoModel[] = [
  { userId: 21, commentId: 1, content: "first comment", edited: false, username: "Skyrac3", timestamp: new Date().toDateString() },
  { userId: 21, commentId: 2, content: "second comment: ein super langer kommentar um das ghanzte mal suohjasdkjfnsd,mnfvikuh und immer und immer weiter laksjflaskjflköj", edited: false, username: "Skyrac3", timestamp: new Date().toDateString() },
  { userId: 21, commentId: 3, content: "third comment", edited: true, username: "Skyrac3", timestamp: new Date().toDateString() },
  { userId: 21, commentId: 4, content: "fourth comment", edited: false, username: "Skyrac3", timestamp: new Date().toDateString() },
]
