import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DetailsModal } from "./DetailsModal";
import { InfoCard } from "./DateCard";
import {
  AlertTriangle,
  Calendar,
  Clock as ClockIcon,
  User,
  Building,
  FileText,
  CheckCircle,
  AlertCircle,
  Users,
  UserCheck,
  Mail,
  Phone,
} from "lucide-react";
import { Incident } from "@/data/incidents";

interface IncidentModalProps {
  incident: Incident;
  onResolve?: (id: string, notes: string) => void;
}

export function IncidentModal({ incident, onResolve }: IncidentModalProps) {
  const [resolutionNotes, setResolutionNotes] = useState(
    incident.resolutionNotes || "",
  );
  const [isResolving, setIsResolving] = useState(false);

  const handleResolve = () => {
    if (onResolve) {
      onResolve(incident.id, resolutionNotes);
    }
    setIsResolving(false);
  };

  return (
    <DetailsModal
      title={incident.title}
      badges={[
        <Badge
          key="severity"
          variant={
            incident.severity === "Low"
              ? "secondary"
              : incident.severity === "Medium"
                ? "default"
                : incident.severity === "High"
                  ? "destructive"
                  : "destructive"
          }
          className="gap-1"
        >
          <AlertTriangle className="h-3 w-3" />
          {incident.severity}
        </Badge>,
        <Badge
          key="status"
          variant={
            incident.status === "Resolved"
              ? "default"
              : incident.status === "In Progress"
                ? "secondary"
                : "outline"
          }
          className="gap-1"
        >
          {incident.status === "Resolved" ? (
            <CheckCircle className="h-3 w-3" />
          ) : incident.status === "In Progress" ? (
            <ClockIcon className="h-3 w-3" />
          ) : (
            <AlertCircle className="h-3 w-3" />
          )}
          {incident.status}
        </Badge>,
      ]}
    >
      {/* Key Info Cards */}
      <div className="grid gap-3 grid-cols-1 md:grid-cols-3">
        <InfoCard
          title="Reported By"
          value={incident.reporter}
          subtitle="Reporter"
          icon={User}
          variant="primary"
        />
        <InfoCard
          title="Facility"
          value={incident.facility}
          subtitle="Affected facility"
          icon={Building}
          variant="info"
        />
        <InfoCard
          title="Created"
          value={new Date(incident.createdAt).toLocaleDateString()}
          subtitle="Date reported"
          icon={Calendar}
          variant="warning"
        />
      </div>

      <Tabs defaultValue="details" className="w-full mt-1">
        <TabsList className="grid w-full grid-cols-4 h-auto">
          <TabsTrigger value="details" className="gap-2">
            <FileText className="h-4 w-4" />
            Details
          </TabsTrigger>
          <TabsTrigger value="involved-parties" className="gap-2">
            <Users className="h-4 w-4" />
            Involved Parties
          </TabsTrigger>
          <TabsTrigger value="attachments" className="gap-2">
            <AlertTriangle className="h-4 w-4" />
            Attachments ({incident.attachments?.length || 0})
          </TabsTrigger>
          <TabsTrigger value="resolution" className="gap-2">
            <CheckCircle className="h-4 w-4" />
            Resolution
          </TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="mt-2">
          <Card className="bg-linear-to-br from-card to-muted/20 border-none shadow-sm hover:shadow-md transition-all duration-200">
            <CardHeader className="px-5 pt-5 pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                  <FileText className="h-4 w-4" />
                </div>
                Description
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <div className="p-3.5 rounded-lg bg-background/60 backdrop-blur-sm">
                <p className="text-sm leading-relaxed">
                  {incident.description}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="involved-parties" className="mt-2">
          <div className="space-y-4">
            {incident.involvedStaff && incident.involvedStaff.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Staff Involved ({incident.involvedStaff.length})
                </h3>
                <div className="space-y-2.5">
                  {incident.involvedStaff.map((staff, index) => (
                    <Card
                      key={index}
                      className="bg-linear-to-br from-card to-muted/20 border-none shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      <CardContent className="pt-4 px-5 pb-4">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0 mt-0.5">
                            <User className="h-4 w-4" />
                          </div>
                          <div className="space-y-2 flex-1">
                            <p className="text-sm font-semibold">
                              {staff.name}
                            </p>
                            <div className="space-y-1.5">
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Badge variant="secondary" className="text-xs">
                                  {staff.role}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2 p-2 rounded-lg bg-background/60 backdrop-blur-sm">
                                <Mail className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                                <span className="text-xs font-medium">
                                  {staff.email}
                                </span>
                              </div>
                              {staff.phone && (
                                <div className="flex items-center gap-2 p-2 rounded-lg bg-background/60 backdrop-blur-sm">
                                  <Phone className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                                  <span className="text-xs font-medium">
                                    {staff.phone}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            {incident.involvedClients &&
              incident.involvedClients.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <UserCheck className="h-4 w-4" />
                    Clients Involved ({incident.involvedClients.length})
                  </h3>
                  <div className="space-y-2.5">
                    {incident.involvedClients.map((client, index) => (
                      <Card
                        key={index}
                        className="bg-linear-to-br from-card to-muted/20 border-none shadow-sm hover:shadow-md transition-all duration-200"
                      >
                        <CardContent className="pt-4 px-5 pb-4">
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-success/10 text-success shrink-0 mt-0.5">
                              <UserCheck className="h-4 w-4" />
                            </div>
                            <div className="space-y-2 flex-1">
                              <div className="flex items-start justify-between">
                                <p className="text-sm font-semibold">
                                  {client.name}
                                </p>
                                {client.petName && (
                                  <Badge
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    Pet: {client.petName}
                                  </Badge>
                                )}
                              </div>
                              <div className="space-y-1.5">
                                <div className="flex items-center gap-2 p-2 rounded-lg bg-background/60 backdrop-blur-sm">
                                  <Mail className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                                  <span className="text-xs font-medium">
                                    {client.email}
                                  </span>
                                </div>
                                {client.phone && (
                                  <div className="flex items-center gap-2 p-2 rounded-lg bg-background/60 backdrop-blur-sm">
                                    <Phone className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                                    <span className="text-xs font-medium">
                                      {client.phone}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            {(!incident.involvedStaff || incident.involvedStaff.length === 0) &&
              (!incident.involvedClients ||
                incident.involvedClients.length === 0) && (
                <div className="p-4 rounded-lg bg-muted/50 text-center">
                  <p className="text-sm text-muted-foreground">
                    No involved parties listed
                  </p>
                </div>
              )}
          </div>
        </TabsContent>
        <TabsContent value="attachments" className="mt-2">
          <div className="space-y-2.5">
            {incident.attachments && incident.attachments.length > 0 ? (
              incident.attachments.map((attachment, index) => (
                <Card
                  key={index}
                  className="bg-linear-to-br from-card to-muted/20 border-none shadow-sm hover:shadow-md transition-all duration-200 group"
                >
                  <CardContent className="pt-4 px-5 pb-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-background/60 backdrop-blur-sm">
                      <div className="p-2 rounded-lg bg-info/10 text-info group-hover:scale-110 transition-transform">
                        <FileText className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium">{attachment}</span>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="p-4 rounded-lg bg-muted/50 text-center">
                <p className="text-sm text-muted-foreground">No attachments</p>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="resolution" className="mt-2">
          <Card className="bg-linear-to-br from-card to-muted/20 border-none shadow-sm hover:shadow-md transition-all duration-200">
            <CardHeader className="px-5 pt-5 pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-success/10 text-success">
                  <CheckCircle className="h-4 w-4" />
                </div>
                Resolution Notes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 px-5 pb-5">
              {incident.status === "Resolved" ? (
                <div className="space-y-3">
                  <div className="p-3.5 rounded-lg bg-background/60 backdrop-blur-sm">
                    <p className="text-sm leading-relaxed">
                      {incident.resolutionNotes}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-success/10 text-success">
                    <CheckCircle className="h-4 w-4 shrink-0" />
                    <p className="text-xs font-medium">
                      Resolved on{" "}
                      {incident.resolvedAt
                        ? new Date(incident.resolvedAt).toLocaleString()
                        : "N/A"}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <Textarea
                    placeholder="Enter resolution notes..."
                    value={resolutionNotes}
                    onChange={(e) => setResolutionNotes(e.target.value)}
                    rows={4}
                    className="bg-background/60"
                  />
                  <Button
                    onClick={handleResolve}
                    disabled={!resolutionNotes.trim() || isResolving}
                    className="w-full"
                  >
                    {isResolving ? "Resolving..." : "Resolve Incident"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DetailsModal>
  );
}
