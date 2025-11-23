"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("clients");
  const tCommon = useTranslations("common");
  const tStatus = useTranslations("status");
  const [selectedClient, setSelectedClient] = useState<
    (typeof clients)[0] | null
  >(null);

  const columns: ColumnDef<(typeof clients)[number]>[] = [
    {
      key: "name",
      label: tCommon("name"),
      icon: User,
      defaultVisible: true,
    },
    {
      key: "email",
      label: tCommon("email"),
      icon: MailIcon,
      defaultVisible: true,
    },
    {
      key: "phone",
      label: tCommon("phone"),
      icon: MailIcon,
      defaultVisible: true,
      render: (client) => client.phone || "N/A",
    },
    {
      key: "facility",
      label: tCommon("facility"),
      icon: Building,
      defaultVisible: true,
    },
    {
      key: "status",
      label: tCommon("status"),
      icon: Building,
      defaultVisible: true,
      render: (client) => <StatusBadge type="status" value={client.status} />,
    },
  ];

  const filters: FilterDef[] = [
    {
      key: "status",
      label: tCommon("status"),
      options: [
        { value: "all", label: tCommon("all") + " " + tCommon("status") },
        { value: "active", label: tStatus("active") },
        { value: "inactive", label: tStatus("inactive") },
      ],
    },
    {
      key: "facility",
      label: tCommon("facility"),
      options: [
        { value: "all", label: tCommon("all") + " " + tCommon("facilities") },
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
        <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => exportClientsToCSV(clients)}>
            <Download className="mr-2 h-4 w-4" />
            {tCommon("export")}
          </Button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("totalClients")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clients.length}</div>
            <p className="text-xs text-muted-foreground">
              {clients.filter((c) => c.status === "active").length}{" "}
              {tStatus("active").toLowerCase()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {tStatus("active")} {t("title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {clients.filter((c) => c.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground">
              {tStatus("active").toLowerCase()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {tCommon("facilities")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Array.from(new Set(clients.map((c) => c.facility))).length}
            </div>
            <p className="text-xs text-muted-foreground">
              {tCommon("active").toLowerCase()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("avgClientsPerFacility")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                clients.length /
                  Array.from(new Set(clients.map((c) => c.facility))).length,
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {tCommon("perFacility")}
            </p>
          </CardContent>
        </Card>
      </div>

      <DataTable
        data={clients}
        columns={columns}
        filters={filters}
        searchKey="name"
        searchPlaceholder={t("searchClients")}
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
                {selectedClient?.name} - {t("clientDetails")}
              </DialogTitle>
            </DialogHeader>
            {selectedClient && <ClientModal client={selectedClient} />}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
