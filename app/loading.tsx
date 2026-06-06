import SkeletonCard from "@/components/SkeletonCard";

// Next.js automatically shows this file while the page.tsx Server Component is fetching data
export default function Loading() {
  return (
    <div className="flex min-h-screen" style={{ background: "var(--bg-base)" }}>
      {/* Sidebar skeleton */}
      <aside
        className="hidden lg:flex flex-col gap-3 p-4 w-64 border-r"
        style={{ borderColor: "var(--border-subtle)" }}
      >
        {/* Logo */}
        <div className="skeleton-shimmer h-9 w-9 rounded-xl mb-6" />

        {/* Nav items */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 px-3 py-2">
            <div className="skeleton-shimmer h-5 w-5 rounded-lg flex-shrink-0" />
            <div className="skeleton-shimmer h-4 w-24 rounded-lg" />
          </div>
        ))}
      </aside>

      {/* Main content skeleton */}
      <main className="flex-1 p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="skeleton-shimmer h-6 w-48 rounded-lg" />
          <div className="skeleton-shimmer h-9 w-9 rounded-full" />
        </div>

        {/* Bento grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {/* Hero tile - spans 2 cols */}
          <div
            className="skeleton-shimmer rounded-2xl md:col-span-2"
            style={{ height: "200px" }}
          />
          {/* Activity tile */}
          <div
            className="skeleton-shimmer rounded-2xl"
            style={{ height: "200px" }}
          />
          {/* Course cards */}
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </main>
    </div>
  );
}
