import { useAuth } from "../../context/AuthContext";

const DashboardRight = () => {
  const { user } = useAuth();

  const name =
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "Student";

  return (
    <aside className="w-80 p-6 text-white">

      {/* USER NAME */}
      <div className="bg-black/30 rounded-2xl p-4 mb-6">
        <p className="font-semibold">{name}</p>
      </div>

      {/* CALENDAR */}
      <div className="bg-white rounded-xl p-4 text-black mb-6">
        <p className="font-semibold mb-2">Calendar</p>
        <div className="h-40 bg-gray-100 rounded" />
      </div>

      {/* ASSIGNMENT */}
      <div className="bg-white rounded-xl p-4 text-black">
        <p className="font-semibold mb-2">Assignment Completion</p>
        <div className="text-center text-xl font-bold">75%</div>
      </div>

    </aside>
  );
};

export default DashboardRight;
