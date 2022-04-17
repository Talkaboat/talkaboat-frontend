import { ContextMenuTask } from "./enums/context-menu-task";
import { ContextMenuItem } from "./models/context-menu-content.model";

export const MENU_ITEMS: ContextMenuItem[] = [
  {
    name: 'Add to Playlist',
    task: ContextMenuTask.OpenSubmenu,
    submenu: [
      {
        task: ContextMenuTask.CreateNewPlaylist,
        name: 'create new playlist',
      },
    ]
  },
]
