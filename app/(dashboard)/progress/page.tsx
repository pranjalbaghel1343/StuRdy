export default function ProgressPage() {
  const stats = [
    { label: "Total Hours", value: "48h", sub: "+3h this week", color: "#8b5cf6" },
    { label: "Courses Done", value: "2", sub: "of 6 enrolled", color: "#3b82f6" },
    { label: "Current Streak", value: "14d", sub: "Personal best!", color: "#f59e0b" },
    { label: "XP Earned", value: "3,240", sub: "+180 today", color: "#10b981" },
  ];

  const weekly = [65, 80, 45, 90, 70, 55, 85];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const max = Math.max(...weekly);

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Progress</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>Your learning journey so far</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
        {stats.map((s, i) => (
          <div key={i} className="glass-card p-5">
            <p className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>{s.label}</p>
            <p className="text-3xl font-bold mb-1" style={{ color: s.color }}>{s.value}</p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Weekly chart */}
      <div className="glass-card p-6">
        <h2 className="text-sm font-semibold mb-6" style={{ color: "var(--text-primary)" }}>Weekly Activity (minutes)</h2>
        <div className="flex items-end gap-3 h-40">
          {weekly.map((val, i) => (
            <div key={i} className="flex flex-col items-center gap-2 flex-1">
              <div className="w-full rounded-lg relative overflow-hidden" style={{ height: `${(val / max) * 100}%`, minHeight: 8 }}>
                <div
                  className="absolute inset-0 rounded-lg"
                  style={{ background: "linear-gradient(180deg, var(--accent-purple), var(--accent-blue))", opacity: 0.8 }}
                />
              </div>
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>{days[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
