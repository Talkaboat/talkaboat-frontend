import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comments-meta-data',
  templateUrl: './comments-meta-data.component.html',
  styleUrls: ['./comments-meta-data.component.scss']
})
export class CommentsMetaDataComponent implements OnInit {

  @Input()
  public commentCount = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
