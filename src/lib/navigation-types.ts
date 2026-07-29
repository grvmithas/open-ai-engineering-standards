export interface NavItem {
  title: string;
  slug: string;
  /** App route override (e.g. /start, /workflows) — defaults to /docs/{slug} */
  href?: string;
  icon?: string;
  badge?: string;
  children?: NavItem[];
}
