import { ContextMenuTask } from './../enums/context-menu-task';
export interface ContextMenuItem {
  task: ContextMenuTask
  name: string;
  submenu?: ContextMenuItem[];
}
