"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
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
        url: "/facility/[facility_id]/dashboard",
        icon: Home,
        disabled: false,
      },
      {
        title: "Analytics",
        url: "/facility/[facility_id]/analytics",
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
        url: "/facility/[facility_id]/bookings",
        icon: Calendar,
        disabled: true,
      },
      {
        title: "Clients",
        url: "/facility/[facility_id]/clients",
        icon: Users,
        disabled: false,
      },
      {
        title: "Pets",
        url: "/facility/[facility_id]/pets",
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
        url: "/facility/[facility_id]/staff",
        icon: UserCheck,
        disabled: true,
      },
      {
        title: "Scheduling",
        url: "/facility/[facility_id]/scheduling",
        icon: Clock,
        disabled: true,
      },
      {
        title: "Inventory",
        url: "/facility/[facility_id]/inventory",
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
        url: "/facility/[facility_id]/settings",
        icon: Settings,
        disabled: true,
      },
    ],
  },
];

export function FacilitySidebar() {
  const { state } = useSidebar();
  const pathname = usePathname();
  const params = useParams();
  const facilityId = params.facility_id as string;

  // Replace [facility_id] with actual id in urls
  const getUrl = (url: string) => url.replace("[facility_id]", facilityId);

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
                        isActive={pathname === getUrl(item.url)}
                      >
                        <Link href={getUrl(item.url)}>
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
