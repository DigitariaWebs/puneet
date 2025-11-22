"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BarChart3,
  Users,
  PawPrint,
  Calendar,
  UserCheck,
  Settings,
  Package,
  Clock,
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
        url: "/facility/dashboard",
        icon: Home,
        disabled: false,
      },
      {
        title: "Analytics",
        url: "/facility/analytics",
        icon: BarChart3,
        disabled: true,
      },
    ],
  },
  {
    label: "Operations",
    items: [
      {
        title: "Bookings",
        url: "/facility/bookings",
        icon: Calendar,
        disabled: true,
      },
      {
        title: "Clients",
        url: "/facility/dashboard/clients",
        icon: Users,
        disabled: false,
      },
      {
        title: "Pets",
        url: "/facility/pets",
        icon: PawPrint,
        disabled: true,
      },
    ],
  },
  {
    label: "Services",
    items: [
      {
        title: "Daycare",
        url: "/facility/dashboard/services/daycare",
        icon: PawPrint,
        disabled: true,
      },
      {
        title: "Grooming",
        url: "/facility/dashboard/services/grooming",
        icon: PawPrint,
        disabled: true,
      },
      {
        title: "Boarding",
        url: "/facility/dashboard/services/boarding",
        icon: PawPrint,
        disabled: true,
      },
      {
        title: "Veterinary",
        url: "/facility/dashboard/services/vet",
        icon: PawPrint,
        disabled: true,
      },
    ],
  },
  {
    label: "Management",
    items: [
      {
        title: "Staff",
        url: "/facility/staff",
        icon: UserCheck,
        disabled: true,
      },
      {
        title: "Scheduling",
        url: "/facility/scheduling",
        icon: Clock,
        disabled: true,
      },
      {
        title: "Inventory",
        url: "/facility/inventory",
        icon: Package,
        disabled: true,
      },
    ],
  },
  {
    label: "Settings",
    items: [
      {
        title: "Facility Settings",
        url: "/facility/settings",
        icon: Settings,
        disabled: true,
      },
    ],
  },
];

export function FacilitySidebar() {
  const { state } = useSidebar();
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      {state === "expanded" && (
        <SidebarHeader className="border-b px-6 py-3">
          <h2 className="text-lg font-semibold">Facility Dashboard</h2>
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
