/**
 * Component Templates
 * Copy and modify these templates to quickly scaffold new components
 * that follow the design system
 */

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================
// STAT CARD TEMPLATE
// ============================================

interface StatCardTemplateProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  variant?: "primary" | "success" | "warning" | "info";
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export function StatCardTemplate({
  title,
  value,
  subtitle,
  icon: Icon,
  variant = "primary",
  trend,
}: StatCardTemplateProps) {
  const variantStyles = {
    primary: {
      border: "border-l-primary",
      icon: "text-primary bg-primary/10",
    },
    success: {
      border: "border-l-success",
      icon: "text-success bg-success/10",
    },
    warning: {
      border: "border-l-warning",
      icon: "text-warning bg-warning/10",
    },
    info: {
      border: "border-l-info",
      icon: "text-info bg-info/10",
    },
  };

  return (
    <Card
      className={cn(
        "border-l-4 hover:shadow-md hover:-translate-y-1 transition-all duration-200 group cursor-default",
        variantStyles[variant].border,
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 pt-4">
        <CardTitle className="text-xs font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div
          className={cn(
            "p-2 rounded-lg group-hover:scale-110 transition-transform duration-200",
            variantStyles[variant].icon,
          )}
        >
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div className="text-2xl font-bold tracking-tight">{value}</div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        )}
        {trend && (
          <div className="flex items-center gap-1 mt-2">
            <span
              className={cn(
                "text-xs font-medium",
                trend.isPositive ? "text-success" : "text-destructive",
              )}
            >
              {trend.isPositive ? "↑" : "↓"} {trend.value}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ============================================
// INTERACTIVE CARD TEMPLATE
// ============================================

interface InteractiveCardTemplateProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  badge?: {
    text: string;
    variant: "default" | "success" | "warning" | "info";
  };
  onClick?: () => void;
  children?: React.ReactNode;
}

export function InteractiveCardTemplate({
  title,
  description,
  icon: Icon,
  badge,
  onClick,
  children,
}: InteractiveCardTemplateProps) {
  return (
    <Card
      onClick={onClick}
      className={cn(
        "hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group",
        onClick && "cursor-pointer",
      )}
    >
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            {Icon && (
              <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                <Icon className="h-4 w-4" />
              </div>
            )}
            <CardTitle className="text-base">{title}</CardTitle>
          </div>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        {badge && <Badge variant={badge.variant}>{badge.text}</Badge>}
      </CardHeader>
      {children && <CardContent>{children}</CardContent>}
    </Card>
  );
}

// ============================================
// STATUS INDICATOR TEMPLATE
// ============================================

interface StatusIndicatorTemplateProps {
  status: "online" | "busy" | "offline";
  label: string;
  showDot?: boolean;
}

export function StatusIndicatorTemplate({
  status,
  label,
  showDot = true,
}: StatusIndicatorTemplateProps) {
  const statusMap = {
    online: {
      dot: "status-dot status-online",
      badge: "success" as const,
    },
    busy: {
      dot: "status-dot status-busy",
      badge: "warning" as const,
    },
    offline: {
      dot: "status-dot status-offline",
      badge: "secondary" as const,
    },
  };

  return (
    <div className="flex items-center gap-2">
      {showDot && <span className={statusMap[status].dot} />}
      <Badge variant={statusMap[status].badge}>{label}</Badge>
    </div>
  );
}

// ============================================
// SECTION HEADER TEMPLATE
// ============================================

interface SectionHeaderTemplateProps {
  title: string;
  description?: string;
  emoji?: string;
  action?: React.ReactNode;
}

export function SectionHeaderTemplate({
  title,
  description,
  emoji,
  action,
}: SectionHeaderTemplateProps) {
  return (
    <div className="flex items-start justify-between">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          {emoji && <span>{emoji}</span>}
          {title}
        </h2>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

// ============================================
// EMPTY STATE TEMPLATE
// ============================================

interface EmptyStateTemplateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyStateTemplate({
  icon: Icon,
  title,
  description,
  action,
}: EmptyStateTemplateProps) {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <div className="p-4 rounded-full bg-muted mb-4">
          <Icon className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-6 max-w-md">
          {description}
        </p>
        {action && (
          <Button onClick={action.onClick} variant="default">
            {action.label}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

// ============================================
// NOTIFICATION CARD TEMPLATE
// ============================================

interface NotificationCardTemplateProps {
  title: string;
  description: string;
  time: string;
  severity?: "normal" | "high";
  actions?: {
    primary: { label: string; onClick: () => void };
    secondary?: { label: string; onClick: () => void };
  };
  onDismiss?: () => void;
}

export function NotificationCardTemplate({
  title,
  description,
  time,
  severity = "normal",
  actions,
  onDismiss,
}: NotificationCardTemplateProps) {
  return (
    <Card
      className={cn(
        "hover:shadow-md transition-all",
        severity === "high" && "border-l-4 border-l-warning",
      )}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-base">{title}</CardTitle>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          {severity === "high" && (
            <Badge variant="warning" className="ml-2">
              High Priority
            </Badge>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-2">{time}</p>
      </CardHeader>
      {actions && (
        <CardContent className="flex gap-2">
          <Button size="sm" onClick={actions.primary.onClick}>
            {actions.primary.label}
          </Button>
          {actions.secondary && (
            <Button
              size="sm"
              variant="outline"
              onClick={actions.secondary.onClick}
            >
              {actions.secondary.label}
            </Button>
          )}
          {onDismiss && (
            <Button size="sm" variant="ghost" onClick={onDismiss}>
              Dismiss
            </Button>
          )}
        </CardContent>
      )}
    </Card>
  );
}

// ============================================
// LIST ITEM TEMPLATE
// ============================================

interface ListItemTemplateProps {
  icon?: LucideIcon;
  emoji?: string;
  title: string;
  subtitle?: string;
  badge?: {
    text: string;
    variant: "default" | "success" | "warning" | "info";
  };
  actions?: React.ReactNode;
  onClick?: () => void;
}

export function ListItemTemplate({
  icon: Icon,
  emoji,
  title,
  subtitle,
  badge,
  actions,
  onClick,
}: ListItemTemplateProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors",
        onClick && "cursor-pointer",
      )}
    >
      <div className="flex items-center gap-3">
        {(Icon || emoji) && (
          <div className="shrink-0">
            {Icon && (
              <div className="p-2 rounded-lg bg-muted">
                <Icon className="h-4 w-4" />
              </div>
            )}
            {emoji && <span className="text-2xl">{emoji}</span>}
          </div>
        )}
        <div>
          <div className="flex items-center gap-2">
            <p className="font-medium">{title}</p>
            {badge && <Badge variant={badge.variant}>{badge.text}</Badge>}
          </div>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

// ============================================
// USAGE EXAMPLES
// ============================================

/**
 * Example: Stat Card
 *
 * import { Users } from 'lucide-react';
 *
 * <StatCardTemplate
 *   title="Total Users"
 *   value="1,234"
 *   subtitle="+5% from last month"
 *   icon={Users}
 *   variant="primary"
 *   trend={{ value: "12%", isPositive: true }}
 * />
 */

/**
 * Example: Interactive Card
 *
 * import { Dog } from 'lucide-react';
 *
 * <InteractiveCardTemplate
 *   title="Pet Services"
 *   description="Manage your pet care services"
 *   icon={Dog}
 *   badge={{ text: "Active", variant: "success" }}
 *   onClick={() => console.log('clicked')}
 * >
 *   <p>Additional content here</p>
 * </InteractiveCardTemplate>
 */

/**
 * Example: Empty State
 *
 * import { Inbox } from 'lucide-react';
 *
 * <EmptyStateTemplate
 *   icon={Inbox}
 *   title="No notifications"
 *   description="You're all caught up! Check back later for new updates."
 *   action={{ label: "Refresh", onClick: () => {} }}
 * />
 */

/**
 * Example: List Item
 *
 * <ListItemTemplate
 *   emoji="🐕"
 *   title="Max"
 *   subtitle="Golden Retriever • 3 years old"
 *   badge={{ text: "Active", variant: "success" }}
 *   actions={<Button size="sm" variant="outline">View</Button>}
 *   onClick={() => {}}
 * />
 */
