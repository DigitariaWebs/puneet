import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  variant?: "default" | "primary" | "success" | "warning" | "info";
}

const variantStyles = {
  default: "border-l-muted-foreground",
  primary: "border-l-primary",
  success: "border-l-success",
  warning: "border-l-warning",
  info: "border-l-info",
};

const iconVariantStyles = {
  default: "text-muted-foreground bg-muted",
  primary: "text-primary bg-primary/10",
  success: "text-success bg-success/10",
  warning: "text-warning bg-warning/10",
  info: "text-info bg-info/10",
};

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  variant = "primary",
}: StatCardProps) {
  return (
    <Card
      className={`border-l-4 ${variantStyles[variant]} hover:shadow-md hover:-translate-y-1 transition-all duration-200 group cursor-default`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 pt-4">
        <CardTitle className="text-xs font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div
          className={`p-2 rounded-lg ${iconVariantStyles[variant]} group-hover:scale-110 transition-transform duration-200`}
        >
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div className="text-2xl font-bold tracking-tight">{value}</div>
        {subtitle && (
          <p className="text-[10px] text-muted-foreground mt-0.5">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  );
}
