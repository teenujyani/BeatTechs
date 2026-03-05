# 🏗️ BeatTechs Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         USER BROWSER                         │
│                    http://localhost:5173                     │
└─────────────────────────────────────────────────────────────┘
                              │
                              │
                    ┌─────────▼─────────┐
                    │   React Frontend   │
                    │   ┌───────────┐   │
                    │   │  Header   │   │
                    │   └───────────┘   │
                    │   ┌───────────┐   │
                    │   │  Routing  │   │
                    │   └───────────┘   │
                    │   ┌───────────┐   │
                    │   │   Pages   │   │
                    │   └───────────┘   │
                    └───────┬───────────┘
                            │
            ┌───────────────┼───────────────┐
            │               │               │
            ▼               ▼               ▼
    ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
    │   Supabase   │ │  Backend API │ │    Stripe    │
    │     Auth     │ │     :5000    │ │   Checkout   │
    └──────────────┘ └──────┬───────┘ └──────────────┘
            │               │
            │               ▼
            │       ┌──────────────┐
            └──────►│  Supabase DB │
                    │  PostgreSQL  │
                    └──────────────┘
```

## Data Flow

### 1. User Registration Flow
```
User → Signup Page → Supabase Auth → User Record Created
                                    → Redirect to Login
```

### 2. Purchase Flow
```
User → Courses → Select Course → Checkout
                                    │
                            Not Logged In?
                                    │
                            ┌───────┴───────┐
                            │               │
                          YES              NO
                            │               │
                    Redirect to Login   Continue
                            │               │
                            └───────┬───────┘
                                    │
                                    ▼
                            Stripe Checkout
                                    │
                                    ▼
                            Payment Success
                                    │
                                    ▼
                        Backend API: Save Purchase
                                    │
                                    ▼
                            Supabase DB Insert
                                    │
                                    ▼
                        Backend API: Log Activity
                                    │
                                    ▼
                            Success Page
                                    │
                                    ▼
                            Dashboard Updated
```

### 3. Course Learning Flow
```
Dashboard → My Courses → Continue Learning
                              │
                              ▼
                    Check Ownership (API)
                              │
                              ▼
                    Fetch Course Content (API)
                              │
                              ▼
                    Display Videos (YouTube)
                              │
                              ▼
                    User Marks Complete
                              │
                              ▼
                    Update Progress (API)
                              │
                              ▼
                    Log Activity (API)
                              │
                              ▼
                    Dashboard Refreshes
```

### 4. Dashboard Data Flow
```
Dashboard Load
    │
    ├─► API: Get Purchases
    │       └─► Supabase: SELECT * FROM purchases
    │
    ├─► API: Get Progress
    │       └─► Supabase: SELECT * FROM course_progress
    │
    ├─► API: Get Activity
    │       └─► Supabase: SELECT * FROM user_activity
    │
    └─► Render Charts & Stats
```

## Component Hierarchy

```
App
├── Header
│   ├── Navigation
│   ├── User Menu
│   └── Theme Toggle
│
├── Routes
│   ├── Home
│   ├── About
│   ├── Courses
│   │   └── CourseCard (multiple)
│   ├── Contact
│   ├── Login
│   ├── Signup
│   ├── Checkout
│   ├── Success
│   ├── Cancel
│   │
│   ├── Dashboard (Protected)
│   │   ├── DashboardSidebar
│   │   ├── DashboardMain
│   │   │   ├── Search
│   │   │   ├── Greeting Card
│   │   │   ├── Course Grid
│   │   │   │   └── CourseCard (multiple)
│   │   │   └── Charts
│   │   │       ├── Line Chart
│   │   │       └── Doughnut Chart
│   │   └── DashboardRight
│   │       ├── User Info
│   │       ├── Activity Heatmap
│   │       └── Stats Panel
│   │
│   └── CourseDetail (Protected)
│       ├── Video Player
│       ├── Video Info
│       └── Content Sidebar
│           └── Section (multiple)
│               └── Video Item (multiple)
│
└── Footer
```

## Database Schema

```
┌─────────────────┐
│    purchases    │
├─────────────────┤
│ id              │
│ user_id (FK)    │
│ item_id         │
│ item_type       │
│ item_title      │
│ price           │
│ purchased_at    │
└─────────────────┘
         │
         │ user_id
         ▼
┌─────────────────┐
│  user_activity  │
├─────────────────┤
│ id              │
│ user_id (FK)    │
│ activity_date   │
│ activity_count  │
└─────────────────┘
         │
         │ user_id
         ▼
┌─────────────────┐
│course_progress  │
├─────────────────┤
│ id              │
│ user_id (FK)    │
│ course_id       │
│ video_id        │
│ completed       │
│ watch_time      │
└─────────────────┘
         │
         │ course_id
         ▼
┌─────────────────┐
│ course_content  │
├─────────────────┤
│ id              │
│ course_id       │
│ section_number  │
│ video_id        │
│ video_title     │
│ video_url       │
│ duration        │
└─────────────────┘
         │
         │ course_id
         ▼
┌─────────────────┐
│  test_modules   │
├─────────────────┤
│ id              │
│ course_id       │
│ module_id       │
│ module_type     │
│ price           │
└─────────────────┘
         │
         │ id (test_id)
         ▼
┌─────────────────┐
│  test_results   │
├─────────────────┤
│ id              │
│ user_id (FK)    │
│ test_id (FK)    │
│ score           │
│ total_questions │
└─────────────────┘
```

## API Endpoints Map

```
Backend API (Express) - Port 5000

POST /create-checkout-session
    │
    ├─► Input: { title, price, userId, userEmail, itemId, courseType }
    └─► Output: { id: session_id }

POST /api/purchases
    │
    ├─► Input: { userId, itemId, itemType, itemTitle, price, stripeSessionId }
    └─► Output: { success, data }

GET /api/purchases/:userId
    │
    ├─► Query: ?itemType=course
    └─► Output: { success, data: [...purchases] }

GET /api/purchases/check/:userId/:itemId
    │
    └─► Output: { success, owned: boolean }

POST /api/activity
    │
    ├─► Input: { userId, date }
    └─► Output: { success }

GET /api/activity/:userId
    │
    ├─► Query: ?startDate=...&endDate=...
    └─► Output: { success, data: [...activity] }

POST /api/progress
    │
    ├─► Input: { userId, courseId, videoId, videoTitle, completed, watchTime }
    └─► Output: { success, data }

GET /api/progress/:userId/:courseId
    │
    └─► Output: { success, progress: [...], stats: {...} }

GET /api/progress/:userId
    │
    └─► Output: { success, data: [...courseStats] }

GET /api/content/:courseId
    │
    └─► Output: { success, data: [...videos] }

GET /api/modules/:courseId
    │
    └─► Output: { success, data: [...modules] }

POST /api/test-results
    │
    ├─► Input: { userId, testId, score, totalQuestions, timeTaken }
    └─► Output: { success, data }

GET /api/test-results/:userId
    │
    └─► Output: { success, data: [...results] }

GET /api/dashboard/:userId
    │
    └─► Output: { success, stats: {...} }
```

## State Management

```
React Context Providers:

ThemeProvider
    │
    ├─ theme: "dark" | "light"
    └─ toggleTheme: () => void

AuthProvider
    │
    ├─ user: User | null
    ├─ loading: boolean
    └─ (Supabase auth listener)
```

## Security Layers

```
┌─────────────────────────────────────────┐
│         Frontend (Browser)               │
│  • Protected Routes (React Router)       │
│  • Auth Context Check                    │
│  • Login Redirect                        │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│         Backend API (Express)            │
│  • CORS Configuration                    │
│  • Request Validation                    │
│  • Environment Variables                 │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│       Supabase (PostgreSQL)              │
│  • Row Level Security (RLS)              │
│  • User-specific Policies                │
│  • Foreign Key Constraints               │
│  • Data Validation                       │
└─────────────────────────────────────────┘
```

## Deployment Architecture (Future)

```
┌─────────────────────────────────────────────┐
│              CDN (Cloudflare)                │
│        Static Assets, Edge Caching           │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│         Frontend (Vercel/Netlify)            │
│     React SPA with Environment Vars          │
└──────────────────┬──────────────────────────┘
                   │
        ┌──────────┼──────────┐
        │          │          │
        ▼          ▼          ▼
┌──────────┐ ┌──────────┐ ┌──────────┐
│ Supabase │ │  Backend │ │  Stripe  │
│   Auth   │ │ Railway  │ │   API    │
└──────────┘ └────┬─────┘ └──────────┘
                   │
                   ▼
            ┌──────────┐
            │ Supabase │
            │    DB    │
            └──────────┘
```

## Performance Optimizations

```
Frontend:
├─ React.lazy() for code splitting
├─ Memoization for expensive calculations
├─ Debounced search
└─ Optimized re-renders

Backend:
├─ Database indexes
├─ Connection pooling
├─ Caching strategies
└─ Efficient queries

Database:
├─ Indexed columns
├─ Optimized joins
├─ RLS policies
└─ Helper functions
```

## Monitoring & Logging (Recommended)

```
Frontend:
└─ Browser Console Errors
    └─ Error Boundary

Backend:
├─ Console Logs
├─ Error Logging (Morgan)
└─ Request/Response Logs

Database:
├─ Supabase Dashboard
├─ Query Performance
└─ Table Statistics

Third-party:
├─ Stripe Dashboard (Payments)
└─ Vercel Analytics (Traffic)
```

---

**This architecture supports:**
- ✅ Scalability (add more features easily)
- ✅ Security (multiple layers)
- ✅ Performance (optimized queries)
- ✅ Maintainability (clear separation)
- ✅ Testing (isolated components)
