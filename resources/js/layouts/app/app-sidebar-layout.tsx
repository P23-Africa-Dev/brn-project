import { AppContent } from "@/components/app-content";
import { AppShell } from "@/components/app-shell";
import { AppSidebar } from "@/components/app-sidebar";


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="mx-auto max-w-[2560px]">
            <AppShell defaultSidebarOpen={true}>
                <div className="flex    ">
                    <AppSidebar />
                    <AppContent>{children}</AppContent>
                </div>
            </AppShell>
        </div>
    );
}
