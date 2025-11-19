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
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  CalendarDays,
  TrendingUp,
  BarChart3,
  LineChart as LineChartIcon,
  Maximize,
  ChevronDown,
} from "lucide-react";
import { facilities } from "@/data/facilities";

interface BookingsChartSectionProps {
  data: { month: string; bookings: number }[];
  chartType: "bar" | "line" | "area";
  onChartTypeChange: (type: "bar" | "line" | "area") => void;
}

interface BookingsChartProps {
  data: Array<Record<string, string | number>>;
  chartType: "bar" | "line" | "area";
  xKey?: string;
}

export function BookingsChart({
  data,
  chartType,
  xKey = "month",
}: BookingsChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      {chartType === "bar" ? (
        <BarChart data={data}>
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
            formatter={(value) => [`${value} bookings`, "Bookings"]}
          />
          <Bar dataKey="bookings" fill="#10b981" radius={[6, 6, 0, 0]} />
        </BarChart>
      ) : chartType === "line" ? (
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
            formatter={(value) => [`${value} bookings`, "Bookings"]}
          />
          <Line
            type="monotone"
            dataKey="bookings"
            stroke="#10b981"
            strokeWidth={3}
            dot={{ fill: "#10b981", r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      ) : (
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
            </linearGradient>
          </defs>
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
            formatter={(value) => [`${value} bookings`, "Bookings"]}
          />
          <Area
            type="monotone"
            dataKey="bookings"
            stroke="#10b981"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorBookings)"
          />
        </AreaChart>
      )}
    </ResponsiveContainer>
  );
}

export function BookingsChartModal({
  isOpen,
  onCloseAction,
  initialData,
  initialChartType,
}: {
  isOpen: boolean;
  onCloseAction: () => void;
  initialData: { month: string; bookings: number }[];
  initialChartType: "bar" | "line" | "area";
}) {
  const [chartType, setChartType] = useState<"bar" | "line" | "area">(
    initialChartType,
  );
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

    if (groupBy === "month") {
      return initialData.map((d) => ({
        ...d,
        bookings: Math.round(
          d.bookings * (selectedIds.length / facilities.length),
        ),
      }));
    } else if (groupBy === "week") {
      // Simulate weekly data
      const weeks = [];
      const current = new Date(fromDate);
      while (current <= toDate) {
        const weekStart = new Date(current);
        const weekEnd = new Date(current);
        weekEnd.setDate(weekEnd.getDate() + 6);
        const bookings = Math.round(
          (20 + weeks.length * 2) * (selectedIds.length / facilities.length),
        );
        weeks.push({
          period: `Week of ${weekStart.toLocaleDateString()}`,
          bookings,
        });
        current.setDate(current.getDate() + 7);
      }
      return weeks.slice(0, 12); // Limit to 12 weeks
    } else {
      // Daily
      const days = [];
      const current = new Date(fromDate);
      while (current <= toDate && days.length < 30) {
        // Limit to 30 days
        const bookings = Math.round(
          (5 + days.length) * (selectedIds.length / facilities.length),
        );
        days.push({
          period: current.toLocaleDateString(),
          bookings,
        });
        current.setDate(current.getDate() + 1);
      }
      return days;
    }
  }, [selectedFacilities, dateFrom, dateTo, groupBy, initialData]);

  return (
    <Dialog open={isOpen} onOpenChange={onCloseAction}>
      <DialogContent className="min-w-7xl h-[90vh] p-0">
        <div className="flex flex-col h-full">
          <DialogHeader className="px-6 py-4 border-b">
            <DialogTitle>Bookings Overview - Detailed View</DialogTitle>
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
            <div className="flex items-center gap-1 ml-auto">
              <Button
                variant={chartType === "bar" ? "default" : "outline"}
                size="sm"
                onClick={() => setChartType("bar")}
              >
                <BarChart3 className="h-4 w-4" />
              </Button>
              <Button
                variant={chartType === "line" ? "default" : "outline"}
                size="sm"
                onClick={() => setChartType("line")}
              >
                <LineChartIcon className="h-4 w-4" />
              </Button>
              <Button
                variant={chartType === "area" ? "default" : "outline"}
                size="sm"
                onClick={() => setChartType("area")}
              >
                <TrendingUp className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex-1 p-6">
            <BookingsChart
              data={filteredData}
              chartType={chartType}
              xKey={groupBy === "month" ? "month" : "period"}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function BookingsChartSection({
  data,
  chartType,
  onChartTypeChange,
}: BookingsChartSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const totalBookings = data.reduce((sum, d) => sum + d.bookings, 0);

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-green-600" />
            Bookings Overview
          </CardTitle>
          <div className="flex items-center gap-1">
            <Button
              variant={chartType === "bar" ? "default" : "outline"}
              size="icon"
              className="h-7 w-7"
              onClick={() => onChartTypeChange("bar")}
            >
              <BarChart3 className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant={chartType === "line" ? "default" : "outline"}
              size="icon"
              className="h-7 w-7"
              onClick={() => onChartTypeChange("line")}
            >
              <LineChartIcon className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant={chartType === "area" ? "default" : "outline"}
              size="icon"
              className="h-7 w-7"
              onClick={() => onChartTypeChange("area")}
            >
              <TrendingUp className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => setIsModalOpen(true)}
            >
              <Maximize className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2 mb-4">
          <div className="text-3xl font-bold">{totalBookings}</div>
          <span className="text-muted-foreground text-sm">bookings</span>
          <div className="flex items-center text-sm text-green-600 ml-2">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span className="font-medium">+8.3%</span>
            <span className="text-muted-foreground ml-1">vs last month</span>
          </div>
        </div>
        <div className="h-64 w-full">
          <BookingsChart data={data} chartType={chartType} />
        </div>
      </CardContent>
      <BookingsChartModal
        isOpen={isModalOpen}
        onCloseAction={() => setIsModalOpen(false)}
        initialData={data}
        initialChartType={chartType}
      />
    </Card>
  );
}
