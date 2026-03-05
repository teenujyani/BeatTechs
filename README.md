# 🎓 BeatTechs - Complete E-Learning Platform

## 📋 Overview

BeatTechs is a full-featured e-learning platform with course management, payment processing, progress tracking, and analytics. Built with React, Node.js, Supabase, and Stripe.

## ✨ Key Features

### 🔐 Authentication
- User signup/login with Supabase Auth
- Protected routes for authenticated users
- Automatic redirect to login for unauthenticated checkout attempts
- Session management with automatic token refresh

### 💳 Payment System
- Stripe integration for secure payments
- Support for courses, workshops, tests, and modules
- Automatic purchase recording in database
- Success/cancel page handling

### 📊 Dashboard
- Display all purchased courses with progress
- Real-time course completion tracking
- Interactive charts (Line & Doughnut)
- Search functionality
- Activity heatmap (GitHub-style)
- Streak tracking
- Learning statistics

### 🎥 Course Learning
- YouTube video integration
- Section-based course structure
- Mark videos as complete
- Progress tracking per course
- Auto-updating completion percentages

### 🎯 Activity Tracking
- 365-day activity heatmap
- Current and longest streak display
- Daily activity counting
- Color-coded intensity levels

### 🌓 Dark/Light Mode
- Theme toggle button in header
- Persistent theme preference
- Smooth transitions
- Full app support

## 🚀 Quick Start

### Prerequisites
- Node.js v16+
- Supabase account
- Stripe account (test mode)

### 1. Database Setup (5 min)
```bash
# In Supabase SQL Editor:
# 1. Run Backend/supabase-schema.sql
# 2. Run Backend/sample-data.sql
```
📖 Detailed instructions: [DATABASE_SETUP.md](DATABASE_SETUP.md)

### 2. Backend Setup (2 min)
```bash
cd Backend/api
npm install
npm run dev
```
✅ Server runs on http://localhost:5000

### 3. Frontend Setup (2 min)
```bash
cd BeatTechs/BeatTechs
npm install
npm install react-chartjs-2 chart.js
npm run dev
```
✅ App runs on http://localhost:5173

### 4. Test the App (5 min)
```
1. Create account
2. Browse courses
3. Purchase with test card: 4242 4242 4242 4242
4. View dashboard
5. Watch course content
6. Toggle dark/light mode
```

📖 Full testing guide: [QUICK_START.md](QUICK_START.md)

## 📁 Project Structure

```
BeatTechs/
├── Backend/
│   ├── api/
│   │   ├── server.js           # Express API server
│   │   ├── package.json        # Backend dependencies
│   │   └── .env                # Environment variables
│   ├── supabase-schema.sql     # Database schema
│   └── sample-data.sql         # Sample course content
├── src/
│   ├── pages/
│   │   ├── dashboard/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── DashboardMain.jsx    # Course display & charts
│   │   │   └── DashboardRight.jsx   # Activity heatmap
│   │   ├── Checkout.jsx        # Payment page
│   │   ├── CourseDetail.jsx    # Video learning page
│   │   └── Success.jsx         # Payment success
│   ├── component/
│   │   ├── Header.jsx          # With theme toggle
│   │   └── ...
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── ThemeContext.jsx
│   └── data/
│       └── courseData.js       # Course definitions
├── QUICK_START.md              # Setup guide
├── DATABASE_SETUP.md           # DB instructions
├── IMPLEMENTATION_GUIDE.md     # Detailed docs
└── FEATURES_SUMMARY.md         # All features
```

## 🛠️ Tech Stack

### Frontend
- React 18
- React Router v6
- Tailwind CSS
- Chart.js + react-chartjs-2
- Stripe.js

### Backend
- Node.js + Express
- Supabase (PostgreSQL + Auth)
- Stripe API
- CORS

### Database
- PostgreSQL (via Supabase)
- Row Level Security
- Helper functions
- Indexes for performance

## 📊 Database Schema

6 main tables:
1. **purchases** - User purchases
2. **user_activity** - Daily activity tracking
3. **course_progress** - Video completion
4. **course_content** - Course videos
5. **test_modules** - Tests and modules
6. **test_results** - Test scores

## 🔌 API Endpoints

15 endpoints across 6 categories:
- **Payment**: Stripe checkout session
- **Purchases**: CRUD operations
- **Activity**: Log and retrieve
- **Progress**: Video tracking
- **Content**: Course videos
- **Dashboard**: Comprehensive stats

📖 Full API documentation: [IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md)

## 🎨 Features in Detail

### Dashboard Analytics
- **Charts**: Line chart for progress, doughnut for distribution
- **Stats**: Total courses, completions, active days
- **Search**: Filter courses by name
- **Cards**: Hover effects, progress bars, type badges

### Activity Heatmap
- **Visual**: 365-day grid (like GitHub)
- **Colors**: 5 intensity levels
- **Streaks**: Current and longest
- **Tooltip**: Hover for exact count

### Course Learning
- **Videos**: YouTube embeds
- **Sections**: Organized curriculum
- **Progress**: Mark complete functionality
- **Navigation**: Easy video switching
- **Responsive**: Mobile-friendly player

### Payment Flow
```
Browse → Select → Checkout → Login Check → 
Stripe Payment → Success → Save to DB → 
Dashboard Update → Activity Log
```

## 🧪 Testing

### Test Cards
- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002

### Test Course IDs
- `data-science`
- `python-programming`
- `machine-learning`
- `cpp-programming`

### Test Checklist
- [ ] Create account
- [ ] Login redirect on checkout
- [ ] Successful payment
- [ ] Purchase appears in dashboard
- [ ] Activity heatmap updates
- [ ] Course content accessible
- [ ] Video completion tracking
- [ ] Charts display data
- [ ] Dark/light mode toggle
- [ ] Theme persists on refresh

## 🐛 Troubleshooting

### Backend won't start
```bash
lsof -ti:5000 | xargs kill -9
cd Backend/api && npm run dev
```

### Missing Chart.js
```bash
npm install react-chartjs-2 chart.js --force
```

### Database errors
- Verify .env credentials
- Check Supabase project status
- Re-run schema SQL

### No course content
- Run sample-data.sql in Supabase
- Check course IDs match
- Verify backend is running

## 📚 Documentation

- **[QUICK_START.md](QUICK_START.md)** - Get started in 15 minutes
- **[DATABASE_SETUP.md](DATABASE_SETUP.md)** - Database instructions
- **[IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md)** - Comprehensive guide
- **[FEATURES_SUMMARY.md](FEATURES_SUMMARY.md)** - All features explained

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Update API URLs to production
2. Set environment variables
3. Deploy

### Backend (Railway/Render)
1. Add environment variables
2. Update CORS for production domain
3. Deploy
4. Update frontend with API URL

## 🔒 Security

- ✅ Supabase Row Level Security
- ✅ Environment variables for secrets
- ✅ CORS configuration
- ✅ Input validation
- ✅ Stripe secure checkout
- ✅ User data isolation

## 🎯 Future Enhancements

- [ ] Certificates on completion
- [ ] Discussion forums
- [ ] Interactive quizzes
- [ ] Note-taking feature
- [ ] Video bookmarks
- [ ] Offline downloads
- [ ] Live classes
- [ ] Instructor dashboard
- [ ] AI recommendations
- [ ] Social features

## 📝 License

This project is for educational purposes.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

## 📞 Support

For issues:
1. Check browser console (F12)
2. Check terminal logs
3. Review Supabase logs
4. Check Stripe dashboard

## ⭐ Acknowledgments

- Supabase for backend services
- Stripe for payment processing
- Chart.js for visualizations
- YouTube for video hosting

---

**Made with ❤️ for learning**

🎓 Happy Teaching & Learning! 🎓
