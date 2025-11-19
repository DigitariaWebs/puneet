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
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Building, Maximize, ChevronDown } from "lucide-react";
import { facilities } from "@/data/facilities";

interface FacilityComparisonChartProps {
  chartType: "revenue" | "bookings" | "clients" | "users" | "locations";
  onChartTypeChange: (
    type: "revenue" | "bookings" | "clients" | "users" | "locations",
  ) => void;
}

interface FacilityChartProps {
  data: Array<Record<string, string | number>>;
  chartType: "revenue" | "bookings" | "clients" | "users" | "locations";
}

export function FacilityChart({ data, chartType }: FacilityChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis
          dataKey="name"
          type="category"
          tick={{ fill: "#6b7280", fontSize: 10 }}
          angle={-45}
          textAnchor="end"
          height={60}
        />
        <YAxis tick={{ fill: "#6b7280" }} />
        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "6px",
          }}
          formatter={(value) => [
            chartType === "revenue" || chartType === "bookings"
              ? value.toLocaleString()
              : value,
            chartType.charAt(0).toUpperCase() + chartType.slice(1),
          ]}
          labelFormatter={(label) =>
            data.find((d) => d.name === label)?.fullName || label
          }
        />
        <Bar dataKey={chartType} fill="#8b5cf6" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function FacilityComparisonModal({
  isOpen,
  onCloseAction,
  initialChartType,
}: {
  isOpen: boolean;
  onCloseAction: () => void;
  initialChartType: "revenue" | "bookings" | "clients" | "users" | "locations";
}) {
  const [chartType, setChartType] = useState<
    "revenue" | "bookings" | "clients" | "users" | "locations"
  >(initialChartType);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>(
    facilities.map((f) => f.id.toString()),
  );

  // Generate filtered data
  const filteredData = useMemo(() => {
    const selectedIds = selectedFacilities.map((id) => parseInt(id));
    const totalClients = facilities.reduce(
      (sum, f) => sum + f.clients.length,
      0,
    );

    return facilities
      .filter((f) => selectedIds.includes(f.id))
      .map((facility) => {
        let value: number;
        if (chartType === "clients") {
          value = facility.clients.length;
        } else if (chartType === "users") {
          value = facility.usersList.length;
        } else if (chartType === "locations") {
          value = facility.locationsList.length;
        } else {
          const proportion = facility.clients.length / totalClients;
          const baseValue = chartType === "revenue" ? 50000 : 500;
          value = Math.round(baseValue * proportion * facilities.length);
        }
        return {
          name: facility.name.split(" ")[0] + " " + facility.name.split(" ")[1],
          [chartType]: value,
          fullName: facility.name,
        };
      });
  }, [selectedFacilities, chartType]);

  return (
    <Dialog open={isOpen} onOpenChange={onCloseAction}>
      <DialogContent className="min-w-7xl h-[90vh] p-0">
        <div className="flex flex-col h-full">
          <DialogHeader className="px-6 py-4 border-b">
            <DialogTitle>
              Facility Performance Comparison - Detailed View
            </DialogTitle>
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
            <div className="flex items-center gap-1 ml-auto">
              <Button
                variant={chartType === "revenue" ? "default" : "outline"}
                size="sm"
                onClick={() => setChartType("revenue")}
              >
                Revenue
              </Button>
              <Button
                variant={chartType === "bookings" ? "default" : "outline"}
                size="sm"
                onClick={() => setChartType("bookings")}
              >
                Bookings
              </Button>
              <Button
                variant={chartType === "clients" ? "default" : "outline"}
                size="sm"
                onClick={() => setChartType("clients")}
              >
                Clients
              </Button>
              <Button
                variant={chartType === "users" ? "default" : "outline"}
                size="sm"
                onClick={() => setChartType("users")}
              >
                Users
              </Button>
              <Button
                variant={chartType === "locations" ? "default" : "outline"}
                size="sm"
                onClick={() => setChartType("locations")}
              >
                Locations
              </Button>
            </div>
          </div>
          <div className="flex-1 p-6">
            <FacilityChart data={filteredData} chartType={chartType} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Generate facility data based on client count for proportionality
const generateFacilityData = (
  type: "revenue" | "bookings" | "clients" | "users" | "locations",
) => {
  const totalClients = facilities.reduce((sum, f) => sum + f.clients.length, 0);

  // Base data for revenue/bookings
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

  return facilities.map((facility) => {
    let value: number;
    if (type === "clients") {
      value = facility.clients.length;
    } else if (type === "users") {
      value = facility.usersList.length;
    } else if (type === "locations") {
      value = facility.locationsList.length;
    } else {
      const proportion = facility.clients.length / totalClients;
      const totalBase =
        type === "revenue"
          ? baseRevenueData.reduce((sum, d) => sum + d.revenue, 0)
          : baseBookingsData.reduce((sum, d) => sum + d.bookings, 0);
      const averageMonthly = (totalBase / 12) * facilities.length;
      value = Math.round(averageMonthly * proportion);
    }
    return {
      name: facility.name.split(" ")[0] + " " + facility.name.split(" ")[1], // Shorten name
      [type]: value,
      fullName: facility.name,
    };
  });
};

export function FacilityComparisonChart({
  chartType,
  onChartTypeChange,
}: FacilityComparisonChartProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const data = generateFacilityData(chartType);
  const totalValue = data.reduce((sum, d) => sum + (d[chartType] as number), 0);

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5 text-purple-600" />
            Facility Performance Comparison
          </CardTitle>
          <div className="flex items-center gap-1">
            <Button
              variant={chartType === "revenue" ? "default" : "outline"}
              size="sm"
              onClick={() => onChartTypeChange("revenue")}
            >
              Revenue
            </Button>
            <Button
              variant={chartType === "bookings" ? "default" : "outline"}
              size="sm"
              onClick={() => onChartTypeChange("bookings")}
            >
              Bookings
            </Button>
            <Button
              variant={chartType === "clients" ? "default" : "outline"}
              size="sm"
              onClick={() => onChartTypeChange("clients")}
            >
              Clients
            </Button>
            <Button
              variant={chartType === "users" ? "default" : "outline"}
              size="sm"
              onClick={() => onChartTypeChange("users")}
            >
              Users
            </Button>
            <Button
              variant={chartType === "locations" ? "default" : "outline"}
              size="sm"
              onClick={() => onChartTypeChange("locations")}
            >
              Locations
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
            <div className="text-sm text-muted-foreground">
              Total{" "}
              {chartType === "revenue" || chartType === "bookings"
                ? "Average Monthly "
                : ""}
              {chartType.charAt(0).toUpperCase() + chartType.slice(1)}
            </div>
            <div className="text-2xl font-bold">
              {chartType === "revenue"
                ? `$${totalValue.toLocaleString()}`
                : totalValue.toLocaleString()}
            </div>
          </div>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="name"
                type="category"
                tick={{ fill: "#6b7280", fontSize: 10 }}
                axisLine={{ stroke: "#e5e7eb" }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis
                type="number"
                tick={{ fill: "#6b7280" }}
                axisLine={{ stroke: "#e5e7eb" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "6px",
                }}
                formatter={(value) => [
                  chartType === "revenue"
                    ? `$${value.toLocaleString()}`
                    : value.toLocaleString(),
                  chartType === "revenue"
                    ? "Revenue"
                    : chartType === "bookings"
                      ? "Bookings"
                      : chartType === "clients"
                        ? "Clients"
                        : chartType === "users"
                          ? "Users"
                          : "Locations",
                ]}
                labelFormatter={(label) =>
                  data.find((d) => d.name === label)?.fullName || label
                }
              />
              <Bar dataKey={chartType} fill="#8b5cf6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <FacilityComparisonModal
        isOpen={isModalOpen}
        onCloseAction={() => setIsModalOpen(false)}
        initialChartType={chartType}
      />
    </Card>
  );
}
