"use client";
// Next.js requires error.tsx to be a Client Component
import { useEffect } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{ background: "var(--bg-base)" }}
    >
      <div className="glass-card p-10 max-w-md w-full text-center flex flex-col items-center gap-6">
        {/* Animated error icon */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(239,68,68,0.2), rgba(239,68,68,0.05))",
            border: "1px solid rgba(239,68,68,0.3)",
          }}
        >
          <AlertTriangle size={32} color="#ef4444" />
        </div>

        <div className="flex flex-col gap-2">
          <h1
            className="text-xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            Database Connection Failed
          </h1>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Could not fetch course data from Supabase. Check your environment
            variables and try again.
          </p>
        </div>

        <button
          onClick={reset}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90 active:scale-95"
          style={{
            background: "linear-gradient(135deg, var(--accent-purple), var(--accent-blue))",
            color: "white",
          }}
        >
          <RefreshCcw size={16} />
          Try Again
        </button>
      </div>
    </div>
  );
}
