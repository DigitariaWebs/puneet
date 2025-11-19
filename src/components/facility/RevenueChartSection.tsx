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
  Legend,
} from "recharts";
import {
  DollarSign,
  TrendingUp,
  BarChart3,
  LineChart as LineChartIcon,
  Maximize,
  ChevronDown,
} from "lucide-react";
import { facilities } from "@/data/facilities";

interface RevenueChartProps {
  data: Array<Record<string, string | number>>;
  chartType: "bar" | "line" | "area";
  xKey?: string;
}

export function RevenueChart({
  data,
  chartType,
  xKey = "month",
}: RevenueChartProps) {
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
            formatter={(value, name) => [
              `$${value.toLocaleString()}`,
              name === "revenue" ? "Revenue" : "Profit",
            ]}
          />
          <Legend />
          <Bar dataKey="revenue" fill="#3b82f6" radius={[6, 6, 0, 0]} />
          <Bar dataKey="profit" fill="#10b981" radius={[6, 6, 0, 0]} />
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
            formatter={(value, name) => [
              `$${value.toLocaleString()}`,
              name === "revenue" ? "Revenue" : "Profit",
            ]}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ fill: "#3b82f6", r: 5 }}
            activeDot={{ r: 7 }}
          />
          <Line
            type="monotone"
            dataKey="profit"
            stroke="#10b981"
            strokeWidth={3}
            dot={{ fill: "#10b981", r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      ) : (
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
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
            formatter={(value, name) => [
              `$${value.toLocaleString()}`,
              name === "revenue" ? "Revenue" : "Profit",
            ]}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#3b82f6"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorRevenue)"
          />
          <Area
            type="monotone"
            dataKey="profit"
            stroke="#10b981"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorProfit)"
          />
        </AreaChart>
      )}
    </ResponsiveContainer>
  );
}

export function RevenueChartModal({
  isOpen,
  onCloseAction,
  initialData,
  initialChartType,
}: {
  isOpen: boolean;
  onCloseAction: () => void;
  initialData: { month: string; revenue: number; profit: number }[];
  initialChartType: "bar" | "line" | "area";
}) {
  const [chartType, setChartType] = useState<"bar" | "line" | "area">(
    initialChartType,
  );
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>(
    facilities.map((f) => f.id.toString()),
  );
  const [dateFrom, setDateFrom] = useState("2024-01-01");
  const [dateTo, setDateTo] = useState("2024-12-31");
  const [groupBy, setGroupBy] = useState<"day" | "week" | "month">("month");

  // Generate filtered data
  const filteredData = useMemo(() => {
    const fromDate = new Date(dateFrom);
    const toDate = new Date(dateTo);
    const selectedIds = selectedFacilities.map((id) => parseInt(id));

    if (groupBy === "month") {
      return initialData.map((d) => ({
        ...d,
        revenue: Math.round(
          d.revenue * (selectedIds.length / facilities.length),
        ),
        profit: Math.round(d.profit * (selectedIds.length / facilities.length)),
      }));
    } else if (groupBy === "week") {
      // Simulate weekly data
      const weeks = [];
      const current = new Date(fromDate);
      while (current <= toDate) {
        const weekStart = new Date(current);
        const weekEnd = new Date(current);
        weekEnd.setDate(weekEnd.getDate() + 6);
        const revenue = Math.round(
          (20 + weeks.length * 5) * (selectedIds.length / facilities.length),
        );
        const profit = Math.round(revenue * 0.7);
        weeks.push({
          period: `Week of ${weekStart.toLocaleDateString()}`,
          revenue,
          profit,
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
        const revenue = Math.round(
          (100 + days.length * 2) * (selectedIds.length / facilities.length),
        );
        const profit = Math.round(revenue * 0.7);
        days.push({
          period: current.toLocaleDateString(),
          revenue,
          profit,
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
            <DialogTitle>Revenue Overview - Detailed View</DialogTitle>
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
            <RevenueChart
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

interface RevenueChartSectionProps {
  data: { month: string; revenue: number; profit: number }[];
  chartType: "bar" | "line" | "area";
  onChartTypeChange: (type: "bar" | "line" | "area") => void;
}

export function RevenueChartSection({
  data,
  chartType,
  onChartTypeChange,
}: RevenueChartSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const totalRevenue = data.reduce((sum, d) => sum + d.revenue, 0);
  const totalProfit = data.reduce((sum, d) => sum + d.profit, 0);

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-blue-600" />
            Revenue Overview
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
        <div className="flex items-baseline gap-4 mb-4">
          <div>
            <div className="text-sm text-muted-foreground">Revenue</div>
            <div className="text-2xl font-bold">
              ${totalRevenue.toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Profit</div>
            <div className="text-2xl font-bold text-green-600">
              ${totalProfit.toLocaleString()}
            </div>
          </div>
          <div className="flex items-center text-sm text-green-600">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span className="font-medium">+12.5%</span>
            <span className="text-muted-foreground ml-1">vs last month</span>
          </div>
        </div>
        <div className="h-64 w-full">
          <RevenueChart data={data} chartType={chartType} />
        </div>
      </CardContent>
      <RevenueChartModal
        isOpen={isModalOpen}
        onCloseAction={() => setIsModalOpen(false)}
        initialData={data}
        initialChartType={chartType}
      />
    </Card>
  );
}
