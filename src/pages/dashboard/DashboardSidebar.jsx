import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, BookOpen, BarChart2, User, ChevronLeft, ChevronRight } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const DashboardSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: BookOpen, label: "My Courses", path: "/dashboard" },
    { icon: BarChart2, label: "Analytics", path: "/dashboard" },
    { icon: User, label: "Profile", path: "/dashboard" },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-64"
      } min-h-screen bg-gradient-to-b from-[#020726] to-[#050b3a] dark:from-[#020726] dark:to-[#050b3a] flex flex-col py-8 transition-all duration-300 shadow-xl`}
    >
      {/* Profile Section */}
      <div className="px-6 mb-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7dd3d8] to-[#5ab5ba] flex items-center justify-center text-white font-bold">
          {user?.email?.[0].toUpperCase() || "U"}
        </div>
        {!collapsed && (
          <div className="flex-1 overflow-hidden">
            <p className="text-white font-semibold text-sm truncate">
              {user?.user_metadata?.name || user?.email?.split("@")[0]}
            </p>
            <p className="text-white/60 text-xs truncate">{user?.email}</p>
          </div>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  active
                    ? "bg-[#7dd3d8]/20 text-[#7dd3d8] border-l-4 border-[#7dd3d8]"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={20} />
                {!collapsed && (
                  <span className="font-medium text-sm">{item.label}</span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Collapse Toggle */}
      <div className="px-4">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-all"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          {!collapsed && <span className="text-sm">Collapse</span>}
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;

