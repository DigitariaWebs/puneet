/**
 * Design System
 *
 * A comprehensive design system for the Pet Services Dashboard
 *
 * @example
 * import { spacing, StatCardTemplate, serviceIcons } from '@/lib/design';
 *
 * const padding = spacing.lg;
 * const icon = serviceIcons.grooming;
 */

// Utilities
export {
  cn,
  spacing,
  duration,
  statusStyles,
  badgeVariants,
  cardVariants,
  buttonSizes,
  iconSizes,
  transitions,
  focusRing,
  gradients,
  serviceIcons,
  petEmojis,
  priorityStyles,
} from "./utils";

// Templates
export {
  StatCardTemplate,
  InteractiveCardTemplate,
  StatusIndicatorTemplate,
  SectionHeaderTemplate,
  EmptyStateTemplate,
  NotificationCardTemplate,
  ListItemTemplate,
} from "./templates";

// Showcase
export { DesignShowcase } from "./showcase";

// Types
export type {} from // Add type exports as needed
"./utils";
