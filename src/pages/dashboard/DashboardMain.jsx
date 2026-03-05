import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const DashboardMain = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [purchases, setPurchases] = useState([]);
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const name =
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "Learner";

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      const purchasesRes = await fetch(`http://localhost:5000/api/purchases/${user.id}`);
      const purchasesData = await purchasesRes.json();
      
      if (purchasesData.success) {
        // Show all purchases but filter duplicates by item_id
        const uniquePurchases = [];
        const seenIds = new Set();
        
        purchasesData.data.forEach(purchase => {
          if (!seenIds.has(purchase.item_id)) {
            seenIds.add(purchase.item_id);
            uniquePurchases.push(purchase);
          }
        });
        
        setPurchases(uniquePurchases);
      }

      const progressRes = await fetch(`http://localhost:5000/api/progress/${user.id}`);
      const progressData = await progressRes.json();
      
      if (progressData.success) {
        setProgressData(progressData.data);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setLoading(false);
    }
  };

  const filteredContent = purchases.filter(item =>
    item.item_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const progressChartData = {
    labels: progressData.map(p => p.courseTitle),
    datasets: [
      {
        label: "Completion %",
        data: progressData.map(p => p.completionPercentage),
        borderColor: "#7dd3d8",
        backgroundColor: "rgba(125, 211, 216, 0.1)",
        tension: 0.4,
      },
    ],
  };

  const courseTypeData = {
    labels: ["Courses", "Workshops", "Tests", "Modules"],
    datasets: [
      {
        data: [
          purchases.filter(p => p.item_type === "course").length,
          purchases.filter(p => p.item_type === "workshop").length,
          purchases.filter(p => p.item_type === "test").length,
          purchases.filter(p => p.item_type === "module").length,
        ],
        backgroundColor: ["#7dd3d8", "#ff6b9d", "#ffd93d", "#6bcf7f"],
      },
    ],
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#7dd3d8]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* SEARCH */}
      <input
        placeholder="Search courses..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-80 px-5 py-3 rounded-full bg-white/10 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-[#7dd3d8]"
      />

      {/* GREETING */}
      <div className="bg-gradient-to-r from-[#020726] to-[#0b3c4a] dark:from-[#020726] dark:to-[#0b3c4a] bg-white/90 rounded-2xl p-6 text-gray-900 dark:text-white shadow-lg">
        <h1 className="text-2xl font-bold">Hello, {name} 👋</h1>
        <p className="text-gray-600 dark:text-white/70 mt-1">Let's continue your learning journey!</p>
        <div className="mt-4 flex gap-6">
          <div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{purchases.length}</p>
            <p className="text-sm text-gray-600 dark:text-white/60">Total Purchases</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{purchases.filter(p => p.item_type === "course").length}</p>
            <p className="text-sm text-gray-600 dark:text-white/60">Courses</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{purchases.filter(p => p.item_type === "workshop").length}</p>
            <p className="text-sm text-gray-600 dark:text-white/60">Workshops</p>
          </div>
        </div>
      </div>

      {/* MY CONTENT */}
      <section>
        <h2 className="text-lg text-gray-900 dark:text-white font-semibold mb-4">My Learning Content</h2>

        {filteredContent.length === 0 ? (
          <div className="bg-white/10 dark:bg-white/10 rounded-xl p-8 text-center text-gray-600 dark:text-white/60">
            <p className="text-lg mb-2">No content purchased yet</p>
            <p className="text-sm">Browse our courses, workshops, and modules to start learning!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContent.map((item) => {
              const progress = progressData.find(p => p.courseId === item.item_id);
              const completionPercentage = progress?.completionPercentage || 0;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-xl p-5 shadow-lg hover:shadow-xl transition cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-800 mb-1">
                        {item.item_title}
                      </h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        item.item_type === "course" ? "bg-blue-100 text-blue-700" :
                        item.item_type === "workshop" ? "bg-purple-100 text-purple-700" :
                        item.item_type === "test" ? "bg-yellow-100 text-yellow-700" :
                        "bg-green-100 text-green-700"
                      }`}>
                        {item.item_type}
                      </span>
                    </div>
                  </div>

                  <div className="mb-2">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#7dd3d8] transition-all duration-300"
                        style={{ width: `${completionPercentage}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {completionPercentage}% Complete
                    </p>
                  </div>

                  <p className="text-xs text-gray-500">
                    Purchased: {new Date(item.purchased_at).toLocaleDateString()}
                  </p>

                  <button 
                    onClick={() => navigate(`/player/${item.item_id}`)}
                    className="mt-3 w-full py-2 rounded-lg bg-[#7dd3d8] text-white font-semibold hover:opacity-90 transition"
                  >
                    Continue Learning
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* MY PROGRESS - CHARTS */}
      {progressData.length > 0 && (
        <section>
          <h2 className="text-lg text-gray-900 dark:text-white font-semibold mb-4">My Progress</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Line Chart - Course Progress */}
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-semibold mb-4 text-gray-800">Course Completion Progress</h3>
              <Line
                data={progressChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: 100,
                      ticks: {
                        callback: (value) => value + "%",
                      },
                    },
                  },
                }}
              />
            </div>

            {/* Doughnut Chart - Course Types */}
            <div className="bg-white rounded-xl p-6 flex flex-col items-center justify-center">
              <h3 className="font-semibold mb-4 text-gray-800">Purchase Distribution</h3>
              <div className="w-64 h-64">
                <Doughnut
                  data={courseTypeData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                      legend: {
                        position: "bottom",
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      )}

    </div>
  );
};

export default DashboardMain;
