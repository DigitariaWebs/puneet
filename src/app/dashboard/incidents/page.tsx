"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { incidents as initialIncidents, Incident } from "@/data/incidents";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IncidentModal } from "@/components/modals/IncidentModal";
import { DataTable, ColumnDef, FilterDef } from "@/components/DataTable";
import { AlertTriangle, Download, Eye, CheckCircle, Clock } from "lucide-react";

const exportToCSV = (incidents: Incident[]) => {
  const headers = [
    "ID",
    "Title",
    "Severity",
    "Status",
    "Reporter",
    "Facility",
    "Created At",
    "Resolved At",
  ];

  const csvContent = [
    headers.join(","),
    ...incidents.map((incident) =>
      [
        incident.id,
        `"${incident.title.replace(/"/g, '""')}"`,
        incident.severity,
        incident.status,
        `"${incident.reporter.replace(/"/g, '""')}"`,
        `"${incident.facility.replace(/"/g, '""')}"`,
        incident.createdAt,
        incident.resolvedAt || "",
      ].join(","),
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `incidents_export_${new Date().toISOString().split("T")[0]}.csv`,
  );
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default function IncidentsPage() {
  const t = useTranslations("incidents");
  const tCommon = useTranslations("common");
  const [incidentsState, setIncidentsState] = useState(initialIncidents);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: ColumnDef<Incident>[] = [
    {
      key: "id",
      label: "ID",
      icon: AlertTriangle,
      defaultVisible: true,
    },
    {
      key: "title",
      label: tCommon("details"),
      icon: AlertTriangle,
      defaultVisible: true,
    },
    {
      key: "severity",
      label: "Severity",
      icon: AlertTriangle,
      defaultVisible: true,
      render: (incident) => (
        <Badge
          variant={
            incident.severity === "Low"
              ? "secondary"
              : incident.severity === "Medium"
                ? "default"
                : incident.severity === "High"
                  ? "destructive"
                  : "destructive"
          }
        >
          {incident.severity}
        </Badge>
      ),
    },
    {
      key: "status",
      label: "Status",
      icon: CheckCircle,
      defaultVisible: true,
      render: (incident) => (
        <Badge
          variant={
            incident.status === "Resolved"
              ? "default"
              : incident.status === "In Progress"
                ? "secondary"
                : "outline"
          }
        >
          {incident.status}
        </Badge>
      ),
    },
    {
      key: "reporter",
      label: t("reportedBy"),
      icon: AlertTriangle,
      defaultVisible: true,
    },
    {
      key: "facility",
      label: tCommon("facility"),
      icon: AlertTriangle,
      defaultVisible: true,
    },
    {
      key: "createdAt",
      label: t("reportedAt"),
      icon: Clock,
      defaultVisible: true,
    },
  ];

  const filters: FilterDef[] = [
    {
      key: "status",
      label: "Status",
      options: [
        { value: "all", label: "All Status" },
        { value: "Open", label: "Open" },
        { value: "In Progress", label: "In Progress" },
        { value: "Resolved", label: "Resolved" },
      ],
    },
    {
      key: "severity",
      label: "Severity",
      options: [
        { value: "all", label: "All Severities" },
        { value: "Low", label: "Low" },
        { value: "Medium", label: "Medium" },
        { value: "High", label: "High" },
        { value: "Critical", label: "Critical" },
      ],
    },
  ];

  const handleResolve = (id: string, notes: string) => {
    setIncidentsState((prev) =>
      prev.map((inc) =>
        inc.id === id
          ? {
              ...inc,
              status: "Resolved" as const,
              resolutionNotes: notes,
              resolvedAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            }
          : inc,
      ),
    );
    setIsModalOpen(false);
  };

  const openIncidents = incidentsState.filter(
    (inc) => inc.status !== "Resolved",
  ).length;
  const resolvedIncidents = incidentsState.filter(
    (inc) => inc.status === "Resolved",
  ).length;
  const criticalIncidents = incidentsState.filter(
    (inc) => inc.severity === "Critical",
  ).length;

  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Incident Management
        </h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => exportToCSV(incidentsState)}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("totalIncidents")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{incidentsState.length}</div>
            <p className="text-xs text-muted-foreground">
              {incidentsState.filter((i) => i.status === "Open").length} open
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Open Incidents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{openIncidents}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Critical Incidents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{criticalIncidents}</div>
            <p className="text-xs text-muted-foreground">High priority</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Resolution Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                incidentsState
                  .filter((inc) => inc.resolvedAt)
                  .reduce((sum, inc) => {
                    const created = new Date(inc.createdAt).getTime();
                    const resolved = new Date(inc.resolvedAt!).getTime();
                    return sum + (resolved - created) / (1000 * 60 * 60); // hours
                  }, 0) / resolvedIncidents || 0,
              )}
              h
            </div>
            <p className="text-xs text-muted-foreground">
              For resolved incidents
            </p>
          </CardContent>
        </Card>
      </div>

      <DataTable
        data={incidentsState}
        columns={columns}
        filters={filters}
        searchKey="title"
        searchPlaceholder={t("searchIncidents")}
        itemsPerPage={10}
        actions={(incident) => (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedIncident(incident);
              setIsModalOpen(true);
            }}
          >
            <Eye className="h-4 w-4" />
          </Button>
        )}
      />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="min-w-5xl max-h-[90vh] flex flex-col p-0">
          <div className="p-6 flex-1 overflow-y-auto">
            <DialogHeader className="mb-0">
              <DialogTitle className="sr-only">
                {selectedIncident?.title} - Incident Details
              </DialogTitle>
            </DialogHeader>
            {selectedIncident && (
              <IncidentModal
                incident={selectedIncident}
                onResolve={handleResolve}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
