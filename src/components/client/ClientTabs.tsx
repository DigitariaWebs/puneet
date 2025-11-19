"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/DataTable";

import { User, Heart, Activity } from "lucide-react";

interface ClientTabsProps {
  client: {
    pets: { name: string; type: string; age: number }[];
  };
}

export function ClientTabs({ client }: ClientTabsProps) {
  // Mock activity data
  const activityData = [
    {
      date: "2024-10-01",
      action: "Logged in",
      details: "Accessed client portal",
    },
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
          value="pets"
          className="gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"
        >
          <Heart className="h-4 w-4" />
          Pets ({client.pets.length})
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
          <h3 className="text-lg font-semibold">Client Profile</h3>
          <p>Profile details would go here.</p>
        </div>
      </TabsContent>
      <TabsContent value="pets" className="mt-3">
        <DataTable
          data={client.pets as unknown as Record<string, unknown>[]}
          columns={[
            {
              key: "name",
              label: "Name",
              icon: Heart,
            },
            {
              key: "type",
              label: "Type",
            },
            {
              key: "age",
              label: "Age",
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
