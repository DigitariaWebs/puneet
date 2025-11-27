import { FacilitySubscriptionsTable } from "@/components/subscriptions/FacilitySubscriptionsTable";
import { SubscriptionAnalytics } from "@/components/subscriptions/SubscriptionAnalytics";

export default function TrackingPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Subscription Tracking & Analytics
        </h1>
        <p className="text-muted-foreground">
          Monitor facility subscriptions, usage, and identify opportunities
        </p>
      </div>

      <SubscriptionAnalytics />

      <div className="pt-6">
        <FacilitySubscriptionsTable />
      </div>
    </div>
  );
}
