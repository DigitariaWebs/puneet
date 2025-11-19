"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/DataTable";
import { CreditCard, Receipt, FileText } from "lucide-react";

interface ClientBillingRecord {
  id: number;
  date: string;
  description: string;
  amount: number;
  status: string;
  invoice: string;
}

type ClientBillingRecordType = Record<string, unknown>;

interface ClientBillingSectionProps {
  client: {
    name: string;
    email: string;
  };
  billingHistory: ClientBillingRecord[];
  view: "current" | "history";
  onViewChange: (view: "current" | "history") => void;
}

export function ClientBillingSection({
  client,
  billingHistory,
  view,
  onViewChange,
}: ClientBillingSectionProps) {
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
                <h4 className="font-medium">Outstanding Balance</h4>
                <p className="text-sm">$0.00</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Next Payment Due</h4>
                <p className="text-sm">No upcoming payments</p>
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
                <h4 className="font-medium">Billing Email</h4>
                <p className="text-sm">{client.email}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <DataTable
              data={billingHistory as unknown as ClientBillingRecordType[]}
              columns={[
                {
                  key: "date",
                  label: "Date",
                  render: (bill: ClientBillingRecordType) =>
                    new Date(bill.date as string).toLocaleDateString(),
                },
                {
                  key: "description",
                  label: "Description",
                },
                {
                  key: "amount",
                  label: "Amount",
                  render: (bill: ClientBillingRecordType) =>
                    `$${(bill.amount as number).toFixed(2)}`,
                },
                {
                  key: "status",
                  label: "Status",
                  render: (bill: ClientBillingRecordType) => (
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
                  render: (bill: ClientBillingRecordType) => (
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
