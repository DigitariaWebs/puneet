import { AppSidebar } from "@/components/layout/super-admin-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b bg-linear-to-r from-background to-muted/20 px-6 backdrop-blur-sm">
          <SidebarTrigger className="-ml-1 hover:bg-accent/50 rounded-lg transition-colors" />
          <LanguageSwitcher />
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
