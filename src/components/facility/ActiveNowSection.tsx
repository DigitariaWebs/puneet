"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Wrench } from "lucide-react";

interface ActiveItem {
  id: number;
  type: "user" | "service";
  name: string;
  description: string;
  avatar?: string;
  status: "online" | "busy" | "active";
  requestingSupport?: boolean;
}

interface ActiveNowSectionProps {
  activeItems: ActiveItem[];
}

export function ActiveNowSection({ activeItems }: ActiveNowSectionProps) {
  const sortedItems = [...activeItems].sort((a, b) => {
    if (a.requestingSupport && !b.requestingSupport) return -1;
    if (!a.requestingSupport && b.requestingSupport) return 1;
    return 0;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "busy":
        return "bg-yellow-500";
      case "active":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Active Now
        </CardTitle>
      </CardHeader>
      <CardContent>
        {activeItems.length === 0 ? (
          <p className="text-muted-foreground">No active users or services</p>
        ) : (
          <div className="space-y-4">
            {sortedItems.map((item) => (
              <div
                key={item.id}
                className={`flex items-center gap-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors ${item.requestingSupport ? "bg-yellow-50 border-yellow-200" : ""}`}
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  {item.type === "user" ? (
                    <Users className="h-4 w-4 text-primary" />
                  ) : (
                    <Wrench className="h-4 w-4 text-primary" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                  {item.requestingSupport && (
                    <p className="text-xs text-yellow-600 font-medium">
                      Requesting Support
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full animate-pulse ${getStatusColor(item.status)}`}
                  ></div>
                  <span className="text-xs text-muted-foreground capitalize">
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
