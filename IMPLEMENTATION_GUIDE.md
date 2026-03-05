# BeatTechs Learning Platform

A comprehensive e-learning platform with course management, progress tracking, and payment integration.

## Features Implemented

### ✅ Authentication & Authorization
- User signup/login with Supabase Auth
- Protected routes for authenticated users
- Redirect unauthenticated users to login when attempting to purchase

### ✅ Payment Integration
- Stripe integration for course purchases
- Support for purchasing courses, workshops, tests, and modules
- Automatic purchase recording in Supabase database

### ✅ Dashboard Features
- Display all purchased courses with progress tracking
- Real-time course completion percentages
- Interactive charts using Chart.js:
  - Line chart for course completion progress
  - Doughnut chart for purchase distribution
- Search functionality for courses

### ✅ Activity Tracking
- GitHub/LeetCode-style activity heatmap
- Tracks daily user activity
- Shows current streak and longest streak
- 365-day activity visualization

### ✅ Course Content & Progress
- YouTube video integration for course content
- Section-based course structure
- Mark videos as complete
- Track watch progress for each video
- Calculate completion percentage per course

### ✅ Tests & Modules System
- Purchase tests and modules separately
- Track test results and scores
- Module-based learning support

### ✅ Dark/Light Mode
- Theme toggle button in header
- Persistent theme preference (localStorage)
- Smooth theme transitions

## Setup Instructions

### 1. Database Setup (Supabase)

1. Go to your Supabase project
2. Open SQL Editor
3. Run the schema file:
   ```sql
   -- Copy and paste contents from Backend/supabase-schema.sql
   ```
4. Load sample data:
   ```sql
   -- Copy and paste contents from Backend/sample-data.sql
   ```

### 2. Backend API Setup

```bash
# Navigate to backend API directory
cd Backend/api

# Install dependencies
npm install

# Start the server
npm run dev
```

The backend API will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Navigate to project root
cd BeatTechs/BeatTechs

# Install dependencies
npm install

# Install Chart.js for dashboard analytics
npm install react-chartjs-2 chart.js

# Start development server
npm run dev
```

The frontend will run on `http://localhost:5173`

### 4. Environment Variables

Backend API (`.env` in `Backend/api/`):
```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
STRIPE_SECRET_KEY=your_stripe_secret_key
PORT=5000
FRONTEND_URL=http://localhost:5173
```

## Database Schema

### Tables Created:
1. **purchases** - Stores all user purchases (courses, tests, modules)
2. **user_activity** - Tracks daily activity for heatmap
3. **course_progress** - Tracks video completion within courses
4. **course_content** - Stores course structure with YouTube videos
5. **test_modules** - Tests and modules available for purchase
6. **test_results** - User test results and scores

## API Endpoints

### Payment
- `POST /create-checkout-session` - Create Stripe checkout session

### Purchases
- `POST /api/purchases` - Save purchase after payment
- `GET /api/purchases/:userId` - Get user's purchases
- `GET /api/purchases/check/:userId/:itemId` - Check if user owns item

### Activity Tracking
- `POST /api/activity` - Log user activity
- `GET /api/activity/:userId` - Get user activity for heatmap

### Course Progress
- `GET /api/progress/:userId/:courseId` - Get course progress
- `POST /api/progress` - Update video progress
- `GET /api/progress/:userId` - Get all course completions

### Content
- `GET /api/content/:courseId` - Get course videos
- `GET /api/modules/:courseId` - Get tests/modules for course

### Dashboard
- `GET /api/dashboard/:userId` - Get comprehensive dashboard stats

## Course Structure

Courses are organized with:
- **Sections**: Logical groupings of content
- **Videos**: YouTube embedded videos for each lesson
- **Progress Tracking**: Mark videos as complete
- **Duration**: Track time spent on each video

## Features in Detail

### 1. Purchase Flow
1. User browses courses on `/courses`
2. Clicks "Buy Course" → redirected to `/checkout`
3. If not logged in → redirected to `/login`
4. After login → proceeds to Stripe payment
5. On success → redirected to `/success`
6. Purchase saved to database
7. Activity logged for the day

### 2. Dashboard
- **My Courses**: Grid of purchased courses with progress bars
- **Charts**: Visual representation of progress and purchases
- **Search**: Filter courses by title
- **Statistics**: Total purchases, courses, completions

### 3. Activity Heatmap
- Similar to GitHub contributions graph
- Shows last 365 days of activity
- Color intensity based on activity count
- Displays streaks (current and longest)

### 4. Course Learning
- Access course from dashboard "Continue Learning"
- Watch YouTube videos embedded
- Mark videos as complete
- Track progress across all courses
- Navigate between sections and videos

### 5. Dark/Light Mode
- Toggle button in header (top right)
- Theme persists across sessions
- Smooth transitions between themes

## Course IDs for Testing

Use these course IDs when creating purchases:
- `data-science` - Data Science Course
- `python-programming` - Python Programming
- `machine-learning` - Machine Learning
- `cpp-programming` - C++ Programming

## Next Steps / Enhancements

1. Add quiz/assessment functionality for tests
2. Implement certificate generation on course completion
3. Add discussion forums for each course
4. Email notifications for course updates
5. Mobile app version
6. Instructor dashboard for creating courses
7. Live classes integration
8. Peer-to-peer learning features

## Technologies Used

- **Frontend**: React, React Router, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Payment**: Stripe
- **Charts**: Chart.js, react-chartjs-2
- **Video**: YouTube embeds

## Troubleshooting

### Backend not connecting:
- Ensure `.env` file exists in `Backend/api/`
- Check Supabase credentials are correct
- Verify port 5000 is not in use

### Frontend errors:
- Run `npm install` to ensure all dependencies are installed
- Check backend API is running on port 5000
- Clear browser cache and localStorage

### Database errors:
- Verify all tables are created using schema file
- Check Row Level Security policies are enabled
- Ensure user is authenticated before making requests

## Support

For issues or questions, check:
- Supabase dashboard for database logs
- Browser console for frontend errors
- Terminal for backend API logs
