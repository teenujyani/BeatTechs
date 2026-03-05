import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const DashboardRight = () => {
  const { user } = useAuth();
  const [activity, setActivity] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const name =
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "Student";

  useEffect(() => {
    if (user) {
      fetchActivityData();
    }
  }, [user]);

  const fetchActivityData = async () => {
    try {
      // Get activity for last 365 days
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      const startDate = oneYearAgo.toISOString().split('T')[0];
      const endDate = new Date().toISOString().split('T')[0];

      const activityRes = await fetch(
        `http://localhost:5000/api/activity/${user.id}?startDate=${startDate}&endDate=${endDate}`
      );
      const activityData = await activityRes.json();

      if (activityData.success) {
        setActivity(activityData.data);
      }

      // Get dashboard stats
      const statsRes = await fetch(`http://localhost:5000/api/dashboard/${user.id}`);
      const statsData = await statsRes.json();

      if (statsData.success) {
        setStats(statsData.stats);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching activity:", error);
      setLoading(false);
    }
  };

  // Generate heatmap data for last 365 days
  const generateHeatmapData = () => {
    const today = new Date();
    const days = [];
    const activityMap = {};

    // Create activity map for quick lookup
    activity.forEach(a => {
      activityMap[a.activity_date] = a.activity_count;
    });

    // Generate last 365 days
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const count = activityMap[dateStr] || 0;
      
      days.push({
        date: dateStr,
        count: count,
        level: count === 0 ? 0 : count <= 2 ? 1 : count <= 5 ? 2 : count <= 10 ? 3 : 4
      });
    }

    return days;
  };

  const heatmapData = generateHeatmapData();
  const activeDays = activity.length;
  const currentStreak = calculateCurrentStreak();
  const longestStreak = calculateLongestStreak();

  function calculateCurrentStreak() {
    if (activity.length === 0) return 0;
    
    const sortedActivity = [...activity].sort((a, b) => 
      new Date(b.activity_date) - new Date(a.activity_date)
    );
    
    let streak = 0;
    const today = new Date().toISOString().split('T')[0];
    let checkDate = new Date(today);
    
    for (let i = 0; i < sortedActivity.length; i++) {
      const activityDate = sortedActivity[i].activity_date;
      const expectedDate = checkDate.toISOString().split('T')[0];
      
      if (activityDate === expectedDate) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
    
    return streak;
  }

  function calculateLongestStreak() {
    if (activity.length === 0) return 0;
    
    const sortedActivity = [...activity].sort((a, b) => 
      new Date(a.activity_date) - new Date(b.activity_date)
    );
    
    let maxStreak = 1;
    let currentStreak = 1;
    
    for (let i = 1; i < sortedActivity.length; i++) {
      const prevDate = new Date(sortedActivity[i - 1].activity_date);
      const currDate = new Date(sortedActivity[i].activity_date);
      const diffDays = (currDate - prevDate) / (1000 * 60 * 60 * 24);
      
      if (diffDays === 1) {
        currentStreak++;
        maxStreak = Math.max(maxStreak, currentStreak);
      } else {
        currentStreak = 1;
      }
    }
    
    return maxStreak;
  }

  const getColorClass = (level) => {
    switch (level) {
      case 0: return "bg-gray-200";
      case 1: return "bg-[#7dd3d8]/30";
      case 2: return "bg-[#7dd3d8]/60";
      case 3: return "bg-[#7dd3d8]/80";
      case 4: return "bg-[#7dd3d8]";
      default: return "bg-gray-200";
    }
  };

  if (loading) {
    return (
      <aside className="w-80 p-6 text-white">
        <div className="animate-pulse space-y-4">
          <div className="h-20 bg-white/10 rounded-xl"></div>
          <div className="h-64 bg-white/10 rounded-xl"></div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-80 p-6 text-white space-y-6">
      {/* USER NAME */}
      <div className="bg-black/30 rounded-2xl p-4">
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-white/60 mt-1">
          {stats?.totalCourses || 0} courses enrolled
        </p>
      </div>

      {/* ACTIVITY HEATMAP */}
      <div className="bg-white rounded-xl p-4 text-black">
        <h3 className="font-semibold mb-3">Activity Calendar</h3>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4 text-center">
          <div className="bg-gray-100 rounded-lg p-2">
            <p className="text-xs text-gray-600">Active Days</p>
            <p className="text-lg font-bold">{activeDays}</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-2">
            <p className="text-xs text-gray-600">Current</p>
            <p className="text-lg font-bold">{currentStreak}🔥</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-2">
            <p className="text-xs text-gray-600">Longest</p>
            <p className="text-lg font-bold">{longestStreak}</p>
          </div>
        </div>

        {/* Heatmap Grid */}
        <div className="overflow-x-auto">
          <div className="grid grid-cols-53 gap-[2px] min-w-max">
            {heatmapData.map((day, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-sm ${getColorClass(day.level)}`}
                title={`${day.date}: ${day.count} activities`}
              />
            ))}
          </div>
          
          {/* Legend */}
          <div className="flex items-center gap-2 mt-3 text-xs text-gray-600">
            <span>Less</span>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map(level => (
                <div
                  key={level}
                  className={`w-3 h-3 rounded-sm ${getColorClass(level)}`}
                />
              ))}
            </div>
            <span>More</span>
          </div>
        </div>
      </div>

      {/* STATS CARD */}
      <div className="bg-white rounded-xl p-4 text-black">
        <h3 className="font-semibold mb-3">Learning Stats</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Total Activity</span>
            <span className="font-bold text-[#7dd3d8]">{stats?.totalActivity || 0}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Tests Taken</span>
            <span className="font-bold text-[#7dd3d8]">{stats?.totalTests || 0}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Modules</span>
            <span className="font-bold text-[#7dd3d8]">{stats?.totalModules || 0}</span>
          </div>

          {/* Progress Circle */}
          <div className="pt-3 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Overall Progress</p>
            <div className="relative w-32 h-32 mx-auto">
              <svg className="transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="#f0f0f0"
                  strokeWidth="10"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="#7dd3d8"
                  strokeWidth="10"
                  strokeDasharray={`${(stats?.totalCourses || 0) * 10} 314`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-[#7dd3d8]">
                  {stats?.totalCourses || 0}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default DashboardRight;
