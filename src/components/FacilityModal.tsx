import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusBadge } from "./StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
    <div className="space-y-4 pb-2">
      {/* Facility Overview */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h3 className="text-xl font-bold">{facility.name}</h3>
          <div className="flex items-center gap-2">
            <StatusBadge type="status" value={facility.status} showIcon />
            <StatusBadge type="plan" value={facility.plan} showIcon />
          </div>
        </div>
      </div>

      <Separator className="my-3" />

      {/* Statistic Cards */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {facility.usersList.length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Total staff</p>
          </CardContent>
        </Card>
        <Card className="border-l-2 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 px-3 pt-3">
            <CardTitle className="text-xs font-medium">
              Active Clients
            </CardTitle>
            <UserCheck className="h-3 w-3 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-0 px-3 pb-3">
            <div className="text-base font-bold">
              {facility.clients.filter((c) => c.status === "active").length}
            </div>
            <p className="text-[10px] text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Locations</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {facility.locationsList.length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Total locations
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Date Information */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card className="border-l-2 border-l-amber-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 px-3 pt-3">
            <CardTitle className="text-xs font-medium">Day Joined</CardTitle>
            <Calendar className="h-3 w-3 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-0 px-3 pb-3">
            <div className="text-xs font-medium">{facility.dayJoined}</div>
            <p className="text-[10px] text-muted-foreground">Member since</p>
          </CardContent>
        </Card>
        <Card className="border-l-2 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 px-3 pt-3">
            <CardTitle className="text-xs font-medium">
              Subscription End
            </CardTitle>
            <Clock className="h-3 w-3 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-0 px-3 pb-3">
            <div className="text-xs font-medium">
              {facility.subscriptionEnd || "N/A"}
            </div>
            <p className="text-[10px] text-muted-foreground">Expires</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="locations" className="w-full">
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
        <TabsContent value="locations" className="mt-3">
          <div className="space-y-2">
            {facility.locationsList.map((location, index: number) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-1 px-3 pt-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-sm font-semibold flex items-center gap-2">
                        <Building className="h-4 w-4 text-primary" />
                        {location.name}
                      </CardTitle>
                      <p className="text-xs text-muted-foreground flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5" />
                        {location.address}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-1 px-3 pb-3">
                  <div className="flex flex-wrap gap-1">
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
        <TabsContent value="clients" className="mt-3">
          <div className="space-y-2">
            {facility.clients.map((client, index: number) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-1 px-3 pt-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-sm font-semibold">
                      {client.person.name}
                    </CardTitle>
                    <Badge
                      data-status={client.status}
                      className="text-xs capitalize data-[status='active']:bg-primary data-[status='active']:text-primary-foreground data-[status='inactive']:bg-secondary data-[status='inactive']:text-secondary-foreground"
                    >
                      {client.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-1 pt-1 px-3 pb-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Mail className="h-3 w-3" />
                    {client.person.email}
                  </div>
                  {client.person.phone && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Phone className="h-3 w-3" />
                      {client.person.phone}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="users" className="mt-3">
          <div className="space-y-2">
            {facility.usersList.map((user, index: number) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-1 px-3 pt-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-sm font-semibold">
                      {user.person.name}
                    </CardTitle>
                    <Badge
                      data-role={user.role}
                      className="text-xs data-[role='Admin']:bg-primary data-[role='Admin']:text-primary-foreground data-[role='Manager']:bg-secondary data-[role='Manager']:text-secondary-foreground data-[role='Staff']:border data-[role='Staff']:bg-background"
                    >
                      {user.role}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-1 pt-1 px-3 pb-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Mail className="h-3 w-3" />
                    {user.person.email}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Briefcase className="h-3 w-3" />
                    {user.role}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
