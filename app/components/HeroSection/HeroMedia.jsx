import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./index.module.css";

const HeroMedia = ({ imageSrc, videoSrc, isTriggered, onFinished, alt }) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const handleFocus = () => {
      const video = videoRef.current;
      // If we are stuck in a locked state but the video isn't actually playing
      if (isLocked && video && video.paused) {
        setIsVisible(false);
        setIsLocked(false);
        if (onFinished) onFinished();
      }
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [isLocked, onFinished]);

  // --- UPDATED PLAY LOGIC WITH SAFETY ---
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let safetyTimer;

    if (isTriggered && !isLocked) {
      setIsLocked(true);
      video.currentTime = 0;

      video
        .play()
        .then(() => setIsVisible(true))
        .catch((err) => {
          console.warn("Autoplay blocked or interrupted", err);
          setIsLocked(false);
          if (onFinished) onFinished();
        });

      // SAFETY: If for some reason the video hangs and never calls onEnded,
      // this forces a reset after 5 seconds so the UI doesn't stay stuck.
      safetyTimer = setTimeout(() => {
        if (isLocked) {
          setIsVisible(false);
          setIsLocked(false);
          if (onFinished) onFinished();
        }
      }, 5000);
    }

    return () => {
      if (safetyTimer) clearTimeout(safetyTimer);
    };
  }, [isTriggered, isLocked, videoSrc, onFinished]);

  const handleVideoEnd = () => {
    // 1. Start the fade out
    setIsVisible(false);

    // 2. Wait for the CSS transition to finish (0.6s)
    setTimeout(() => {
      setIsLocked(false); // Unlock the mechanism
      if (onFinished) onFinished(); // Reset parent state
    }, 600);

    // REMOVED the immediate onFinished() call that was here
  };

  return (
    <div className={styles["media-wrapper"]}>
      <Image
        src={imageSrc}
        alt={alt}
        priority
        className={styles["hero-image"]}
      />
      <video
        ref={videoRef}
        key={videoSrc}
        src={videoSrc}
        muted
        playsInline
        preload="auto"
        onCanPlay={() => setVideoLoaded(true)}
        onEnded={handleVideoEnd}
        // Use isVisible for the class, NOT isLocked
        className={`${styles["hero-video"]} ${
          isVisible ? styles["visible"] : styles["hidden"]
        }`}
      />
    </div>
  );
};

export default HeroMedia;
