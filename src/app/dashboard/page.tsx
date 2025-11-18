"use client";

import { useState } from "react";
import { facilities } from "@/data/facilities";
import { RevenueChartSection } from "@/components/facility/RevenueChartSection";
import { BookingsChartSection } from "@/components/facility/BookingsChartSection";
import { DashboardStatisticsCards } from "@/components/facility/DashboardStatisticsCards";
import { RecentActivitiesSection } from "@/components/facility/RecentActivitiesSection";
import { PieChartSection } from "@/components/facility/PieChartSection";

const baseRevenueData = [
  { month: "Jan", revenue: 4500, profit: 3150 },
  { month: "Feb", revenue: 5200, profit: 3640 },
  { month: "Mar", revenue: 4800, profit: 3360 },
  { month: "Apr", revenue: 6100, profit: 4270 },
  { month: "May", revenue: 5500, profit: 3850 },
  { month: "Jun", revenue: 6700, profit: 4690 },
];

const baseBookingsData = [
  { month: "Jan", bookings: 45 },
  { month: "Feb", bookings: 52 },
  { month: "Mar", bookings: 48 },
  { month: "Apr", bookings: 61 },
  { month: "May", bookings: 55 },
  { month: "Jun", bookings: 67 },
];

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
  const [revenueChartType, setRevenueChartType] = useState<
    "bar" | "line" | "area"
  >("bar");
  const [bookingsChartType, setBookingsChartType] = useState<
    "bar" | "line" | "area"
  >("line");

  const aggregatedRevenueData = baseRevenueData.map((item) => ({
    ...item,
    revenue: item.revenue * facilities.length,
    profit: item.profit * facilities.length,
  }));

  const aggregatedBookingsData = baseBookingsData.map((item) => ({
    ...item,
    bookings: item.bookings * facilities.length,
  }));

  return (
    <div className="flex-1 space-y-6 p-6 pt-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
      </div>

      {/* Revenue & Bookings Overview */}
      <div className="grid gap-6 md:grid-cols-2">
        <RevenueChartSection
          data={aggregatedRevenueData}
          chartType={revenueChartType}
          onChartTypeChange={setRevenueChartType}
        />
        <BookingsChartSection
          data={aggregatedBookingsData}
          chartType={bookingsChartType}
          onChartTypeChange={setBookingsChartType}
        />
      </div>

      <PieChartSection />
      <DashboardStatisticsCards />

      <RecentActivitiesSection
        activities={recentActivities}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />
    </div>
  );
}
