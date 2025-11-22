"use client";

import { useState } from "react";
import { clients } from "@/data/clients";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { DataTable, ColumnDef, FilterDef } from "@/components/DataTable";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ClientModal } from "@/components/modals/ClientModal";
import { Download, User, Mail as MailIcon, Building, Eye } from "lucide-react";

const exportClientsToCSV = (clientsData: typeof clients) => {
  const headers = [
    "ID",
    "Name",
    "Email",
    "Phone",
    "Status",
    "Facility",
    "Pets Count",
  ];

  const csvContent = [
    headers.join(","),
    ...clientsData.map((client) =>
      [
        client.id,
        `"${client.name.replace(/"/g, '""')}"`,
        client.email,
        client.phone || "",
        client.status,
        `"${client.facility.replace(/"/g, '""')}"`,
        client.pets.length,
      ].join(","),
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `clients_export_${new Date().toISOString().split("T")[0]}.csv`,
  );
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default function ClientsPage() {
  const [selectedClient, setSelectedClient] = useState<
    (typeof clients)[number] | null
  >(null);

  const columns: ColumnDef<(typeof clients)[number]>[] = [
    {
      key: "name",
      label: "Name",
      icon: User,
      defaultVisible: true,
    },
    {
      key: "email",
      label: "Email",
      icon: MailIcon,
      defaultVisible: true,
    },
    {
      key: "phone",
      label: "Phone",
      icon: MailIcon,
      defaultVisible: true,
      render: (client) => client.phone || "N/A",
    },
    {
      key: "facility",
      label: "Facility",
      icon: Building,
      defaultVisible: true,
    },
    {
      key: "status",
      label: "Status",
      icon: Building,
      defaultVisible: true,
      render: (client) => <StatusBadge type="status" value={client.status} />,
    },
  ];

  const filters: FilterDef[] = [
    {
      key: "status",
      label: "Status",
      options: [
        { value: "all", label: "All Status" },
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
      ],
    },
    {
      key: "facility",
      label: "Facility",
      options: [
        { value: "all", label: "All Facilities" },
        ...Array.from(new Set(clients.map((c) => c.facility))).map((f) => ({
          value: f,
          label: f,
        })),
      ],
    },
  ];

  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Clients Management
        </h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => exportClientsToCSV(clients)}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clients.length}</div>
            <p className="text-xs text-muted-foreground">
              {clients.filter((c) => c.status === "active").length} active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Clients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {clients.filter((c) => c.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Facilities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Array.from(new Set(clients.map((c) => c.facility))).length}
            </div>
            <p className="text-xs text-muted-foreground">With clients</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Clients/Facility
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                clients.length /
                  Array.from(new Set(clients.map((c) => c.facility))).length,
              )}
            </div>
            <p className="text-xs text-muted-foreground">Per facility</p>
          </CardContent>
        </Card>
      </div>

      <DataTable
        data={clients}
        columns={columns}
        filters={filters}
        searchKey="name"
        searchPlaceholder="Search clients..."
        itemsPerPage={10}
        actions={(client) => (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedClient(client)}
          >
            <Eye className="h-4 w-4" />
          </Button>
        )}
      />
      <Dialog
        open={!!selectedClient}
        onOpenChange={() => setSelectedClient(null)}
      >
        <DialogContent className="min-w-5xl max-h-[90vh] flex flex-col p-0">
          <div className="p-6 flex-1 overflow-y-auto">
            <DialogHeader className="mb-0">
              <DialogTitle className="sr-only">
                {selectedClient?.name} - Client Details
              </DialogTitle>
            </DialogHeader>
            {selectedClient && <ClientModal client={selectedClient} />}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
