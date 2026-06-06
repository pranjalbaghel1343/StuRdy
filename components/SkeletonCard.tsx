// NO "use client" — this is a plain server-safe component

export default function SkeletonCard() {
  return (
    <article
      className="glass-card p-5 flex flex-col gap-4"
      aria-hidden="true"
    >
      {/* Icon placeholder */}
      <div className="skeleton-shimmer w-10 h-10 rounded-xl" />

      {/* Title placeholder */}
      <div className="flex flex-col gap-2">
        <div className="skeleton-shimmer h-4 w-3/4 rounded-lg" />
        <div className="skeleton-shimmer h-3 w-1/2 rounded-lg" />
      </div>

      {/* Progress bar placeholder */}
      <div className="mt-auto flex flex-col gap-2">
        <div className="skeleton-shimmer h-3 w-1/4 rounded-lg" />
        <div className="skeleton-shimmer h-[5px] w-full rounded-full" />
      </div>
    </article>
  );
}
