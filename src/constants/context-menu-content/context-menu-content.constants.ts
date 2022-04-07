import { ContextMenuItems } from "./models/context-menu-content.model";

export const MENU_ITEMS: ContextMenuItems[] = [
  {
    name: 'item1',
    submenuAvailable: true,
    submenu: [
      {
        name: 'subitem1-1',
      },
      {
        name: 'subitem1-2',
      },
      {
        name: 'subitem1-3',
      },
      {
        name: 'subitem1-4',
      }
    ]
  },
  {
    name: 'item2',
  },
  {
    name: 'item3',
    submenuAvailable: true,
    submenu: [
      {
        name: 'subitem3-1',
      },
      {
        name: 'subitem3-2',
      }
    ]
  },
  {
    name: 'item4',
  },
  {
    name: 'item5',
  },
]
