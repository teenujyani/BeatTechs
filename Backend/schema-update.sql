-- Run this in Supabase SQL Editor to add missing columns if they don't exist

-- Add parent_course_id column if missing (for module/test purchases)
ALTER TABLE public.purchases
ADD COLUMN IF NOT EXISTS parent_course_id TEXT;

-- Ensure all required columns exist
ALTER TABLE public.purchases
ADD COLUMN IF NOT EXISTS item_type TEXT DEFAULT 'course',
ADD COLUMN IF NOT EXISTS item_id TEXT;

-- Add comment for clarity
COMMENT ON COLUMN public.purchases.parent_course_id IS 'References the main course when purchasing modules or tests';
