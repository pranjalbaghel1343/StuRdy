import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";
import ConstellationBg from "@/components/ConstellationBg";
import { Bell } from "lucide-react";

// wrapper for all the inner pages
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen relative" style={{ background: "var(--bg-base)" }}>
      <ConstellationBg />
      <Sidebar />
      <div className="hidden lg:block w-4 flex-shrink-0" aria-hidden="true" />

      <main className="flex-1 flex flex-col min-w-0 pb-20 lg:pb-0 relative z-10">
        {/* header at the top */}
        <header
          className="sticky top-0 z-10 flex items-center justify-end gap-3 px-6 lg:px-8 py-4"
          style={{
            background: "rgba(8,8,16,0.95)",
            borderBottom: "1px solid var(--border-subtle)",
          }}
        >
          <button
            className="relative w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-subtle)" }}
            aria-label="Notifications"
          >
            <Bell size={16} color="var(--text-secondary)" />
            <span
              className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
              style={{ background: "#ef4444", boxShadow: "0 0 6px rgba(239,68,68,0.8)" }}
            />
          </button>
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm"
            style={{
              background: "linear-gradient(135deg, var(--accent-purple), var(--accent-blue))",
              color: "white",
              boxShadow: "0 0 12px rgba(139,92,246,0.4)",
            }}
          >
            D
          </div>
        </header>

        {children}
      </main>

      <MobileNav />
    </div>
  );
}
