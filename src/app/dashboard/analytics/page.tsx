"use client";

import { useState } from "react";
import { facilities } from "@/data/facilities";
import { RevenueChartSection } from "@/components/facility/RevenueChartSection";
import { BookingsChartSection } from "@/components/facility/BookingsChartSection";
import { DashboardStatisticsCards } from "@/components/facility/DashboardStatisticsCards";
import { PieChartSection } from "@/components/facility/PieChartSection";
import { FacilityComparisonChart } from "@/components/facility/FacilityComparisonChart";
import { ServicePopularityChart } from "@/components/facility/ServicePopularityChart";
import { ClientGrowthChartSection } from "@/components/facility/ClientGrowthChart";
import { OccupancyRateChart } from "@/components/facility/OccupancyRateChart";

const baseRevenueData = [
  { month: "Jan", revenue: 4500, profit: 3150 },
  { month: "Feb", revenue: 5200, profit: 3640 },
  { month: "Mar", revenue: 4800, profit: 3360 },
  { month: "Apr", revenue: 6100, profit: 4270 },
  { month: "May", revenue: 5500, profit: 3850 },
  { month: "Jun", revenue: 6700, profit: 4690 },
  { month: "Jul", revenue: 7200, profit: 5040 },
  { month: "Aug", revenue: 6900, profit: 4830 },
  { month: "Sep", revenue: 7500, profit: 5250 },
  { month: "Oct", revenue: 7800, profit: 5460 },
  { month: "Nov", revenue: 8100, profit: 5670 },
  { month: "Dec", revenue: 8500, profit: 5950 },
];

const baseBookingsData = [
  { month: "Jan", bookings: 45 },
  { month: "Feb", bookings: 52 },
  { month: "Mar", bookings: 48 },
  { month: "Apr", bookings: 61 },
  { month: "May", bookings: 55 },
  { month: "Jun", bookings: 67 },
  { month: "Jul", bookings: 72 },
  { month: "Aug", bookings: 69 },
  { month: "Sep", bookings: 75 },
  { month: "Oct", bookings: 78 },
  { month: "Nov", bookings: 81 },
  { month: "Dec", bookings: 85 },
];

export default function AnalyticsPage() {
  const [revenueChartType, setRevenueChartType] = useState<
    "bar" | "line" | "area"
  >("bar");
  const [bookingsChartType, setBookingsChartType] = useState<
    "bar" | "line" | "area"
  >("line");
  const [facilityChartType, setFacilityChartType] = useState<
    "revenue" | "bookings" | "clients" | "users" | "locations"
  >("revenue");

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
        <h1 className="text-4xl font-bold tracking-tight">Analytics</h1>
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

      {/* Facility & Service Insights */}
      <div className="grid gap-6 md:grid-cols-2">
        <FacilityComparisonChart
          chartType={facilityChartType}
          onChartTypeChange={setFacilityChartType}
        />
        <ServicePopularityChart />
      </div>

      {/* Growth & Occupancy */}
      <div className="grid gap-6 md:grid-cols-2">
        <ClientGrowthChartSection />
        <OccupancyRateChart />
      </div>
    </div>
  );
}
