import { Component, Input, OnInit } from '@angular/core';
import { CommentDtoModel } from '../models/comment-dto-model';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss']
})
export class CommentItemComponent implements OnInit {

  @Input()
  public comment!: CommentDtoModel;

  constructor() { }

  ngOnInit(): void {
  }

}
