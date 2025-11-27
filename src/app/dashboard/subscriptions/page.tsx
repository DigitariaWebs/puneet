import { SubscriptionAnalytics } from "@/components/subscriptions/SubscriptionAnalytics";
import { FacilitySubscriptionsTable } from "@/components/subscriptions/FacilitySubscriptionsTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SubscriptionTiersGrid } from "@/components/subscriptions/SubscriptionTiersGrid";
import { ModulesManagement } from "@/components/subscriptions/ModulesManagement";

export default function SubscriptionsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Subscription & Module Management
        </h1>
        <p className="text-muted-foreground">
          Manage subscription tiers, modules, and facility subscriptions
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="subscriptions">
            Facility Subscriptions
          </TabsTrigger>
          <TabsTrigger value="tiers">Subscription Tiers</TabsTrigger>
          <TabsTrigger value="modules">Modules</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <SubscriptionAnalytics />
        </TabsContent>

        <TabsContent value="subscriptions" className="space-y-6">
          <FacilitySubscriptionsTable />
        </TabsContent>

        <TabsContent value="tiers" className="space-y-6">
          <SubscriptionTiersGrid />
        </TabsContent>

        <TabsContent value="modules" className="space-y-6">
          <ModulesManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}
