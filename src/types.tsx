import type { LucideIcon } from "lucide-react";

export interface NavItem {
  name: string;
  href: string;
  icon?: LucideIcon; // ✅ Icon is now optional
  subItems?: NavItem[]; // ✅ Allows for dropdowns or nested menus
  external?: boolean; // ✅ Flag for external links
}

// Ensure external links open safely
export function getNavLinkAttributes(item: NavItem) {
  return item.external ? { target: "_blank", rel: "noopener noreferrer" } : {};
}

// Declare d3-time-format module
declare module "d3-time-format" {
  export function timeFormat(specifier: string): (date: Date) => string;
}
