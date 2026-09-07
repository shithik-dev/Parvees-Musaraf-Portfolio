
import { useEffect, useRef, useState } from "react";
import {
  Maximize,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import { motion } from "framer-motion";

function formatTime(time) {
  if (!Number.isFinite(time)) {
    return "00:00";
  }

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
}

export default function VideoCard({ video }) {
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isControlsVisible, setIsControlsVisible] = useState(false);

  useEffect(() => {
    const element = videoRef.current;

    if (!element) return;

    const loadedMetadata = () => {
      setDuration(element.duration || 0);
    };

    const timeUpdate = () => {
      if (!element.duration) return;

      setProgress((element.currentTime / element.duration) * 100);
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(100);
    };

    element.addEventListener("loadedmetadata", loadedMetadata);
    element.addEventListener("timeupdate", timeUpdate);
    element.addEventListener("play", handlePlay);
    element.addEventListener("pause", handlePause);
    element.addEventListener("ended", handleEnded);

    return () => {
      element.removeEventListener("loadedmetadata", loadedMetadata);
      element.removeEventListener("timeupdate", timeUpdate);
      element.removeEventListener("play", handlePlay);
      element.removeEventListener("pause", handlePause);
      element.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = async () => {
    const element = videoRef.current;

    if (!element) return;

    try {
      if (element.paused) {
        await element.play();
      } else {
        element.pause();
      }
    } catch (error) {
      console.error("Unable to play video:", error);
    }
  };

  const toggleMute = () => {
    const element = videoRef.current;

    if (!element) return;

    element.muted = !element.muted;
    setIsMuted(element.muted);
  };

  const handleProgress = (event) => {
    const element = videoRef.current;

    if (!element || !element.duration) return;

    const value = Number(event.target.value);

    element.currentTime = (value / 100) * element.duration;
    setProgress(value);
  };

  const handleFullscreen = async () => {
    const element = videoRef.current;

    if (!element) return;

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await element.requestFullscreen();
      }
    } catch (error) {
      console.error("Fullscreen error:", error);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.005 }}
      transition={{ duration: 0.4 }}
      className="group relative w-full overflow-hidden bg-black"
    >
      {/* =====================================================
          VIDEO BOX
      ====================================================== */}
      <div className="relative aspect-video w-full overflow-hidden bg-black">
        {/* VIDEO */}
        <video
          ref={videoRef}
          src={video.video}
          poster={video.poster}
          preload="metadata"
          playsInline
          muted={isMuted}
          className="absolute inset-0 block h-full w-full object-cover"
          aria-label={video.title}
          onClick={() => {
            setIsControlsVisible(true);
            togglePlay();
          }}
        />

        {/* =================================================
            CINEMATIC OVERLAY
        ================================================== */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/85 via-transparent to-black/10 opacity-60 transition-opacity duration-500 group-hover:opacity-100" />

        {/* =================================================
            CENTER PLAY BUTTON
        ================================================== */}
        <button
          type="button"
          onClick={() => {
            setIsControlsVisible(true);
            togglePlay();
          }}
          aria-label={isPlaying ? "Pause video" : "Play video"}
          className={`absolute left-1/2 top-1/2 z-20 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-[#c7ff35] hover:text-[#c7ff35] ${
            isPlaying
              ? `${isControlsVisible ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`
              : "opacity-100"
          }`}
        >
          {isPlaying ? (
            <Pause size={22} />
          ) : (
            <Play size={22} className="ml-1" />
          )}
        </button>

        {/* =================================================
            PLAY INDICATOR
        ================================================== */}
        <div className="pointer-events-none absolute left-5 top-5 z-20 flex items-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:left-6 sm:top-6">
          <span className="h-2 w-2 rounded-full bg-[#c7ff35]" />

          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white">
            {isPlaying ? "Playing" : "Play"}
          </span>
        </div>

        {/* =================================================
            VIDEO CONTROLS
        ================================================== */}
        <div className={`absolute inset-x-0 bottom-0 z-30 px-5 pb-5 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:px-7 sm:pb-7 ${isControlsVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}>
          {/* PROGRESS */}
          <input
            type="range"
            min="0"
            max="100"
            step="0.1"
            value={progress}
            onChange={handleProgress}
            aria-label="Video progress"
            className="mb-4 h-1 w-full cursor-pointer appearance-none rounded-full bg-white/20 accent-[#c7ff35]"
          />

          <div className="flex items-center justify-between">
            {/* LEFT CONTROLS */}
            <div className="flex items-center gap-4">
              {/* PLAY / PAUSE */}
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause video" : "Play video"}
                className="text-white transition-colors hover:text-[#c7ff35]"
              >
                {isPlaying ? (
                  <Pause size={18} />
                ) : (
                  <Play size={18} />
                )}
              </button>

              {/* VOLUME */}
              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute video" : "Mute video"}
                className="text-white transition-colors hover:text-[#c7ff35]"
              >
                {isMuted ? (
                  <VolumeX size={18} />
                ) : (
                  <Volume2 size={18} />
                )}
              </button>

              {/* TIME */}
              <span className="font-mono text-[10px] text-white/60">
                {formatTime((progress / 100) * duration)}
                {" / "}
                {formatTime(duration)}
              </span>
            </div>

            {/* FULLSCREEN */}
            <button
              type="button"
              onClick={handleFullscreen}
              aria-label="Enter fullscreen"
              className="text-white transition-colors hover:text-[#c7ff35]"
            >
              <Maximize size={18} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
