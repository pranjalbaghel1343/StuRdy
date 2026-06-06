export default function SettingsPage() {
  const sections = [
    {
      title: "Account",
      items: [
        { label: "Display Name", value: "Dev", type: "input" },
        { label: "Email", value: "dev@sturdy.app", type: "input" },
      ],
    },
    {
      title: "Preferences",
      items: [
        { label: "Dark Mode", value: "On", type: "toggle" },
        { label: "Email Notifications", value: "On", type: "toggle" },
        { label: "Weekly Digest", value: "Off", type: "toggle" },
      ],
    },
    {
      title: "Learning",
      items: [
        { label: "Daily Goal", value: "60 min", type: "input" },
        { label: "Reminder Time", value: "8:00 PM", type: "input" },
      ],
    },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Settings</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>Manage your account and preferences</p>
      </div>

      <div className="flex flex-col gap-6">
        {sections.map((section) => (
          <div key={section.title} className="glass-card p-6 flex flex-col gap-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
              {section.title}
            </h2>
            {section.items.map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2 border-b" style={{ borderColor: "var(--border-subtle)" }}>
                <span className="text-sm" style={{ color: "var(--text-primary)" }}>{item.label}</span>
                {item.type === "toggle" ? (
                  <div
                    className="w-10 h-5 rounded-full relative cursor-pointer"
                    style={{
                      background: item.value === "On"
                        ? "linear-gradient(135deg, var(--accent-purple), var(--accent-blue))"
                        : "rgba(255,255,255,0.1)",
                    }}
                  >
                    <div
                      className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all"
                      style={{ left: item.value === "On" ? "calc(100% - 18px)" : "2px" }}
                    />
                  </div>
                ) : (
                  <span className="text-sm" style={{ color: "var(--text-muted)" }}>{item.value}</span>
                )}
              </div>
            ))}
          </div>
        ))}

        <button
          className="px-6 py-3 rounded-xl text-sm font-semibold text-white w-fit"
          style={{ background: "linear-gradient(135deg, var(--accent-purple), var(--accent-blue))" }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
