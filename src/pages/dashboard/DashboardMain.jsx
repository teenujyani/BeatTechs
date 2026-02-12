import { useAuth } from "../../context/AuthContext";

const DashboardMain = () => {
  const { user } = useAuth();

  const name =
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "Learner";

  return (
    <div className="space-y-10">

      {/* SEARCH */}
      <input
        placeholder="Search"
        className="w-80 px-5 py-3 rounded-full bg-white/10 text-white placeholder-white/60 outline-none"
      />

      {/* GREETING */}
      <div className="bg-gradient-to-r from-[#020726] to-[#0b3c4a] rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold">
          Hello, {name} 👋
        </h1>
        <p className="text-white/70 mt-1">
          Let’s start learning!
        </p>
      </div>

      {/* MY COURSES */}
      <section>
        <h2 className="text-lg text-white font-semibold mb-4">
          My Courses
        </h2>

        <div className="flex gap-6">
          {[1, 2, 3].map((_, i) => (
            <div
              key={i}
              className="w-44 h-32 rounded-xl bg-white/10 flex items-center justify-center text-white/50"
            >
              Course Card
            </div>
          ))}
        </div>
      </section>

      {/* MY PROGRESS */}
      <section>
        <h2 className="text-lg text-white font-semibold mb-4">
          My Progress
        </h2>

        <div className="flex gap-6">
          {/* Progress Bar */}
          <div className="bg-white rounded-xl p-4 w-72">
            <h3 className="font-semibold mb-2">
              Course Progress
            </h3>

            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full w-[55%] bg-[#7dd3d8]" />
            </div>

            <p className="text-sm mt-2 text-gray-600">
              Computer Science – 55%
            </p>
          </div>

          {/* Chart Placeholder */}
          <div className="bg-white rounded-xl p-4 w-72 flex items-center justify-center text-gray-500">
            Chart Placeholder
          </div>
        </div>
      </section>

    </div>
  );
};

export default DashboardMain;
