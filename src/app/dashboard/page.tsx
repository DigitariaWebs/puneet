"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { RecentActivitiesSection } from "@/components/facility/RecentActivitiesSection";
import { NotificationsSection } from "@/components/facility/NotificationsSection";
import { ActiveNowSection } from "@/components/facility/ActiveNowSection";

interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  type: string;
  status: "pending" | "approved" | "denied";
  severity?: "normal" | "high";
}

const recentActivities = [
  {
    id: 1,
    type: "trial",
    title: "Trial request received",
    description: "ABC Company requested a trial for daycare services",
    time: "45 minutes ago",
    date: "2025-11-15T15:45:00Z",
    facility: "Paws & Play Daycare",
  },
  {
    id: 2,
    type: "trial",
    title: "Trial request received",
    description: "XYZ Pet Care requested a trial for grooming",
    time: "5 minutes ago",
    date: "2025-11-15T15:30:00Z",
    facility: "Furry Friends Grooming",
  },
  {
    id: 3,
    type: "booking",
    title: "New booking confirmed",
    description: "Sarah Johnson booked daycare for Max",
    time: "1 hour ago",
    date: "2025-11-15T14:30:00Z",
    facility: "Paws & Play Daycare",
  },
  {
    id: 4,
    type: "payment",
    title: "Payment received",
    description: "$150.00 for grooming service",
    time: "2 hours ago",
    date: "2025-11-15T12:30:00Z",
    facility: "Furry Friends Grooming",
  },
  {
    id: 5,
    type: "user",
    title: "New staff member added",
    description: "Emma Davis joined as Manager",
    time: "4 hours ago",
    date: "2025-11-14T09:00:00Z",
    facility: "Happy Tails Boarding",
  },
  {
    id: 6,
    type: "client",
    title: "Client profile updated",
    description: "John Smith updated pet information",
    time: "1 day ago",
    date: "2025-11-13T16:45:00Z",
  },
  {
    id: 7,
    type: "booking",
    title: "Service completed",
    description: "Boarding service for Bella completed",
    time: "2 days ago",
    date: "2025-11-12T11:20:00Z",
  },
];

const initialNotifications: Notification[] = [
  {
    id: 1,
    title: "Trial request from ABC Company",
    description:
      "ABC Company has requested a trial for daycare services at Paws & Play Daycare.",
    time: "10 minutes ago",
    type: "trial",
    status: "pending",
    severity: "normal",
  },
  {
    id: 2,
    title: "Trial request from XYZ Pet Care",
    description:
      "XYZ Pet Care has requested a trial for grooming services at Furry Friends Grooming.",
    time: "15 minutes ago",
    type: "trial",
    status: "pending",
    severity: "normal",
  },
  {
    id: 3,
    title: "Incident: Pet emergency",
    description:
      "Max is showing signs of distress during daycare session. Immediate attention required.",
    time: "3 minutes ago",
    type: "incident",
    status: "pending",
    severity: "high",
  },
  {
    id: 4,
    title: "Incident: Allergic reaction",
    description:
      "Bella had an allergic reaction to grooming products. Vet consultation needed.",
    time: "8 minutes ago",
    type: "incident",
    status: "pending",
    severity: "high",
  },
];

const activeItems = [
  {
    id: 1,
    type: "user" as const,
    name: "Sarah Johnson",
    description: "Managing daycare services",
    status: "online" as const,
  },
  {
    id: 2,
    type: "service" as const,
    name: "Grooming Session",
    description: "Bella's grooming in progress",
    status: "busy" as const,
  },
  {
    id: 3,
    type: "user" as const,
    name: "Emma Davis",
    description: "Handling client inquiries",
    status: "online" as const,
    requestingSupport: true,
  },
  {
    id: 4,
    type: "user" as const,
    name: "John Smith",
    description: "Online and available",
    status: "online" as const,
  },
];

export default function DashboardPage() {
  const t = useTranslations("dashboard");
  const [viewMode, setViewMode] = useState<"list" | "timeline">("list");
  const [notifications, setNotifications] = useState(initialNotifications);

  const handleApprove = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status: "approved" } : n)),
    );
  };

  const handleDeny = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status: "denied" } : n)),
    );
  };

  return (
    <div className="flex-1 space-y-8 p-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight bg-linear-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
          {t("title")}
        </h1>
        <p className="text-muted-foreground text-lg">{t("welcome")}</p>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <NotificationsSection
            notifications={notifications}
            onApprove={handleApprove}
            onDeny={handleDeny}
          />
        </div>
        <div className="col-span-1">
          <ActiveNowSection activeItems={activeItems} />
        </div>
      </div>

      <RecentActivitiesSection
        activities={recentActivities}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />
    </div>
  );
}
