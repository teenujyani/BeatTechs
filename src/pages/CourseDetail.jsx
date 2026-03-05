import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import BgLayout from "../component/BgLayout";

const CourseDetail = () => {
  const { courseId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [courseContent, setCourseContent] = useState([]);
  const [userProgress, setUserProgress] = useState({});
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    if (user && courseId) {
      checkAccessAndLoadCourse();
    }
  }, [user, courseId]);

  const checkAccessAndLoadCourse = async () => {
    try {
      // Check if user has purchased the course
      const accessRes = await fetch(
        `http://localhost:5000/api/purchases/check/${user.id}/${courseId}`
      );
      const accessData = await accessRes.json();

      if (!accessData.owned) {
        navigate("/courses");
        return;
      }

      setHasAccess(true);

      // Load course content
      const contentRes = await fetch(`http://localhost:5000/api/content/${courseId}`);
      const contentData = await contentRes.json();

      if (contentData.success) {
        setCourseContent(contentData.data);
        if (contentData.data.length > 0) {
          setSelectedVideo(contentData.data[0]);
        }
      }

      // Load user progress
      const progressRes = await fetch(
        `http://localhost:5000/api/progress/${user.id}/${courseId}`
      );
      const progressData = await progressRes.json();

      if (progressData.success) {
        const progressMap = {};
        progressData.progress.forEach(p => {
          progressMap[p.video_id] = p;
        });
        setUserProgress(progressMap);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error loading course:", error);
      setLoading(false);
    }
  };

  const markVideoComplete = async (video) => {
    try {
      const response = await fetch("http://localhost:5000/api/progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: user.id,
          courseId: courseId,
          videoId: video.video_id,
          videoTitle: video.video_title,
          completed: true
        })
      });

      const data = await response.json();

      if (data.success) {
        setUserProgress(prev => ({
          ...prev,
          [video.video_id]: { ...video, completed: true }
        }));

        // Log activity
        await fetch("http://localhost:5000/api/activity", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userId: user.id,
            date: new Date().toISOString().split('T')[0]
          })
        });
      }
    } catch (error) {
      console.error("Error marking video complete:", error);
    }
  };

  const groupBySection = () => {
    const sections = {};
    courseContent.forEach(video => {
      const key = `${video.section_number}-${video.section_title}`;
      if (!sections[key]) {
        sections[key] = {
          number: video.section_number,
          title: video.section_title,
          videos: []
        };
      }
      sections[key].videos.push(video);
    });
    return Object.values(sections).sort((a, b) => a.number - b.number);
  };

  const sections = groupBySection();
  const totalVideos = courseContent.length;
  const completedVideos = Object.values(userProgress).filter(p => p.completed).length;
  const completionPercentage = totalVideos > 0 ? Math.round((completedVideos / totalVideos) * 100) : 0;

  if (loading) {
    return (
      <BgLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#7dd3d8]"></div>
        </div>
      </BgLayout>
    );
  }

  if (!hasAccess) {
    return null;
  }

  return (
    <BgLayout>
      <div className="min-h-screen py-10 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <button
              onClick={() => navigate("/dashboard")}
              className="text-white/70 hover:text-white mb-4 flex items-center gap-2"
            >
              ← Back to Dashboard
            </button>
            <h1 className="text-3xl font-bold text-white mb-2">
              {selectedVideo?.course_title}
            </h1>
            <div className="flex items-center gap-4 text-white/70">
              <span>{completedVideos} / {totalVideos} lessons completed</span>
              <div className="flex-1 max-w-md h-2 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#7dd3d8] transition-all"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
              <span>{completionPercentage}%</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Video Player */}
            <div className="lg:col-span-2">
              <div className="bg-black rounded-xl overflow-hidden mb-4">
                {selectedVideo ? (
                  <iframe
                    width="100%"
                    height="500"
                    src={selectedVideo.video_url}
                    title={selectedVideo.video_title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div className="h-[500px] flex items-center justify-center text-white/50">
                    Select a video to start learning
                  </div>
                )}
              </div>

              {selectedVideo && (
                <div className="bg-white rounded-xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        {selectedVideo.video_title}
                      </h2>
                      <p className="text-gray-600">
                        Section {selectedVideo.section_number}: {selectedVideo.section_title}
                      </p>
                    </div>
                    {!userProgress[selectedVideo.video_id]?.completed && (
                      <button
                        onClick={() => markVideoComplete(selectedVideo)}
                        className="px-4 py-2 rounded-lg bg-[#7dd3d8] text-white font-semibold hover:opacity-90 transition"
                      >
                        Mark as Complete
                      </button>
                    )}
                  </div>

                  {userProgress[selectedVideo.video_id]?.completed && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2 text-green-700">
                      <span className="text-xl">✓</span>
                      <span className="font-semibold">Completed</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Course Content Sidebar */}
            <div className="bg-white rounded-xl p-6 h-fit lg:max-h-[700px] overflow-y-auto">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Course Content</h3>

              <div className="space-y-4">
                {sections.map((section, idx) => (
                  <div key={idx} className="border-b border-gray-200 pb-4 last:border-0">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      {section.number}. {section.title}
                    </h4>

                    <div className="space-y-2">
                      {section.videos.map((video) => {
                        const isCompleted = userProgress[video.video_id]?.completed;
                        const isSelected = selectedVideo?.video_id === video.video_id;

                        return (
                          <button
                            key={video.id}
                            onClick={() => setSelectedVideo(video)}
                            className={`w-full text-left p-3 rounded-lg transition ${
                              isSelected
                                ? "bg-[#7dd3d8] text-white"
                                : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                                isCompleted
                                  ? "bg-green-500 text-white"
                                  : isSelected
                                  ? "bg-white text-[#7dd3d8]"
                                  : "bg-white text-gray-400 border border-gray-300"
                              }`}>
                                {isCompleted ? "✓" : video.order_index}
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium">{video.video_title}</p>
                                <p className={`text-xs ${
                                  isSelected ? "text-white/70" : "text-gray-500"
                                }`}>
                                  {Math.floor(video.duration / 60)} min
                                </p>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </BgLayout>
  );
};

export default CourseDetail;
