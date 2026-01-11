import { useState, useEffect } from "react";
import Link from "next/link";
import VideoPlayer from "./VideoPlayer";

// Default video IDs (you can replace these with any YouTube video IDs)
const DEFAULT_VIDEOS = [
  "jOCNmimkFTs", // Funky Drummer - Slot 1
  "J7VNYIf39u0", // Visual music/VJ loop 2
  "cd4-UnU8lWY", // Visual music/VJ loop 3
  "rYoZgpAEkFs", // Visual music/VJ loop 4
  "qx8hrhBZJ98", // Visual music/VJ loop 5
  "5K4BlOrzlyU", // Visual music/VJ loop 6
  "_dWyKj7I9JM", // Visual music/VJ loop 7
  "5mdvajc9cHU", // Visual music/VJ loop 8
];

interface VideoGridProps {
  videoCount: number;
}

// Header component
const Header = ({
  isVisible,
  videoCount,
  openControlsWindow,
  onMouseEnter,
  onMouseLeave,
  onBackClick,
}: {
  isVisible: boolean;
  videoCount: number;
  openControlsWindow: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onBackClick: () => void;
}) => {
  return (
    <header
      className={`bg-gray-900 text-white p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform -translate-y-full pointer-events-none"
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      <div className="flex items-center gap-3">
        <Link
          href="/"
          onClick={onBackClick}
          className="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded flex items-center"
          title="Back to start">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
        <h1 className="text-2xl font-bold">T∞bL∞p</h1>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-gray-300">Watching {videoCount} videos</span>
        <button onClick={openControlsWindow} className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded">
          Open Controls
        </button>
      </div>
    </header>
  );
};

const VideoGrid = ({ videoCount = 6 }: VideoGridProps) => {
  const [videoIds, setVideoIds] = useState<string[]>([]);
  const [controlsWindow, setControlsWindow] = useState<Window | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isHoveringHeader, setIsHoveringHeader] = useState(false);

  // Initialize videos based on count
  useEffect(() => {
    setVideoIds(DEFAULT_VIDEOS.slice(0, videoCount));
    setIsInitialized(true);
  }, [videoCount]);

  useEffect(() => {
    // Listen for messages from the controls window
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === "VIDEO_CHANGE") {
        const { index, videoId } = event.data;
        if (typeof index === "number" && videoId && index >= 0 && index < videoIds.length) {
          const newVideoIds = [...videoIds];
          newVideoIds[index] = videoId;
          setVideoIds(newVideoIds);
        }
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [videoIds]);

  const openControlsWindow = () => {
    if (typeof window !== "undefined" && videoIds.length > 0) {
      const controlsUrl = `${window.location.origin}/controls?videos=${encodeURIComponent(JSON.stringify(videoIds))}`;

      // Calculate position for centered window
      const width = Math.min(800, window.innerWidth * 0.8);
      const height = Math.min(800, window.innerHeight * 0.8);
      const left = (window.innerWidth - width) / 2 + window.screenX;
      const top = (window.innerHeight - height) / 2 + window.screenY;

      const newWindow = window.open(
        controlsUrl,
        "VideoControls",
        `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
      );

      if (newWindow) {
        setControlsWindow(newWindow);
        newWindow.focus();
      }
    }
  };

  // Open controls window automatically after videoIds are initialized
  useEffect(() => {
    if (isInitialized && videoIds.length > 0) {
      openControlsWindow();
    }

    return () => {
      // Close the controls window when the component unmounts
      if (controlsWindow) {
        controlsWindow.close();
      }
    };
  }, [isInitialized, videoIds.length]); // eslint-disable-line react-hooks/exhaustive-deps

  // Determine grid columns based on video count
  const getGridColumns = () => {
    if (videoCount === 1) return "grid-cols-1";
    if (videoCount === 2) return "grid-cols-2";
    if (videoCount <= 4) return "grid-cols-2";
    if (videoCount <= 6) return "grid-cols-3";
    return "grid-cols-4";
  };

  // Get the grid template for rows
  const getGridRows = () => {
    return "grid-rows-2"; // Always use 2 rows for our layout
  };

  // Arrange videos in the grid
  const arrangeVideos = () => {
    // Create a copy of the videoIds array
    const arrangedVideos = [...videoIds];

    // For odd numbers of videos, move the last video to a position where it can span 2 rows
    if (videoCount % 2 === 1 && videoCount > 1) {
      const columns = videoCount <= 4 ? 2 : videoCount <= 6 ? 3 : 4;

      // Calculate the position for the last video (last column, first row)
      const lastVideoPosition = columns - 1;

      // Get the last video ID
      const lastVideoId = arrangedVideos.pop()!;

      // Insert the last video at the calculated position
      arrangedVideos.splice(lastVideoPosition, 0, lastVideoId);
    }

    return arrangedVideos;
  };

  // Determine if a video should span multiple grid cells
  const getVideoClassName = (index: number) => {
    // For odd numbers of videos, find the video that should span 2 rows
    if (videoCount % 2 === 1 && videoCount > 1) {
      const columns = videoCount <= 4 ? 2 : videoCount <= 6 ? 3 : 4;

      // Calculate the position for the video that should span 2 rows (last column, first row)
      const specialPosition = columns - 1;

      // If this is the video at the special position, make it span 2 rows
      if (index === specialPosition) {
        return "col-span-1 row-span-2";
      }
    }

    return "";
  };

  // Simplified mouse movement detection to show/hide header
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Show header if mouse is near the top of the screen (within 100px)
      if (e.clientY < 100) {
        setIsHeaderVisible(true);
      } else if (!isHoveringHeader) {
        // Hide header immediately if not hovering over it
        setIsHeaderVisible(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Show header initially for 3 seconds then hide
    setIsHeaderVisible(true);
    const initialTimeout = setTimeout(() => {
      setIsHeaderVisible(false);
    }, 3000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(initialTimeout);
    };
  }, [isHoveringHeader]);

  const handleHeaderMouseEnter = () => {
    setIsHoveringHeader(true);
    setIsHeaderVisible(true);
  };

  const handleHeaderMouseLeave = () => {
    setIsHoveringHeader(false);
    setIsHeaderVisible(false);
  };

  const handleBackClick = () => {
    // Close the controls window when navigating back
    if (controlsWindow && !controlsWindow.closed) {
      controlsWindow.close();
    }
  };

  return (
    <div className="h-screen w-full overflow-hidden bg-black">
      <Header
        isVisible={isHeaderVisible}
        videoCount={videoCount}
        openControlsWindow={openControlsWindow}
        onMouseEnter={handleHeaderMouseEnter}
        onMouseLeave={handleHeaderMouseLeave}
        onBackClick={handleBackClick}
      />

      <div className={`grid ${getGridColumns()} ${getGridRows()} gap-2 h-full w-full`}>
        {arrangeVideos().map((videoId, index) => (
          <div key={index} className={`h-full w-full ${getVideoClassName(index)}`}>
            <VideoPlayer videoId={videoId} index={videoIds.indexOf(videoId)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoGrid;
