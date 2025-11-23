"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { facilities as initialFacilities } from "@/data/facilities";
import { facilityRequests } from "@/data/facility-requests";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FacilityModal } from "@/components/modals/FacilityModal";
import { CreateFacilityModal } from "@/components/modals/CreateFacilityModal";
import { DataTable, ColumnDef, FilterDef } from "@/components/DataTable";
import {
  Plus,
  Download,
  Mail,
  Building,
  CreditCard,
  Shield,
  Users,
  UserCheck,
  MapPin,
  Calendar,
  Clock,
  Eye,
} from "lucide-react";

const exportToCSV = (facilities: typeof initialFacilities) => {
  const headers = [
    "ID",
    "Name",
    "Status",
    "Plan",
    "Day Joined",
    "Subscription End",
    "Primary Address",
    "Total Users",
    "Active Clients",
    "Locations Count",
    "Services",
  ];

  const csvContent = [
    headers.join(","),
    ...facilities.map((facility) =>
      [
        facility.id,
        `"${facility.name.replace(/"/g, '""')}"`,
        facility.status,
        facility.plan,
        facility.dayJoined,
        facility.subscriptionEnd || "",
        `"${facility.locationsList[0]?.address?.replace(/"/g, '""') || ""}"`,
        facility.usersList.length,
        facility.clients.filter((c) => c.status === "active").length,
        facility.locationsList.length,
        `"${facility.locationsList[0]?.services?.join("; ") || ""}"`,
      ].join(","),
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `facilities_export_${new Date().toISOString().split("T")[0]}.csv`,
  );
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default function FacilitiesPage() {
  const router = useRouter();
  const t = useTranslations("facilities");
  const tCommon = useTranslations("common");
  const tStatus = useTranslations("status");
  const tPlans = useTranslations("plans");
  const [facilitiesState, setFacilitiesState] = useState(initialFacilities);
  const [selectedFacility, setSelectedFacility] = useState<
    (typeof initialFacilities)[0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const pendingRequestsCount = facilityRequests.filter(
    (r) => r.status === "pending",
  ).length;

  const columns: ColumnDef<(typeof initialFacilities)[0]>[] = [
    {
      key: "name",
      label: t("facilityName"),
      icon: Building,
      defaultVisible: true,
    },
    {
      key: "status",
      label: tCommon("status"),
      icon: Shield,
      defaultVisible: true,
      render: (facility) => (
        <StatusBadge type="status" value={facility.status} />
      ),
    },
    {
      key: "plan",
      label: tCommon("plan"),
      icon: CreditCard,
      defaultVisible: true,
      render: (facility) => <StatusBadge type="plan" value={facility.plan} />,
    },
    {
      key: "users",
      label: t("totalUsers"),
      icon: Users,
      defaultVisible: true,
      render: (facility) => facility.usersList.length,
      sortValue: (facility) => facility.usersList.length,
    },
    {
      key: "activeClients",
      label: t("activeClients"),
      icon: UserCheck,
      defaultVisible: true,
      render: (facility) =>
        facility.clients.filter((c) => c.status === "active").length,
      sortValue: (facility) =>
        facility.clients.filter((c) => c.status === "active").length,
    },
    {
      key: "locations",
      label: t("locations"),
      icon: MapPin,
      defaultVisible: true,
      render: (facility) => facility.locationsList.length,
      sortValue: (facility) => facility.locationsList.length,
    },
    {
      key: "dayJoined",
      label: t("dayJoined"),
      icon: Calendar,
      defaultVisible: true,
    },
    {
      key: "subscriptionEnd",
      label: t("subscriptionEnd"),
      icon: Clock,
      defaultVisible: true,
      render: (facility) => facility.subscriptionEnd || "N/A",
      sortValue: (facility) => facility.subscriptionEnd || "",
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
      key: "plan",
      label: tCommon("plan"),
      options: [
        { value: "all", label: tCommon("all") + " " + tCommon("plans") },
        { value: "Free", label: tPlans("free") },
        { value: "Basic", label: tPlans("basic") },
        { value: "Premium", label: tPlans("premium") },
        { value: "Enterprise", label: tPlans("enterprise") },
      ],
    },
  ];

  const handleCreateFacility = (newFacility: (typeof initialFacilities)[0]) => {
    setFacilitiesState((prev) => [...prev, newFacility]);
  };

  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => exportToCSV(facilitiesState)}
          >
            <Download className="mr-2 h-4 w-4" />
            {tCommon("export")}
          </Button>
          <Button variant="outline">
            <Mail className="mr-2 h-4 w-4" />
            {t("notifyAll")}
          </Button>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            {t("addFacility")}
          </Button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("totalFacilities")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{facilitiesState.length}</div>
            <p className="text-xs text-muted-foreground">
              {facilitiesState.filter((f) => f.status === "active").length}{" "}
              {tStatus("active").toLowerCase()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("premiumPlans")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {facilitiesState.filter((f) => f.plan === "Premium").length}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round(
                (facilitiesState.filter((f) => f.plan === "Premium").length /
                  facilitiesState.length) *
                  100,
              )}
              % {t("ofTotal")}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("totalUsers")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {facilitiesState.reduce((sum, f) => sum + f.usersList.length, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              {t("acrossAllFacilities")}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("avgUsersPerFacility")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                facilitiesState.reduce(
                  (sum, f) => sum + f.usersList.length,
                  0,
                ) / facilitiesState.length,
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {t("perActiveFacility")}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{t("facilityTrialRequests")}</h3>
        <Button
          variant="outline"
          onClick={() => router.push("/dashboard/facilities/requests")}
        >
          <Eye className="mr-2 h-4 w-4" />
          {t("viewRequests")} ({pendingRequestsCount}{" "}
          {tCommon("pending").toLowerCase()})
        </Button>
      </div>

      <DataTable
        data={facilitiesState}
        columns={columns}
        filters={filters}
        searchKey="name"
        searchPlaceholder={t("searchFacilities")}
        itemsPerPage={10}
        actions={(facility) => (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedFacility(facility);
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
                {selectedFacility?.name} - Facility Details
              </DialogTitle>
            </DialogHeader>
            {selectedFacility && <FacilityModal facility={selectedFacility} />}
          </div>
        </DialogContent>
      </Dialog>

      <CreateFacilityModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateFacility}
      />
    </div>
  );
}
