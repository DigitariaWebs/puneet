"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { useTranslations } from "next-intl";

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
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

export interface MenuItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  disabled?: boolean;
}

export interface MenuSection {
  label: string;
  items: MenuItem[];
}

export interface GenericSidebarProps {
  header?: React.ReactNode;
  menuSections: MenuSection[];
  footer?: React.ReactNode;
  onLogout?: () => void;
}

export function GenericSidebar({
  header,
  menuSections,
  footer,
  onLogout,
}: GenericSidebarProps) {
  const { state } = useSidebar();
  const pathname = usePathname();
  const t = useTranslations("navigation");

  return (
    <Sidebar collapsible="icon">
      {state === "expanded" && header && (
        <SidebarHeader className="border-b px-6 py-3">{header}</SidebarHeader>
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
      {state === "expanded" && (
        <SidebarFooter className="border-t p-4">
          {footer || (
            <SidebarMenuButton
              asChild
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={onLogout}
            >
              <button>
                <LogOut className="h-4 w-4" />
                <span>{t("logout")}</span>
              </button>
            </SidebarMenuButton>
          )}
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
