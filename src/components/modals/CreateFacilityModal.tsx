"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { facilities } from "@/data/facilities";
import { Building, ArrowRight } from "lucide-react";

interface CreateFacilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (facility: (typeof facilities)[0]) => void;
}

export function CreateFacilityModal({
  isOpen,
  onClose,
  onCreate,
}: CreateFacilityModalProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    plan: "Basic",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Facility name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleQuickCreate = () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    const newFacility = {
      id: Math.max(...facilities.map((f) => f.id)) + 1,
      name: formData.name,
      status: "active" as const,
      plan: formData.plan,
      dayJoined: new Date().toISOString().split("T")[0],
      subscriptionEnd: (() => {
        const date = new Date();
        date.setFullYear(date.getFullYear() + 1);
        return date.toISOString().split("T")[0];
      })(),
      contact: {
        email: formData.email,
        phone: formData.phone || "",
        website: "",
      },
      owner: {
        name: "Admin",
        email: formData.email,
        phone: formData.phone || "",
      },
      limits: {
        locations: 1,
        staff: 5,
        clients: 50,
        pets: 100,
      },
      enabledModules: ["booking", "customers"],
      locationsList: [],
      clients: [],
      usersList: [
        {
          person: {
            name: "Admin",
            email: formData.email,
          },
          role: "Admin",
        },
      ],
    };

    onCreate(newFacility);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      plan: "Basic",
    });
    setErrors({});
    setIsSubmitting(false);
    onClose();
  };

  const handleDetailedSetup = () => {
    handleClose();
    router.push("/dashboard/facilities/new");
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center w-10 h-10 rounded-xl"
              style={{
                background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
              }}
            >
              <Building className="h-5 w-5 text-white" />
            </div>
            <div>
              <DialogTitle>Quick Create Facility</DialogTitle>
              <DialogDescription>
                Add a new facility with basic information
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              Facility Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Enter facility name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              Contact Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@facility.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(555) 123-4567"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="plan">Subscription Plan</Label>
            <Select
              value={formData.plan}
              onValueChange={(value) =>
                setFormData({ ...formData, plan: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Free">Free</SelectItem>
                <SelectItem value="Basic">Basic</SelectItem>
                <SelectItem value="Premium">Premium</SelectItem>
                <SelectItem value="Enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-lg bg-muted/50 p-3 border border-dashed">
          <p className="text-sm text-muted-foreground">
            Need to add more details like business type, capacity limits, and
            operating hours?
          </p>
          <Button
            variant="link"
            className="h-auto p-0 text-primary"
            onClick={handleDetailedSetup}
          >
            Use detailed setup wizard
            <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleQuickCreate} disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Facility"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
