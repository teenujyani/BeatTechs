import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import BgLayout from "../component/BgLayout";

const CoursePlayer = () => {
  const { courseId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [videos, setVideos] = useState([]);
  const [modules, setModules] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [progress, setProgress] = useState({});

  const playerRef = useRef(null);
  const watchIntervalRef = useRef(null);

  useEffect(() => {
    if (user && courseId) {
      checkAccessAndLoadCourse();
    }
  }, [user, courseId]);

  useEffect(() => {
    if (currentVideo && hasAccess) {
      loadYouTubeAPI();
      startWatchTracking();
    }

    return () => {
      if (watchIntervalRef.current) clearInterval(watchIntervalRef.current);
    };
  }, [currentVideo, hasAccess]);

  const checkAccessAndLoadCourse = async () => {
    try {
      const accessRes = await fetch(
        `http://localhost:5000/api/purchases/check/${user.id}/${courseId}`
      );

      const accessData = await accessRes.json();

      if (!accessData.owned) {
        navigate("/courses");
        return;
      }

      setHasAccess(true);

      // Load videos
      const contentRes = await fetch(
        `http://localhost:5000/api/content/${courseId}`
      );

      const contentData = await contentRes.json();

      if (contentData.success && contentData.data.length > 0) {
        setCourse({
          course_name: courseId.replace("-", " ").toUpperCase(),
        });

        setVideos(contentData.data);
        setCurrentVideo(contentData.data[0]);
      }

      // Load modules/tests
      const modulesRes = await fetch(
        `http://localhost:5000/api/modules/${courseId}`
      );

      const modulesData = await modulesRes.json();

      if (modulesData.success) {
        setModules(modulesData.data || []);
      }

      // Load progress
      const progressRes = await fetch(
        `http://localhost:5000/api/progress/${user.id}/${courseId}`
      );

      const progressData = await progressRes.json();

      if (progressData.success) {
        const progressMap = {};

        progressData.progress.forEach((p) => {
          progressMap[p.video_id] = p;
        });

        setProgress(progressMap);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error loading course:", error);
      setLoading(false);
    }
  };

  const loadYouTubeAPI = () => {
    if (window.YT) {
      initPlayer();
      return;
    }

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";

    document.body.appendChild(tag);

    window.onYouTubeIframeAPIReady = initPlayer;
  };

  const initPlayer = () => {
    if (!currentVideo) return;

    if (playerRef.current) {
      playerRef.current.destroy();
    }

    playerRef.current = new window.YT.Player("youtube-player", {
      videoId: currentVideo.video_id,
      playerVars: {
        autoplay: 0,
        controls: 1,
        modestbranding: 1,
        rel: 0,
      },
      events: {
        onStateChange: onPlayerStateChange,
      },
    });
  };

  const onPlayerStateChange = (event) => {
    if (event.data === window.YT.PlayerState.ENDED) {
      markVideoComplete();
    }
  };

  const startWatchTracking = () => {
    watchIntervalRef.current = setInterval(async () => {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        const currentTime = Math.floor(playerRef.current.getCurrentTime());
        const duration = Math.floor(playerRef.current.getDuration());

        if (currentTime > 0 && duration > 0) {
          await updateWatchTime(currentTime, duration);
        }
      }
    }, 10000);
  };

  const updateWatchTime = async (watchTime, duration) => {
    try {
      const completionPercent = (watchTime / duration) * 100;
      const isCompleted = completionPercent >= 90;

      await fetch("http://localhost:5000/api/progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          courseId: courseId,
          videoId: currentVideo.video_id,
          videoTitle: currentVideo.video_title,
          watchTime: watchTime,
          completed: isCompleted,
        }),
      });

      setProgress((prev) => ({
        ...prev,
        [currentVideo.video_id]: {
          ...prev[currentVideo.video_id],
          watch_time: watchTime,
          completed: isCompleted,
        },
      }));
    } catch (error) {
      console.error("Error updating watch time:", error);
    }
  };

  const markVideoComplete = async () => {
    try {
      await fetch("http://localhost:5000/api/progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          courseId: courseId,
          videoId: currentVideo.video_id,
          videoTitle: currentVideo.video_title,
          completed: true,
        }),
      });

      setProgress((prev) => ({
        ...prev,
        [currentVideo.video_id]: {
          ...prev[currentVideo.video_id],
          completed: true,
        },
      }));
    } catch (error) {
      console.error("Error marking video complete:", error);
    }
  };

  const selectVideo = (video) => {
    if (watchIntervalRef.current) clearInterval(watchIntervalRef.current);
    setCurrentVideo(video);
  };

  if (loading) {
    return (
      <BgLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#7dd3d8]"></div>
        </div>
      </BgLayout>
    );
  }

  return (
    <BgLayout>
      <div className="min-h-screen py-20 px-6">
        <div className="max-w-7xl mx-auto">

          <button
            onClick={() => navigate("/dashboard")}
            className="mb-6 text-white/70 hover:text-white"
          >
            ← Back to Dashboard
          </button>

          <h1 className="text-3xl font-bold text-white mb-8">
            {course?.course_name}
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* VIDEO PLAYER */}
            <div className="lg:col-span-2">
              <div className="bg-black rounded-lg overflow-hidden aspect-video">
                <div id="youtube-player" className="w-full h-full"></div>
              </div>

              {currentVideo && (
                <div className="mt-4 bg-white/10 backdrop-blur-md rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-white mb-2">
                    {currentVideo.video_title}
                  </h2>

                  {progress[currentVideo.video_id]?.completed && (
                    <span className="text-green-400 text-sm">
                      ✓ Completed
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* SIDEBAR */}
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-4">
                Course Content
              </h3>

              <div className="space-y-2 max-h-[600px] overflow-y-auto">

                {videos.map((video, index) => (
                  <button
                    key={video.video_id}
                    onClick={() => selectVideo(video)}
                    className={`w-full text-left p-3 rounded-lg ${
                      currentVideo?.video_id === video.video_id
                        ? "bg-[#7dd3d8]/20 border border-[#7dd3d8]"
                        : "bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex gap-3">
                      <span className="text-white/60 text-sm">
                        {index + 1}
                      </span>

                      <div>
                        <p className="text-white text-sm">
                          {video.video_title}
                        </p>

                        {progress[video.video_id]?.completed && (
                          <span className="text-green-400 text-xs">
                            ✓ Complete
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                ))}

                {videos.length === 0 && (
                  <p className="text-white/60 text-sm text-center py-4">
                    No content available yet
                  </p>
                )}

              </div>
            </div>

          </div>
        </div>
      </div>
    </BgLayout>
  );
};

export default CoursePlayer;