"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";

interface PermissionsSectionProps {
  user: {
    permissions: string[];
  };
}

export function PermissionsSection({ user }: PermissionsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Permissions ({user.permissions.length})</CardTitle>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
}
