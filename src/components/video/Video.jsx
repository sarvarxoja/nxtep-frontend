import React, { useState, useRef } from "react";
import {
  Play,
  Pause,
  Volume2,
  Volume1,
  Volume,
  VolumeX,
  Maximize,
  RotateCcw,
  Settings,
  PictureInPicture,
} from "lucide-react";
import "./video.css";

export const VideoComponent = ({ media }) => {
  console.log(media);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [previousVolume, setPreviousVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [quality, setQuality] = useState("auto");
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const videoRef = useRef(null);
  const progressBarRef = useRef(null);
  const volumeControlTimeoutRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e) => {
    if (videoRef.current) {
      const volumeValue = parseFloat(e.target.value);
      setVolume(volumeValue);
      videoRef.current.volume = volumeValue;
      setIsMuted(volumeValue === 0);
      if (volumeValue > 0) {
        setPreviousVolume(volumeValue);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = previousVolume;
        setVolume(previousVolume);
      } else {
        setPreviousVolume(volume);
        videoRef.current.volume = 0;
        setVolume(0);
      }
      setIsMuted(!isMuted);
      videoRef.current.muted = !isMuted;
    }
  };

  const getVolumeIcon = () => {
    if (volume === 0 || isMuted) return <VolumeX size={24} />;
    if (volume < 0.3) return <Volume size={24} />;
    if (volume < 0.7) return <Volume1 size={24} />;
    return <Volume2 size={24} />;
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleProgressClick = (e) => {
    if (progressBarRef.current && videoRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = pos * videoRef.current.duration;
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const togglePictureInPicture = async () => {
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else if (document.pictureInPictureEnabled) {
        await videoRef.current.requestPictureInPicture();
      }
    } catch (error) {
      console.error("Picture-in-Picture failed:", error);
    }
  };

  const handleSpeedChange = (speed) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
      setPlaybackSpeed(speed);
      setShowDropdown(false);
    }
  };

  const handleQualityChange = (newQuality) => {
    setQuality(newQuality);
    setShowDropdown(false);
  };

  const handleVolumeSliderVisibility = (show) => {
    if (volumeControlTimeoutRef.current) {
      clearTimeout(volumeControlTimeoutRef.current);
    }

    if (!show) {
      volumeControlTimeoutRef.current = setTimeout(() => {
        setShowVolumeSlider(false);
      }, 2000);
    } else {
      setShowVolumeSlider(true);
    }
  };

  return (
    <div className="video-container">
      <div className="video-player">
        <video
          ref={videoRef}
          className="video"
          onTimeUpdate={handleTimeUpdate}
          src={media}
        >
          Your browser does not support the video tag.
        </video>

        <div className="controls-overlay">
          <div
            ref={progressBarRef}
            className="progress-bar"
            onClick={handleProgressClick}
          >
            <div className="progress" style={{ width: `${progress}%` }}>
              <div className="progress-handle" />
            </div>
          </div>

          <div className="controls">
            <div className="left-controls">
              <button onClick={togglePlay} className="control-button">
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>

              <div className="time-display">
                {videoRef.current
                  ? formatTime(videoRef.current.currentTime)
                  : "0:00"}{" "}
                /
                {videoRef.current
                  ? formatTime(videoRef.current.duration)
                  : "0:00"}
              </div>

              <div
                className="volume-control"
                onMouseEnter={() => handleVolumeSliderVisibility(true)}
                onMouseLeave={() => handleVolumeSliderVisibility(false)}
              >
                <button onClick={toggleMute} className="control-button">
                  {getVolumeIcon()}
                </button>

                <div
                  className={`volume-slider ${showVolumeSlider ? "show" : ""}`}
                >
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="slider"
                  />
                </div>
              </div>
            </div>

            <div className="right-controls">
              <button
                onClick={togglePictureInPicture}
                className="control-button"
                title="Picture in Picture"
              >
                <PictureInPicture size={24} />
              </button>

              <button
                onClick={() => videoRef.current?.load()}
                className="control-button"
              >
                <RotateCcw size={24} />
              </button>

              <div className="settings-dropdown">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="control-button"
                >
                  <Settings size={24} />
                </button>

                {showDropdown && (
                  <div className="dropdown-menu">
                    <div className="dropdown-content">
                      <div className="dropdown-header">Settings</div>
                      <div className="dropdown-divider"></div>
                      <div className="dropdown-label">Playback Speed</div>
                      {[0.5, 1, 1.5, 2].map((speed) => (
                        <div
                          key={speed}
                          className={`dropdown-item ${
                            playbackSpeed === speed ? "active" : ""
                          }`}
                          onClick={() => handleSpeedChange(speed)}
                        >
                          {speed}x
                        </div>
                      ))}
                      <div className="dropdown-divider"></div>
                      <div className="dropdown-label">Quality</div>
                      {["auto", "1080p", "720p", "480p"].map((q) => (
                        <div
                          key={q}
                          className={`dropdown-item ${
                            quality === q ? "active" : ""
                          }`}
                          onClick={() => handleQualityChange(q)}
                        >
                          {q}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button className="control-button">
                <Maximize size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
