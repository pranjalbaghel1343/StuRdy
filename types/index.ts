// Database row shape from Supabase
export interface Course {
  id: string;
  title: string;
  progress: number;       // 0-100
  icon_name: string;      // Lucide icon name string
  created_at: string;
}

// Navigation item in the sidebar
export interface NavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
}
