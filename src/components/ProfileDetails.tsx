"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Person {
  name: string;
  email: string;
  phone?: string;
  role?: string;
  facility: string;
  hireDate?: string;
}

interface ProfileDetailsProps {
  person: Person;
}

export function ProfileDetails({ person }: ProfileDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <label className="text-sm font-medium text-muted-foreground">
              Name
            </label>
            <p className="text-sm">{person.name}</p>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-muted-foreground">
              Email
            </label>
            <p className="text-sm">{person.email}</p>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-muted-foreground">
              Phone
            </label>
            <p className="text-sm">{person.phone || "N/A"}</p>
          </div>
          {person.role && (
            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground">
                Role
              </label>
              <p className="text-sm">{person.role}</p>
            </div>
          )}
          <div className="space-y-1">
            <label className="text-sm font-medium text-muted-foreground">
              Facility
            </label>
            <p className="text-sm">{person.facility}</p>
          </div>
          {person.hireDate && (
            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground">
                Hire Date
              </label>
              <p className="text-sm">{person.hireDate}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
