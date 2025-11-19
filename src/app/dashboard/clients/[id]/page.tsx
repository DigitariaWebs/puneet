"use client";

import { useState } from "react";
import { clients } from "@/data/clients";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ClientStatisticsCards } from "@/components/client/ClientStatisticsCards";
import { RecentActivitiesSection } from "@/components/facility/RecentActivitiesSection";
import { ClientTabs } from "@/components/client/ClientTabs";

// Mock data for activities
const clientActivities = [
  {
    id: 1,
    type: "booking",
    title: "New booking confirmed",
    description: "Daycare booking for Buddy",
    time: "2 hours ago",
    date: "2024-01-15T14:30:00Z",
  },
  {
    id: 2,
    type: "payment",
    title: "Payment received",
    description: "$50.00 for grooming service",
    time: "4 hours ago",
    date: "2024-01-15T12:30:00Z",
  },
  {
    id: 3,
    type: "update",
    title: "Pet record updated",
    description: "Updated information for Whiskers",
    time: "1 day ago",
    date: "2024-01-14T09:00:00Z",
  },
  {
    id: 4,
    type: "contact",
    title: "Contact updated",
    description: "Phone number changed",
    time: "2 days ago",
    date: "2024-01-13T16:45:00Z",
  },
  {
    id: 5,
    type: "service",
    title: "Service completed",
    description: "Boarding service for Max completed",
    time: "3 days ago",
    date: "2024-01-12T11:20:00Z",
  },
];
import { useParams } from "next/navigation";
export default function ClientDetailPage() {
  const [viewMode, setViewMode] = useState<"list" | "timeline">("list");

  const params = useParams();
  const client = clients.find((c) => c.id === Number(params.id));

  if (!client) {
    notFound();
  }

  const recentActivities = clientActivities.map((activity) => ({
    ...activity,
    client: client.name,
  }));

  return (
    <div className="flex-1 space-y-6 p-6 pt-8">
      <Link href="/dashboard/clients" className="mb-6">
        <Button variant="outline" size="sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Clients
        </Button>
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">{client.name}</h1>
          <p className="text-muted-foreground mt-1">
            Client Details & Management
          </p>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge type="status" value={client.status} showIcon />
        </div>
      </div>

      <ClientStatisticsCards client={client} />

      <RecentActivitiesSection
        activities={recentActivities}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold">Client Information</h3>
        <div className="text-sm text-muted-foreground">
          Facility: <span className="font-medium">{client.facility}</span>
        </div>
      </div>

      <ClientTabs client={client} />
    </div>
  );
}
