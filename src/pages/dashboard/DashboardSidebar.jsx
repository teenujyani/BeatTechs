import { FiHome, FiBook, FiBarChart2, FiUser } from "react-icons/fi";

const DashboardSidebar = () => {
  return (
    <aside className="w-20 min-h-screen bg-[#050b3a] flex flex-col items-center py-8 gap-8">

      {/* PROFILE DOT */}
      <div className="w-10 h-10 rounded-full bg-[#7dd3d8]" />

      {/* NAV ICONS */}
      <div className="flex flex-col gap-8 text-white opacity-80">
        <span>🏠</span>
        <span>📚</span>
        <span>📊</span>
        <span>👤</span>
      </div>

    </aside>
  );
};

export default DashboardSidebar;

