"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, MapPin, Calendar } from "lucide-react";

interface User {
  person: { name: string; email: string };
  role: string;
}

interface Client {
  person: { name: string; email: string; phone?: string };
  status: string;
}

interface Location {
  name: string;
  address: string;
  services: string[];
}

interface StatisticsCardsProps {
  facility: {
    usersList: User[];
    clients: Client[];
    locationsList: Location[];
    dayJoined: string;
  };
}

export function StatisticsCards({ facility }: StatisticsCardsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-linear-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">
            Total Users
          </CardTitle>
          <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-blue-900 dark:text-blue-100">
            {facility.usersList.length}
          </div>
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
            Staff members
          </p>
        </CardContent>
      </Card>
      <Card className="bg-linear-to-r from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">
            Active Clients
          </CardTitle>
          <UserCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-900 dark:text-green-100">
            {facility.clients.filter((c) => c.status === "active").length}
          </div>
          <p className="text-xs text-green-600 dark:text-green-400 mt-1">
            Currently active
          </p>
        </CardContent>
      </Card>
      <Card className="bg-linear-to-r from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">
            Locations
          </CardTitle>
          <MapPin className="h-5 w-5 text-purple-600 dark:text-purple-400" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">
            {facility.locationsList.length}
          </div>
          <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
            Service locations
          </p>
        </CardContent>
      </Card>
      <Card className="bg-linear-to-r from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 border-amber-200 dark:border-amber-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-amber-700 dark:text-amber-300">
            Member Since
          </CardTitle>
          <Calendar className="h-5 w-5 text-amber-600 dark:text-amber-400" />
        </CardHeader>
        <CardContent>
          <div className="text-lg font-bold text-amber-900 dark:text-amber-100">
            {facility.dayJoined}
          </div>
          <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
            Joined platform
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
