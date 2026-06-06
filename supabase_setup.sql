-- Run this in Supabase SQL Editor to:
-- 1. Disable RLS (so anon key can read/write for this demo)
-- 2. Insert the 4 seed courses

-- Step 1: Allow public reads (disable RLS or add read policy)
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON courses
  FOR SELECT USING (true);

-- Step 2: Insert seed data directly via SQL (bypasses RLS)
INSERT INTO courses (title, progress, icon_name) VALUES
  ('Advanced React Patterns', 75, 'Code'),
  ('TypeScript Mastery', 45, 'FileCode'),
  ('System Design Fundamentals', 20, 'Server'),
  ('Next.js 14 Deep Dive', 90, 'Zap');

-- Step 3: Verify
SELECT id, title, progress, icon_name FROM courses ORDER BY created_at DESC;
