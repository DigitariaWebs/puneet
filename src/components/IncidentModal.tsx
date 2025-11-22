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
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{incident.description}</p>
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
                <div className="space-y-2">
                  {incident.involvedStaff.map((staff, index) => (
                    <Card
                      key={index}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <p className="text-sm font-medium">{staff.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {staff.role}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {staff.email}
                            </p>
                            {staff.phone && (
                              <p className="text-xs text-muted-foreground">
                                {staff.phone}
                              </p>
                            )}
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
                  <div className="space-y-2">
                    {incident.involvedClients.map((client, index) => (
                      <Card
                        key={index}
                        className="hover:shadow-md transition-shadow"
                      >
                        <CardContent className="pt-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <p className="text-sm font-medium">
                                {client.name}
                              </p>
                              {client.petName && (
                                <p className="text-xs text-muted-foreground">
                                  Pet: {client.petName}
                                </p>
                              )}
                              <p className="text-xs text-muted-foreground">
                                {client.email}
                              </p>
                              {client.phone && (
                                <p className="text-xs text-muted-foreground">
                                  {client.phone}
                                </p>
                              )}
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
                <p className="text-sm text-muted-foreground">
                  No involved parties listed
                </p>
              )}
          </div>
        </TabsContent>
        <TabsContent value="attachments" className="mt-2">
          <div className="space-y-2">
            {incident.attachments && incident.attachments.length > 0 ? (
              incident.attachments.map((attachment, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <span className="text-sm">{attachment}</span>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No attachments</p>
            )}
          </div>
        </TabsContent>
        <TabsContent value="resolution" className="mt-2">
          <Card>
            <CardHeader>
              <CardTitle>Resolution Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {incident.status === "Resolved" ? (
                <div>
                  <p className="text-sm">{incident.resolutionNotes}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Resolved on{" "}
                    {incident.resolvedAt
                      ? new Date(incident.resolvedAt).toLocaleString()
                      : "N/A"}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <Textarea
                    placeholder="Enter resolution notes..."
                    value={resolutionNotes}
                    onChange={(e) => setResolutionNotes(e.target.value)}
                    rows={4}
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
