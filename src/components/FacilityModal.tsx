import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusBadge } from "./StatusBadge";
import { Badge } from "@/components/ui/badge";
import { DetailsModal } from "./DetailsModal";
import { InfoCard } from "./DateCard";
import { StatCard } from "./StatCard";
import {
  Building,
  Users,
  UserCheck,
  MapPin,
  Calendar,
  Clock,
  Mail,
  Phone,
  Briefcase,
} from "lucide-react";
import { facilities } from "@/data/facilities";

interface FacilityModalProps {
  facility: (typeof facilities)[number];
}

export function FacilityModal({ facility }: FacilityModalProps) {
  return (
    <DetailsModal
      title={facility.name}
      badges={[
        <StatusBadge
          key="status"
          type="status"
          value={facility.status}
          showIcon
        />,
        <StatusBadge key="plan" type="plan" value={facility.plan} showIcon />,
      ]}
      linkHref={`/dashboard/facilities/${facility.id}`}
      linkText="View Full Facility Details"
    >
      {/* Statistic Cards */}
      <div className="grid gap-3 grid-cols-2 md:grid-cols-3">
        <StatCard
          title="Users"
          value={facility.usersList.length}
          subtitle="Total staff"
          icon={Users}
          variant="primary"
        />
        <StatCard
          title="Active Clients"
          value={facility.clients.filter((c) => c.status === "active").length}
          subtitle="Active"
          icon={UserCheck}
          variant="success"
        />
        <StatCard
          title="Locations"
          value={facility.locationsList.length}
          subtitle="Total locations"
          icon={MapPin}
          variant="info"
        />
      </div>

      {/* Date Information */}
      <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
        <InfoCard
          title="Day Joined"
          value={facility.dayJoined}
          subtitle="Member since"
          icon={Calendar}
          variant="warning"
        />
        <InfoCard
          title="Subscription End"
          value={facility.subscriptionEnd || "N/A"}
          subtitle="Expires"
          icon={Clock}
          variant="default"
        />
      </div>

      <Tabs defaultValue="locations" className="w-full mt-1">
        <TabsList className="grid w-full grid-cols-3 h-auto">
          <TabsTrigger value="locations" className="gap-2">
            <MapPin className="h-4 w-4" />
            Locations ({facility.locationsList.length})
          </TabsTrigger>
          <TabsTrigger value="clients" className="gap-2">
            <UserCheck className="h-4 w-4" />
            Clients ({facility.clients.length})
          </TabsTrigger>
          <TabsTrigger value="users" className="gap-2">
            <Users className="h-4 w-4" />
            Users ({facility.usersList.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="locations" className="mt-2">
          <div className="space-y-2.5">
            {facility.locationsList.map((location, index: number) => (
              <Card
                key={index}
                className="bg-linear-to-br from-card to-muted/20 border-none shadow-sm hover:shadow-md transition-all duration-200 group"
              >
                <CardHeader className="pb-3 px-5 pt-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-sm font-semibold flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                          <Building className="h-4 w-4" />
                        </div>
                        {location.name}
                      </CardTitle>
                      <p className="text-xs text-muted-foreground flex items-center gap-2 pl-8">
                        <MapPin className="h-3.5 w-3.5" />
                        {location.address}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 px-5 pb-4">
                  <div className="flex flex-wrap gap-1.5">
                    {location.services.map((service: string) => (
                      <Badge
                        key={service}
                        variant="secondary"
                        className="text-xs capitalize"
                      >
                        {service}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="clients" className="mt-2">
          <div className="space-y-2.5">
            {facility.clients.map((client, index: number) => (
              <Card
                key={index}
                className="bg-linear-to-br from-card to-muted/20 border-none shadow-sm hover:shadow-md transition-all duration-200"
              >
                <CardHeader className="pb-3 px-5 pt-4">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-sm font-semibold">
                      {client.person.name}
                    </CardTitle>
                    <Badge
                      data-status={client.status}
                      className="text-xs capitalize data-[status='active']:bg-success data-[status='active']:text-success-foreground data-[status='inactive']:bg-secondary data-[status='inactive']:text-secondary-foreground"
                    >
                      {client.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 pt-0 px-5 pb-4">
                  <div className="flex items-center gap-3 p-2.5 rounded-lg bg-background/60 backdrop-blur-sm">
                    <div className="p-1.5 rounded-lg bg-muted">
                      <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                    <span className="text-xs font-medium">
                      {client.person.email}
                    </span>
                  </div>
                  {client.person.phone && (
                    <div className="flex items-center gap-3 p-2.5 rounded-lg bg-background/60 backdrop-blur-sm">
                      <div className="p-1.5 rounded-lg bg-muted">
                        <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                      </div>
                      <span className="text-xs font-medium">
                        {client.person.phone}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="users" className="mt-2">
          <div className="space-y-2.5">
            {facility.usersList.map((user, index: number) => (
              <Card
                key={index}
                className="bg-linear-to-br from-card to-muted/20 border-none shadow-sm hover:shadow-md transition-all duration-200"
              >
                <CardHeader className="pb-3 px-5 pt-4">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-sm font-semibold">
                      {user.person.name}
                    </CardTitle>
                    <Badge
                      data-role={user.role}
                      className="text-xs data-[role='Admin']:bg-primary data-[role='Admin']:text-primary-foreground data-[role='Manager']:bg-info data-[role='Manager']:text-info-foreground data-[role='Staff']:border data-[role='Staff']:bg-background"
                    >
                      {user.role}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 pt-0 px-5 pb-4">
                  <div className="flex items-center gap-3 p-2.5 rounded-lg bg-background/60 backdrop-blur-sm">
                    <div className="p-1.5 rounded-lg bg-muted">
                      <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                    <span className="text-xs font-medium">
                      {user.person.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-2.5 rounded-lg bg-background/60 backdrop-blur-sm">
                    <div className="p-1.5 rounded-lg bg-muted">
                      <Briefcase className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                    <span className="text-xs font-medium">{user.role}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </DetailsModal>
  );
}
