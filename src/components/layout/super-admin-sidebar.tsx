"use client";

import {
  Building,
  CreditCard,
  Shield,
  MessageSquare,
  BarChart3,
  Users,
  CheckSquare,
  Bot,
  Home,
  Wrench,
  Globe,
  UserCheck,
  AlertTriangle,
} from "lucide-react";

import { GenericSidebar, MenuSection } from "@/components/ui/generic-sidebar";

const menuSections: MenuSection[] = [
  {
    label: "Overview",
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: Home,
        disabled: false,
      },
      {
        title: "Analytics & Reporting",
        url: "/dashboard/analytics",
        icon: BarChart3,
        disabled: false,
      },
    ],
  },
  {
    label: "Tenant Management",
    items: [
      {
        title: "Facilities",
        url: "/dashboard/facilities",
        icon: Building,
        disabled: false,
      },
      {
        title: "Facility Configuration",
        url: "/dashboard/facility-config",
        icon: Wrench,
        disabled: false,
      },
      {
        title: "Users",
        url: "/dashboard/users",
        icon: Users,
        disabled: false,
      },
      {
        title: "Clients",
        url: "/dashboard/clients",
        icon: UserCheck,
        disabled: false,
      },
    ],
  },
  {
    label: "Platform Operations",
    items: [
      {
        title: "Subscription & Billing",
        url: "/dashboard/billing",
        icon: CreditCard,
        disabled: false,
      },
      {
        title: "Global Settings",
        url: "/dashboard/settings",
        icon: Globe,
        disabled: true,
      },
      {
        title: "Compliance & Data",
        url: "/dashboard/compliance",
        icon: Shield,
        disabled: true,
      },
    ],
  },
  {
    label: "Support & Features",
    items: [
      {
        title: "Incidents",
        url: "/dashboard/incidents",
        icon: AlertTriangle,
        disabled: false,
      },
      {
        title: "Support & Communication",
        url: "/dashboard/support",
        icon: MessageSquare,
        disabled: false,
      },
      {
        title: "Task & Operations",
        url: "/dashboard/tasks",
        icon: CheckSquare,
        disabled: true,
      },
      {
        title: "AI & Personalization",
        url: "/dashboard/ai",
        icon: Bot,
        disabled: true,
      },
    ],
  },
];

export function AppSidebar() {
  const handleLogout = () => {
    // TODO: Implement logout logic
  };

  return (
    <GenericSidebar
      header={<h2 className="text-lg font-semibold">Platform Admin</h2>}
      menuSections={menuSections}
      onLogout={handleLogout}
    />
  );
}
