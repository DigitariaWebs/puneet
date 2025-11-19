"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Check, X, Eye, AlertTriangle } from "lucide-react";

interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  type: string;
  status: "pending" | "approved" | "denied";
  severity?: "normal" | "high";
}

interface NotificationsSectionProps {
  notifications: Notification[];
  onApprove: (id: number) => void;
  onDeny: (id: number) => void;
}

export function NotificationsSection({
  notifications,
  onApprove,
  onDeny,
}: NotificationsSectionProps) {
  const handleViewDetails = () => {
    // TODO: Implement view details
  };

  const getStatusColor = (status: string, severity?: string) => {
    if (severity === "high") {
      return "bg-red-50 border-red-300";
    }
    switch (status) {
      case "approved":
        return "bg-green-50 border-green-200";
      case "denied":
        return "bg-red-50 border-red-200";
      default:
        return "bg-muted/50 border";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notifications
        </CardTitle>
      </CardHeader>
      <CardContent>
        {notifications.length === 0 ? (
          <p className="text-muted-foreground">No notifications</p>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start gap-3 p-2 rounded-lg border transition-colors ${getStatusColor(notification.status, notification.severity)}`}
              >
                <div className="shrink-0">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${notification.severity === "high" ? "bg-red-100" : "bg-primary/10"}`}
                  >
                    {notification.severity === "high" ? (
                      <AlertTriangle className="h-3 w-3 text-red-600" />
                    ) : (
                      <Bell className="h-3 w-3 text-primary" />
                    )}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{notification.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {notification.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {notification.time}
                  </p>
                </div>
                <div className="flex gap-2">
                  {notification.status === "pending" &&
                  notification.type !== "incident" ? (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 px-2 text-xs"
                        onClick={() => onApprove(notification.id)}
                      >
                        <Check className="h-3 w-3 mr-1" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 px-2 text-xs"
                        onClick={() => onDeny(notification.id)}
                      >
                        <X className="h-3 w-3 mr-1" />
                        Deny
                      </Button>
                    </>
                  ) : notification.status !== "pending" ? (
                    <span
                      className={`text-sm font-medium ${notification.status === "approved" ? "text-green-600" : "text-red-600"}`}
                    >
                      {notification.status === "approved"
                        ? "Approved"
                        : "Denied"}
                    </span>
                  ) : null}
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 px-2 text-xs"
                    onClick={() => handleViewDetails()}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
