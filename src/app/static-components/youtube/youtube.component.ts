import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.scss']
})
export class YoutubeComponent implements OnInit {
  @Input() videoId: string = '';

  isLoading = true;
  isLoadingVideo = true;
  videoEnabled = false;
  constructor() { }

  ngOnInit(): void {
  }

}
