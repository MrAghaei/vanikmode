export type NavLink = {
  label: string;
  href: string;
  /** Real site renders this one link in red/bold, distinct from its siblings. */
  highlight?: boolean;
};

export type MegaMenuColumn = {
  title: string;
  href: string;
  items: NavLink[];
};

export type MobileMenuGroup = {
  title: string;
  items: NavLink[];
};
