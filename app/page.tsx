// NO "use client" at the top — this is a Next.js Server Component.
// It runs on the server, fetches data from Supabase, and sends HTML to the browser.
// The browser NEVER sees your Supabase connection — it's 100% server-side.

import { supabase } from "@/lib/supabase";
import type { Course } from "@/types";
import Sidebar from "@/components/Sidebar";
import BentoGrid from "@/components/BentoGrid";
import MobileNav from "@/components/MobileNav";
import ConstellationBg from "@/components/ConstellationBg";
import { Bell, Search } from "lucide-react";

// Fetch courses from Supabase (runs on server only)
async function getCourses(): Promise<Course[]> {
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    // Throwing here triggers app/error.tsx automatically
    throw new Error(`Supabase fetch failed: ${error.message}`);
  }

  return data ?? [];
}

export default async function DashboardPage() {
  // This await runs on the server — loading.tsx shows in the browser meanwhile
  const courses = await getCourses();

  return (
    <div
      className="flex min-h-screen relative"
      style={{ background: "var(--bg-base)" }}
    >
      {/* ── Constellation background (fixed, behind everything) ── */}
      <ConstellationBg />

      {/* ── Sidebar (desktop) ─────────────────────────── */}
      <Sidebar />

      {/* ── Gap between sidebar and content ──────────── */}
      <div className="hidden lg:block w-4 flex-shrink-0" aria-hidden="true" />

      {/* main content area */}
      <main className="flex-1 flex flex-col min-w-0 pb-20 lg:pb-0 relative z-10">
        {/* top navigation bar */}
        <header
          className="sticky top-0 z-10 flex items-center gap-4 px-6 lg:px-8 py-4"
          style={{
            background: "rgba(8,8,16,0.95)",
            borderBottom: "1px solid var(--border-subtle)",
          }}
        >
          {/* Search bar */}
          <div
            className="flex items-center gap-2 flex-1 max-w-sm px-3 py-2 rounded-xl"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid var(--border-subtle)",
            }}
          >
            <Search size={15} color="var(--text-muted)" />
            <input
              type="search"
              placeholder="Search courses..."
              className="bg-transparent border-none outline-none text-sm flex-1"
              style={{ color: "var(--text-primary)" }}
              aria-label="Search courses"
            />
          </div>

          {/* Notification bell */}
          <button
            className="relative w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid var(--border-subtle)",
            }}
            aria-label="Notifications"
          >
            <Bell size={16} color="var(--text-secondary)" />
            {/* Red dot badge */}
            <span
              className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
              style={{ background: "#ef4444", boxShadow: "0 0 6px rgba(239,68,68,0.8)" }}
              aria-hidden="true"
            />
          </button>

          {/* Avatar */}
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm"
            style={{
              background: "linear-gradient(135deg, var(--accent-purple), var(--accent-blue))",
              color: "white",
              boxShadow: "0 0 12px rgba(139,92,246,0.4)",
            }}
            aria-label="User avatar"
          >
            D
          </div>
        </header>

        {/* dashboard grid layout */}
        <section className="flex-1 p-6 lg:p-8">
          {/* heading */}
          <div className="mb-6">
            <h2
              className="text-lg font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              Overview
            </h2>
            <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>
              {courses.length} active course{courses.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Bento grid receives server-fetched courses */}
          <BentoGrid courses={courses} />
        </section>
      </main>

      {/* ── Mobile bottom nav ─────────────────────────── */}
      <MobileNav />
    </div>
  );
}
