"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, List, Clock } from "lucide-react";

interface Activity {
  id: number;
  type: string;
  title: string;
  description: string;
  time: string;
  date: string;
  facility?: string;
}

interface RecentActivitiesSectionProps {
  activities: Activity[];
  viewMode: "list" | "timeline";
  onViewModeChange: (mode: "list" | "timeline") => void;
}

export function RecentActivitiesSection({
  activities,
  viewMode,
  onViewModeChange,
}: RecentActivitiesSectionProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Recent Activities
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => onViewModeChange("list")}
            >
              <List className="h-4 w-4 mr-2" />
              List
            </Button>
            <Button
              variant={viewMode === "timeline" ? "default" : "outline"}
              size="sm"
              onClick={() => onViewModeChange("timeline")}
            >
              <Clock className="h-4 w-4 mr-2" />
              Timeline
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {viewMode === "list" ? (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className="shrink-0">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Activity className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {activity.description}
                  </p>
                  {activity.facility && (
                    <p className="text-xs text-muted-foreground">
                      Facility: {activity.facility}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {activities.map((activity, index) => (
              <div key={activity.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  {index < activities.length - 1 && (
                    <div className="w-0.5 h-16 bg-border mt-2"></div>
                  )}
                </div>
                <div className="flex-1 pb-6">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{activity.title}</h4>
                    <span className="text-xs text-muted-foreground">
                      {activity.time}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {activity.description}
                  </p>
                  {activity.facility && (
                    <p className="text-xs text-muted-foreground">
                      Facility: {activity.facility}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
