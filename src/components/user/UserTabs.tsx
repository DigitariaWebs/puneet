"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { User, Shield, Activity } from "lucide-react";

interface UserTabsProps {
  user: {
    permissions: string[];
  };
}

export function UserTabs({ user }: UserTabsProps) {
  // Mock activity data
  const activityData = [
    { date: "2024-10-01", action: "Logged in", details: "From web app" },
    { date: "2024-09-28", action: "Updated pet record", details: "For Buddy" },
    {
      date: "2024-09-25",
      action: "Scheduled appointment",
      details: "Grooming for Max",
    },
  ];

  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="grid w-full grid-cols-3 h-auto bg-muted p-1 rounded-lg">
        <TabsTrigger
          value="profile"
          className="gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"
        >
          <User className="h-4 w-4" />
          Profile
        </TabsTrigger>
        <TabsTrigger
          value="permissions"
          className="gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"
        >
          <Shield className="h-4 w-4" />
          Permissions ({user.permissions.length})
        </TabsTrigger>
        <TabsTrigger
          value="activity"
          className="gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"
        >
          <Activity className="h-4 w-4" />
          Activity
        </TabsTrigger>
      </TabsList>
      <TabsContent value="profile" className="mt-3">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">User Profile</h3>
          <p>Profile details would go here.</p>
        </div>
      </TabsContent>
      <TabsContent value="permissions" className="mt-3">
        <DataTable
          data={
            user.permissions.map((p) => ({
              permission: p,
            })) as unknown as Record<string, unknown>[]
          }
          columns={[
            {
              key: "permission",
              label: "Permission",
              icon: Shield,
              render: (item: Record<string, unknown>) => (
                <Badge variant="secondary" className="capitalize">
                  {item.permission as string}
                </Badge>
              ),
            },
          ]}
        />
      </TabsContent>

      <TabsContent value="activity" className="mt-3">
        <DataTable
          data={activityData as unknown as Record<string, unknown>[]}
          columns={[
            {
              key: "date",
              label: "Date",
            },
            {
              key: "action",
              label: "Action",
              icon: Activity,
            },
            {
              key: "details",
              label: "Details",
            },
          ]}
        />
      </TabsContent>
    </Tabs>
  );
}
