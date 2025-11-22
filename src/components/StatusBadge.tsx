import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, CreditCard, Crown } from "lucide-react";

interface StatusBadgeProps {
  type: "status" | "plan" | "role" | "inventory";
  value: string;
  size?: "sm" | "default" | "lg";
  showIcon?: boolean;
}

export function StatusBadge({
  type,
  value,
  size = "default",
  showIcon = false,
}: StatusBadgeProps) {
  const getVariant = () => {
    if (type === "status") {
      return value === "active" ? "success" : "secondary";
    }
    if (type === "inventory") {
      if (value === "in_stock") return "success";
      if (value === "low_stock") return "warning";
      if (value === "out_of_stock") return "destructive";
      return "secondary";
    }
    if (type === "role") {
      if (value === "Admin") return "default";
      if (value === "Manager") return "info";
      return "outline";
    }
    if (type === "plan") {
      if (value === "Free") return "outline";
      if (value === "Basic") return "secondary";
      if (value === "Premium") return "default";
      if (value === "Enterprise") return "destructive";
      return "outline";
    }
    return "outline";
  };

  const getIcon = () => {
    if (!showIcon) return null;
    if (type === "status") {
      return value === "active" ? (
        <CheckCircle className="w-3 h-3 mr-1" />
      ) : (
        <XCircle className="w-3 h-3 mr-1" />
      );
    }
    if (type === "plan") {
      if (value === "Enterprise") return <Crown className="w-3 h-3 mr-1" />;
      return <CreditCard className="w-3 h-3 mr-1" />;
    }
    return null;
  };

  const getSizeClass = () => {
    switch (size) {
      case "sm":
        return "text-xs px-2 py-0.5";
      case "lg":
        return "text-base px-3 py-1";
      default:
        return "text-sm px-2.5 py-0.5";
    }
  };

  return (
    <Badge variant={getVariant()} className={getSizeClass()}>
      {getIcon()}
      {value}
    </Badge>
  );
}
