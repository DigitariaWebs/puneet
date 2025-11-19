import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { DetailsModal } from "./DetailsModal";
import { InfoCard } from "./DateCard";
import { StatusBadge } from "./StatusBadge";
import {
  Building,
  Mail,
  Clock,
  Phone,
  CalendarDays,
  Shield,
} from "lucide-react";
import { users } from "@/data/users";

interface UserModalProps {
  user: (typeof users)[number];
}

export function UserModal({ user }: UserModalProps) {
  return (
    <DetailsModal
      title={user.name}
      badges={[
        <StatusBadge key="role" type="role" value={user.role} showIcon />,
        <StatusBadge key="status" type="status" value={user.status} showIcon />,
      ]}
      linkHref={`/dashboard/users/${user.id}`}
      linkText="View Full Profile"
    >
      <div className="space-y-3">
        <div className="grid gap-3 grid-cols-1 md:grid-cols-3">
          <InfoCard
            title="Last Login"
            value={user.lastLogin}
            subtitle="Last activity"
            icon={Clock}
            variant="info"
          />
          <InfoCard
            title="Hire Date"
            value={user.hireDate}
            subtitle="Joined company"
            icon={CalendarDays}
            variant="success"
          />
          <InfoCard
            title="Role"
            value={user.role}
            subtitle="Position"
            icon={Shield}
            variant="primary"
          />
        </div>

        <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
          <Card className="border-l-4 border-l-blue-500 hover:shadow-md transition-all duration-200">
            <CardHeader className="pb-2 px-4 pt-4">
              <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-2">
                <Building className="h-3.5 w-3.5" />
                Facility
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="text-base font-semibold">{user.facility}</div>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                Works at
              </p>
            </CardContent>
          </Card>

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
                <span className="font-medium">{user.email}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="font-medium">{user.phone}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="permissions" className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-auto">
            <TabsTrigger value="permissions" className="gap-2">
              <Building className="h-4 w-4" />
              Permissions
            </TabsTrigger>
            <TabsTrigger value="pets" className="gap-2">
              <Clock className="h-4 w-4" />
              Pets ({user.pets.length})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="permissions" className="mt-3">
            <Card className="border-l-4 border-l-primary">
              <CardHeader className="pb-2 px-4 pt-4">
                <CardTitle className="text-xs font-medium">
                  User Permissions
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="flex flex-wrap gap-2">
                  {user.permissions.map((permission) => (
                    <Badge
                      key={permission}
                      variant="secondary"
                      className="capitalize text-xs hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                    >
                      {permission.replace(/_/g, " ")}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="pets" className="mt-3">
            {user.pets.length > 0 ? (
              <div className="space-y-2">
                {user.pets.map((pet, index) => (
                  <Card
                    key={index}
                    className="border-l-4 border-l-green-500 hover:shadow-md transition-all duration-200 group"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-base group-hover:text-primary transition-colors">
                            {pet.name}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            <span className="font-medium">{pet.type}</span> •{" "}
                            {pet.age} {pet.age === 1 ? "year" : "years"} old
                          </p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {pet.type}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-l-4 border-l-muted">
                <CardContent className="py-4 text-center">
                  <p className="text-xs text-muted-foreground">
                    No pets registered for this user.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DetailsModal>
  );
}
