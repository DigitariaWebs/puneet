"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type Step } from "@/components/ui/stepper";
import { plans } from "@/data/plans";
import {
  Building,
  Building2,
  MapPin,
  User,
  Users,
  UserCheck,
  PawPrint,
  CreditCard,
  Settings,
  CheckCircle,
  ArrowLeft,
  Clock,
  Scissors,
  Dog,
  Home,
  GraduationCap,
} from "lucide-react";

const steps: Step[] = [
  {
    id: "basic",
    title: "Basic Information",
    description: "Facility details",
  },
  {
    id: "business",
    title: "Business Type",
    description: "Services & capacity",
  },
  {
    id: "location",
    title: "Location & Contact",
    description: "Address & hours",
  },
  {
    id: "owner",
    title: "Owner Details",
    description: "Admin account",
  },
  {
    id: "plan",
    title: "Subscription",
    description: "Choose plan",
  },
  {
    id: "review",
    title: "Review",
    description: "Confirm details",
  },
];

const businessTypes = [
  {
    id: "boarding",
    label: "Pet Boarding",
    icon: Home,
    description: "Overnight stays and extended care",
  },
  {
    id: "daycare",
    label: "Pet Daycare",
    icon: Dog,
    description: "Daytime supervision and play",
  },
  {
    id: "grooming",
    label: "Pet Grooming",
    icon: Scissors,
    description: "Bathing, haircuts, and styling",
  },
  {
    id: "training",
    label: "Training/Education",
    icon: GraduationCap,
    description: "Obedience and behavior training",
  },
];

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function NewFacilityPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Basic Info
    name: "",
    description: "",
    website: "",

    // Business Type
    businessTypes: [] as string[],
    services: [] as string[],
    capacityDogs: "",
    capacityCats: "",
    capacityOther: "",

    // Location & Contact
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
    phone: "",
    email: "",
    operatingHours: daysOfWeek.reduce(
      (acc, day) => ({
        ...acc,
        [day]: { enabled: day !== "Sunday", open: "08:00", close: "18:00" },
      }),
      {} as Record<string, { enabled: boolean; open: string; close: string }>,
    ),

    // Owner Details
    ownerName: "",
    ownerEmail: "",
    ownerPhone: "",
    adminPassword: "",
    adminConfirmPassword: "",
    autoGeneratePassword: true,

    // Plan Selection
    selectedPlan: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 0) {
      if (!formData.name.trim()) newErrors.name = "Facility name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
    } else if (step === 1) {
      if (formData.businessTypes.length === 0) {
        newErrors.businessTypes = "Select at least one business type";
      }
    } else if (step === 2) {
      if (!formData.address.trim()) newErrors.address = "Address is required";
      if (!formData.city.trim()) newErrors.city = "City is required";
      if (!formData.state.trim()) newErrors.state = "State is required";
    } else if (step === 3) {
      if (!formData.ownerName.trim())
        newErrors.ownerName = "Owner name is required";
      if (!formData.ownerEmail.trim())
        newErrors.ownerEmail = "Owner email is required";
      if (!formData.autoGeneratePassword) {
        if (!formData.adminPassword)
          newErrors.adminPassword = "Password is required";
        if (formData.adminPassword !== formData.adminConfirmPassword) {
          newErrors.adminConfirmPassword = "Passwords do not match";
        }
      }
    } else if (step === 4) {
      if (!formData.selectedPlan)
        newErrors.selectedPlan = "Please select a plan";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleComplete = () => {
    if (validateStep(currentStep)) {
      // In a real app, this would submit to an API
      console.log("Creating facility with data:", formData);
      router.push("/dashboard/facilities");
    }
  };

  const toggleBusinessType = (typeId: string) => {
    setFormData((prev) => ({
      ...prev,
      businessTypes: prev.businessTypes.includes(typeId)
        ? prev.businessTypes.filter((t) => t !== typeId)
        : [...prev.businessTypes, typeId],
    }));
  };

  const toggleOperatingDay = (day: string) => {
    setFormData((prev) => ({
      ...prev,
      operatingHours: {
        ...prev.operatingHours,
        [day]: {
          ...prev.operatingHours[day],
          enabled: !prev.operatingHours[day].enabled,
        },
      },
    }));
  };

  const updateOperatingHours = (
    day: string,
    field: "open" | "close",
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      operatingHours: {
        ...prev.operatingHours,
        [day]: {
          ...prev.operatingHours[day],
          [field]: value,
        },
      },
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">
                Facility Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter facility name"
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                Business Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="contact@facility.com"
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Business Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="(555) 123-4567"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) =>
                  setFormData({ ...formData, website: e.target.value })
                }
                placeholder="https://www.yourfacility.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Describe your facility, services, and what makes you unique..."
                rows={4}
              />
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label>
                Business Type <span className="text-destructive">*</span>
              </Label>
              <p className="text-sm text-muted-foreground">
                Select all that apply to your facility
              </p>
              <div className="grid grid-cols-2 gap-4">
                {businessTypes.map((type) => (
                  <Card
                    key={type.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      formData.businessTypes.includes(type.id)
                        ? "ring-2 ring-primary border-primary"
                        : ""
                    }`}
                    onClick={() => toggleBusinessType(type.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-lg ${
                            formData.businessTypes.includes(type.id)
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <type.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">{type.label}</h4>
                          <p className="text-sm text-muted-foreground">
                            {type.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {errors.businessTypes && (
                <p className="text-sm text-destructive">
                  {errors.businessTypes}
                </p>
              )}
            </div>

            <div className="space-y-4">
              <Label>Capacity Limits</Label>
              <p className="text-sm text-muted-foreground">
                Set maximum capacity for each pet type
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="capacityDogs" className="text-sm">
                    Dogs
                  </Label>
                  <Input
                    id="capacityDogs"
                    type="number"
                    min="0"
                    value={formData.capacityDogs}
                    onChange={(e) =>
                      setFormData({ ...formData, capacityDogs: e.target.value })
                    }
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capacityCats" className="text-sm">
                    Cats
                  </Label>
                  <Input
                    id="capacityCats"
                    type="number"
                    min="0"
                    value={formData.capacityCats}
                    onChange={(e) =>
                      setFormData({ ...formData, capacityCats: e.target.value })
                    }
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capacityOther" className="text-sm">
                    Other Pets
                  </Label>
                  <Input
                    id="capacityOther"
                    type="number"
                    min="0"
                    value={formData.capacityOther}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        capacityOther: e.target.value,
                      })
                    }
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label>Address</Label>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm">
                    Street Address <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    placeholder="123 Main Street"
                    className={errors.address ? "border-destructive" : ""}
                  />
                  {errors.address && (
                    <p className="text-sm text-destructive">{errors.address}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-sm">
                      City <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      placeholder="City"
                      className={errors.city ? "border-destructive" : ""}
                    />
                    {errors.city && (
                      <p className="text-sm text-destructive">{errors.city}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-sm">
                      State <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) =>
                        setFormData({ ...formData, state: e.target.value })
                      }
                      placeholder="State"
                      className={errors.state ? "border-destructive" : ""}
                    />
                    {errors.state && (
                      <p className="text-sm text-destructive">{errors.state}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="zipCode" className="text-sm">
                      ZIP Code
                    </Label>
                    <Input
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={(e) =>
                        setFormData({ ...formData, zipCode: e.target.value })
                      }
                      placeholder="12345"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country" className="text-sm">
                      Country
                    </Label>
                    <Select
                      value={formData.country}
                      onValueChange={(value) =>
                        setFormData({ ...formData, country: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="CA">Canada</SelectItem>
                        <SelectItem value="UK">United Kingdom</SelectItem>
                        <SelectItem value="AU">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <Label>Operating Hours</Label>
              </div>
              <div className="space-y-3">
                {daysOfWeek.map((day) => (
                  <div
                    key={day}
                    className="flex items-center gap-4 p-3 rounded-lg bg-muted/50"
                  >
                    <div className="flex items-center gap-2 w-32">
                      <Checkbox
                        id={`day-${day}`}
                        checked={formData.operatingHours[day].enabled}
                        onCheckedChange={() => toggleOperatingDay(day)}
                      />
                      <Label
                        htmlFor={`day-${day}`}
                        className="text-sm font-medium cursor-pointer"
                      >
                        {day}
                      </Label>
                    </div>
                    {formData.operatingHours[day].enabled ? (
                      <div className="flex items-center gap-2">
                        <Input
                          type="time"
                          value={formData.operatingHours[day].open}
                          onChange={(e) =>
                            updateOperatingHours(day, "open", e.target.value)
                          }
                          className="w-32"
                        />
                        <span className="text-muted-foreground">to</span>
                        <Input
                          type="time"
                          value={formData.operatingHours[day].close}
                          onChange={(e) =>
                            updateOperatingHours(day, "close", e.target.value)
                          }
                          className="w-32"
                        />
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        Closed
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="ownerName">
                Owner / Admin Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="ownerName"
                value={formData.ownerName}
                onChange={(e) =>
                  setFormData({ ...formData, ownerName: e.target.value })
                }
                placeholder="John Doe"
                className={errors.ownerName ? "border-destructive" : ""}
              />
              {errors.ownerName && (
                <p className="text-sm text-destructive">{errors.ownerName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="ownerEmail">
                Owner Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="ownerEmail"
                type="email"
                value={formData.ownerEmail}
                onChange={(e) =>
                  setFormData({ ...formData, ownerEmail: e.target.value })
                }
                placeholder="owner@facility.com"
                className={errors.ownerEmail ? "border-destructive" : ""}
              />
              {errors.ownerEmail && (
                <p className="text-sm text-destructive">{errors.ownerEmail}</p>
              )}
              <p className="text-xs text-muted-foreground">
                This will be used as the admin login email
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ownerPhone">Owner Phone</Label>
              <Input
                id="ownerPhone"
                value={formData.ownerPhone}
                onChange={(e) =>
                  setFormData({ ...formData, ownerPhone: e.target.value })
                }
                placeholder="(555) 123-4567"
              />
            </div>

            <div className="space-y-4 pt-4 border-t">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Auto-generate Password</Label>
                  <p className="text-sm text-muted-foreground">
                    Generate a secure password and send it via email
                  </p>
                </div>
                <Checkbox
                  checked={formData.autoGeneratePassword}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      autoGeneratePassword: !!checked,
                    })
                  }
                />
              </div>

              {!formData.autoGeneratePassword && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="adminPassword">
                      Password <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="adminPassword"
                      type="password"
                      value={formData.adminPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          adminPassword: e.target.value,
                        })
                      }
                      placeholder="Enter password"
                      className={
                        errors.adminPassword ? "border-destructive" : ""
                      }
                    />
                    {errors.adminPassword && (
                      <p className="text-sm text-destructive">
                        {errors.adminPassword}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="adminConfirmPassword">
                      Confirm Password{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="adminConfirmPassword"
                      type="password"
                      value={formData.adminConfirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          adminConfirmPassword: e.target.value,
                        })
                      }
                      placeholder="Confirm password"
                      className={
                        errors.adminConfirmPassword ? "border-destructive" : ""
                      }
                    />
                    {errors.adminConfirmPassword && (
                      <p className="text-sm text-destructive">
                        {errors.adminConfirmPassword}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <Label>
              Select a Plan <span className="text-destructive">*</span>
            </Label>
            <div className="grid gap-4">
              {plans.map((plan) => {
                const formatLimit = (value: number) =>
                  value === -1 ? "Unlimited" : value.toString();
                return (
                  <Card
                    key={plan.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      formData.selectedPlan === plan.id
                        ? "ring-2 ring-primary border-primary"
                        : ""
                    }`}
                    onClick={() =>
                      setFormData({ ...formData, selectedPlan: plan.id })
                    }
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-lg ${
                              formData.selectedPlan === plan.id
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            }`}
                          >
                            <CreditCard className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{plan.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {plan.description}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">
                            {plan.pricing.length > 0
                              ? `$${Math.min(
                                  ...plan.pricing.map((p) => p.basePrice),
                                )}`
                              : "$0"}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            /month
                          </div>
                        </div>
                      </div>
                      {/* Plan Limits */}
                      <div className="grid grid-cols-4 gap-2 pt-3 border-t">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Building2 className="h-3.5 w-3.5" />
                          <span>
                            {formatLimit(plan.limits.locations)} locations
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Users className="h-3.5 w-3.5" />
                          <span>{formatLimit(plan.limits.staff)} staff</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <UserCheck className="h-3.5 w-3.5" />
                          <span>
                            {formatLimit(plan.limits.clients)} clients
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <PawPrint className="h-3.5 w-3.5" />
                          <span>{formatLimit(plan.limits.pets)} pets</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            {errors.selectedPlan && (
              <p className="text-sm text-destructive">{errors.selectedPlan}</p>
            )}
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="rounded-lg bg-success/10 border border-success/20 p-4">
              <div className="flex items-center gap-2 text-success mb-2">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">Ready to Create</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Please review all the details below before creating the
                facility.
              </p>
            </div>

            <Card className="border-0 shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Facility Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between py-1 border-b">
                  <span className="text-muted-foreground">Name</span>
                  <span className="font-medium">{formData.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b">
                  <span className="text-muted-foreground">Email</span>
                  <span className="font-medium">{formData.email}</span>
                </div>
                <div className="flex justify-between py-1 border-b">
                  <span className="text-muted-foreground">Business Type</span>
                  <div className="flex gap-1">
                    {formData.businessTypes.map((type) => (
                      <Badge key={type} variant="secondary">
                        {businessTypes.find((t) => t.id === type)?.label}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Capacity</span>
                  <span className="font-medium">
                    {formData.capacityDogs || 0} dogs,{" "}
                    {formData.capacityCats || 0} cats
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between py-1 border-b">
                  <span className="text-muted-foreground">Address</span>
                  <span className="font-medium text-right">
                    {formData.address}
                    <br />
                    {formData.city}, {formData.state} {formData.zipCode}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Operating Days</span>
                  <span className="font-medium">
                    {
                      Object.values(formData.operatingHours).filter(
                        (h) => h.enabled,
                      ).length
                    }{" "}
                    days/week
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Owner Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between py-1 border-b">
                  <span className="text-muted-foreground">Name</span>
                  <span className="font-medium">{formData.ownerName}</span>
                </div>
                <div className="flex justify-between py-1 border-b">
                  <span className="text-muted-foreground">Email</span>
                  <span className="font-medium">{formData.ownerEmail}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Password</span>
                  <span className="font-medium">
                    {formData.autoGeneratePassword
                      ? "Auto-generated (sent via email)"
                      : "Manually set"}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Subscription
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <div className="flex justify-between py-1">
                  <span className="text-muted-foreground">Selected Plan</span>
                  <Badge>
                    {plans.find((p) => p.id === formData.selectedPlan)?.name ||
                      "None"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  const getStepIcon = (stepId: string) => {
    switch (stepId) {
      case "basic":
        return Building;
      case "business":
        return Settings;
      case "location":
        return MapPin;
      case "owner":
        return User;
      case "plan":
        return CreditCard;
      case "review":
        return CheckCircle;
      default:
        return Building;
    }
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/dashboard/facilities")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Create New Facility
          </h1>
          <p className="text-muted-foreground mt-1">
            Complete the setup wizard to add a new facility
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar - Step Navigation */}
        <Card className="border-0 shadow-card lg:col-span-1 h-fit">
          <CardContent className="p-4">
            <div className="space-y-1">
              {steps.map((step, index) => {
                const Icon = getStepIcon(step.id);
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;

                return (
                  <button
                    key={step.id}
                    onClick={() => {
                      if (index < currentStep) {
                        setCurrentStep(index);
                      }
                    }}
                    disabled={index > currentStep}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : isCompleted
                          ? "bg-muted hover:bg-muted/80 cursor-pointer"
                          : "text-muted-foreground cursor-not-allowed"
                    }`}
                  >
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full ${
                        isActive
                          ? "bg-primary-foreground/20"
                          : isCompleted
                            ? "bg-success/20 text-success"
                            : "bg-muted"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <Icon className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{step.title}</p>
                      <p
                        className={`text-xs ${isActive ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                      >
                        {step.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Main Form */}
        <Card className="border-0 shadow-card lg:col-span-3">
          <CardHeader>
            <CardTitle>{steps[currentStep].title}</CardTitle>
          </CardHeader>
          <CardContent>{renderStepContent()}</CardContent>
          <div className="p-6 pt-0 flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            {currentStep === steps.length - 1 ? (
              <Button onClick={handleComplete}>Create Facility</Button>
            ) : (
              <Button onClick={handleNext}>Continue</Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
