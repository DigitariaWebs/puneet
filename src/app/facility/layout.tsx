import { FacilitySidebar } from "@/components/layout/facility-admin-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function FacilityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <FacilitySidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-linear-to-r from-background to-muted/20 px-6 backdrop-blur-sm">
          <SidebarTrigger className="-ml-1 hover:bg-accent/50 rounded-lg transition-colors" />
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
