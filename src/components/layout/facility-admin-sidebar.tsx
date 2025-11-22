"use client";

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
  MessageSquare,
} from "lucide-react";

import { GenericSidebar, MenuSection } from "@/components/ui/generic-sidebar";

const menuSections: MenuSection[] = [
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
        title: "Customer Reach",
        url: "/facility/customer-reach",
        icon: MessageSquare,
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
        disabled: false,
      },
      {
        title: "Grooming",
        url: "/facility/dashboard/services/grooming",
        icon: PawPrint,
        disabled: false,
      },
      {
        title: "Boarding",
        url: "/facility/dashboard/services/boarding",
        icon: PawPrint,
        disabled: false,
      },
      {
        title: "Veterinary",
        url: "/facility/dashboard/services/vet",
        icon: PawPrint,
        disabled: false,
      },
      {
        title: "Store",
        url: "/facility/dashboard/services/store",
        icon: PawPrint,
        disabled: false,
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
  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log("Logout clicked");
  };

  return (
    <GenericSidebar
      header={<h2 className="text-lg font-semibold">Facility Dashboard</h2>}
      menuSections={menuSections}
      onLogout={handleLogout}
    />
  );
}
