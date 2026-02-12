import DashboardSidebar from "./DashboardSidebar";
import DashboardMain from "./DashboardMain";
import DashboardRight from "./DashboardRight";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050b3a] to-[#3a2a8f]">

      {/* GRID LAYOUT */}
      <div className="flex">

        {/* LEFT SIDEBAR */}
        <DashboardSidebar />

        {/* CENTER CONTENT */}
        <main className="flex-1 px-10 py-8">
          <DashboardMain />
        </main>

        {/* RIGHT PANEL */}
        <DashboardRight />

      </div>
    </div>
  );
};

export default Dashboard;
