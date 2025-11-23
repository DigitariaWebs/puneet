"use client";

import { useParams, useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/DataTable";
import {
  ArrowLeft,
  Heart,
  Syringe,
  AlertTriangle,
  Calendar,
  Camera,
  Utensils,
  User,
} from "lucide-react";
import { clients } from "@/data/clients";

interface VaccineRecord {
  id: number;
  vaccine: string;
  date: string;
  nextDue: string;
  status: string;
}

interface IncidentRecord {
  id: number;
  date: string;
  type: string;
  description: string;
  severity: string;
  resolution: string;
}

interface ServiceRecord {
  id: number;
  service: string;
  frequency: string;
  nextVisit: string | null;
  status: string;
}

interface MedicalRecord {
  id: number;
  date: string;
  type: string;
  description: string;
  vet: string;
}

interface DietInfo {
  food: string;
  amount: string;
  treats: string;
  restrictions: string;
}

// Mock data for pet details
const petVaccines: Record<number, VaccineRecord[]> = {
  1: [
    {
      id: 1,
      vaccine: "Rabies",
      date: "2025-08-15",
      nextDue: "2026-08-15",
      status: "up-to-date",
    },
    {
      id: 2,
      vaccine: "DHPP",
      date: "2025-08-15",
      nextDue: "2026-08-15",
      status: "up-to-date",
    },
    {
      id: 3,
      vaccine: "Bordetella",
      date: "2025-09-10",
      nextDue: "2026-03-10",
      status: "up-to-date",
    },
  ],
  2: [
    {
      id: 1,
      vaccine: "FVRCP",
      date: "2025-07-20",
      nextDue: "2026-07-20",
      status: "up-to-date",
    },
    {
      id: 2,
      vaccine: "Rabies",
      date: "2025-07-20",
      nextDue: "2029-07-20",
      status: "up-to-date",
    },
  ],
  // Add more for other pets...
};

const petIncidents: Record<number, IncidentRecord[]> = {
  1: [
    {
      id: 1,
      date: "2025-10-05",
      type: "Minor injury",
      description: "Sprained paw during play",
      severity: "low",
      resolution: "Rest and monitoring",
    },
  ],
  3: [
    {
      id: 1,
      date: "2025-09-20",
      type: "Allergic reaction",
      description: "Reaction to new food",
      severity: "medium",
      resolution: "Antihistamines prescribed",
    },
  ],
  // Add more...
};

const petServices: Record<number, ServiceRecord[]> = {
  1: [
    {
      id: 1,
      service: "Daycare",
      frequency: "Weekly",
      nextVisit: "2025-11-20",
      status: "active",
    },
    {
      id: 2,
      service: "Grooming",
      frequency: "Monthly",
      nextVisit: "2025-12-01",
      status: "active",
    },
  ],
  2: [
    {
      id: 1,
      service: "Boarding",
      frequency: "As needed",
      nextVisit: null,
      status: "available",
    },
  ],
  // Add more...
};

const petMedicalRecords: Record<number, MedicalRecord[]> = {
  1: [
    {
      id: 1,
      date: "2025-08-15",
      type: "Vaccination",
      description: "Annual vaccines administered",
      vet: "Dr. Smith",
    },
    {
      id: 2,
      date: "2025-06-10",
      type: "Checkup",
      description: "Routine health check",
      vet: "Dr. Johnson",
    },
  ],
  // Add more...
};

const petBehaviorNotes: Record<number, string> = {
  1: "Friendly and energetic. Loves playing fetch. Gets anxious during thunderstorms.",
  2: "Shy but affectionate. Prefers quiet environments. Enjoys lap time.",
  // Add more...
};

const petDiet: Record<number, DietInfo> = {
  1: {
    food: "Premium Dog Food - Chicken Flavor",
    amount: "2 cups twice daily",
    treats: "Limited carrots and apples",
    restrictions: "No beef products",
  },
  2: {
    food: "Wet Cat Food - Tuna",
    amount: "1 can twice daily",
    treats: "Catnip toys",
    restrictions: "No dairy",
  },
  // Add more...
};

const petPhotos: Record<number, string[]> = {
  1: ["/placeholder-pet1.jpg", "/placeholder-pet2.jpg"],
  2: ["/placeholder-cat1.jpg"],
  // Add more...
};

export default function PetDetailPage() {
  const t = useTranslations("pets");
  const tCommon = useTranslations("common");
  const params = useParams();
  const router = useRouter();
  const clientId = Number(params.id);
  const petId = Number(params.pet_id);

  const client = clients.find((c) => c.id === clientId);
  if (!client) notFound();

  const pet = client.pets.find((p) => p.id === petId);
  if (!pet) notFound();

  const vaccines = petVaccines[pet.id] || [];
  const incidents = petIncidents[pet.id] || [];
  const services = petServices[pet.id] || [];
  const medicalRecords = petMedicalRecords[pet.id] || [];
  const behaviorNotes = petBehaviorNotes[pet.id] || "No notes available.";
  const diet = petDiet[pet.id] || {
    food: "Not specified",
    amount: "",
    treats: "",
    restrictions: "",
  };
  const photos = petPhotos[pet.id] || [];

  return (
    <div className="flex-1 space-y-6 p-6 pt-8">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          {tCommon("back")}
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{pet.name}</h1>
          <p className="text-muted-foreground">
            {t("petDetails")} - {client.name}
          </p>
        </div>
      </div>

      {/* Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            {t("petDetails")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {tCommon("type")}
              </p>
              <p>{pet.type}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {t("breed")}
              </p>
              <p>{pet.breed}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {t("age")}
              </p>
              <p>{pet.age} years</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {t("weight")}
              </p>
              <p>{pet.weight} kg</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {t("color")}
              </p>
              <p>{pet.color}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {t("microchip")}
              </p>
              <p>{pet.microchip}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {tCommon("allergies")}
              </p>
              <p>{pet.allergies}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {tCommon("specialNeeds")}
              </p>
              <p>{pet.specialNeeds}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Owner Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            {tCommon("owner")} {tCommon("details")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p>
              <strong>{tCommon("name")}:</strong> {client.name}
            </p>
            <p>
              <strong>{tCommon("email")}:</strong> {client.email}
            </p>
            {client.phone && (
              <p>
                <strong>{tCommon("phone")}:</strong> {client.phone}
              </p>
            )}
            <p>
              <strong>{tCommon("facility")}:</strong> {client.facility}
            </p>
            <p>
              <strong>{tCommon("status")}:</strong>{" "}
              <Badge
                variant={client.status === "active" ? "default" : "secondary"}
              >
                {client.status}
              </Badge>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Health Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Syringe className="h-5 w-5" />
              {t("vaccinations")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              data={vaccines as unknown as Record<string, unknown>[]}
              columns={[
                { key: "vaccine", label: tCommon("vaccine") },
                { key: "date", label: tCommon("date") },
                { key: "nextDue", label: tCommon("nextDue") },
                {
                  key: "status",
                  label: tCommon("status"),
                  render: (item) => (
                    <Badge
                      variant={
                        (item as unknown as VaccineRecord).status ===
                        "up-to-date"
                          ? "default"
                          : "destructive"
                      }
                    >
                      {(item as unknown as VaccineRecord).status}
                    </Badge>
                  ),
                },
              ]}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              {tCommon("incidents")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable
              data={incidents as unknown as Record<string, unknown>[]}
              columns={[
                { key: "date", label: tCommon("date") },
                { key: "type", label: tCommon("type") },
                { key: "description", label: tCommon("description") },
                {
                  key: "severity",
                  label: tCommon("severity"),
                  render: (item) => (
                    <Badge
                      variant={
                        (item as unknown as IncidentRecord).severity === "low"
                          ? "secondary"
                          : (item as unknown as IncidentRecord).severity ===
                              "medium"
                            ? "default"
                            : "destructive"
                      }
                    >
                      {(item as unknown as IncidentRecord).severity}
                    </Badge>
                  ),
                },
              ]}
            />
          </CardContent>
        </Card>
      </div>

      {/* Services */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            {tCommon("services")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={services as unknown as Record<string, unknown>[]}
            columns={[
              { key: "service", label: tCommon("service") },
              { key: "frequency", label: tCommon("frequency") },
              { key: "nextVisit", label: tCommon("nextVisit") },
              {
                key: "status",
                label: tCommon("status"),
                render: (item) => (
                  <Badge
                    variant={
                      (item as unknown as ServiceRecord).status === "active"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {(item as unknown as ServiceRecord).status}
                  </Badge>
                ),
              },
            ]}
          />
        </CardContent>
      </Card>

      {/* Medical Records */}
      <Card>
        <CardHeader>
          <CardTitle>{t("medicalHistory")}</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            data={medicalRecords as unknown as Record<string, unknown>[]}
            columns={[
              { key: "date", label: tCommon("date") },
              { key: "type", label: tCommon("type") },
              { key: "description", label: tCommon("description") },
              { key: "vet", label: tCommon("veterinarian") },
            ]}
          />
        </CardContent>
      </Card>

      {/* Behavior Notes */}
      <Card>
        <CardHeader>
          <CardTitle>{t("behaviorNotes")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{behaviorNotes}</p>
        </CardContent>
      </Card>

      {/* Diet */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Utensils className="h-5 w-5" />
            {t("dietaryNeeds")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p>
              <strong>{tCommon("food")}:</strong> {diet.food}
            </p>
            <p>
              <strong>{tCommon("amount")}:</strong> {diet.amount}
            </p>
            <p>
              <strong>{tCommon("treats")}:</strong> {diet.treats}
            </p>
            <p>
              <strong>{tCommon("restrictions")}:</strong> {diet.restrictions}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Photos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            {tCommon("photos")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {photos.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {photos.map((photo: string, index: number) => (
                <div
                  key={index}
                  className="aspect-square bg-muted rounded-lg flex items-center justify-center"
                >
                  <Camera className="h-8 w-8 text-muted-foreground" />
                  <span className="sr-only">Pet photo {index + 1}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">{tCommon("noPhotos")}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
