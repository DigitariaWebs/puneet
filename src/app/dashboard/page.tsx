"use client";

import { useState } from "react";
import { RecentActivitiesSection } from "@/components/facility/RecentActivitiesSection";

const recentActivities = [
  {
    id: 1,
    type: "booking",
    title: "New booking confirmed",
    description: "Sarah Johnson booked daycare for Max",
    time: "2 hours ago",
    date: "2024-01-15T14:30:00Z",
    facility: "Paws & Play Daycare",
  },
  {
    id: 2,
    type: "payment",
    title: "Payment received",
    description: "$150.00 for grooming service",
    time: "4 hours ago",
    date: "2024-01-15T12:30:00Z",
    facility: "Furry Friends Grooming",
  },
  {
    id: 3,
    type: "user",
    title: "New staff member added",
    description: "Emma Davis joined as Manager",
    time: "1 day ago",
    date: "2024-01-14T09:00:00Z",
    facility: "Happy Tails Boarding",
  },
  {
    id: 4,
    type: "client",
    title: "Client profile updated",
    description: "John Smith updated pet information",
    time: "2 days ago",
    date: "2024-01-13T16:45:00Z",
  },
  {
    id: 5,
    type: "booking",
    title: "Service completed",
    description: "Boarding service for Bella completed",
    time: "3 days ago",
    date: "2024-01-12T11:20:00Z",
  },
];

export default function DashboardPage() {
  const [viewMode, setViewMode] = useState<"list" | "timeline">("list");

  return (
    <div className="flex-1 space-y-6 p-6 pt-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
      </div>

      <RecentActivitiesSection
        activities={recentActivities}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />
    </div>
  );
}
