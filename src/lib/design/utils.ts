// Re-export cn utility from main utils
export { cn } from "@/lib/utils";

/**
 * Design system spacing scale
 * Use these for consistent spacing throughout the app
 */
export const spacing = {
  xs: "0.5rem", // 8px
  sm: "0.75rem", // 12px
  md: "1rem", // 16px
  lg: "1.5rem", // 24px
  xl: "2rem", // 32px
  "2xl": "3rem", // 48px
  "3xl": "4rem", // 64px
} as const;

/**
 * Animation durations
 */
export const duration = {
  fast: "150ms",
  normal: "200ms",
  slow: "300ms",
  slower: "500ms",
} as const;

/**
 * Status colors and their corresponding Tailwind classes
 */
export const statusStyles = {
  online: "bg-success text-success-foreground",
  busy: "bg-warning text-warning-foreground",
  offline: "bg-muted text-muted-foreground",
  away: "bg-info text-info-foreground",
} as const;

/**
 * Badge variant classes
 */
export const badgeVariants = {
  default: "bg-primary/10 text-primary border-primary/20",
  success: "bg-success/10 text-success border-success/20",
  warning: "bg-warning/10 text-warning-foreground border-warning/20",
  destructive: "bg-destructive/10 text-destructive border-destructive/20",
  info: "bg-info/10 text-info-foreground border-info/20",
  secondary: "bg-secondary/10 text-secondary-foreground border-secondary/20",
} as const;

/**
 * Card style variants
 */
export const cardVariants = {
  default: "bg-card text-card-foreground rounded-xl border shadow-sm",
  elevated: "bg-card text-card-foreground rounded-xl border shadow-md",
  interactive:
    "bg-card text-card-foreground rounded-xl border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer",
  glass:
    "glass text-card-foreground rounded-xl border border-border/50 backdrop-blur-xl",
} as const;

/**
 * Button size variants
 */
export const buttonSizes = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-6 text-base",
  xl: "h-12 px-8 text-lg",
} as const;

/**
 * Icon sizes
 */
export const iconSizes = {
  xs: "w-3 h-3",
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
  xl: "w-8 h-8",
  "2xl": "w-10 h-10",
} as const;

/**
 * Common transition classes
 */
export const transitions = {
  default: "transition-all duration-200 ease-out",
  fast: "transition-all duration-150 ease-out",
  slow: "transition-all duration-300 ease-out",
  colors: "transition-colors duration-200 ease-out",
  transform: "transition-transform duration-200 ease-out",
} as const;

/**
 * Focusable element classes
 */
export const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

/**
 * Common gradient backgrounds
 */
export const gradients = {
  warm: "bg-gradient-to-br from-background via-background to-muted/20",
  primary: "bg-gradient-to-br from-primary to-primary/80",
  success: "bg-gradient-to-br from-success to-success/80",
  card: "bg-gradient-to-br from-card via-card to-muted/5",
} as const;

/**
 * Service type icons mapping
 */
export const serviceIcons = {
  grooming: "✂️",
  daycare: "🏡",
  boarding: "🏨",
  training: "🎓",
  veterinary: "🏥",
  walking: "🦮",
} as const;

/**
 * Pet type emojis
 */
export const petEmojis = {
  dog: "🐕",
  cat: "🐈",
  bird: "🦜",
  rabbit: "🐰",
  other: "🐾",
} as const;

/**
 * Priority levels with colors
 */
export const priorityStyles = {
  low: "text-muted-foreground bg-muted/50",
  normal: "text-info bg-info/10",
  high: "text-warning bg-warning/10",
  urgent: "text-destructive bg-destructive/10",
} as const;
