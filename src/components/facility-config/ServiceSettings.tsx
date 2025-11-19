"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { facilityConfig } from "@/data/facility-config";
import { facilities } from "@/data/facilities";
import {
  Settings,
  Building,
  Info,
  Edit,
  Check,
  X,
  ChevronDown,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";

type FacilityConfig = typeof facilityConfig;
type ServiceKey = keyof typeof facilityConfig.services;

interface ServiceSettingsProps {
  config: FacilityConfig;
  setConfig: React.Dispatch<React.SetStateAction<FacilityConfig>>;
  isOpen: boolean;
  onToggle: () => void;
  onSave: () => void;
}

export function ServiceSettings({
  config,
  setConfig,
  isOpen,
  onToggle,
  onSave,
}: ServiceSettingsProps) {
  const [editingService, setEditingService] = useState<ServiceKey | null>(null);
  const [tempConfig, setTempConfig] = useState<FacilityConfig | null>(null);
  const [confirmationModal, setConfirmationModal] = useState<{
    isOpen: boolean;
    service: ServiceKey | null;
    newStatus: string | null;
    currentStatus: string | null;
  }>({
    isOpen: false,
    service: null,
    newStatus: null,
    currentStatus: null,
  });

  const handleToggle = () => {
    // Cancel any ongoing edits when collapsing
    if (isOpen) {
      setEditingService(null);
      setTempConfig(null);
    }
    onToggle();
  };

  const getFacilitiesUsingService = (service: string) => {
    return facilities.filter((facility) =>
      facility.locationsList.some((location) =>
        location.services.includes(service),
      ),
    );
  };

  const startEditing = (service: ServiceKey) => {
    setEditingService(service);
    setTempConfig(config);
  };

  const saveService = () => {
    if (tempConfig) {
      setConfig(tempConfig);
      onSave();
    }
    setEditingService(null);
    setTempConfig(null);
  };

  const cancelEditing = () => {
    setEditingService(null);
    setTempConfig(null);
  };

  const updateServiceStatus = (service: ServiceKey, status: string) => {
    const currentStatus = tempConfig
      ? tempConfig.services[service].status
      : config.services[service].status;

    if (currentStatus !== status) {
      setConfirmationModal({
        isOpen: true,
        service,
        newStatus: status,
        currentStatus,
      });
    }
  };

  const confirmStatusChange = () => {
    if (
      confirmationModal.service &&
      confirmationModal.newStatus &&
      tempConfig
    ) {
      setTempConfig({
        ...tempConfig,
        services: {
          ...tempConfig.services,
          [confirmationModal.service]: {
            ...tempConfig.services[confirmationModal.service],
            enabled: confirmationModal.newStatus === "available",
            status: confirmationModal.newStatus,
          },
        },
      });
    }
    setConfirmationModal({
      isOpen: false,
      service: null,
      newStatus: null,
      currentStatus: null,
    });
  };

  const cancelStatusChange = () => {
    setConfirmationModal({
      isOpen: false,
      service: null,
      newStatus: null,
      currentStatus: null,
    });
  };

  return (
    <Card>
      <TooltipProvider>
        <CardHeader
          className="cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={handleToggle}
        >
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Service Settings
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-sm">
                  <div className="space-y-2">
                    <div>
                      <strong>Available:</strong> Service is active and can be
                      made available to all current facilities with plans that
                      include this service.
                    </div>
                    <div>
                      <strong>Unavailable:</strong> Service stops being
                      available to new facilities but continues for existing
                      facilities until their subscription ends. Facilities will
                      be notified.
                    </div>
                    <div>
                      <strong>Stopped:</strong>{" "}
                      <span className="text-destructive">
                        Destructive action
                      </span>{" "}
                      - Immediately stops the service for all facilities. This
                      may disrupt existing bookings and operations.
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>
            {isOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </CardTitle>
        </CardHeader>
      </TooltipProvider>
      {isOpen && (
        <CardContent className="space-y-6">
          {Object.entries(config.services).map(([service]) => {
            const facilitiesUsing = getFacilitiesUsingService(service);
            const isEditing = editingService === service;
            const currentConfig = tempConfig || config;
            const currentSettings =
              currentConfig.services[service as ServiceKey];

            return (
              <div key={service} className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="capitalize text-base font-medium">
                        {service}
                      </h4>
                      <div className="flex gap-2">
                        {!isEditing && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => startEditing(service as ServiceKey)}
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                        )}
                        {isEditing && (
                          <div className="flex gap-2">
                            <Button
                              variant="default"
                              size="sm"
                              onClick={saveService}
                            >
                              <Check className="h-3 w-3 mr-1" />
                              Save
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={cancelEditing}
                            >
                              <X className="h-3 w-3 mr-1" />
                              Cancel
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {currentSettings.description}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Status:</span>
                        {isEditing ? (
                          <Select
                            value={currentSettings.status}
                            onValueChange={(value) =>
                              updateServiceStatus(service as ServiceKey, value)
                            }
                          >
                            <SelectTrigger className="w-40">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="available">
                                Available
                              </SelectItem>
                              <SelectItem value="unavailable">
                                Unavailable
                              </SelectItem>
                              <SelectItem value="stopped">
                                <span className="text-destructive">
                                  Stopped
                                </span>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <Badge
                            variant={
                              currentSettings.status === "available"
                                ? "default"
                                : currentSettings.status === "unavailable"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {currentSettings.status}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Used by {facilitiesUsing.length} facilit
                          {facilitiesUsing.length === 1 ? "y" : "ies"}
                        </span>
                      </div>
                    </div>
                    {facilitiesUsing.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {facilitiesUsing.slice(0, 3).map((facility) => (
                          <Badge
                            key={facility.id}
                            variant="secondary"
                            className="text-xs"
                          >
                            {facility.name}
                          </Badge>
                        ))}
                        {facilitiesUsing.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{facilitiesUsing.length - 3} more
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {facilitiesUsing.length > 0 && <Separator className="my-2" />}
              </div>
            );
          })}
        </CardContent>
      )}

      <Dialog
        open={confirmationModal.isOpen}
        onOpenChange={(open) => {
          if (!open) cancelStatusChange();
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              Confirm Service Status Change
            </DialogTitle>
            <DialogDescription>
              You are about to change the status of{" "}
              <strong className="capitalize">
                {confirmationModal.service}
              </strong>{" "}
              service.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Current Status</label>
                <div className="mt-1">
                  <Badge
                    variant={
                      confirmationModal.currentStatus === "available"
                        ? "default"
                        : confirmationModal.currentStatus === "unavailable"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {confirmationModal.currentStatus}
                  </Badge>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">New Status</label>
                <div className="mt-1">
                  <Badge
                    variant={
                      confirmationModal.newStatus === "available"
                        ? "default"
                        : confirmationModal.newStatus === "unavailable"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {confirmationModal.newStatus}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="bg-muted p-3 rounded-lg">
              <div className="text-sm">
                {confirmationModal.newStatus === "available" && (
                  <p>
                    This service will become active and available to all current
                    facilities with plans that include this service.
                  </p>
                )}
                {confirmationModal.newStatus === "unavailable" && (
                  <p>
                    This service will stop being available to new facilities but
                    will continue for existing facilities until their
                    subscription ends. Facilities will be notified.
                  </p>
                )}
                {confirmationModal.newStatus === "stopped" && (
                  <div className="space-y-2">
                    <p className="text-destructive font-medium">
                      ⚠️ Destructive Action
                    </p>
                    <p>
                      This will immediately stop the service for ALL facilities.
                      This may disrupt existing bookings and operations.
                    </p>
                  </div>
                )}
              </div>
            </div>
            {confirmationModal.service && (
              <div>
                <label className="text-sm font-medium">
                  Facilities currently using this service:
                </label>
                <div className="mt-2 flex flex-wrap gap-1">
                  {getFacilitiesUsingService(confirmationModal.service)
                    .slice(0, 5)
                    .map((facility) => (
                      <Badge
                        key={facility.id}
                        variant="outline"
                        className="text-xs"
                      >
                        {facility.name}
                      </Badge>
                    ))}
                  {getFacilitiesUsingService(confirmationModal.service).length >
                    5 && (
                    <Badge variant="outline" className="text-xs">
                      +
                      {getFacilitiesUsingService(confirmationModal.service)
                        .length - 5}{" "}
                      more
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={cancelStatusChange}>
              Cancel
            </Button>
            <Button
              onClick={confirmStatusChange}
              variant={
                confirmationModal.newStatus === "stopped"
                  ? "destructive"
                  : "default"
              }
            >
              Confirm Change
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
