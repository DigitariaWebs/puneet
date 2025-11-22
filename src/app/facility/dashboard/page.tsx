import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Users, PawPrint, DollarSign, TrendingUp, Clock } from "lucide-react";
import { facilities } from "@/data/facilities";

export default function FacilityDashboard() {
  // Static facility ID for now (would come from user token in production)
  const facilityId = 11;
  const facility = facilities.find(f => f.id === facilityId);

  if (!facility) {
    return <div>Facility not found</div>;
  }

  // Mock data for dashboard
  const metrics = {
    totalClients: facility.clients.length,
    activeClients: facility.clients.filter(c => c.status === "active").length,
    totalBookings: 45, // Mock
    revenue: 12500, // Mock
    upcomingBookings: 8, // Mock
    staffCount: facility.usersList.length,
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">{facility.name} Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Badge variant={facility.status === "active" ? "default" : "secondary"}>
            {facility.status}
          </Badge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalClients}</div>
            <p className="text-xs text-muted-foreground">
              {metrics.activeClients} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalBookings}</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${metrics.revenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Staff</CardTitle>
            <PawPrint className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.staffCount}</div>
            <p className="text-xs text-muted-foreground">
              Active members
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="space-y-4">
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                <div className="ml-2 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    New booking for Max
                  </p>
                  <p className="text-sm text-muted-foreground">
                    2 hours ago
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                <div className="ml-2 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Client Alice Johnson checked in
                  </p>
                  <p className="text-sm text-muted-foreground">
                    4 hours ago
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <PawPrint className="mr-2 h-4 w-4" />
                <div className="ml-2 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Grooming completed for Bella
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Yesterday
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start" variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              New Booking
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Add Client
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <PawPrint className="mr-2 h-4 w-4" />
              Register Pet
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <TrendingUp className="mr-2 h-4 w-4" />
              View Reports
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
