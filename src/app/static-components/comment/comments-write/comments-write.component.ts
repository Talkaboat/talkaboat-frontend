import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comments-write',
  templateUrl: './comments-write.component.html',
  styleUrls: ['./comments-write.component.scss']
})
export class CommentsWriteComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public send(): void {
    console.log("Senden");
  }
}
