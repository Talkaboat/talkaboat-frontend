import { Component, OnInit } from '@angular/core';
import { WebsiteStateService } from 'src/app/services/website-state/website-state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private readonly websiteStateService: WebsiteStateService) { }

  ngOnInit(): void {
  }

  toggleSidebar() {
    this.websiteStateService.toggleSidebar();
  }

}
