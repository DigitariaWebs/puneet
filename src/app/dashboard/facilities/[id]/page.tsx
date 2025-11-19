"use client";

import { useState } from "react";
import { facilities } from "@/data/facilities";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trash2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RevenueChartSection } from "@/components/facility/RevenueChartSection";
import { BookingsChartSection } from "@/components/facility/BookingsChartSection";
import { StatisticsCards } from "@/components/facility/StatisticsCards";
import { RecentActivitiesSection } from "@/components/facility/RecentActivitiesSection";
import { BillingSection } from "@/components/facility/BillingSection";
import { FacilityTabs } from "@/components/facility/FacilityTabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Mock data for charts and activities
const revenueData = [
  { month: "Jan", revenue: 4500, profit: 3150 },
  { month: "Feb", revenue: 5200, profit: 3640 },
  { month: "Mar", revenue: 4800, profit: 3360 },
  { month: "Apr", revenue: 6100, profit: 4270 },
  { month: "May", revenue: 5500, profit: 3850 },
  { month: "Jun", revenue: 6700, profit: 4690 },
];

const bookingsData = [
  { month: "Jan", bookings: 45 },
  { month: "Feb", bookings: 52 },
  { month: "Mar", bookings: 48 },
  { month: "Apr", bookings: 61 },
  { month: "May", bookings: 55 },
  { month: "Jun", bookings: 67 },
];

const billingHistory = [
  {
    id: 1,
    date: "2025-11-01",
    description: "Premium Plan - Monthly",
    amount: 299.99,
    status: "paid",
    invoice: "INV-2025-011",
  },
  {
    id: 2,
    date: "2025-10-01",
    description: "Premium Plan - Monthly",
    amount: 299.99,
    status: "paid",
    invoice: "INV-2025-010",
  },
  {
    id: 3,
    date: "2025-09-01",
    description: "Premium Plan - Monthly",
    amount: 299.99,
    status: "paid",
    invoice: "INV-2025-009",
  },
  {
    id: 4,
    date: "2025-08-01",
    description: "Basic Plan - Monthly",
    amount: 149.99,
    status: "paid",
    invoice: "INV-2025-008",
  },
  {
    id: 5,
    date: "2025-07-01",
    description: "Basic Plan - Monthly",
    amount: 149.99,
    status: "paid",
    invoice: "INV-2025-007",
  },
];
import { useParams } from "next/navigation";
export default function FacilityDetailPage() {
  const [viewMode, setViewMode] = useState<"list" | "timeline">("list");
  const [billingView, setBillingView] = useState<"current" | "history">(
    "current",
  );
  const [revenueChartType, setRevenueChartType] = useState<
    "bar" | "line" | "area"
  >("bar");
  const [bookingsChartType, setBookingsChartType] = useState<
    "bar" | "line" | "area"
  >("line");

  const params = useParams();
  const facility = facilities.find((f) => f.id === Number(params.id));

  if (!facility) {
    notFound();
  }

  const [currentStatus, setCurrentStatus] = useState(facility.status);
  const [pendingStatus, setPendingStatus] = useState<string | null>(null);
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const recentActivities = [
    {
      id: 1,
      type: "booking",
      title: "New booking confirmed",
      description: "Sarah Johnson booked daycare for Max",
      time: "2 hours ago",
      date: "2025-11-15T14:30:00Z",
      facility: facility.name,
    },
    {
      id: 2,
      type: "payment",
      title: "Payment received",
      description: "$150.00 for grooming service",
      time: "4 hours ago",
      date: "2025-11-15T12:30:00Z",
      facility: facility.name,
    },
    {
      id: 3,
      type: "user",
      title: "New staff member added",
      description: "Emma Davis joined as Manager",
      time: "1 day ago",
      date: "2025-11-14T09:00:00Z",
      facility: facility.name,
    },
    {
      id: 4,
      type: "client",
      title: "Client profile updated",
      description: "John Smith updated pet information",
      time: "2 days ago",
      date: "2025-11-13T16:45:00Z",
      facility: facility.name,
    },
    {
      id: 5,
      type: "booking",
      title: "Service completed",
      description: "Boarding service for Bella completed",
      time: "3 days ago",
      date: "2025-11-12T11:20:00Z",
      facility: facility.name,
    },
  ];

  return (
    <div className="flex-1 space-y-6 p-6 pt-8">
      <Link href="/dashboard/facilities" className="mb-6">
        <Button variant="outline" size="sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Facilities
        </Button>
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">{facility.name}</h1>
          <p className="text-muted-foreground mt-1">
            Facility Details & Management
          </p>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge type="status" value={currentStatus} showIcon />
          <StatusBadge type="plan" value={facility.plan} showIcon />
          <Select
            value={currentStatus}
            onValueChange={(value) => {
              if (value !== currentStatus) {
                setPendingStatus(value);
                setShowStatusDialog(true);
              }
            }}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setShowDeleteDialog(true)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* Revenue & Bookings Overview */}
      <div className="grid gap-6 md:grid-cols-2">
        <RevenueChartSection
          data={revenueData}
          chartType={revenueChartType}
          onChartTypeChange={setRevenueChartType}
        />
        <BookingsChartSection
          data={bookingsData}
          chartType={bookingsChartType}
          onChartTypeChange={setBookingsChartType}
        />
      </div>

      <StatisticsCards facility={facility} />

      <RecentActivitiesSection
        activities={recentActivities}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      <BillingSection
        facility={facility}
        billingHistory={billingHistory}
        view={billingView}
        onViewChange={setBillingView}
      />

      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold">Facility Information</h3>
        <div className="text-sm text-muted-foreground">
          Subscription expires:{" "}
          <span className="font-medium">
            {facility.subscriptionEnd || "N/A"}
          </span>
        </div>
      </div>

      <FacilityTabs facility={facility} />

      {/* Status Change Confirmation Dialog */}
      <Dialog open={showStatusDialog} onOpenChange={setShowStatusDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Facility Status</DialogTitle>
            <DialogDescription>
              Are you sure you want to change the status to{" "}
              <strong>{pendingStatus}</strong>? This may affect facility
              operations.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowStatusDialog(false);
                setPendingStatus(null);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (pendingStatus) {
                  setCurrentStatus(pendingStatus as "active" | "inactive");
                  console.log(`Status changed to ${pendingStatus}`);
                  // TODO: Implement actual status change
                }
                setShowStatusDialog(false);
                setPendingStatus(null);
              }}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Facility</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this facility? This action cannot
              be undone and will permanently remove all associated data.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                console.log("Facility deleted");
                // TODO: Implement actual delete
                setShowDeleteDialog(false);
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
