# StuRdy Learning Dashboard 🚀

Hey! This is my submission for the frontend intern challenge. I built a learning dashboard using Next.js, Tailwind CSS, and Framer Motion. I also hooked it up to Supabase to fetch some dummy course data.

## Features
- **Cool Animations:** Used Framer Motion to make the cards pop in and tilt when you hover over them.
- **Glassmorphism:** The cards have a sleek dark glass effect (took me a while to get the layout working without Chrome glitching!).
- **Canvas Background:** I followed a tutorial to make a custom HTML5 canvas background with shooting stars that react to your mouse.
- **Responsive:** Works perfectly on mobile with a custom bottom navigation bar instead of the sidebar.

## Tech Stack I Used
- Next.js 15 (App Router)
- Tailwind CSS 
- Framer Motion (for all the bouncy spring animations)
- Supabase (database)
- Lucide React (icons)

## How to run it locally

1. Clone the repo and install packages:
   ```bash
   npm install
   ```

2. You need a Supabase project for the data. Create a free one and run this in their SQL editor:
   ```sql
   CREATE TABLE courses (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     title TEXT NOT NULL,
     progress INTEGER NOT NULL DEFAULT 0,
     icon_name TEXT NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   INSERT INTO courses (title, progress, icon_name) VALUES
     ('Advanced React Patterns', 75, 'Code'),
     ('TypeScript Mastery', 45, 'FileCode'),
     ('System Design Fundamentals', 20, 'Server'),
     ('Next.js 14 Deep Dive', 90, 'Zap');
   ```

3. Make a `.env.local` file (copy from `.env.example`) and add your Supabase keys:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
   ```

4. Start the app:
   ```bash
   npm run dev
   ```

## Architecture & Component Split
I decided to do all the data fetching on the server. I used `app/page.tsx` as a Next.js Server Component to fetch the courses from Supabase. Then, I passed that data down as props to my UI components (like `BentoGrid` and `CourseCard`), which are marked with `"use client"` because they need Framer Motion animations. 
This architectural choice was really cool because it means the database keys never reach the browser, and the page loads faster!

## Things I learned & Challenges Faced
- Getting Framer Motion to work with Next.js Server Components was tricky. I learned I had to split my components so that the animations are isolated in `"use client"` files, while the data fetching stays on the server.
- Chrome has a really weird bug with `backdrop-filter: blur()` that causes backgrounds to shift around on Windows, so I had to use solid dark colors with opacity instead to fix the layout glitches.
- Building the custom canvas background was hard but taught me a lot about `requestAnimationFrame`!

Hope you like it!
