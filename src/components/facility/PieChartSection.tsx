"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { Users, Building, ToggleLeft, ToggleRight } from "lucide-react";
import { facilities } from "@/data/facilities";

const COLORS = [
  "#3b82f6", // blue
  "#10b981", // green
  "#f59e0b", // amber
  "#ef4444", // red
  "#8b5cf6", // violet
  "#06b6d4", // cyan
];

export function PieChartSection() {
  // Compute user types data
  const userTypesData = facilities.reduce(
    (acc, facility) => {
      facility.usersList.forEach((user) => {
        const role = user.role;
        acc[role] = (acc[role] || 0) + 1;
      });
      return acc;
    },
    {} as Record<string, number>,
  );

  const userTypesChartData = Object.entries(userTypesData).map(
    ([name, value]) => ({
      name,
      value,
    }),
  );

  // Compute plans data
  const plansData = facilities.reduce(
    (acc, facility) => {
      acc[facility.plan] = (acc[facility.plan] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const plansChartData = Object.entries(plansData).map(([name, value]) => ({
    name,
    value,
  }));

  // Compute status data
  const statusData = facilities.reduce(
    (acc, facility) => {
      acc[facility.status] = (acc[facility.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const statusChartData = Object.entries(statusData).map(([name, value]) => ({
    name,
    value,
  }));

  const [showStatus, setShowStatus] = useState(false);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* User Types Pie Chart */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            User Types Composition
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={userTypesChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${((percent || 0) * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {userTypesChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Facilities Plans/Status Pie Chart */}
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5 text-green-600" />
              Facilities {showStatus ? "Status" : "Plans"} Composition
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowStatus(!showStatus)}
              className="flex items-center gap-2"
            >
              {showStatus ? (
                <>
                  <ToggleRight className="h-4 w-4" />
                  Show Plans
                </>
              ) : (
                <>
                  <ToggleLeft className="h-4 w-4" />
                  Show Status
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={showStatus ? statusChartData : plansChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${((percent || 0) * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {(showStatus ? statusChartData : plansChartData).map(
                    (entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ),
                  )}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
