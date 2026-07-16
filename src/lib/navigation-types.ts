export interface NavItem {
  title: string;
  slug: string;
  icon?: string;
  badge?: string;
  children?: NavItem[];
}
