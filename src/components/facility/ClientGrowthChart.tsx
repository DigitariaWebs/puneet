"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
} from "recharts";
import { Users, TrendingUp, Maximize, ChevronDown } from "lucide-react";
import { facilities } from "@/data/facilities";
import { Button } from "../ui/button";

interface ClientGrowthChartProps {
  data: Array<Record<string, string | number>>;
  xKey?: string;
}

export function ClientGrowthChart({
  data,
  xKey = "month",
}: ClientGrowthChartProps) {
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
          formatter={(value) => [value, "Total Clients"]}
        />
        <Line
          type="monotone"
          dataKey="totalClients"
          stroke="#10b981"
          strokeWidth={3}
          dot={{ fill: "#10b981", r: 5 }}
          activeDot={{ r: 7 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function ClientGrowthModal({
  isOpen,
  onCloseAction,
}: {
  isOpen: boolean;
  onCloseAction: () => void;
}) {
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

    if (groupBy === "month") {
      return months.map((month, index) => {
        let totalClients = 0;
        facilities
          .filter((f) => selectedIds.includes(f.id))
          .forEach((facility) => {
            const baseClients = facility.clients.length;
            const sizeBonus = baseClients < 3 ? 0.1 : 0;
            const planBonus = facility.plan === "Premium" ? 0.05 : 0;
            const growthFactor =
              1 + index * 0.08 + sizeBonus + planBonus + (5 + index * 2);
            const clients = Math.round(baseClients * growthFactor);
            totalClients += clients;
          });
        return { month, totalClients };
      });
    } else if (groupBy === "week") {
      const weeks = [];
      const current = new Date(fromDate);
      while (current <= toDate) {
        const weekStart = new Date(current);
        const weekEnd = new Date(current);
        weekEnd.setDate(weekEnd.getDate() + 6);
        let totalClients = 0;
        facilities
          .filter((f) => selectedIds.includes(f.id))
          .forEach((facility) => {
            const baseClients = facility.clients.length;
            const weeksIndex = weeks.length;
            const growthFactor = 1 + weeksIndex * 0.02 + (5 + weeksIndex);
            const clients = Math.round(baseClients * growthFactor);
            totalClients += clients;
          });
        weeks.push({
          period: `Week of ${weekStart.toLocaleDateString()}`,
          totalClients,
        });
        current.setDate(current.getDate() + 7);
      }
      return weeks.slice(0, 12);
    } else {
      const days = [];
      const current = new Date(fromDate);
      while (current <= toDate && days.length < 30) {
        let totalClients = 0;
        facilities
          .filter((f) => selectedIds.includes(f.id))
          .forEach((facility) => {
            const baseClients = facility.clients.length;
            const daysIndex = days.length;
            const growthFactor = 1 + daysIndex * 0.005 + (5 + daysIndex * 0.1);
            const clients = Math.round(baseClients * growthFactor);
            totalClients += clients;
          });
        days.push({
          period: current.toLocaleDateString(),
          totalClients,
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
            <DialogTitle>Client Growth Trends - Detailed View</DialogTitle>
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
            <ClientGrowthChart
              data={filteredData}
              xKey={groupBy === "month" ? "month" : "period"}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Simulate client growth data over months per facility
const generateClientGrowthData = () => {
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

  return months.map((month, index) => {
    let totalClients = 0;
    facilities.forEach((facility) => {
      // Simulate growth based on facility size, plan, and randomness
      const baseClients = facility.clients.length;
      const sizeBonus = baseClients < 3 ? 0.1 : 0; // Smaller facilities grow faster
      const planBonus = facility.plan === "Premium" ? 0.05 : 0; // Premium plans attract more clients
      const growthFactor =
        1 + index * 0.08 + sizeBonus + planBonus + (5 + index * 2);
      const clients = Math.round(baseClients * growthFactor);
      totalClients += clients;
    });
    return { month, totalClients };
  });
};

export function ClientGrowthChartSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const clientGrowthData = generateClientGrowthData();
  const totalClients =
    clientGrowthData[clientGrowthData.length - 1].totalClients;

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-green-600" />
            Client Growth Trends
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
        <div className="flex items-baseline gap-4 mb-4">
          <div>
            <div className="text-sm text-muted-foreground">
              Total Clients (12 months)
            </div>
            <div className="text-2xl font-bold">{totalClients}</div>
          </div>
          <div className="flex items-center text-sm text-green-600">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span className="font-medium">
              +
              {Math.round(
                (totalClients /
                  facilities.reduce(
                    (sum: number, f) => sum + f.clients.length,
                    0,
                  ) -
                  1) *
                  100,
              )}
              %
            </span>
            <span className="text-muted-foreground ml-1">growth rate</span>
          </div>
        </div>
        <div className="h-64 w-full">
          <ClientGrowthChart data={clientGrowthData} />
        </div>
      </CardContent>
      <ClientGrowthModal
        isOpen={isModalOpen}
        onCloseAction={() => setIsModalOpen(false)}
      />
    </Card>
  );
}
