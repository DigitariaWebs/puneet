"use client";

import { useState } from "react";
import { plans as initialPlans, type Plan } from "@/data/plans";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
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
import { DataTable, ColumnDef } from "@/components/DataTable";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Plus,
  Edit,
  Trash2,
  CreditCard,
  DollarSign,
  Users,
  TrendingUp,
  Receipt,
  RotateCcw,
} from "lucide-react";

export default function BillingPage() {
  const [plansState, setPlansState] = useState(initialPlans);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);

  const planColumns: ColumnDef<Plan>[] = [
    {
      key: "name",
      label: "Plan Name",
      icon: CreditCard,
      defaultVisible: true,
    },
    {
      key: "pricing",
      label: "Pricing",
      icon: DollarSign,
      defaultVisible: true,
      render: (plan) => {
        const formatPricing = (p: Plan["pricing"][0]) => {
          const parts = [];
          if (p.basePrice > 0) parts.push(`$${p.basePrice}`);
          if (p.isPerUserPricing && p.perUserPrice > 0)
            parts.push(`$${p.perUserPrice}/user`);
          if (parts.length === 0) return `Free/${p.interval}`;
          return `${parts.join(" + ")}/${p.interval}`;
        };
        return (plan as Plan).pricing.map(formatPricing).join(", ");
      },
    },
    {
      key: "limits.pets",
      label: "Pets Limit",
      icon: Users,
      defaultVisible: true,
      render: (plan) =>
        (plan as Plan).limits.pets === -1
          ? "Unlimited"
          : (plan as Plan).limits.pets,
    },
    {
      key: "limits.users",
      label: "Users Limit",
      icon: Users,
      defaultVisible: true,
      render: (plan) =>
        (plan as Plan).limits.users === -1
          ? "Unlimited"
          : (plan as Plan).limits.users,
    },
    {
      key: "status",
      label: "Status",
      defaultVisible: true,
      render: (plan) => (
        <Badge
          variant={(plan as Plan).status === "active" ? "default" : "secondary"}
        >
          {(plan as Plan).status}
        </Badge>
      ),
    },
  ];

  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Subscription & Billing
        </h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Receipt className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
          <Dialog open={isPlanModalOpen} onOpenChange={setIsPlanModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Plan
              </Button>
            </DialogTrigger>
            <DialogContent className="min-w-5xl max-h-[90vh] overflow-y-scroll">
              <DialogHeader>
                <DialogTitle>
                  {selectedPlan ? "Edit Plan" : "Create New Plan"}
                </DialogTitle>
              </DialogHeader>
              <PlanForm
                plan={selectedPlan}
                onClose={() => {
                  setIsPlanModalOpen(false);
                  setSelectedPlan(null);
                }}
                onSave={(newPlan) => {
                  if (selectedPlan) {
                    // Update existing plan
                    setPlansState((prev) =>
                      prev.map((p) => (p.id === selectedPlan.id ? newPlan : p)),
                    );
                  } else {
                    // Add new plan
                    setPlansState((prev) => [...prev, newPlan]);
                  }
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Subscriptions
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,350</div>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Revenue/User
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$19.23</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
            <RotateCcw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4%</div>
            <p className="text-xs text-muted-foreground">
              -0.5% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="plans" className="space-y-4">
        <TabsList>
          <TabsTrigger value="plans">Plans Management</TabsTrigger>
          <TabsTrigger value="preview">Plans Preview</TabsTrigger>
          <TabsTrigger value="gateways">Payment Gateways</TabsTrigger>
          <TabsTrigger value="tax">Tax & VAT</TabsTrigger>
          <TabsTrigger value="invoicing">Invoicing</TabsTrigger>
        </TabsList>

        <TabsContent value="plans" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Plans</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                data={plansState as unknown as Record<string, unknown>[]}
                columns={
                  planColumns as unknown as ColumnDef<Record<string, unknown>>[]
                }
                searchKey="name"
                searchPlaceholder="Search plans..."
                itemsPerPage={10}
                actions={(plan) => (
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedPlan(plan as unknown as Plan);
                        setIsPlanModalOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setPlansState((prev) =>
                          prev.filter(
                            (p) => p.id !== (plan as unknown as Plan).id,
                          ),
                        );
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="space-y-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">Choose Your Plan</h2>
            <p className="text-muted-foreground mt-2">
              Select the perfect plan for your pet care business
            </p>
          </div>
          <div className="flex justify-center">
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] max-w-7xl">
              {plansState.map((plan) => (
                <Card key={plan.id} className="relative">
                  <CardHeader>
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {plan.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      {plan.pricing.length === 1 ? (
                        <div className="text-center">
                          <div className="text-3xl font-bold text-primary mb-1">
                            {plan.pricing[0].basePrice > 0 &&
                              `$${plan.pricing[0].basePrice}`}
                            {plan.pricing[0].isPerUserPricing &&
                              plan.pricing[0].perUserPrice > 0 && (
                                <>
                                  {plan.pricing[0].basePrice > 0 && " + "}$
                                  {plan.pricing[0].perUserPrice}/user
                                </>
                              )}
                            {plan.pricing[0].basePrice === 0 &&
                              !plan.pricing[0].isPerUserPricing &&
                              "Free"}
                          </div>
                          <div className="text-sm text-muted-foreground capitalize">
                            per {plan.pricing[0].interval}
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {plan.pricing.map((pricing, index) => (
                            <div
                              key={index}
                              className={`flex items-center justify-between p-3 rounded-lg border ${
                                pricing.interval === "month"
                                  ? "bg-primary/5 border-primary/20"
                                  : "bg-muted/50 border-muted"
                              }`}
                            >
                              <div>
                                <div className="font-semibold text-lg">
                                  {pricing.basePrice > 0 &&
                                    `$${pricing.basePrice}`}
                                  {pricing.isPerUserPricing &&
                                    pricing.perUserPrice > 0 && (
                                      <>
                                        {pricing.basePrice > 0 && " + "}$
                                        {pricing.perUserPrice}/user
                                      </>
                                    )}
                                  {pricing.basePrice === 0 &&
                                    !pricing.isPerUserPricing &&
                                    "Free"}
                                </div>
                                <div className="text-sm text-muted-foreground capitalize">
                                  per {pricing.interval}
                                </div>
                              </div>
                              {pricing.interval === "year" &&
                                plan.pricing.length > 1 && (
                                  <Badge
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    Save{" "}
                                    {Math.round(
                                      (((plan.pricing.find(
                                        (p) => p.interval === "month",
                                      )?.basePrice || 0) *
                                        12 -
                                        pricing.basePrice) /
                                        ((plan.pricing.find(
                                          (p) => p.interval === "month",
                                        )?.basePrice || 0) *
                                          12)) *
                                        100,
                                    )}
                                    %
                                  </Badge>
                                )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <ul className="space-y-1 mb-4">
                      {plan.features.slice(0, 4).map((feature, index) => (
                        <li key={index} className="text-sm flex items-center">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 shrink-0"></span>
                          {feature}
                        </li>
                      ))}
                      {plan.features.length > 4 && (
                        <li className="text-sm text-muted-foreground">
                          +{plan.features.length - 4} more features
                        </li>
                      )}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="gateways" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Gateway Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Stripe</Label>
                  <p className="text-sm text-muted-foreground">
                    Accept payments via Stripe
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">PayPal</Label>
                  <p className="text-sm text-muted-foreground">
                    Accept payments via PayPal
                  </p>
                </div>
                <Switch />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stripe-key">Stripe Secret Key</Label>
                <Input
                  id="stripe-key"
                  type="password"
                  placeholder="sk_test_..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="paypal-key">PayPal Client ID</Label>
                <Input id="paypal-key" placeholder="Your PayPal Client ID" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tax" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tax & VAT Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="default-tax">Default Tax Rate (%)</Label>
                  <Input id="default-tax" type="number" defaultValue="8.25" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tax-region">Region</Label>
                  <Select defaultValue="us">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="eu">European Union</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Tax Rules</Label>
                <Textarea placeholder="Configure region-specific tax rules..." />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoicing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Invoicing & Receipts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">
                    Automatic Invoice Generation
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Generate invoices automatically on billing cycle
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Email Receipts</Label>
                  <p className="text-sm text-muted-foreground">
                    Send email receipts to customers
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <Label htmlFor="invoice-prefix">Invoice Number Prefix</Label>
                <Input id="invoice-prefix" defaultValue="INV-" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function PlanForm({
  plan,
  onClose,
  onSave,
}: {
  plan: Plan | null;
  onClose: () => void;
  onSave: (newPlan: Plan) => void;
}) {
  const [formData, setFormData] = useState({
    name: plan?.name || "",
    description: plan?.description || "",
    pricing: plan?.pricing || [
      {
        interval: "month" as const,
        basePrice: 0,
        perUserPrice: 0,
        isPerUserPricing: false,
      },
    ],
    currency: plan?.currency || "USD",
    features: plan?.features || [""],
    limits: plan?.limits || { pets: 0, users: 0, storage: 0, bookings: 0 },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newPlan: Plan = {
      id: plan?.id || `plan-${Date.now()}`,
      name: formData.name,
      description: formData.description,
      pricing: formData.pricing,
      currency: formData.currency,
      features: formData.features.filter((f) => f.trim() !== ""),
      limits: formData.limits,
      status: plan?.status || "active",
      createdAt: plan?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onSave(newPlan);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Plan Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="currency">Currency</Label>
          <Select
            value={formData.currency}
            onValueChange={(value) =>
              setFormData({ ...formData, currency: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="EUR">EUR</SelectItem>
              <SelectItem value="CAD">CAD</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
      </div>

      <div className="space-y-2">
        <Label>Pricing</Label>
        {formData.pricing.map((pricing, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Select
              value={pricing.interval}
              onValueChange={(value) => {
                const newPricing = [...formData.pricing];
                newPricing[index].interval = value as
                  | "month"
                  | "quarter"
                  | "year";
                setFormData({ ...formData, pricing: newPricing });
              }}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Monthly</SelectItem>
                <SelectItem value="quarter">Quarterly</SelectItem>
                <SelectItem value="year">Yearly</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex space-x-2">
              <Input
                type="number"
                placeholder="Base Price"
                value={pricing.basePrice}
                onChange={(e) => {
                  const newPricing = [...formData.pricing];
                  newPricing[index].basePrice = Number(e.target.value);
                  setFormData({ ...formData, pricing: newPricing });
                }}
                className="w-[100px]"
              />
              <div className="flex items-center space-x-2">
                <Switch
                  checked={pricing.isPerUserPricing}
                  onCheckedChange={(checked) => {
                    const newPricing = [...formData.pricing];
                    newPricing[index].isPerUserPricing = checked;
                    setFormData({ ...formData, pricing: newPricing });
                  }}
                />
                {pricing.isPerUserPricing && (
                  <Input
                    type="number"
                    placeholder="Per User Price"
                    value={pricing.perUserPrice}
                    onChange={(e) => {
                      const newPricing = [...formData.pricing];
                      newPricing[index].perUserPrice = Number(e.target.value);
                      setFormData({ ...formData, pricing: newPricing });
                    }}
                    className="w-[120px]"
                  />
                )}
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                const newPricing = formData.pricing.filter(
                  (_, i) => i !== index,
                );
                setFormData({ ...formData, pricing: newPricing });
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            setFormData({
              ...formData,
              pricing: [
                ...formData.pricing,
                {
                  interval: "month",
                  basePrice: 0,
                  perUserPrice: 0,
                  isPerUserPricing: false,
                },
              ],
            })
          }
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Pricing Option
        </Button>
      </div>
      <div className="space-y-2">
        <Label>Status</Label>
        <Select defaultValue="active">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Usage Limits</Label>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="pets">Pets (-1 for unlimited)</Label>
            <Input
              id="pets"
              type="number"
              value={formData.limits.pets}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  limits: { ...formData.limits, pets: Number(e.target.value) },
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="users">Users (-1 for unlimited)</Label>
            <Input
              id="users"
              type="number"
              value={formData.limits.users}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  limits: { ...formData.limits, users: Number(e.target.value) },
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="storage">Storage (GB, -1 for unlimited)</Label>
            <Input
              id="storage"
              type="number"
              value={formData.limits.storage}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  limits: {
                    ...formData.limits,
                    storage: Number(e.target.value),
                  },
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bookings">Bookings (-1 for unlimited)</Label>
            <Input
              id="bookings"
              type="number"
              value={formData.limits.bookings}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  limits: {
                    ...formData.limits,
                    bookings: Number(e.target.value),
                  },
                })
              }
            />
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <Label>Features</Label>
        {formData.features.map((feature, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Input
              value={feature}
              onChange={(e) => {
                const newFeatures = [...formData.features];
                newFeatures[index] = e.target.value;
                setFormData({ ...formData, features: newFeatures });
              }}
              placeholder="Enter feature..."
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                const newFeatures = formData.features.filter(
                  (_, i) => i !== index,
                );
                setFormData({ ...formData, features: newFeatures });
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            setFormData({ ...formData, features: [...formData.features, ""] })
          }
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Feature
        </Button>
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">{plan ? "Update Plan" : "Create Plan"}</Button>
      </div>
    </form>
  );
}
