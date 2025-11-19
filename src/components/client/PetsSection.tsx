"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/DataTable";
import { Heart, PawPrint } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

interface Pet {
  id: number;
  name: string;
  type: string;
  breed: string;
  age: number;
  weight: number;
  color: string;
  microchip: string;
  allergies: string;
  specialNeeds: string;
}

interface PetsSectionProps {
  client: {
    id: number;
    pets: Pet[];
  };
}

export function PetsSection({ client }: PetsSectionProps) {
  const params = useParams();
  const clientId = params.id as string;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PawPrint className="h-5 w-5" />
          Pets ({client.pets.length})
        </CardTitle>
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
              key: "breed",
              label: "Breed",
            },
            {
              key: "age",
              label: "Age",
            },
            {
              key: "weight",
              label: "Weight (kg)",
            },
            {
              key: "color",
              label: "Color",
            },
            {
              key: "specialNeeds",
              label: "Special Needs",
            },
          ]}
          actions={(item) => (
            <Link
              href={`/dashboard/clients/${clientId}/pet/${item.id as number}`}
            >
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </Link>
          )}
        />
      </CardContent>
    </Card>
  );
}
