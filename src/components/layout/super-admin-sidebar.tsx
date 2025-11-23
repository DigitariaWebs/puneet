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
import { useTranslations } from "next-intl";

import { GenericSidebar, MenuSection } from "@/components/ui/generic-sidebar";

export function AppSidebar() {
  const t = useTranslations("navigation");

  const menuSections: MenuSection[] = [
    {
      label: t("overview"),
      items: [
        {
          title: t("dashboard"),
          url: "/dashboard",
          icon: Home,
          disabled: false,
        },
        {
          title: t("analyticsReporting"),
          url: "/dashboard/analytics",
          icon: BarChart3,
          disabled: false,
        },
      ],
    },
    {
      label: t("tenantManagement"),
      items: [
        {
          title: t("facilities"),
          url: "/dashboard/facilities",
          icon: Building,
          disabled: false,
        },
        {
          title: t("facilityConfiguration"),
          url: "/dashboard/facility-config",
          icon: Wrench,
          disabled: false,
        },
        {
          title: t("users"),
          url: "/dashboard/users",
          icon: Users,
          disabled: false,
        },
        {
          title: t("clients"),
          url: "/dashboard/clients",
          icon: UserCheck,
          disabled: false,
        },
      ],
    },
    {
      label: t("platformOperations"),
      items: [
        {
          title: t("subscriptionBilling"),
          url: "/dashboard/billing",
          icon: CreditCard,
          disabled: false,
        },
        {
          title: t("globalSettings"),
          url: "/dashboard/settings",
          icon: Globe,
          disabled: true,
        },
        {
          title: t("complianceData"),
          url: "/dashboard/compliance",
          icon: Shield,
          disabled: true,
        },
      ],
    },
    {
      label: t("supportFeatures"),
      items: [
        {
          title: t("incidents"),
          url: "/dashboard/incidents",
          icon: AlertTriangle,
          disabled: false,
        },
        {
          title: t("supportCommunication"),
          url: "/dashboard/support",
          icon: MessageSquare,
          disabled: false,
        },
        {
          title: t("taskOperations"),
          url: "/dashboard/tasks",
          icon: CheckSquare,
          disabled: true,
        },
        {
          title: t("aiPersonalization"),
          url: "/dashboard/ai",
          icon: Bot,
          disabled: true,
        },
      ],
    },
  ];

  const handleLogout = () => {
    // TODO: Implement logout logic
  };

  return (
    <GenericSidebar
      header={<h2 className="text-lg font-semibold">{t("platformAdmin")}</h2>}
      menuSections={menuSections}
      onLogout={handleLogout}
    />
  );
}
