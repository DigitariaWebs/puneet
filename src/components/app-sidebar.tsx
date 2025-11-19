"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

const menuSections = [
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
        disabled: true,
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
        title: "Support & Communication",
        url: "/dashboard/support",
        icon: MessageSquare,
        disabled: true,
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
  const { state } = useSidebar();
  const pathname = usePathname();
  return (
    <Sidebar collapsible="icon">
      {state === "expanded" && (
        <SidebarHeader className="border-b px-6 py-3">
          <h2 className="text-lg font-semibold">Platform Admin</h2>
        </SidebarHeader>
      )}
      <SidebarContent>
        {menuSections.map((section) => (
          <SidebarGroup key={section.label}>
            <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    {item.disabled ? (
                      <SidebarMenuButton asChild={false} disabled>
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    ) : (
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.url}
                      >
                        <Link href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
