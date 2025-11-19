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
  Legend,
} from "recharts";
import { Scissors, Maximize, ChevronDown } from "lucide-react";
import { facilities } from "@/data/facilities";

interface ServiceChartProps {
  data: Array<Record<string, string | number>>;
}

export function ServiceChart({ data }: ServiceChartProps) {
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
          formatter={(value, name) => [value, name]}
          labelFormatter={(label) =>
            data.find((d) => d.name === label)?.fullName || label
          }
        />
        <Legend />
        <Bar dataKey="grooming" stackId="a" fill="#f59e0b" />
        <Bar dataKey="daycare" stackId="a" fill="#3b82f6" />
        <Bar dataKey="boarding" stackId="a" fill="#10b981" />
        <Bar dataKey="vet" stackId="a" fill="#ef4444" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function ServicePopularityModal({
  isOpen,
  onCloseAction,
}: {
  isOpen: boolean;
  onCloseAction: () => void;
}) {
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>(
    facilities.map((f) => f.id.toString()),
  );

  // Generate filtered data
  const filteredData = useMemo(() => {
    const selectedIds = selectedFacilities.map((id) => parseInt(id));

    return facilities
      .filter((f) => selectedIds.includes(f.id))
      .map((facility) => {
        const serviceCount: Record<string, number> = {};

        facility.locationsList.forEach((location) => {
          location.services.forEach((service) => {
            serviceCount[service] = (serviceCount[service] || 0) + 1;
          });
        });

        return {
          name: facility.name.split(" ")[0] + " " + facility.name.split(" ")[1],
          grooming: serviceCount.grooming || 0,
          daycare: serviceCount.daycare || 0,
          boarding: serviceCount.boarding || 0,
          vet: serviceCount.vet || 0,
          fullName: facility.name,
        };
      });
  }, [selectedFacilities]);

  return (
    <Dialog open={isOpen} onOpenChange={onCloseAction}>
      <DialogContent className="min-w-7xl h-[90vh] p-0">
        <div className="flex flex-col h-full">
          <DialogHeader className="px-6 py-4 border-b">
            <DialogTitle>
              Service Distribution by Facility - Detailed View
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
          </div>
          <div className="flex-1 p-6">
            <ServiceChart data={filteredData} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Generate service data per facility
const generateServiceData = () => {
  return facilities.map((facility) => {
    const serviceCount: Record<string, number> = {};

    facility.locationsList.forEach((location) => {
      location.services.forEach((service) => {
        serviceCount[service] = (serviceCount[service] || 0) + 1;
      });
    });

    return {
      name: facility.name.split(" ")[0] + " " + facility.name.split(" ")[1],
      grooming: serviceCount.grooming || 0,
      daycare: serviceCount.daycare || 0,
      boarding: serviceCount.boarding || 0,
      vet: serviceCount.vet || 0,
      fullName: facility.name,
    };
  });
};

export function ServicePopularityChart() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const data = generateServiceData();

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Scissors className="h-5 w-5 text-orange-600" />
            Service Distribution by Facility
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
          <ServiceChart data={data} />
        </div>
      </CardContent>
      <ServicePopularityModal
        isOpen={isModalOpen}
        onCloseAction={() => setIsModalOpen(false)}
      />
    </Card>
  );
}
