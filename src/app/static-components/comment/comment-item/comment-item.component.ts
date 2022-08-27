import { Component, Input, OnInit } from '@angular/core';
import { CommentModel } from '../models/comment-model';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss']
})
export class CommentItemComponent implements OnInit {

  @Input()
  public comment!: CommentModel;

  constructor() { }

  ngOnInit(): void {
  }

}
