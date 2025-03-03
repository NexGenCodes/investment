import type { LucideIcon } from "lucide-react"

export interface NavItem {
  name: string
  href: string
  icon: LucideIcon
  subItems?: NavItem[] // Allows for dropdowns or nested menus
  external?: boolean   // Flag for external links
}

export interface ChartData {
  timestamp: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

declare module "d3-time-format" {
  export function timeFormat(specifier: string): (date: Date) => string;
}