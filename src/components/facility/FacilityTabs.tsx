"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/StatusBadge";
import {
  Building,
  Users,
  UserCheck,
  MapPin,
  Mail,
  Phone,
  Briefcase,
} from "lucide-react";

interface User {
  person: { name: string; email: string };
  role: string;
}

interface Client {
  person: { name: string; email: string; phone?: string };
  status: string;
}

interface Location {
  name: string;
  address: string;
  services: string[];
}

interface FacilityTabsProps {
  facility: {
    locationsList: Location[];
    clients: Client[];
    usersList: User[];
  };
}

export function FacilityTabs({ facility }: FacilityTabsProps) {
  return (
    <Tabs defaultValue="locations" className="w-full">
      <TabsList className="grid w-full grid-cols-3 h-auto bg-muted p-1 rounded-lg">
        <TabsTrigger
          value="locations"
          className="gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"
        >
          <MapPin className="h-4 w-4" />
          Locations ({facility.locationsList.length})
        </TabsTrigger>
        <TabsTrigger
          value="clients"
          className="gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"
        >
          <UserCheck className="h-4 w-4" />
          Clients ({facility.clients.length})
        </TabsTrigger>
        <TabsTrigger
          value="users"
          className="gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"
        >
          <Users className="h-4 w-4" />
          Staff ({facility.usersList.length})
        </TabsTrigger>
      </TabsList>
      <TabsContent value="locations" className="mt-3">
        <DataTable
          data={facility.locationsList as unknown as Record<string, unknown>[]}
          columns={[
            {
              key: "name",
              label: "Name",
              icon: Building,
            },
            {
              key: "address",
              label: "Address",
              icon: MapPin,
            },
            {
              key: "services",
              label: "Services",
              render: (location: Record<string, unknown>) => (
                <div className="flex flex-wrap gap-1">
                  {(location.services as string[]).map((service: string) => (
                    <Badge
                      key={service}
                      variant="secondary"
                      className="text-xs capitalize"
                    >
                      {service}
                    </Badge>
                  ))}
                </div>
              ),
            },
          ]}
        />
      </TabsContent>
      <TabsContent value="clients" className="mt-3">
        <DataTable
          data={facility.clients as unknown as Record<string, unknown>[]}
          columns={[
            {
              key: "name",
              label: "Name",
              render: (client: Record<string, unknown>) =>
                (client.person as { name: string }).name,
            },
            {
              key: "email",
              label: "Email",
              icon: Mail,
              render: (client: Record<string, unknown>) =>
                (client.person as { email: string }).email,
            },
            {
              key: "phone",
              label: "Phone",
              icon: Phone,
              render: (client: Record<string, unknown>) =>
                (client.person as { phone?: string }).phone || "N/A",
            },
            {
              key: "status",
              label: "Status",
              render: (client: Record<string, unknown>) => (
                <StatusBadge type="status" value={client.status as string} />
              ),
            },
          ]}
        />
      </TabsContent>
      <TabsContent value="users" className="mt-3">
        <DataTable
          data={facility.usersList as unknown as Record<string, unknown>[]}
          columns={[
            {
              key: "name",
              label: "Name",
              render: (user: Record<string, unknown>) =>
                (user.person as { name: string }).name,
            },
            {
              key: "email",
              label: "Email",
              icon: Mail,
              render: (user: Record<string, unknown>) =>
                (user.person as { email: string }).email,
            },
            {
              key: "role",
              label: "Role",
              icon: Briefcase,
              render: (user: Record<string, unknown>) => (
                <StatusBadge type="role" value={user.role as string} />
              ),
            },
          ]}
        />
      </TabsContent>
    </Tabs>
  );
}
