"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
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
import { UserModal } from "@/components/modals/UserModal";
import {
  Download,
  User,
  Mail as MailIcon,
  Shield,
  Building,
  Clock,
  Eye,
} from "lucide-react";

const exportUsersToCSV = (usersData: typeof users) => {
  const headers = [
    "ID",
    "Name",
    "Email",
    "Role",
    "Facility",
    "Status",
    "Last Login",
    "Phone",
    "Hire Date",
    "Permissions",
    "Pets Count",
  ];

  const csvContent = [
    headers.join(","),
    ...usersData.map((user: (typeof users)[number]) =>
      [
        user.id,
        `"${user.name.replace(/"/g, '""')}"`,
        user.email,
        user.role,
        `"${user.facility.replace(/"/g, '""')}"`,
        user.status,
        user.lastLogin,
        user.phone || "",
        user.hireDate,
        `"${user.permissions.join("; ")}"`,
        user.pets.length,
      ].join(","),
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `users_export_${new Date().toISOString().split("T")[0]}.csv`,
  );
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default function UsersPage() {
  const t = useTranslations("users");
  const tCommon = useTranslations("common");
  const tStatus = useTranslations("status");
  const tRoles = useTranslations("userRoles");
  const [selectedUser, setSelectedUser] = useState<(typeof users)[0] | null>(
    null,
  );

  const columns: ColumnDef<(typeof users)[0]>[] = [
    {
      key: "name",
      label: t("userName"),
      icon: User,
      defaultVisible: true,
    },
    {
      key: "email",
      label: t("email"),
      icon: MailIcon,
      defaultVisible: true,
    },
    {
      key: "role",
      label: t("role"),
      icon: Shield,
      defaultVisible: true,
      render: (user) => <StatusBadge type="role" value={user.role} />,
    },
    {
      key: "facility",
      label: t("facility"),
      icon: Building,
      defaultVisible: true,
    },
    {
      key: "status",
      label: tCommon("status"),
      icon: Shield,
      defaultVisible: true,
      render: (user) => <StatusBadge type="status" value={user.status} />,
    },
    {
      key: "lastLogin",
      label: t("lastLogin"),
      icon: Clock,
      defaultVisible: true,
    },
  ];

  const filters: FilterDef[] = [
    {
      key: "status",
      label: tCommon("status"),
      options: [
        { value: "all", label: tCommon("all") + " " + tCommon("status") },
        { value: "active", label: tStatus("active") },
        { value: "inactive", label: tStatus("inactive") },
      ],
    },
    {
      key: "role",
      label: t("role"),
      options: [
        { value: "all", label: tCommon("all") + " " + t("role") },
        { value: "Super Admin", label: tRoles("superAdmin") },
        { value: "Facility Admin", label: tRoles("facilityAdmin") },
        { value: "Manager", label: tRoles("manager") },
        { value: "Staff", label: tRoles("staff") },
        { value: "Customer", label: tRoles("customer") },
      ],
    },
    {
      key: "facility",
      label: t("facility"),
      options: [
        { value: "all", label: tCommon("all") + " " + tCommon("facilities") },
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
        <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => exportUsersToCSV(users)}>
            <Download className="mr-2 h-4 w-4" />
            {tCommon("export")}
          </Button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("totalUsers")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">
              {users.filter((u) => u.status === "active").length}{" "}
              {tStatus("active").toLowerCase()}
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
            <CardTitle className="text-sm font-medium">
              {t("adminUsers")}
            </CardTitle>
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
        searchPlaceholder={t("searchUsers")}
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
                {selectedUser?.name} - {t("userDetails")}
              </DialogTitle>
            </DialogHeader>
            {selectedUser && <UserModal user={selectedUser} />}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
