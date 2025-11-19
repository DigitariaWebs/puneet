"use client";

import { useState } from "react";
import { facilities as initialFacilities } from "@/data/facilities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FacilityModal } from "@/components/FacilityModal";
import { CreateFacilityModal } from "@/components/CreateFacilityModal";
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

export default function FacilitiesPage() {
  const [facilitiesState, setFacilitiesState] = useState(initialFacilities);
  const [selectedFacility, setSelectedFacility] = useState<
    (typeof initialFacilities)[0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const columns: ColumnDef<(typeof initialFacilities)[0]>[] = [
    {
      key: "name",
      label: "Facility Name",
      icon: Building,
      defaultVisible: true,
    },
    {
      key: "status",
      label: "Status",
      icon: Shield,
      defaultVisible: true,
      render: (facility) => (
        <StatusBadge type="status" value={facility.status} />
      ),
    },
    {
      key: "plan",
      label: "Plan",
      icon: CreditCard,
      defaultVisible: true,
      render: (facility) => <StatusBadge type="plan" value={facility.plan} />,
    },
    {
      key: "users",
      label: "Users",
      icon: Users,
      defaultVisible: true,
      render: (facility) => facility.usersList.length,
      sortValue: (facility) => facility.usersList.length,
    },
    {
      key: "activeClients",
      label: "Active Clients",
      icon: UserCheck,
      defaultVisible: true,
      render: (facility) =>
        facility.clients.filter((c) => c.status === "active").length,
      sortValue: (facility) =>
        facility.clients.filter((c) => c.status === "active").length,
    },
    {
      key: "locations",
      label: "Locations",
      icon: MapPin,
      defaultVisible: true,
      render: (facility) => facility.locationsList.length,
      sortValue: (facility) => facility.locationsList.length,
    },
    {
      key: "dayJoined",
      label: "Day Joined",
      icon: Calendar,
      defaultVisible: true,
    },
    {
      key: "subscriptionEnd",
      label: "Subscription End",
      icon: Clock,
      defaultVisible: true,
      render: (facility) => facility.subscriptionEnd || "N/A",
      sortValue: (facility) => facility.subscriptionEnd || "",
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
      key: "plan",
      label: "Plan",
      options: [
        { value: "all", label: "All Plans" },
        { value: "Free", label: "Free" },
        { value: "Basic", label: "Basic" },
        { value: "Premium", label: "Premium" },
        { value: "Enterprise", label: "Enterprise" },
      ],
    },
  ];

  const handleCreateFacility = (newFacility: (typeof initialFacilities)[0]) => {
    setFacilitiesState((prev) => [...prev, newFacility]);
  };

  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Facilities Management
        </h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline">
            <Mail className="mr-2 h-4 w-4" />
            Notify All
          </Button>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Facility
          </Button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Facilities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{facilitiesState.length}</div>
            <p className="text-xs text-muted-foreground">
              {facilitiesState.filter((f) => f.status === "active").length}{" "}
              active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Premium Plans</CardTitle>
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
              % of total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {facilitiesState.reduce((sum, f) => sum + f.usersList.length, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all facilities
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Users/Facility
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
            <p className="text-xs text-muted-foreground">Per active facility</p>
          </CardContent>
        </Card>
      </div>

      <DataTable
        data={facilitiesState}
        columns={columns}
        filters={filters}
        searchKey="name"
        searchPlaceholder="Search facilities..."
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
