import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comments-write',
  templateUrl: './comments-write.component.html',
  styleUrls: ['./comments-write.component.scss']
})
export class CommentsWriteComponent implements OnInit {

  public isFocused = false;

  constructor() { }

  ngOnInit(): void {
  }

  public send(): void {
    console.log("Senden");
  }

  public onFocus(): void {
    console.log("Hallo")
    this.isFocused = true;
  }

  public looseFocus(): void {
    this.isFocused = false;
  }

}
