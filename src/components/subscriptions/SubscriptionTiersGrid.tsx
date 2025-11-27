"use client";

import { useState } from "react";
import { SubscriptionTier, subscriptionTiers } from "@/data/subscription-tiers";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Check,
  Edit,
  Plus,
  Trash2,
  Users,
  Calendar,
  HardDrive,
  MapPin,
} from "lucide-react";

interface TierCardProps {
  tier: SubscriptionTier;
  onEdit: (tier: SubscriptionTier) => void;
  onDelete: (tier: SubscriptionTier) => void;
}

function TierCard({ tier, onEdit, onDelete }: TierCardProps) {
  const getTierColor = (type: string) => {
    switch (type) {
      case "beginner":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "pro":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      case "enterprise":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      case "custom":
        return "bg-pink-500/10 text-pink-500 border-pink-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  const formatLimit = (value: number) => {
    return value === -1 ? "Unlimited" : value.toLocaleString();
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-2xl">{tier.name}</CardTitle>
            <CardDescription>{tier.description}</CardDescription>
          </div>
          <Badge
            variant="outline"
            className={`capitalize ${getTierColor(tier.type)}`}
          >
            {tier.type}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Pricing */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm text-muted-foreground">
            Pricing
          </h4>
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center p-2 bg-muted rounded-lg">
              <p className="text-2xl font-bold">${tier.pricing.monthly}</p>
              <p className="text-xs text-muted-foreground">/ month</p>
            </div>
            <div className="text-center p-2 bg-muted rounded-lg">
              <p className="text-2xl font-bold">${tier.pricing.quarterly}</p>
              <p className="text-xs text-muted-foreground">/ quarter</p>
            </div>
            <div className="text-center p-2 bg-muted rounded-lg">
              <p className="text-2xl font-bold">${tier.pricing.yearly}</p>
              <p className="text-xs text-muted-foreground">/ year</p>
            </div>
          </div>
        </div>

        {/* Limitations */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm text-muted-foreground">
            Limitations
          </h4>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
              <Users className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Users</p>
                <p className="text-sm font-medium">
                  {formatLimit(tier.limitations.maxUsers)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Reservations</p>
                <p className="text-sm font-medium">
                  {formatLimit(tier.limitations.maxReservations)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
              <HardDrive className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Storage</p>
                <p className="text-sm font-medium">
                  {formatLimit(tier.limitations.storageGB)} GB
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Locations</p>
                <p className="text-sm font-medium">
                  {formatLimit(tier.limitations.maxLocations)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm text-muted-foreground">
            Features ({tier.features.length})
          </h4>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {tier.features.slice(0, 5).map((feature, index) => (
              <div key={index} className="flex items-start gap-2">
                <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                <p className="text-sm">{feature}</p>
              </div>
            ))}
            {tier.features.length > 5 && (
              <p className="text-xs text-muted-foreground pl-6">
                + {tier.features.length - 5} more features
              </p>
            )}
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center gap-2">
          <Badge variant={tier.isActive ? "default" : "secondary"}>
            {tier.isActive ? "Active" : "Inactive"}
          </Badge>
          {tier.isCustomizable && <Badge variant="outline">Customizable</Badge>}
        </div>
      </CardContent>

      <CardFooter className="gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => onEdit(tier)}
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="text-destructive hover:text-destructive"
          onClick={() => onDelete(tier)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

export function SubscriptionTiersGrid() {
  const [tiers] = useState<SubscriptionTier[]>(subscriptionTiers);

  const handleEdit = (tier: SubscriptionTier) => {
    console.log("Edit tier:", tier);
    // TODO: Open edit modal
  };

  const handleDelete = (tier: SubscriptionTier) => {
    console.log("Delete tier:", tier);
    // TODO: Open delete confirmation
  };

  const handleCreate = () => {
    console.log("Create new tier");
    // TODO: Open create modal
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Subscription Tiers</h2>
          <p className="text-muted-foreground">
            Manage and configure subscription tiers
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Create Tier
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tiers.map((tier) => (
          <TierCard
            key={tier.id}
            tier={tier}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
