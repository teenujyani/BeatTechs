# ✅ Setup Checklist

Use this checklist to ensure everything is configured correctly.

## 📋 Pre-Setup
- [ ] Node.js installed (v16+)
- [ ] Supabase account created
- [ ] Stripe account created (test mode)
- [ ] Code editor open (VS Code recommended)
- [ ] Terminal ready

## 🗄️ Database Setup
- [ ] Opened Supabase project
- [ ] Navigated to SQL Editor
- [ ] Ran `supabase-schema.sql` successfully
- [ ] Verified 6 tables created (Table Editor)
- [ ] Ran `sample-data.sql` successfully
- [ ] Verified course_content has ~20 rows
- [ ] Verified test_modules has ~6 rows
- [ ] Checked RLS policies exist

## 🔧 Backend Setup
- [ ] Navigated to `Backend/api/`
- [ ] Ran `npm install`
- [ ] Created/verified `.env` file with:
  - [ ] SUPABASE_URL
  - [ ] SUPABASE_ANON_KEY
  - [ ] STRIPE_SECRET_KEY
  - [ ] PORT=5000
  - [ ] FRONTEND_URL=http://localhost:5173
- [ ] Ran `npm run dev`
- [ ] Saw "Server running on http://localhost:5000"
- [ ] No errors in terminal

## 🎨 Frontend Setup
- [ ] Navigated to project root
- [ ] Ran `npm install`
- [ ] Installed Chart.js: `npm install react-chartjs-2 chart.js`
- [ ] Ran `npm run dev`
- [ ] Saw "Local: http://localhost:5173"
- [ ] No errors in terminal
- [ ] Opened http://localhost:5173 in browser
- [ ] Page loads without errors

## 🧪 Basic Testing
- [ ] Created new account (Signup)
- [ ] Logged in successfully
- [ ] Profile circle shows in header
- [ ] Theme toggle button visible

## 💳 Payment Testing
- [ ] Clicked on "Courses"
- [ ] Selected a course
- [ ] Clicked "Enroll Now"
- [ ] Redirected to checkout page
- [ ] Course details displayed correctly
- [ ] Clicked "Proceed to Pay"
- [ ] Stripe checkout opened
- [ ] Used test card: 4242 4242 4242 4242
- [ ] Payment succeeded
- [ ] Redirected to success page
- [ ] Saw success message
- [ ] No errors in browser console

## 📊 Dashboard Testing
- [ ] Clicked "Go to Dashboard"
- [ ] Purchased course visible in "My Courses"
- [ ] Progress bar shows 0%
- [ ] Statistics show correctly (1 purchase)
- [ ] Charts are visible (may be empty initially)
- [ ] Activity heatmap visible on right
- [ ] Today's date has activity (color)
- [ ] Stats show 1 active day

## 🎥 Course Content Testing
- [ ] Clicked "Continue Learning" on course
- [ ] Redirected to course detail page
- [ ] YouTube video loads successfully
- [ ] Course content sidebar visible
- [ ] Videos organized by sections
- [ ] First video auto-selected
- [ ] Can click other videos to watch
- [ ] "Mark as Complete" button visible
- [ ] Clicked "Mark as Complete"
- [ ] Video marked with ✓ checkmark
- [ ] Progress bar updated
- [ ] Activity heatmap updated

## 🌓 Theme Testing
- [ ] Clicked theme toggle (top right)
- [ ] Page switched to light mode
- [ ] All components visible in light mode
- [ ] Clicked toggle again
- [ ] Page switched back to dark mode
- [ ] Refreshed page
- [ ] Theme persisted (stayed same)

## 🔍 Search Testing
- [ ] In dashboard, typed course name in search
- [ ] Course filtered correctly
- [ ] Cleared search
- [ ] All courses visible again

## 📈 Analytics Testing
- [ ] Purchased multiple courses (optional)
- [ ] Completed videos in different courses
- [ ] Charts updated with new data
- [ ] Doughnut chart shows distribution
- [ ] Line chart shows progress
- [ ] Stats updated correctly

## 🎯 Activity Heatmap Testing
- [ ] Performed multiple actions (watch videos, mark complete)
- [ ] Activity count increased for today
- [ ] Color intensity changed
- [ ] Current streak shows 1 (if first day)
- [ ] Longest streak shows correctly
- [ ] Hovered over date square
- [ ] Tooltip shows date and count

## 🔐 Security Testing
- [ ] Logged out
- [ ] Tried to access /dashboard
- [ ] Redirected to /login
- [ ] Tried to access /course/:id
- [ ] Redirected to /login
- [ ] Logged back in
- [ ] Can access dashboard again
- [ ] Can access purchased courses

## 📱 Responsive Testing (Optional)
- [ ] Opened on mobile browser
- [ ] Layout adapts to small screen
- [ ] Navigation works
- [ ] Charts display properly
- [ ] Videos play on mobile
- [ ] Heatmap scrolls horizontally

## 🐛 Error Checking
- [ ] No errors in browser console (F12)
- [ ] No errors in backend terminal
- [ ] No errors in frontend terminal
- [ ] No 404 errors
- [ ] No authentication errors
- [ ] All images load
- [ ] All fonts load

## 📚 Documentation Review
- [ ] Read QUICK_START.md
- [ ] Read DATABASE_SETUP.md
- [ ] Reviewed IMPLEMENTATION_GUIDE.md
- [ ] Checked FEATURES_SUMMARY.md
- [ ] Understood API endpoints
- [ ] Know how to add content

## 🎉 Final Checks
- [ ] Can create multiple accounts
- [ ] Can purchase multiple items
- [ ] Can switch between courses
- [ ] Progress saves correctly
- [ ] Activity tracked accurately
- [ ] Charts update in real-time
- [ ] Theme works everywhere
- [ ] No memory leaks
- [ ] No performance issues

## ⚠️ Common Issues Resolved
- [ ] Port 5000 not in use by other app
- [ ] Supabase credentials correct
- [ ] Stripe keys correct (test mode)
- [ ] Course IDs match in code and DB
- [ ] CORS enabled on backend
- [ ] Browser cache cleared if needed

## 📝 Notes Section
Write any issues encountered and how you solved them:

---

---

---

## ✅ Setup Status

Mark when complete:
- [ ] **ALL SYSTEMS GO** - Ready for production!
- [ ] **NEEDS WORK** - Some features not working
- [ ] **HELP NEEDED** - Stuck on setup

---

**If all checked: CONGRATULATIONS! 🎉**
Your BeatTechs platform is fully operational!

Next steps:
1. Add more course content in Supabase
2. Customize styling and branding
3. Add additional features
4. Prepare for deployment
