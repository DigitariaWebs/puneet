"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Building, Heart, Mail } from "lucide-react";

interface ClientStatisticsCardsProps {
  client: {
    name: string;
    email: string;
    phone?: string;
    status: string;
    facility: string;
    pets: { name: string; type: string; age: number }[];
  };
}

export function ClientStatisticsCards({ client }: ClientStatisticsCardsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-linear-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">
            Status
          </CardTitle>
          <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
            {client.status}
          </div>
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
            Account status
          </p>
        </CardContent>
      </Card>
      <Card className="bg-linear-to-r from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">
            Facility
          </CardTitle>
          <Building className="h-5 w-5 text-green-600 dark:text-green-400" />
        </CardHeader>
        <CardContent>
          <div className="text-lg font-bold text-green-900 dark:text-green-100">
            {client.facility}
          </div>
          <p className="text-xs text-green-600 dark:text-green-400 mt-1">
            Associated facility
          </p>
        </CardContent>
      </Card>
      <Card className="bg-linear-to-r from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">
            Pets
          </CardTitle>
          <Heart className="h-5 w-5 text-purple-600 dark:text-purple-400" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">
            {client.pets.length}
          </div>
          <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
            Registered pets
          </p>
        </CardContent>
      </Card>
      <Card className="bg-linear-to-r from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 border-amber-200 dark:border-amber-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-amber-700 dark:text-amber-300">
            Contact
          </CardTitle>
          <Mail className="h-5 w-5 text-amber-600 dark:text-amber-400" />
        </CardHeader>
        <CardContent>
          <div className="text-lg font-bold text-amber-900 dark:text-amber-100">
            {client.email}
          </div>
          <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
            Primary email
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
