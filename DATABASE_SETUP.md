# 🗄️ Supabase Database Setup Instructions

## Step 1: Access Supabase SQL Editor

1. Go to [supabase.com](https://supabase.com)
2. Sign in to your account
3. Select your project: **soiuefhguodwehufofoi**
4. Click on **SQL Editor** in the left sidebar
5. Click **New Query**

## Step 2: Create Tables & Functions

### Copy the Schema
1. Open the file `Backend/supabase-schema.sql` in your code editor
2. Select ALL content (Ctrl+A / Cmd+A)
3. Copy (Ctrl+C / Cmd+C)

### Run in Supabase
1. Paste into the SQL Editor
2. Click **RUN** button (or press Ctrl+Enter)
3. Wait for "Success" message

### Verify Tables Created
Go to **Table Editor** in left sidebar. You should see 6 new tables:
- ✅ purchases
- ✅ user_activity
- ✅ course_progress
- ✅ course_content
- ✅ test_modules
- ✅ test_results

## Step 3: Insert Sample Data

### Copy Sample Data
1. Open the file `Backend/sample-data.sql`
2. Select ALL content
3. Copy

### Run in Supabase
1. Create a **New Query** in SQL Editor
2. Paste the sample data
3. Click **RUN**
4. Wait for "Success" message

### Verify Data Inserted
Go to **Table Editor** and check:
- **course_content**: Should have ~20+ rows (videos)
- **test_modules**: Should have ~6 rows (tests/modules)

## Step 4: Verify Row Level Security (RLS)

All tables should have RLS enabled. To check:
1. Go to **Authentication** → **Policies**
2. Select each table
3. Verify policies exist:
   - "Users can view their own ..."
   - "Users can insert their own ..."
   - "Users can update their own ..."

## Sample Queries to Test

### Check Course Content
```sql
SELECT * FROM course_content WHERE course_id = 'data-science';
```
Expected: 7 rows (Data Science videos)

### Check Test Modules
```sql
SELECT * FROM test_modules;
```
Expected: 6 rows (various tests and modules)

### Check Functions
```sql
SELECT routine_name 
FROM information_schema.routines 
WHERE routine_schema = 'public' 
AND routine_name IN ('increment_user_activity', 'get_course_completion');
```
Expected: 2 functions

## Troubleshooting

### Error: "relation already exists"
**Solution**: Tables were already created. Skip schema creation or drop tables first:
```sql
DROP TABLE IF EXISTS test_results CASCADE;
DROP TABLE IF EXISTS test_modules CASCADE;
DROP TABLE IF EXISTS course_progress CASCADE;
DROP TABLE IF EXISTS course_content CASCADE;
DROP TABLE IF EXISTS user_activity CASCADE;
DROP TABLE IF EXISTS purchases CASCADE;
```
Then re-run schema.

### Error: "duplicate key value"
**Solution**: Sample data was already inserted. This is fine - you can skip or delete existing data first:
```sql
DELETE FROM course_content;
DELETE FROM test_modules;
```
Then re-run sample data.

### Error: "must be owner of table"
**Solution**: Use Service Role Key instead of anon key in your backend .env file.

### No policies showing
**Solution**: RLS policies are automatically created by the schema. If missing, re-run the schema file.

## Database Structure Overview

### purchases
Stores all user purchases
- Columns: user_id, item_id, item_type, item_title, price, stripe_session_id, purchased_at

### user_activity
Tracks daily activity for heatmap
- Columns: user_id, activity_date, activity_count, created_at

### course_progress
Tracks video completion
- Columns: user_id, course_id, video_id, video_title, completed, completed_at, watch_time

### course_content
Stores course videos
- Columns: course_id, course_title, section_number, section_title, video_id, video_title, video_url, duration, order_index

### test_modules
Tests and modules for purchase
- Columns: course_id, module_id, module_title, module_type, description, price, duration, questions_count

### test_results
User test scores
- Columns: user_id, test_id, score, total_questions, time_taken, completed_at

## Course IDs in Database

After running sample-data.sql, these courses will have content:
- `data-science` - 7 videos
- `python-programming` - 6 videos
- `machine-learning` - 5 videos
- `cpp-programming` - 4 videos

## Adding More Content

### Add a New Course
```sql
INSERT INTO course_content (
  course_id, 
  course_title, 
  section_number, 
  section_title, 
  video_id, 
  video_title, 
  video_url, 
  duration, 
  order_index
)
VALUES (
  'your-course-id',
  'Your Course Title',
  1,
  'Section 1: Introduction',
  'video_1',
  'Welcome Video',
  'https://www.youtube.com/embed/YOUR_VIDEO_ID',
  600,
  1
);
```

### Add a Test/Module
```sql
INSERT INTO test_modules (
  course_id,
  module_id,
  module_title,
  module_type,
  description,
  price,
  duration,
  questions_count
)
VALUES (
  'your-course-id',
  'test_1',
  'Final Assessment',
  'test',
  'Test your knowledge',
  299,
  60,
  30
);
```

## Backup Recommendation

Before making changes, export your data:
1. Go to **Table Editor**
2. Select table
3. Click **...** menu
4. Select **Export to CSV**

## Next Steps After Setup

1. ✅ Tables created
2. ✅ Sample data inserted
3. ✅ RLS policies active
4. ➡️ Start backend API (`npm run dev` in Backend/api)
5. ➡️ Start frontend (`npm run dev` in root)
6. ➡️ Test the application!

## Support

If you encounter issues:
1. Check Supabase project status (top right)
2. View Logs in Supabase dashboard
3. Verify credentials in `.env` file
4. Try recreating tables (drop and re-run schema)
