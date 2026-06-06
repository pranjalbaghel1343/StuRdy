import { BookOpen, Clock, Star } from "lucide-react";

export default function CoursesPage() {
  const courses = [
    { title: "Advanced React Patterns", instructor: "Dan Abramov", duration: "8h 30m", rating: 4.9, progress: 75, color: "#8b5cf6" },
    { title: "TypeScript Mastery", instructor: "Matt Pocock", duration: "6h 15m", rating: 4.8, progress: 45, color: "#3b82f6" },
    { title: "System Design Fundamentals", instructor: "Alex Xu", duration: "12h 00m", rating: 4.7, progress: 20, color: "#06b6d4" },
    { title: "Next.js 14 Deep Dive", instructor: "Lee Robinson", duration: "10h 45m", rating: 5.0, progress: 90, color: "#f59e0b" },
    { title: "Node.js Backend Dev", instructor: "Maximilian S.", duration: "14h 20m", rating: 4.6, progress: 0, color: "#10b981" },
    { title: "Database Design", instructor: "Fauna Team", duration: "5h 30m", rating: 4.5, progress: 0, color: "#ec4899" },
  ];

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>My Courses</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
          {courses.filter(c => c.progress > 0).length} in progress · {courses.filter(c => c.progress === 0).length} not started
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {courses.map((course, i) => (
          <article
            key={i}
            className="glass-card p-5 flex flex-col gap-4 cursor-pointer glow-border"
          >
            <div className="flex items-start justify-between">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${course.color}22`, border: `1px solid ${course.color}44` }}
              >
                <BookOpen size={18} color={course.color} />
              </div>
              <div className="flex items-center gap-1">
                <Star size={12} color="#f59e0b" fill="#f59e0b" />
                <span className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>{course.rating}</span>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>{course.title}</h2>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>by {course.instructor}</p>
            </div>

            <div className="flex items-center gap-2 mt-auto">
              <Clock size={12} color="var(--text-muted)" />
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>{course.duration}</span>
              <span
                className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{
                  background: course.progress > 0 ? `${course.color}22` : "rgba(255,255,255,0.05)",
                  color: course.progress > 0 ? course.color : "var(--text-muted)",
                }}
              >
                {course.progress > 0 ? `${course.progress}%` : "Not started"}
              </span>
            </div>

            {course.progress > 0 && (
              <div className="progress-track">
                <div className="h-full rounded-full" style={{ width: `${course.progress}%`, background: `linear-gradient(90deg, ${course.color}, ${course.color}88)` }} />
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
