"use client";

import { useState } from "react";
import { facilities } from "@/data/facilities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Plus,
  Search,
  Filter,
  Download,
  Mail,
  Building,
  CreditCard,
  Shield,
  Users,
  UserCheck,
  MapPin,
  Calendar,
  Clock,
  Columns,
  Eye,
} from "lucide-react";

type VisibleColumns = {
  status: boolean;
  plan: boolean;
  users: boolean;
  activeClients: boolean;
  locations: boolean;
  dayJoined: boolean;
  subscriptionEnd: boolean;
};

const columnDefinitions = [
  { key: "status", label: "Status", icon: Shield },
  { key: "plan", label: "Plan", icon: CreditCard },
  { key: "users", label: "Users", icon: Users },
  { key: "activeClients", label: "Active Clients", icon: UserCheck },
  { key: "locations", label: "Locations", icon: MapPin },
  { key: "dayJoined", label: "Day Joined", icon: Calendar },
  { key: "subscriptionEnd", label: "Subscription End", icon: Clock },
];

export default function FacilitiesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleColumns, setVisibleColumns] = useState<VisibleColumns>({
    status: true,
    plan: true,
    users: true,
    activeClients: true,
    locations: true,
    dayJoined: true,
    subscriptionEnd: true,
  });
  const itemsPerPage = 10;

  const filteredFacilities = facilities.filter((facility) => {
    const matchesSearch = facility.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || facility.status === statusFilter;
    const matchesPlan = planFilter === "all" || facility.plan === planFilter;
    return matchesSearch && matchesStatus && matchesPlan;
  });

  const totalPages = Math.ceil(filteredFacilities.length / itemsPerPage);
  const paginatedFacilities = filteredFacilities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Facilities Management
        </h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline">
            <Mail className="mr-2 h-4 w-4" />
            Notify All
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Facility
          </Button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Facilities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{facilities.length}</div>
            <p className="text-xs text-muted-foreground">
              {facilities.filter((f) => f.status === "active").length} active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Premium Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {facilities.filter((f) => f.plan === "Premium").length}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round(
                (facilities.filter((f) => f.plan === "Premium").length /
                  facilities.length) *
                  100,
              )}
              % of total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {facilities.reduce((sum, f) => sum + f.users, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all facilities
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Users/Facility
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                facilities.reduce((sum, f) => sum + f.users, 0) /
                  facilities.length,
              )}
            </div>
            <p className="text-xs text-muted-foreground">Per active facility</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search facilities..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
        <Select value={planFilter} onValueChange={setPlanFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Plan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Plans</SelectItem>
            <SelectItem value="Free">Free</SelectItem>
            <SelectItem value="Basic">Basic</SelectItem>
            <SelectItem value="Premium">Premium</SelectItem>
            <SelectItem value="Enterprise">Enterprise</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Columns className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="space-y-1">
            <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {columnDefinitions.map((col) => (
              <DropdownMenuItem
                key={col.key}
                className="p-0"
                onSelect={(e) => {
                  e.preventDefault();
                }}
              >
                <Label className="hover:bg-primary/30 flex items-center gap-2 rounded-md border p-2 has-aria-checked:bg-accent/5 w-full cursor-pointer">
                  <Checkbox
                    checked={
                      (visibleColumns as Record<string, boolean>)[col.key]
                    }
                    onCheckedChange={(checked) =>
                      setVisibleColumns((prev) => ({
                        ...prev,
                        [col.key]: checked,
                      }))
                    }
                    className="data-[state=checked]:border-accent data-[state=checked]:bg-accent data-[state=checked]:text-primary-foreground mt-0.5"
                  />
                  <div className="grid gap-1 font-normal">
                    <p className="text-xs leading-none font-medium flex items-center gap-2">
                      <col.icon className="h-3.5 w-3.5" />
                      {col.label}
                    </p>
                  </div>
                </Label>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Facilities Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Building className="mr-2 h-4 w-4 inline" />
                Facility Name
              </TableHead>
              {visibleColumns.status && (
                <TableHead>
                  <Shield className="mr-2 h-4 w-4 inline" />
                  Status
                </TableHead>
              )}
              {visibleColumns.plan && (
                <TableHead>
                  <CreditCard className="mr-2 h-4 w-4 inline" />
                  Plan
                </TableHead>
              )}
              {visibleColumns.users && (
                <TableHead>
                  <Users className="mr-2 h-4 w-4 inline" />
                  Users
                </TableHead>
              )}
              {visibleColumns.activeClients && (
                <TableHead>
                  <UserCheck className="mr-2 h-4 w-4 inline" />
                  Active Clients
                </TableHead>
              )}
              {visibleColumns.locations && (
                <TableHead>
                  <MapPin className="mr-2 h-4 w-4 inline" />
                  Locations
                </TableHead>
              )}
              {visibleColumns.dayJoined && (
                <TableHead>
                  <Calendar className="mr-2 h-4 w-4 inline" />
                  Day Joined
                </TableHead>
              )}
              {visibleColumns.subscriptionEnd && (
                <TableHead>
                  <Clock className="mr-2 h-4 w-4 inline" />
                  Subscription End
                </TableHead>
              )}
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedFacilities.map((facility) => (
              <TableRow key={facility.id}>
                <TableCell className="font-medium">{facility.name}</TableCell>
                {visibleColumns.status && (
                  <TableCell>
                    <Badge
                      variant={
                        facility.status === "active" ? "default" : "secondary"
                      }
                    >
                      {facility.status}
                    </Badge>
                  </TableCell>
                )}
                {visibleColumns.plan && <TableCell>{facility.plan}</TableCell>}
                {visibleColumns.users && (
                  <TableCell>{facility.users}</TableCell>
                )}
                {visibleColumns.activeClients && (
                  <TableCell>{facility.activeClients}</TableCell>
                )}
                {visibleColumns.locations && (
                  <TableCell>{facility.locations}</TableCell>
                )}
                {visibleColumns.dayJoined && (
                  <TableCell>{facility.dayJoined}</TableCell>
                )}
                {visibleColumns.subscriptionEnd && (
                  <TableCell>{facility.subscriptionEnd || "N/A"}</TableCell>
                )}
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  className={
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => setCurrentPage(page)}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ),
              )}
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
