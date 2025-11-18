"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/DataTable";
import { CreditCard, Receipt, FileText } from "lucide-react";

interface BillingRecord {
  id: number;
  date: string;
  description: string;
  amount: number;
  status: string;
  invoice: string;
}

type BillingRecordType = Record<string, unknown>;

interface BillingSectionProps {
  facility: {
    plan: string;
    subscriptionEnd: string;
  };
  billingHistory: BillingRecord[];
  view: "current" | "history";
  onViewChange: (view: "current" | "history") => void;
}

export function BillingSection({
  facility,
  billingHistory,
  view,
  onViewChange,
}: BillingSectionProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Billing Information
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant={view === "current" ? "default" : "outline"}
              size="sm"
              onClick={() => onViewChange("current")}
            >
              <Receipt className="h-4 w-4 mr-2" />
              Current
            </Button>
            <Button
              variant={view === "history" ? "default" : "outline"}
              size="sm"
              onClick={() => onViewChange("history")}
            >
              <FileText className="h-4 w-4 mr-2" />
              History
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {view === "current" ? (
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h4 className="font-medium">Current Plan</h4>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="capitalize">
                    {facility.plan}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    $
                    {facility.plan === "Premium"
                      ? "299.99"
                      : facility.plan === "Basic"
                        ? "149.99"
                        : "49.99"}
                    /month
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Next Billing Date</h4>
                <p className="text-sm">{facility.subscriptionEnd || "N/A"}</p>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h4 className="font-medium">Payment Method</h4>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span className="text-sm">•••• •••• •••• 4242</span>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Billing Address</h4>
                <p className="text-sm text-muted-foreground">
                  123 Main St
                  <br />
                  Cityville, ST 12345
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <DataTable
              data={billingHistory as unknown as BillingRecordType[]}
              columns={[
                {
                  key: "date",
                  label: "Date",
                  render: (bill: BillingRecordType) =>
                    new Date(bill.date as string).toLocaleDateString(),
                },
                {
                  key: "description",
                  label: "Description",
                },
                {
                  key: "amount",
                  label: "Amount",
                  render: (bill: BillingRecordType) =>
                    `$${(bill.amount as number).toFixed(2)}`,
                },
                {
                  key: "status",
                  label: "Status",
                  render: (bill: BillingRecordType) => (
                    <Badge
                      variant={
                        (bill.status as string) === "paid"
                          ? "default"
                          : "secondary"
                      }
                      className="capitalize"
                    >
                      {bill.status as string}
                    </Badge>
                  ),
                },
                {
                  key: "invoice",
                  label: "Invoice",
                  render: (bill: BillingRecordType) => (
                    <Button variant="link" size="sm" className="p-0 h-auto">
                      {bill.invoice as string}
                    </Button>
                  ),
                },
              ]}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
