"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { facilityConfig } from "@/data/facility-config";
import { ServiceSettings } from "@/components/facility-config/ServiceSettings";
import {
  DollarSign,
  Calendar,
  Clock,
  Shield,
  Users,
  PawPrint,
  FileText,
  BarChart3,
  FileCheck,
  Save,
  ChevronDown,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";

type FacilityConfig = typeof facilityConfig;

export default function FacilityConfigPage() {
  const [config, setConfig] = useState<FacilityConfig>(facilityConfig);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    services: true,
    pricing: false,
    booking: false,
    schedules: false,
    policies: false,
    advanced: false,
  });

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log("Saving configuration:", config);
  };

  const handleSectionSave = (section: string) => {
    // TODO: Implement section-specific save functionality
    console.log(`Saving ${section} section:`, config);
  };

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Facility Configuration
            </h2>
            <p className="text-muted-foreground">
              Configure global settings that apply to all facilities in the
              platform, including service availability, pricing structures,
              booking rules, and operational policies.
            </p>
          </div>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save All Changes
          </Button>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 shrink-0" />
            <div>
              <div className="text-yellow-800 font-medium">Warning</div>
              <div className="text-sm text-yellow-700">
                Some configuration changes may be destructive and could affect
                existing bookings, pricing, or facility operations. Please
                review changes carefully before saving.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <ServiceSettings
          config={config}
          setConfig={setConfig}
          isOpen={openSections.services}
          onToggle={() => toggleSection("services")}
          onSave={() => handleSectionSave("services")}
        />

        <Collapsible
          open={openSections.pricing}
          onOpenChange={() => toggleSection("pricing")}
        >
          <Card>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Pricing Structures
                  </div>
                  {openSections.pricing ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Default Pricing</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(config.pricing.defaultPricing).map(
                      ([service, pricing]) => (
                        <div key={service} className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="capitalize">
                              {service} Base Price ($)
                            </Label>
                            <Input
                              type="number"
                              value={pricing.basePrice}
                              onChange={(e) =>
                                setConfig((prev) => ({
                                  ...prev,
                                  pricing: {
                                    ...prev.pricing,
                                    defaultPricing: {
                                      ...prev.pricing.defaultPricing,
                                      [service]: {
                                        ...pricing,
                                        basePrice:
                                          parseFloat(e.target.value) || 0,
                                      },
                                    },
                                  },
                                }))
                              }
                            />
                          </div>
                          <div>
                            <Label className="capitalize">
                              {service} Additional Pet ($)
                            </Label>
                            <Input
                              type="number"
                              value={pricing.additionalPet}
                              onChange={(e) =>
                                setConfig((prev) => ({
                                  ...prev,
                                  pricing: {
                                    ...prev.pricing,
                                    defaultPricing: {
                                      ...prev.pricing.defaultPricing,
                                      [service]: {
                                        ...pricing,
                                        additionalPet:
                                          parseFloat(e.target.value) || 0,
                                      },
                                    },
                                  },
                                }))
                              }
                            />
                          </div>
                        </div>
                      ),
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Tax Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Tax Rate (%)</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={config.pricing.taxSettings.taxRate * 100}
                          onChange={(e) =>
                            setConfig((prev) => ({
                              ...prev,
                              pricing: {
                                ...prev.pricing,
                                taxSettings: {
                                  ...prev.pricing.taxSettings,
                                  taxRate:
                                    parseFloat(e.target.value) / 100 || 0,
                                },
                              },
                            }))
                          }
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="taxIncluded"
                          checked={config.pricing.taxSettings.taxIncluded}
                          onCheckedChange={(checked) =>
                            setConfig((prev) => ({
                              ...prev,
                              pricing: {
                                ...prev.pricing,
                                taxSettings: {
                                  ...prev.pricing.taxSettings,
                                  taxIncluded: !!checked,
                                },
                              },
                            }))
                          }
                        />
                        <Label htmlFor="taxIncluded">
                          Tax Included in Price
                        </Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <div className="flex justify-end pt-4">
                  <Button onClick={() => handleSectionSave("pricing")}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Pricing
                  </Button>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        <Collapsible
          open={openSections.booking}
          onOpenChange={() => toggleSection("booking")}
        >
          <Card>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Booking Rules
                  </div>
                  {openSections.booking ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Booking Rules</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Cut-off Times (hours before)</Label>
                      <div className="grid grid-cols-3 gap-4 mt-2">
                        {Object.entries(config.bookingRules.cutOffTimes).map(
                          ([service, hours]) => (
                            <div key={service}>
                              <Label className="capitalize text-sm">
                                {service}
                              </Label>
                              <Input
                                type="number"
                                value={hours}
                                onChange={(e) =>
                                  setConfig((prev) => ({
                                    ...prev,
                                    bookingRules: {
                                      ...prev.bookingRules,
                                      cutOffTimes: {
                                        ...prev.bookingRules.cutOffTimes,
                                        [service]:
                                          parseInt(e.target.value) || 0,
                                      },
                                    },
                                  }))
                                }
                              />
                            </div>
                          ),
                        )}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <Label>Deposit Requirements</Label>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="depositRequired"
                            checked={config.bookingRules.deposits.required}
                            onCheckedChange={(checked) =>
                              setConfig((prev) => ({
                                ...prev,
                                bookingRules: {
                                  ...prev.bookingRules,
                                  deposits: {
                                    ...prev.bookingRules.deposits,
                                    required: !!checked,
                                  },
                                },
                              }))
                            }
                          />
                          <Label htmlFor="depositRequired">
                            Deposit Required
                          </Label>
                        </div>
                        <div>
                          <Label>Deposit Percentage (%)</Label>
                          <Input
                            type="number"
                            step="0.01"
                            value={
                              config.bookingRules.deposits.percentage * 100
                            }
                            onChange={(e) =>
                              setConfig((prev) => ({
                                ...prev,
                                bookingRules: {
                                  ...prev.bookingRules,
                                  deposits: {
                                    ...prev.bookingRules.deposits,
                                    percentage:
                                      parseFloat(e.target.value) / 100 || 0,
                                  },
                                },
                              }))
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <div className="flex justify-end pt-4">
                  <Button onClick={() => handleSectionSave("booking")}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Booking Rules
                  </Button>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        <Collapsible
          open={openSections.schedules}
          onOpenChange={() => toggleSection("schedules")}
        >
          <Card>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Check-in/Out Times
                  </div>
                  {openSections.schedules ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-4">
                <div>
                  <Label>Default Check-in Times</Label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {Object.entries(
                      config.checkInOutTimes.defaultSchedules.checkIn,
                    ).map(([service, time]) => (
                      <div key={service}>
                        <Label className="capitalize text-sm">{service}</Label>
                        <Input
                          type="time"
                          value={time}
                          onChange={(e) =>
                            setConfig((prev) => ({
                              ...prev,
                              checkInOutTimes: {
                                ...prev.checkInOutTimes,
                                defaultSchedules: {
                                  ...prev.checkInOutTimes.defaultSchedules,
                                  checkIn: {
                                    ...prev.checkInOutTimes.defaultSchedules
                                      .checkIn,
                                    [service]: e.target.value,
                                  },
                                },
                              },
                            }))
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <Label>Default Check-out Times</Label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {Object.entries(
                      config.checkInOutTimes.defaultSchedules.checkOut,
                    ).map(([service, time]) => (
                      <div key={service}>
                        <Label className="capitalize text-sm">{service}</Label>
                        <Input
                          type="time"
                          value={time}
                          onChange={(e) =>
                            setConfig((prev) => ({
                              ...prev,
                              checkInOutTimes: {
                                ...prev.checkInOutTimes,
                                defaultSchedules: {
                                  ...prev.checkInOutTimes.defaultSchedules,
                                  checkOut: {
                                    ...prev.checkInOutTimes.defaultSchedules
                                      .checkOut,
                                    [service]: e.target.value,
                                  },
                                },
                              },
                            }))
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <Button onClick={() => handleSectionSave("schedules")}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Schedules
                  </Button>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        <Collapsible
          open={openSections.policies}
          onOpenChange={() => toggleSection("policies")}
        >
          <Card>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Policies & Requirements
                  </div>
                  {openSections.policies ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Vaccination Requirements
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="mandatoryRecords"
                        checked={
                          config.vaccinationRequirements.mandatoryRecords
                        }
                        onCheckedChange={(checked) =>
                          setConfig((prev) => ({
                            ...prev,
                            vaccinationRequirements: {
                              ...prev.vaccinationRequirements,
                              mandatoryRecords: !!checked,
                            },
                          }))
                        }
                      />
                      <Label htmlFor="mandatoryRecords">
                        Mandatory Vaccination Records
                      </Label>
                    </div>

                    <div className="space-y-2">
                      <Label>Required Vaccinations</Label>
                      {config.vaccinationRequirements.requiredVaccinations.map(
                        (vac, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`vac-${index}`}
                              checked={vac.required}
                              onCheckedChange={(checked) =>
                                setConfig((prev) => {
                                  const newVacs = [
                                    ...prev.vaccinationRequirements
                                      .requiredVaccinations,
                                  ];
                                  newVacs[index] = {
                                    ...vac,
                                    required: !!checked,
                                  };
                                  return {
                                    ...prev,
                                    vaccinationRequirements: {
                                      ...prev.vaccinationRequirements,
                                      requiredVaccinations: newVacs,
                                    },
                                  };
                                })
                              }
                            />
                            <Label htmlFor={`vac-${index}`}>
                              {vac.name} ({vac.frequency})
                            </Label>
                          </div>
                        ),
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      User Roles & Permissions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(config.userRoles.defaultPermissions).map(
                      ([role, permissions]) => (
                        <div key={role} className="space-y-2">
                          <Label className="capitalize font-medium">
                            {role} Permissions
                          </Label>
                          <div className="grid grid-cols-2 gap-4 pl-4">
                            {Object.entries(permissions).map(
                              ([perm, enabled]) => (
                                <div
                                  key={perm}
                                  className="flex items-center space-x-2"
                                >
                                  <Checkbox
                                    id={`${role}-${perm}`}
                                    checked={enabled}
                                    onCheckedChange={(checked) =>
                                      setConfig((prev) => ({
                                        ...prev,
                                        userRoles: {
                                          ...prev.userRoles,
                                          defaultPermissions: {
                                            ...prev.userRoles
                                              .defaultPermissions,
                                            [role]: {
                                              ...permissions,
                                              [perm]: !!checked,
                                            },
                                          },
                                        },
                                      }))
                                    }
                                  />
                                  <Label
                                    htmlFor={`${role}-${perm}`}
                                    className="text-sm capitalize"
                                  >
                                    {perm
                                      .replace(/([A-Z])/g, " $1")
                                      .toLowerCase()}
                                  </Label>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      ),
                    )}
                  </CardContent>
                </Card>
                <div className="flex justify-end pt-4">
                  <Button onClick={() => handleSectionSave("policies")}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Policies
                  </Button>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        <Collapsible
          open={openSections.advanced}
          onOpenChange={() => toggleSection("advanced")}
        >
          <Card>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Advanced Settings
                  </div>
                  {openSections.advanced ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PawPrint className="h-5 w-5" />
                      Pet Categories & Restrictions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Weight Limits (lbs)</Label>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        {Object.entries(config.petCategories.weightLimits).map(
                          ([size, limits]) => (
                            <div key={size} className="space-y-2">
                              <Label className="capitalize text-sm">
                                {size}
                              </Label>
                              <div className="flex space-x-2">
                                <Input
                                  placeholder="Min"
                                  type="number"
                                  value={limits.min}
                                  onChange={(e) =>
                                    setConfig((prev) => ({
                                      ...prev,
                                      petCategories: {
                                        ...prev.petCategories,
                                        weightLimits: {
                                          ...prev.petCategories.weightLimits,
                                          [size]: {
                                            ...limits,
                                            min: parseInt(e.target.value) || 0,
                                          },
                                        },
                                      },
                                    }))
                                  }
                                />
                                <Input
                                  placeholder="Max"
                                  type="number"
                                  value={
                                    limits.max === Infinity ? "" : limits.max
                                  }
                                  onChange={(e) =>
                                    setConfig((prev) => ({
                                      ...prev,
                                      petCategories: {
                                        ...prev.petCategories,
                                        weightLimits: {
                                          ...prev.petCategories.weightLimits,
                                          [size]: {
                                            ...limits,
                                            max: e.target.value
                                              ? parseInt(e.target.value)
                                              : Infinity,
                                          },
                                        },
                                      },
                                    }))
                                  }
                                />
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Custom Fields
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Pet Custom Fields</Label>
                      <div className="space-y-2 mt-2">
                        {config.customFields.pets.map((field, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            <Input
                              value={field.name}
                              readOnly
                              className="flex-1"
                            />
                            <span className="text-sm text-muted-foreground">
                              {field.type}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileCheck className="h-5 w-5" />
                      Waivers & Contracts
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(config.waiversAndContracts.templates).map(
                      ([key, template]) => (
                        <div key={key} className="flex items-center space-x-2">
                          <Checkbox
                            id={key}
                            checked={template.required}
                            onCheckedChange={(checked) =>
                              setConfig((prev) => ({
                                ...prev,
                                waiversAndContracts: {
                                  ...prev.waiversAndContracts,
                                  templates: {
                                    ...prev.waiversAndContracts.templates,
                                    [key]: { ...template, required: !!checked },
                                  },
                                },
                              }))
                            }
                          />
                          <Label htmlFor={key}>{template.name}</Label>
                        </div>
                      ),
                    )}
                  </CardContent>
                </Card>
                <div className="flex justify-end pt-4">
                  <Button onClick={() => handleSectionSave("advanced")}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Advanced Settings
                  </Button>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      </div>
    </div>
  );
}
