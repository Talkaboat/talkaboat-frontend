import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-marketplace-preview-list',
  templateUrl: './marketplace-preview-list.component.html',
  styleUrls: ['./marketplace-preview-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketplacePreviewListComponent implements OnInit {

  @Input() items:any;
  constructor() { }

  ngOnInit(): void {
  }

}
