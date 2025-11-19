"use client";

import { useState } from "react";
import { users } from "@/data/users";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { DataTable, ColumnDef, FilterDef } from "@/components/DataTable";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserModal } from "@/components/UserModal";
import {
  Plus,
  Download,
  Mail,
  User,
  Mail as MailIcon,
  Shield,
  Building,
  Clock,
  Eye,
} from "lucide-react";

export default function UsersPage() {
  const [selectedUser, setSelectedUser] = useState<(typeof users)[0] | null>(
    null,
  );

  const columns: ColumnDef<(typeof users)[0]>[] = [
    {
      key: "name",
      label: "Name",
      icon: User,
      defaultVisible: true,
    },
    {
      key: "email",
      label: "Email",
      icon: MailIcon,
      defaultVisible: true,
    },
    {
      key: "role",
      label: "Role",
      icon: Shield,
      defaultVisible: true,
      render: (user) => <StatusBadge type="role" value={user.role} />,
    },
    {
      key: "facility",
      label: "Facility",
      icon: Building,
      defaultVisible: true,
    },
    {
      key: "status",
      label: "Status",
      icon: Shield,
      defaultVisible: true,
      render: (user) => <StatusBadge type="status" value={user.status} />,
    },
    {
      key: "lastLogin",
      label: "Last Login",
      icon: Clock,
      defaultVisible: true,
    },
  ];

  const filters: FilterDef[] = [
    {
      key: "status",
      label: "Status",
      options: [
        { value: "all", label: "All Status" },
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
      ],
    },
    {
      key: "role",
      label: "Role",
      options: [
        { value: "all", label: "All Roles" },
        { value: "Admin", label: "Admin" },
        { value: "Manager", label: "Manager" },
        { value: "Staff", label: "Staff" },
      ],
    },
    {
      key: "facility",
      label: "Facility",
      options: [
        { value: "all", label: "All Facilities" },
        ...Array.from(new Set(users.map((u) => u.facility))).map((f) => ({
          value: f,
          label: f,
        })),
      ],
    },
  ];

  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Users Management</h2>
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
            Add User
          </Button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">
              {users.filter((u) => u.status === "active").length} active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admins</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter((u) => u.role === "Admin").length}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round(
                (users.filter((u) => u.role === "Admin").length /
                  users.length) *
                  100,
              )}
              % of total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter((u) => u.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground">Logged in recently</p>
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
                users.length /
                  Array.from(new Set(users.map((u) => u.facility))).length,
              )}
            </div>
            <p className="text-xs text-muted-foreground">Per facility</p>
          </CardContent>
        </Card>
      </div>

      <DataTable
        data={users}
        columns={columns}
        filters={filters}
        searchKey="name"
        searchPlaceholder="Search users..."
        itemsPerPage={10}
        actions={(user) => (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedUser(user)}
          >
            <Eye className="h-4 w-4" />
          </Button>
        )}
      />
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="min-w-5xl max-h-[90vh] flex flex-col p-0">
          <div className="p-6 flex-1 overflow-y-auto">
            <DialogHeader className="mb-0">
              <DialogTitle className="sr-only">
                {selectedUser?.name} - Facility Details
              </DialogTitle>
            </DialogHeader>
            {selectedUser && <UserModal user={selectedUser} />}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
