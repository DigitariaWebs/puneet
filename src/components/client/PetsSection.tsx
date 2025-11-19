"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/DataTable";
import { Heart } from "lucide-react";

interface PetsSectionProps {
  client: {
    pets: { name: string; type: string; age: number }[];
  };
}

export function PetsSection({ client }: PetsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pets ({client.pets.length})</CardTitle>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
}
