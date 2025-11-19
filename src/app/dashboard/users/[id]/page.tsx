"use client";

import { useState } from "react";
import { users } from "@/data/users";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { UserStatisticsCards } from "@/components/user/UserStatisticsCards";
import { RecentActivitiesSection } from "@/components/facility/RecentActivitiesSection";
import { PermissionsSection } from "@/components/user/PermissionsSection";
import { ProfileDetails } from "@/components/ProfileDetails";

// Mock data for activities
const userActivities = [
  {
    id: 1,
    type: "login",
    title: "User logged in",
    description: "Accessed the dashboard",
    time: "2 hours ago",
    date: "2025-11-15T14:30:00Z",
  },
  {
    id: 2,
    type: "update",
    title: "Updated pet record",
    description: "Modified information for Buddy",
    time: "4 hours ago",
    date: "2025-11-15T12:30:00Z",
  },
  {
    id: 3,
    type: "schedule",
    title: "Scheduled appointment",
    description: "Booked grooming for Max",
    time: "1 day ago",
    date: "2025-11-14T09:00:00Z",
  },
  {
    id: 4,
    type: "client",
    title: "Client interaction",
    description: "Assisted John Smith with booking",
    time: "2 days ago",
    date: "2025-11-13T16:45:00Z",
  },
  {
    id: 5,
    type: "task",
    title: "Completed task",
    description: "Finished boarding service for Bella",
    time: "3 days ago",
    date: "2025-11-12T11:20:00Z",
  },
];
import { useParams } from "next/navigation";
export default function UserDetailPage() {
  const [viewMode, setViewMode] = useState<"list" | "timeline">("list");

  const params = useParams();
  const user = users.find((u) => u.id === Number(params.id));

  if (!user) {
    notFound();
  }

  const recentActivities = userActivities.map((activity) => ({
    ...activity,
    user: user.name,
  }));

  return (
    <div className="flex-1 space-y-6 p-6 pt-8">
      <Link href="/dashboard/users" className="mb-6">
        <Button variant="outline" size="sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Users
        </Button>
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">{user.name}</h1>
          <p className="text-muted-foreground mt-1">
            User Details & Management
          </p>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge type="role" value={user.role} showIcon />
          <StatusBadge type="status" value={user.status} showIcon />
        </div>
      </div>

      <UserStatisticsCards user={user} />

      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold">User Information</h3>
        <div className="text-sm text-muted-foreground">
          Last login: <span className="font-medium">{user.lastLogin}</span>
        </div>
      </div>

      <ProfileDetails person={user} />

      <PermissionsSection user={user} />

      <RecentActivitiesSection
        activities={recentActivities}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />
    </div>
  );
}
