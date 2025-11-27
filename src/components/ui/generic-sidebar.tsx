"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, ChevronRight } from "lucide-react";
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
import { cn } from "@/lib/utils";

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
  const isExpanded = state === "expanded";

  return (
    <Sidebar collapsible="icon" className="border-r-0 bg-sidebar">
      {/* Header */}
      {isExpanded && header && (
        <SidebarHeader className="px-5 py-5 border-b border-sidebar-border/50">
          {header}
        </SidebarHeader>
      )}

      {/* Navigation Content */}
      <SidebarContent
        className={cn("py-4 scrollbar-thin", isExpanded ? "px-3" : "px-1")}
      >
        {menuSections.map((section, sectionIndex) => (
          <SidebarGroup
            key={section.label}
            className={cn(sectionIndex > 0 && "mt-4")}
          >
            <SidebarGroupLabel className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
              {section.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      {item.disabled ? (
                        <SidebarMenuButton
                          asChild={false}
                          disabled
                          tooltip={item.title}
                          className={cn(
                            "w-full text-sm font-medium",
                            isExpanded ? "rounded-xl" : "rounded-lg",
                            "opacity-50 cursor-not-allowed",
                            "text-muted-foreground",
                          )}
                        >
                          <item.icon className="size-4 shrink-0" />
                          {isExpanded && (
                            <span className="truncate">{item.title}</span>
                          )}
                        </SidebarMenuButton>
                      ) : (
                        <SidebarMenuButton
                          asChild
                          isActive={isActive}
                          tooltip={item.title}
                          className={cn(
                            "w-full text-sm font-medium transition-all duration-200",
                            isExpanded ? "rounded-xl" : "rounded-lg",
                            "hover:bg-sidebar-accent",
                            isActive && [
                              "bg-primary text-primary-foreground",
                              "shadow-sm",
                              "hover:bg-primary/90",
                            ],
                          )}
                        >
                          <Link
                            href={item.url}
                            className={cn(
                              "flex items-center",
                              isExpanded ? "gap-3" : "justify-center",
                            )}
                          >
                            <item.icon
                              className={cn(
                                "size-4 shrink-0 transition-colors",
                                isActive && "text-muted-foreground",
                              )}
                            />
                            {isExpanded && (
                              <>
                                <span className="truncate flex-1">
                                  {item.title}
                                </span>
                                {isActive && (
                                  <ChevronRight className="h-4 w-4 opacity-60" />
                                )}
                              </>
                            )}
                          </Link>
                        </SidebarMenuButton>
                      )}
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* Footer */}
      {isExpanded && (
        <SidebarFooter className="px-3 py-4 border-t border-sidebar-border/50">
          {footer || (
            <SidebarMenuButton
              asChild
              className={cn(
                "w-full rounded-xl px-3 py-2.5 text-sm font-medium",
                "text-destructive hover:bg-destructive/10",
                "transition-all duration-200",
              )}
              onClick={onLogout}
            >
              <button className="flex items-center gap-3">
                <LogOut className="size-4 shrink-0" />
                <span>{t("logout")}</span>
              </button>
            </SidebarMenuButton>
          )}
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
