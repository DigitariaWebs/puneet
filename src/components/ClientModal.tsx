import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DetailsModal } from "./DetailsModal";
import { InfoCard } from "./DateCard";
import { StatusBadge } from "./StatusBadge";
import { Building, Mail, Phone, Heart } from "lucide-react";
import { clients } from "@/data/clients";

interface ClientModalProps {
  client: (typeof clients)[number];
}

export function ClientModal({ client }: ClientModalProps) {
  return (
    <DetailsModal
      title={client.name}
      badges={[
        <StatusBadge
          key="status"
          type="status"
          value={client.status}
          showIcon
        />,
      ]}
      linkHref={`/dashboard/clients/${client.id}`}
      linkText="View Full Profile"
    >
      <div className="space-y-3">
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
          <InfoCard
            title="Facility"
            value={client.facility}
            subtitle="Associated facility"
            icon={Building}
            variant="primary"
          />
          <InfoCard
            title="Status"
            value={client.status}
            subtitle="Account status"
            icon={Heart}
            variant="info"
          />
        </div>

        <Card className="border-l-4 border-l-primary hover:shadow-md transition-all duration-200">
          <CardHeader className="pb-2 px-4 pt-4">
            <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-2">
              <Mail className="h-3.5 w-3.5" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1.5 px-4 pb-4">
            <div className="flex items-center gap-2 text-xs">
              <Mail className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="font-medium">{client.email}</span>
            </div>
            {client.phone && (
              <div className="flex items-center gap-2 text-xs">
                <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="font-medium">{client.phone}</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2 px-4 pt-4">
            <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-2">
              <Heart className="h-3.5 w-3.5" />
              Pets ({client.pets.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            {client.pets.length > 0 ? (
              <div className="space-y-3">
                {client.pets.map((pet, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg border border-muted hover:bg-muted/50 transition-colors"
                  >
                    <div>
                      <h4 className="font-semibold text-base">{pet.name}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        <span className="font-medium">{pet.type}</span> •{" "}
                        {pet.age} {pet.age === 1 ? "year" : "years"} old
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {pet.type}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">
                No pets registered for this client.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </DetailsModal>
  );
}
