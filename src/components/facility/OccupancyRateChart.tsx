"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Calendar, Maximize, ChevronDown } from "lucide-react";
import { facilities } from "@/data/facilities";
interface OccupancyChartProps {
  data: Array<Record<string, string | number>>;
  xKey?: string;
}

export function OccupancyChart({ data, xKey = "month" }: OccupancyChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis
          dataKey={xKey}
          tick={{ fill: "#6b7280", fontSize: 12 }}
          angle={xKey !== "month" ? -45 : 0}
          textAnchor={xKey !== "month" ? "end" : "middle"}
          height={xKey !== "month" ? 80 : 40}
        />
        <YAxis tick={{ fill: "#6b7280" }} />
        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "6px",
          }}
          formatter={(value) => [`${value}%`, ""]}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="boarding"
          stroke="#10b981"
          strokeWidth={3}
          dot={{ fill: "#10b981", r: 5 }}
          activeDot={{ r: 7 }}
          name="Boarding"
        />
        <Line
          type="monotone"
          dataKey="daycare"
          stroke="#3b82f6"
          strokeWidth={3}
          dot={{ fill: "#3b82f6", r: 5 }}
          activeDot={{ r: 7 }}
          name="Daycare"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function OccupancyRateModal({
  isOpen,
  onCloseAction,
}: {
  isOpen: boolean;
  onCloseAction: () => void;
}) {
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>(
    facilities.map((f) => f.id.toString()),
  );
  const [dateFrom, setDateFrom] = useState("2025-11-01");
  const [dateTo, setDateTo] = useState("2025-11-30");
  const [groupBy, setGroupBy] = useState<"day" | "week" | "month">("month");

  // Generate filtered data
  const filteredData = useMemo(() => {
    const fromDate = new Date(dateFrom);
    const toDate = new Date(dateTo);
    const selectedIds = selectedFacilities.map((id) => parseInt(id));

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const activeFacilities = facilities.filter(
      (f) => f.status === "active" && selectedIds.includes(f.id),
    );

    if (groupBy === "month") {
      return months.map((month, index) => {
        const seasonalFactor = 1 + 0.2 * Math.sin((index / 12) * 2 * Math.PI);

        let totalBoardingRate = 0;
        let boardingCount = 0;
        let totalDaycareRate = 0;
        let daycareCount = 0;

        activeFacilities.forEach((facility) => {
          const hasBoarding = facility.locationsList.some((l) =>
            l.services.includes("boarding"),
          );
          const hasDaycare = facility.locationsList.some((l) =>
            l.services.includes("daycare"),
          );

          if (hasBoarding) {
            const boardingRate = Math.min(
              100,
              Math.round((70 + (10 + index * 2)) * seasonalFactor),
            );
            totalBoardingRate += boardingRate;
            boardingCount++;
          }

          if (hasDaycare) {
            const daycareRate = Math.min(
              100,
              Math.round((75 + (5 + index)) * seasonalFactor),
            );
            totalDaycareRate += daycareRate;
            daycareCount++;
          }
        });

        const avgBoarding =
          boardingCount > 0 ? Math.round(totalBoardingRate / boardingCount) : 0;
        const avgDaycare =
          daycareCount > 0 ? Math.round(totalDaycareRate / daycareCount) : 0;

        return {
          month,
          boarding: avgBoarding,
          daycare: avgDaycare,
        };
      });
    } else if (groupBy === "week") {
      const weeks = [];
      const current = new Date(fromDate);
      while (current <= toDate) {
        const weekStart = new Date(current);
        const seasonalFactor =
          1 + 0.2 * Math.sin((weeks.length / 52) * 2 * Math.PI);

        let totalBoardingRate = 0;
        let boardingCount = 0;
        let totalDaycareRate = 0;
        let daycareCount = 0;

        activeFacilities.forEach((facility) => {
          const hasBoarding = facility.locationsList.some((l) =>
            l.services.includes("boarding"),
          );
          const hasDaycare = facility.locationsList.some((l) =>
            l.services.includes("daycare"),
          );

          if (hasBoarding) {
            const boardingRate = Math.min(
              100,
              Math.round((70 + weeks.length) * seasonalFactor),
            );
            totalBoardingRate += boardingRate;
            boardingCount++;
          }

          if (hasDaycare) {
            const daycareRate = Math.min(
              100,
              Math.round((75 + weeks.length * 0.5) * seasonalFactor),
            );
            totalDaycareRate += daycareRate;
            daycareCount++;
          }
        });

        const avgBoarding =
          boardingCount > 0 ? Math.round(totalBoardingRate / boardingCount) : 0;
        const avgDaycare =
          daycareCount > 0 ? Math.round(totalDaycareRate / daycareCount) : 0;

        weeks.push({
          period: `Week of ${weekStart.toLocaleDateString()}`,
          boarding: avgBoarding,
          daycare: avgDaycare,
        });
        current.setDate(current.getDate() + 7);
      }
      return weeks.slice(0, 12);
    } else {
      const days = [];
      const current = new Date(fromDate);
      while (current <= toDate && days.length < 30) {
        const seasonalFactor =
          1 + 0.2 * Math.sin((days.length / 365) * 2 * Math.PI);

        let totalBoardingRate = 0;
        let boardingCount = 0;
        let totalDaycareRate = 0;
        let daycareCount = 0;

        activeFacilities.forEach((facility) => {
          const hasBoarding = facility.locationsList.some((l) =>
            l.services.includes("boarding"),
          );
          const hasDaycare = facility.locationsList.some((l) =>
            l.services.includes("daycare"),
          );

          if (hasBoarding) {
            const boardingRate = Math.min(
              100,
              Math.round((70 + days.length * 0.1) * seasonalFactor),
            );
            totalBoardingRate += boardingRate;
            boardingCount++;
          }

          if (hasDaycare) {
            const daycareRate = Math.min(
              100,
              Math.round((75 + days.length * 0.05) * seasonalFactor),
            );
            totalDaycareRate += daycareRate;
            daycareCount++;
          }
        });

        const avgBoarding =
          boardingCount > 0 ? Math.round(totalBoardingRate / boardingCount) : 0;
        const avgDaycare =
          daycareCount > 0 ? Math.round(totalDaycareRate / daycareCount) : 0;

        days.push({
          period: current.toLocaleDateString(),
          boarding: avgBoarding,
          daycare: avgDaycare,
        });
        current.setDate(current.getDate() + 1);
      }
      return days;
    }
  }, [selectedFacilities, dateFrom, dateTo, groupBy]);

  return (
    <Dialog open={isOpen} onOpenChange={onCloseAction}>
      <DialogContent className="min-w-7xl h-[90vh] p-0">
        <div className="flex flex-col h-full">
          <DialogHeader className="px-6 py-4 border-b">
            <DialogTitle>Overall Occupancy Trends - Detailed View</DialogTitle>
          </DialogHeader>
          <div className="flex items-center gap-4 px-6 py-4 border-b bg-muted/50">
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium">Facilities:</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-48 justify-between">
                    {selectedFacilities.length === facilities.length
                      ? "All Facilities"
                      : `${selectedFacilities.length} Selected`}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 max-h-64 overflow-y-auto">
                  <DropdownMenuLabel>Select Facilities</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {facilities.map((facility) => (
                    <DropdownMenuCheckboxItem
                      key={facility.id}
                      checked={selectedFacilities.includes(
                        facility.id.toString(),
                      )}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedFacilities([
                            ...selectedFacilities,
                            facility.id.toString(),
                          ]);
                        } else {
                          setSelectedFacilities(
                            selectedFacilities.filter(
                              (id) => id !== facility.id.toString(),
                            ),
                          );
                        }
                      }}
                    >
                      {facility.name}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium">From:</Label>
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="w-32"
              />
            </div>
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium">To:</Label>
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="w-32"
              />
            </div>
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium">Group By:</Label>
              <Select
                value={groupBy}
                onValueChange={(value: "day" | "week" | "month") =>
                  setGroupBy(value)
                }
              >
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Day</SelectItem>
                  <SelectItem value="week">Week</SelectItem>
                  <SelectItem value="month">Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex-1 p-6">
            <OccupancyChart
              data={filteredData}
              xKey={groupBy === "month" ? "month" : "period"}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Generate overall occupancy trend data over 12 months
const generateOccupancyTrendData = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const activeFacilities = facilities.filter((f) => f.status === "active");

  return months.map((month, index) => {
    // Simulate seasonal variations
    const seasonalFactor = 1 + 0.2 * Math.sin((index / 12) * 2 * Math.PI); // Peak in summer

    let totalBoardingRate = 0;
    let boardingCount = 0;
    let totalDaycareRate = 0;
    let daycareCount = 0;

    activeFacilities.forEach((facility) => {
      const hasBoarding = facility.locationsList.some((l) =>
        l.services.includes("boarding"),
      );
      const hasDaycare = facility.locationsList.some((l) =>
        l.services.includes("daycare"),
      );

      if (hasBoarding) {
        const boardingRate = Math.min(
          100,
          Math.round((70 + (10 + index * 2)) * seasonalFactor),
        );
        totalBoardingRate += boardingRate;
        boardingCount++;
      }

      if (hasDaycare) {
        const daycareRate = Math.min(
          100,
          Math.round((75 + (5 + index)) * seasonalFactor),
        );
        totalDaycareRate += daycareRate;
        daycareCount++;
      }
    });

    const avgBoarding =
      boardingCount > 0 ? Math.round(totalBoardingRate / boardingCount) : 0;
    const avgDaycare =
      daycareCount > 0 ? Math.round(totalDaycareRate / daycareCount) : 0;

    return {
      month,
      boarding: avgBoarding,
      daycare: avgDaycare,
    };
  });
};

export function OccupancyRateChart() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const data = generateOccupancyTrendData();

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            Overall Occupancy Trends
          </CardTitle>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => setIsModalOpen(true)}
          >
            <Maximize className="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <OccupancyChart data={data} />
        </div>
      </CardContent>
      <OccupancyRateModal
        isOpen={isModalOpen}
        onCloseAction={() => setIsModalOpen(false)}
      />
    </Card>
  );
}
