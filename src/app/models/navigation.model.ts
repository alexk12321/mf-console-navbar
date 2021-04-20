export enum NavItemIconType {
  Inbuilt = 'inbuilt',
  Sprite = 'sprite',
  Svg = 'svg',
}

export interface NavItemIcon {
  path: string;
  type: NavItemIconType;
}

export interface NavItem {
  display: string;
  icon?: NavItemIcon;
  url?: string;
  children?: NavItem[];
  serviceName?: string;
  isAuthorized?: boolean;
  isExact?: boolean;
  urlWithoutAccountId?: boolean;
  isExpanded?: boolean;
  featureId: number;
  permission?: string;
}

export type NavItemOrObj = NavItem | {};

export interface NavGroup {
  items: NavItem[];
}

export type NavGroups = NavGroup[];

export interface ServicesMap {
  [serviceName: string]: boolean;
}
