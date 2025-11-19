"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Stepper,
  StepperContent,
  StepperNavigation,
  type Step,
} from "@/components/ui/stepper";
import { facilities } from "@/data/facilities";
import { plans } from "@/data/plans";

interface CreateFacilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (facility: (typeof facilities)[0]) => void;
}

const steps: Step[] = [
  {
    id: "basic",
    title: "Basic Info",
    description: "Facility details",
  },
  {
    id: "location",
    title: "Location",
    description: "Address & contact",
  },
  {
    id: "admin",
    title: "Admin Account",
    description: "Create administrator",
  },
  {
    id: "plan",
    title: "Plan Selection",
    description: "Choose subscription",
  },
  {
    id: "review",
    title: "Review",
    description: "Confirm details",
  },
];

export function CreateFacilityModal({
  isOpen,
  onClose,
  onCreate,
}: CreateFacilityModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Basic Info
    name: "",
    description: "",
    businessType: "",

    // Location & Contact
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
    phone: "",
    email: "",

    // Admin Account
    adminName: "",
    adminEmail: "",
    adminPassword: "",
    adminConfirmPassword: "",
    autoGeneratePassword: false,

    // Plan Selection
    selectedPlan: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 0) {
      if (!formData.name.trim()) newErrors.name = "Facility name is required";
      if (!formData.businessType)
        newErrors.businessType = "Business type is required";
    } else if (step === 1) {
      if (!formData.address.trim()) newErrors.address = "Address is required";
      if (!formData.city.trim()) newErrors.city = "City is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
    } else if (step === 2) {
      if (!formData.adminName.trim())
        newErrors.adminName = "Admin name is required";
      if (!formData.adminEmail.trim())
        newErrors.adminEmail = "Admin email is required";
      if (!formData.autoGeneratePassword) {
        if (!formData.adminPassword)
          newErrors.adminPassword = "Password is required";
        if (formData.adminPassword !== formData.adminConfirmPassword) {
          newErrors.adminConfirmPassword = "Passwords do not match";
        }
      }
    } else if (step === 3) {
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
      const newFacility = {
        id: Date.now(),
        name: formData.name,
        description: formData.description,
        businessType: formData.businessType,
        status: "pending",
        plan: formData.selectedPlan,
        dayJoined: new Date().toISOString().split("T")[0],
        subscriptionEnd: "",
        locationsList: [
          {
            name: "Main Location",
            address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`,
            services: ["daycare", "boarding", "grooming"],
          },
        ],
        clients: [],
        usersList: [
          {
            person: {
              name: formData.adminName,
              email: formData.adminEmail,
            },
            role: "Admin",
          },
        ],
      };

      onCreate(newFacility);
      onClose();
      // Reset form
      setCurrentStep(0);
      setFormData({
        name: "",
        description: "",
        businessType: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        country: "US",
        phone: "",
        email: "",
        adminName: "",
        adminEmail: "",
        adminPassword: "",
        adminConfirmPassword: "",
        autoGeneratePassword: false,
        selectedPlan: "",
      });
      setErrors({});
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Facility Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter facility name"
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessType">Business Type *</Label>
              <Select
                value={formData.businessType}
                onValueChange={(value) =>
                  setFormData({ ...formData, businessType: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daycare">Pet Daycare</SelectItem>
                  <SelectItem value="boarding">Pet Boarding</SelectItem>
                  <SelectItem value="grooming">Pet Grooming</SelectItem>
                  <SelectItem value="vet">Veterinary Clinic</SelectItem>
                  <SelectItem value="mixed">Mixed Services</SelectItem>
                </SelectContent>
              </Select>
              {errors.businessType && (
                <p className="text-sm text-destructive">
                  {errors.businessType}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Describe your facility..."
                rows={3}
              />
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address">Street Address *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  placeholder="123 Main St"
                />
                {errors.address && (
                  <p className="text-sm text-destructive">{errors.address}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  placeholder="City"
                />
                {errors.city && (
                  <p className="text-sm text-destructive">{errors.city}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) =>
                    setFormData({ ...formData, state: e.target.value })
                  }
                  placeholder="State"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP Code</Label>
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
                <Label htmlFor="country">Country</Label>
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
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
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
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="contact@facility.com"
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="adminName">Admin Full Name *</Label>
              <Input
                id="adminName"
                value={formData.adminName}
                onChange={(e) =>
                  setFormData({ ...formData, adminName: e.target.value })
                }
                placeholder="John Doe"
              />
              {errors.adminName && (
                <p className="text-sm text-destructive">{errors.adminName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="adminEmail">Admin Email *</Label>
              <Input
                id="adminEmail"
                type="email"
                value={formData.adminEmail}
                onChange={(e) =>
                  setFormData({ ...formData, adminEmail: e.target.value })
                }
                placeholder="admin@facility.com"
              />
              {errors.adminEmail && (
                <p className="text-sm text-destructive">{errors.adminEmail}</p>
              )}
            </div>

            <div className="space-y-4">
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
                    <Label htmlFor="adminPassword">Password *</Label>
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
                    />
                    {errors.adminPassword && (
                      <p className="text-sm text-destructive">
                        {errors.adminPassword}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="adminConfirmPassword">
                      Confirm Password *
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

      case 3:
        return (
          <div className="space-y-4">
            <Label>Select a Plan *</Label>
            <div className="grid gap-4">
              {plans.map((plan) => (
                <Card
                  key={plan.id}
                  className={`cursor-pointer transition-colors ${
                    formData.selectedPlan === plan.id
                      ? "ring-2 ring-primary"
                      : ""
                  }`}
                  onClick={() =>
                    setFormData({ ...formData, selectedPlan: plan.id })
                  }
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{plan.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {plan.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground mb-1">
                          Starting from
                        </div>
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
                  </CardContent>
                </Card>
              ))}
            </div>
            {errors.selectedPlan && (
              <p className="text-sm text-destructive">{errors.selectedPlan}</p>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Review Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Facility:</strong> {formData.name}
                  </div>
                  <div>
                    <strong>Type:</strong> {formData.businessType}
                  </div>
                  <div>
                    <strong>Location:</strong> {formData.city}, {formData.state}
                  </div>
                  <div>
                    <strong>Admin:</strong> {formData.adminName}
                  </div>
                  <div>
                    <strong>Plan:</strong> {formData.selectedPlan}
                  </div>
                  <div>
                    <strong>Email:</strong> {formData.email}
                  </div>
                  <div>
                    <strong>Password:</strong>{" "}
                    {formData.autoGeneratePassword
                      ? "Auto-generated (sent via email)"
                      : "Manually set"}
                  </div>
                  <div>
                    <strong>Status:</strong> Pending (requires approval)
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="max-w-4xl w-full mx-4 bg-background rounded-lg shadow-lg max-h-[90vh] flex flex-col">
        <div className="p-6 border-b shrink-0">
          <h2 className="text-2xl font-bold">Create New Facility</h2>
          <p className="text-muted-foreground">
            Follow the steps to set up your new facility
          </p>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <Stepper steps={steps} currentStep={currentStep} />

          <StepperContent>{renderStepContent()}</StepperContent>
        </div>

        <div className="p-6 border-t shrink-0">
          <StepperNavigation
            currentStep={currentStep}
            totalSteps={steps.length}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onComplete={handleComplete}
            canProceed={true}
          />
        </div>
      </div>
    </div>
  );
}
