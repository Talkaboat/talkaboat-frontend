import { ContextMenuService } from './../../../directives/context-menu/context-menu.service';
import { ContextMenuItems } from './../../../../constants/context-menu-content/models/context-menu-content.model';
import { MENU_ITEMS } from './../../../../constants/context-menu-content/context-menu-content.constants';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-context-menu-content',
  templateUrl: './context-menu-content.component.html',
  styleUrls: ['./context-menu-content.component.scss']
})
export class ContextMenuContentComponent implements OnInit {


  @Input()
  menuItems: ContextMenuItems[] = MENU_ITEMS

  submenuOpened = false;
  submenuOpenedIndex = 0;
  contextMenuActive = false;

  constructor(
    private readonly contextMenuService: ContextMenuService,
  ) {
    this.contextMenuService.contextMenuActive.subscribe(value => {
      if(!value) {
        this.closeSubmenu();
      }
    });
   }

  ngOnInit(): void {
  }

  clickedItem(index: number) {
    if (this.submenuOpenedIndex !== index) {
      this.submenuOpened = true;
    } else {
      this.submenuOpened = !this.submenuOpened;
    }
    this.submenuOpenedIndex = index;
  }

  closeSubmenu() {
    this.submenuOpened = false;
  }

}
