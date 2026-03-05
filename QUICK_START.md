# 🚀 Quick Start Guide

## Prerequisites
- Node.js (v16 or higher)
- Supabase account
- Stripe account

## Step-by-Step Setup

### 1️⃣ Database Setup (5 minutes)

1. Go to [Supabase](https://supabase.com) and create/open your project
2. Navigate to **SQL Editor**
3. Create a new query
4. Copy and paste the entire content from `Backend/supabase-schema.sql`
5. Click **Run** to create all tables and functions
6. Create another query
7. Copy and paste the content from `Backend/sample-data.sql`
8. Click **Run** to insert sample course content

**✅ Verification:** Check Tables section - you should see 6 new tables:
- purchases
- user_activity
- course_progress
- course_content
- test_modules
- test_results

### 2️⃣ Backend Setup (2 minutes)

```bash
# Open terminal in project root
cd Backend/api

# Install dependencies
npm install

# Start backend server
npm run dev
```

**✅ Verification:** You should see:
```
✅ Server running on http://localhost:5000
```

### 3️⃣ Frontend Setup (2 minutes)

```bash
# Open NEW terminal in project root
cd BeatTechs/BeatTechs

# Install dependencies (if not already installed)
npm install

# Install Chart.js for dashboard
npm install react-chartjs-2 chart.js

# Start frontend
npm run dev
```

**✅ Verification:** You should see:
```
  VITE v... ready in ...ms
  ➜  Local:   http://localhost:5173/
```

### 4️⃣ Test the Application (5 minutes)

#### Create an Account:
1. Open browser: http://localhost:5173
2. Click **Sign up** (top right)
3. Enter email and password
4. Click **Sign up**

#### Purchase a Course:
1. Click **Courses** in navigation
2. Select any course
3. Click **Enroll Now**
4. Click **Proceed to Pay**
5. Use Stripe test card:
   - **Card Number:** 4242 4242 4242 4242
   - **Expiry:** Any future date (e.g., 12/25)
   - **CVC:** Any 3 digits (e.g., 123)
6. Complete payment

#### View Dashboard:
1. After successful payment, click **Go to Dashboard**
2. You should see:
   - ✅ Your purchased course
   - ✅ Activity heatmap
   - ✅ Progress charts
   - ✅ Learning stats

#### Watch Course Content:
1. In dashboard, click **Continue Learning** on your course
2. You should see:
   - ✅ Course videos (YouTube)
   - ✅ Section-based content
   - ✅ Progress tracking
3. Click **Mark as Complete** after watching
4. Watch progress bar update

#### Test Dark/Light Mode:
1. Click the **toggle button** in top right corner (next to profile)
2. Page should switch between dark and light themes
3. Theme preference is saved (persists on refresh)

## 🎯 Testing Checklist

- [ ] Can create account
- [ ] Can login/logout
- [ ] Cannot checkout without login (redirects to login)
- [ ] Can purchase course with Stripe
- [ ] Purchase appears in dashboard
- [ ] Activity heatmap shows today's activity
- [ ] Can view course content
- [ ] Can mark videos as complete
- [ ] Progress updates in real-time
- [ ] Charts display correctly
- [ ] Dark/light mode toggle works
- [ ] Theme persists on refresh

## 🐛 Common Issues

### Backend won't start
```bash
# Check if port 5000 is in use
lsof -ti:5000 | xargs kill -9

# Restart backend
cd Backend/api && npm run dev
```

### Frontend errors about Chart.js
```bash
# Reinstall Chart.js
npm install react-chartjs-2 chart.js --force
```

### Database connection fails
- Check Supabase URL and anon key in `Backend/api/.env`
- Verify internet connection
- Check Supabase project status

### Stripe payment fails
- Use test mode card: 4242 4242 4242 4242
- Check Stripe secret key in `.env`
- Verify Stripe account is in test mode

### No course content showing
- Verify `sample-data.sql` was run in Supabase
- Check browser console for errors
- Verify backend is running on port 5000

## 📱 Testing on Mobile

```bash
# Find your local IP
ip addr show | grep "inet " | grep -v 127.0.0.1

# Update FRONTEND_URL in Backend/api/.env
FRONTEND_URL=http://YOUR_IP:5173

# Restart backend
# Access from mobile: http://YOUR_IP:5173
```

## 🎨 Customization

### Add New Course Content
1. Go to Supabase SQL Editor
2. Insert new rows into `course_content` table
3. Use YouTube embed URLs (format: `https://www.youtube.com/embed/VIDEO_ID`)

### Change Theme Colors
Edit `src/index.css`:
```css
:root {
  --accent: #7dd3d8; /* Change this */
}
```

### Add More Course Features
1. Add fields to courseData.js
2. Update Checkout component
3. Display in Dashboard

## 🚀 Production Deployment

### Frontend (Vercel/Netlify)
1. Update API URL in all fetch calls
2. Set environment variables
3. Deploy

### Backend (Heroku/Railway)
1. Add environment variables
2. Update CORS settings
3. Deploy
4. Update frontend API URL

## 📞 Need Help?

Check:
1. Browser console (F12) for frontend errors
2. Terminal for backend errors
3. Supabase logs for database issues
4. Stripe dashboard for payment issues

## 🎉 Success!

If everything is working:
- ✅ You can purchase courses
- ✅ Dashboard shows purchases
- ✅ Activity tracking works
- ✅ Video progress tracked
- ✅ Charts display data
- ✅ Theme toggle works

**You're ready to customize and build more features!**
