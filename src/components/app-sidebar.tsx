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
      },
      {
        title: "Analytics & Reporting",
        url: "/dashboard/analytics",
        icon: BarChart3,
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
      },
      {
        title: "Facility Configuration",
        url: "/dashboard/facility-config",
        icon: Wrench,
      },
      {
        title: "User & Roles",
        url: "/dashboard/users",
        icon: Users,
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
      },
      {
        title: "Global Settings",
        url: "/dashboard/settings",
        icon: Globe,
      },
      {
        title: "Compliance & Data",
        url: "/dashboard/compliance",
        icon: Shield,
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
      },
      {
        title: "Task & Operations",
        url: "/dashboard/tasks",
        icon: CheckSquare,
      },
      {
        title: "AI & Personalization",
        url: "/dashboard/ai",
        icon: Bot,
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
                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
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
