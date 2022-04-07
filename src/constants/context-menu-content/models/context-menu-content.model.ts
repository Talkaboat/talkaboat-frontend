export interface ContextMenuItems {
  name: string;
  submenuAvailable?: boolean;
  submenu?: ContextMenuItems[];
}
