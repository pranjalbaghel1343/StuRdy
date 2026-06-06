import { Trophy, Medal, Crown } from "lucide-react";

export default function LeaderboardPage() {
  const leaders = [
    { rank: 1, name: "Arjun Sharma",  xp: 12400, avatar: "A", streak: 42, badge: "🏆" },
    { rank: 2, name: "Priya Mehta",   xp: 11800, avatar: "P", streak: 38, badge: "🥈" },
    { rank: 3, name: "Rohan Dev",     xp: 10950, avatar: "R", streak: 31, badge: "🥉" },
    { rank: 4, name: "You",           xp: 3240,  avatar: "D", streak: 14, badge: "✨", isYou: true },
    { rank: 5, name: "Sneha Kulkarni",xp: 2980,  avatar: "S", streak: 12, badge: "" },
    { rank: 6, name: "Aman Gupta",    xp: 2750,  avatar: "A", streak: 9,  badge: "" },
    { rank: 7, name: "Divya Singh",   xp: 2400,  avatar: "D", streak: 7,  badge: "" },
  ];

  const rankColors: Record<number, string> = { 1: "#f59e0b", 2: "#9ca3af", 3: "#cd7c2f" };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8 flex items-center gap-3">
        <Trophy size={24} color="#f59e0b" />
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Leaderboard</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>Top learners this month</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 max-w-2xl">
        {leaders.map((l) => (
          <div
            key={l.rank}
            className="glass-card px-5 py-4 flex items-center gap-4"
            style={{
              border: l.isYou ? "1px solid rgba(139,92,246,0.4)" : undefined,
              background: l.isYou ? "linear-gradient(135deg, rgba(139,92,246,0.12), rgba(59,130,246,0.06))" : undefined,
            }}
          >
            {/* Rank */}
            <span className="w-8 text-center font-bold text-sm" style={{ color: rankColors[l.rank] ?? "var(--text-muted)" }}>
              {l.rank <= 3 ? l.badge : `#${l.rank}`}
            </span>

            {/* Avatar */}
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
              style={{
                background: l.isYou
                  ? "linear-gradient(135deg, var(--accent-purple), var(--accent-blue))"
                  : "rgba(255,255,255,0.08)",
                color: "white",
              }}
            >
              {l.avatar}
            </div>

            {/* Name */}
            <div className="flex-1">
              <p className="text-sm font-semibold" style={{ color: l.isYou ? "var(--accent-purple)" : "var(--text-primary)" }}>
                {l.name} {l.isYou && <span className="text-xs font-normal">(you)</span>}
              </p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>🔥 {l.streak} day streak</p>
            </div>

            {/* XP */}
            <span className="text-sm font-bold tabular-nums" style={{ color: "var(--text-secondary)" }}>
              {l.xp.toLocaleString()} XP
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
