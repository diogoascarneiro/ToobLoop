import { useState, useEffect, useCallback } from "react";
import YouTube, { YouTubePlayer } from "react-youtube";

interface VideoPlayerProps {
  videoId: string;
  index: number;
}

interface Options {
  height: string | number;
  width: string | number;
  playerVars?: {
    autoplay?: 0 | 1;
    controls?: 0 | 1;
    disablekb?: 0 | 1;
    modestbranding?: 0 | 1;
    [key: string]: string | number | undefined;
  };
}

interface LoopSettings {
  enabled: boolean;
  startTime: number;
  endTime: number;
}

const VideoPlayer = ({ videoId, index }: VideoPlayerProps) => {
  const [player, setPlayer] = useState<YouTubePlayer | null>(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [pendingCommands, setPendingCommands] = useState<Array<{ type: string; data: any }>>([]);
  const [loopSettings, setLoopSettings] = useState<LoopSettings>({
    enabled: false,
    startTime: 0,
    endTime: 0,
  });

  const onReady = (event: { target: YouTubePlayer }) => {
    setPlayer(event.target);
    setIsPlayerReady(true);
  };

  // Reset ready state when video ID changes
  useEffect(() => {
    setIsPlayerReady(false);
    setPendingCommands([]);
  }, [videoId]);

  // Function to execute a command
  const executeCommand = useCallback(
    (type: string, data: any) => {
      if (!player) return;

      switch (type) {
        case "VIDEO_PLAY":
          player.playVideo();
          break;
        case "VIDEO_PAUSE":
          player.pauseVideo();
          break;
        case "VIDEO_SPEED":
          if (typeof data.speed === "number") {
            player.setPlaybackRate(data.speed);
          }
          break;
        case "VIDEO_LOOP_SETTINGS":
          if (typeof data.loopSettings === "object") {
            setLoopSettings(data.loopSettings);
          }
          break;
        case "VIDEO_SEEK":
          if (typeof data.time === "number") {
            player.seekTo(data.time, true);
          }
          break;
      }
    },
    [player]
  );

  // Execute pending commands when player becomes ready
  useEffect(() => {
    if (isPlayerReady && player && pendingCommands.length > 0) {
      pendingCommands.forEach((command) => {
        executeCommand(command.type, command.data);
      });
      setPendingCommands([]);
    }
  }, [isPlayerReady, player, pendingCommands, executeCommand]);

  // Handle video state changes
  const onStateChange = (event: { target: YouTubePlayer; data: number }) => {
    // YouTube player states: -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (video cued)
    if (event.data === 0) {
      // Video ended
      if (loopSettings.enabled) {
        // If looping is enabled, restart from loop start point
        event.target.seekTo(loopSettings.startTime, true);
        event.target.playVideo();
      } else {
        // Send message to controls window that video has ended
        if (typeof window !== "undefined") {
          window.dispatchEvent(
            new MessageEvent("message", {
              data: {
                type: "VIDEO_ENDED",
                index,
              },
            })
          );
        }
      }
    }
  };

  // Check if video needs to loop and send time updates
  useEffect(() => {
    if (!player) return;

    const checkTime = () => {
      const currentTime = player.getCurrentTime();

      // Send current time to controls window
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new MessageEvent("message", {
            data: {
              type: "VIDEO_TIME_UPDATE",
              index,
              currentTime,
            },
          })
        );
      }

      // Check if we need to loop
      if (loopSettings.enabled && currentTime >= loopSettings.endTime) {
        player.seekTo(loopSettings.startTime, true);
      }
    };

    // Check every 200ms
    const intervalId = setInterval(checkTime, 200);

    return () => {
      clearInterval(intervalId);
    };
  }, [player, loopSettings, index]);

  useEffect(() => {
    // Listen for messages from the controls window
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || typeof event.data !== "object" || event.data.index !== index) {
        return;
      }

      // If player is ready, execute command immediately
      if (isPlayerReady && player) {
        executeCommand(event.data.type, event.data);
      } else {
        // Otherwise, queue the command for later execution
        setPendingCommands((prev) => [...prev, { type: event.data.type, data: event.data }]);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [player, index, isPlayerReady, executeCommand]);

  const opts: Options = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 0,
      controls: 0,
      disablekb: 1,
      modestbranding: 1,
    },
  };

  return (
    <div className="flex flex-col h-full">
      <div className="relative flex-grow">
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={onReady}
          onStateChange={onStateChange}
          className="h-full w-full"
        />
        {/* Transparent overlay to prevent direct interaction with the video */}
        <div className="absolute inset-0 z-10" />
      </div>
    </div>
  );
};

export default VideoPlayer;
