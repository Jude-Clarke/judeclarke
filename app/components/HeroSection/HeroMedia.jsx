import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./index.module.css";

const HeroMedia = ({
  imageSrc,
  videoSrc,
  isTriggered,
  onFinished,
  alt,
  isReturning,
}) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const videoRef = useRef(null);

  // 1. Resync on Focus (Emergency release ONLY if video is stuck/paused)
  useEffect(() => {
    const handleFocus = () => {
      const video = videoRef.current;
      // ONLY release the lock if the video is actually stuck (paused)
      // and we are supposed to be playing something.
      if (
        isLocked &&
        video &&
        video.paused &&
        video.currentTime > 0 &&
        !video.ended
      ) {
        console.log("Emergency release: Video was stuck on focus");
        setIsVisible(false);
        setIsLocked(false);
        if (onFinished) onFinished();
      }
    };
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [isLocked, onFinished]);

  // 2. Strict Play Logic
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return;

    // STRICT LOCK: If isLocked is true, we ignore everything.
    // This ensures the current video + fade-out finish completely.
    if (isTriggered && !isLocked) {
      setIsLocked(true);
      video.currentTime = 0;

      video
        .play()
        .then(() =>
          // Use requestAnimationFrame to ensure the hidden state is painted
          requestAnimationFrame(() => {
            setIsVisible(true);
          })
        )
        .catch((err) => {
          console.warn("Autoplay blocked", err);
          setIsLocked(false);
          if (onFinished) onFinished();
        });
    }
  }, [isTriggered, isLocked, videoSrc, onFinished]);

  const handleVideoEnd = () => {
    // 1. Start the visual fade out
    setIsVisible(false);

    // If returning, clear the lock instantly.
    // Otherwise, wait 600ms for the standard fade.
    const delay = isReturning ? 0 : 600;

    // 2. HOLD the lock until the fade is done
    // This prevents a new hover from starting during the transition
    setTimeout(() => {
      setIsLocked(false);
      if (onFinished) onFinished();
    }, delay); // Must match CSS transition time
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
        // IMPORTANT: We keep the video key linked to videoSrc
        // but it will only update once the lock is released
        src={videoSrc}
        muted
        playsInline
        autoPlay
        preload="auto"
        onCanPlay={() => setVideoLoaded(true)}
        onEnded={handleVideoEnd}
        className={`${styles["hero-video"]} ${
          isVisible ? styles["visible"] : styles["hidden"]
        }`}
      />
    </div>
  );
};

export default HeroMedia;
