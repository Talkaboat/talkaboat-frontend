import { Component, Input, OnInit } from '@angular/core';
import { CommentModel } from '../models/comment-model';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss']
})
export class CommentsListComponent implements OnInit {

  public comments: CommentModel[] = [];

  constructor() { }

  ngOnInit(): void {
    this.comments = MockComments;
  }

  public loggedIn(): boolean {
    return true;
  }

}

export const MockComments: CommentModel[] = [
  { userId: 21, commentId: 1, content: "first comment", edited: false, linkedId: 89, timestamp: new Date().toDateString() },
  { userId: 21, commentId: 2, content: "second comment: ein super langer kommentar um das ghanzte mal suohjasdkjfnsd,mnfvikuh und immer und immer weiter laksjflaskjflköj", edited: false, linkedId: 89, timestamp: new Date().toDateString() },
  { userId: 21, commentId: 3, content: "third comment", edited: true, linkedId: 89, timestamp: new Date().toDateString() },
  { userId: 21, commentId: 4, content: "fourth comment", edited: false, linkedId: 89, timestamp: new Date().toDateString() },
]
