-- ============================================
-- SUPABASE DATABASE SCHEMA FOR BEATTECH
-- Run these queries in Supabase SQL Editor
-- ============================================

-- 1. PURCHASES TABLE (stores all purchases: courses, workshops, tests, modules)
CREATE TABLE IF NOT EXISTS purchases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  item_id TEXT NOT NULL, -- course/workshop/test/module identifier
  item_type TEXT NOT NULL, -- 'course', 'workshop', 'test', 'module'
  item_title TEXT NOT NULL,
  price INTEGER NOT NULL,
  stripe_session_id TEXT,
  purchased_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, item_id, item_type)
);

-- Index for faster queries
CREATE INDEX idx_purchases_user_id ON purchases(user_id);
CREATE INDEX idx_purchases_item_type ON purchases(item_type);

-- 2. USER_ACTIVITY TABLE (tracks daily activity for heatmap)
CREATE TABLE IF NOT EXISTS user_activity (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_date DATE NOT NULL,
  activity_count INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, activity_date)
);

-- Index for faster queries
CREATE INDEX idx_activity_user_date ON user_activity(user_id, activity_date);

-- 3. COURSE_PROGRESS TABLE (tracks video completion within courses)
CREATE TABLE IF NOT EXISTS course_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id TEXT NOT NULL,
  video_id TEXT NOT NULL,
  video_title TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP,
  watch_time INTEGER DEFAULT 0, -- seconds watched
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, course_id, video_id)
);

-- Index for faster queries
CREATE INDEX idx_progress_user_course ON course_progress(user_id, course_id);

-- 4. COURSE_CONTENT TABLE (stores course structure with videos)
CREATE TABLE IF NOT EXISTS course_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id TEXT NOT NULL,
  course_title TEXT NOT NULL,
  section_number INTEGER NOT NULL,
  section_title TEXT NOT NULL,
  video_id TEXT NOT NULL,
  video_title TEXT NOT NULL,
  video_url TEXT NOT NULL, -- YouTube embed URL
  duration INTEGER, -- in seconds
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(course_id, video_id)
);

-- Index for faster queries
CREATE INDEX idx_content_course ON course_content(course_id);

-- 5. TEST_MODULES TABLE (stores tests and modules available for purchase)
CREATE TABLE IF NOT EXISTS test_modules (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id TEXT NOT NULL,
  module_id TEXT NOT NULL UNIQUE,
  module_title TEXT NOT NULL,
  module_type TEXT NOT NULL, -- 'test', 'module', 'assessment'
  description TEXT,
  price INTEGER NOT NULL,
  duration INTEGER, -- in minutes for tests
  questions_count INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX idx_modules_course ON test_modules(course_id);

-- 6. TEST_RESULTS TABLE (stores user test results)
CREATE TABLE IF NOT EXISTS test_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  test_id UUID NOT NULL REFERENCES test_modules(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  time_taken INTEGER, -- in seconds
  completed_at TIMESTAMP DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX idx_results_user ON test_results(user_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_results ENABLE ROW LEVEL SECURITY;

-- Purchases policies
CREATE POLICY "Users can view their own purchases"
  ON purchases FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own purchases"
  ON purchases FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- User activity policies
CREATE POLICY "Users can view their own activity"
  ON user_activity FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own activity"
  ON user_activity FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own activity"
  ON user_activity FOR UPDATE
  USING (auth.uid() = user_id);

-- Course progress policies
CREATE POLICY "Users can view their own progress"
  ON course_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress"
  ON course_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress"
  ON course_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- Course content policies (public read)
CREATE POLICY "Anyone can view course content"
  ON course_content FOR SELECT
  USING (true);

-- Test modules policies (public read)
CREATE POLICY "Anyone can view test modules"
  ON test_modules FOR SELECT
  USING (true);

-- Test results policies
CREATE POLICY "Users can view their own test results"
  ON test_results FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own test results"
  ON test_results FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- HELPER FUNCTIONS
-- ============================================

-- Function to increment activity count or create new entry
CREATE OR REPLACE FUNCTION increment_user_activity(p_user_id UUID, p_date DATE)
RETURNS void AS $$
BEGIN
  INSERT INTO user_activity (user_id, activity_date, activity_count)
  VALUES (p_user_id, p_date, 1)
  ON CONFLICT (user_id, activity_date)
  DO UPDATE SET activity_count = user_activity.activity_count + 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get course completion percentage
CREATE OR REPLACE FUNCTION get_course_completion(p_user_id UUID, p_course_id TEXT)
RETURNS NUMERIC AS $$
DECLARE
  total_videos INTEGER;
  completed_videos INTEGER;
BEGIN
  SELECT COUNT(*) INTO total_videos
  FROM course_content
  WHERE course_id = p_course_id;
  
  SELECT COUNT(*) INTO completed_videos
  FROM course_progress
  WHERE user_id = p_user_id AND course_id = p_course_id AND completed = true;
  
  IF total_videos = 0 THEN
    RETURN 0;
  ELSE
    RETURN ROUND((completed_videos::NUMERIC / total_videos::NUMERIC) * 100, 2);
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
