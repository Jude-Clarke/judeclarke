import React, { useState, useEffect, useRef } from "react";
import { Bio } from "../../data/constants";
import Typewriter from "typewriter-effect";
import HeroImage from "../../images/judeProfile.webp";
import HeroMedia from "./HeroMedia";
import HeroBgAnimation from "../HeroBgAnimation";
import styles from "./index.module.css";

const HERO_ANIMATIONS = {
  LOOK_DOWN: "/videos/hero/looking-down.mp4",
  SMILE: "/videos/hero/smile.mp4",
  PEACE: "/videos/hero/peace.mp4",
  GO_AHEAD: "/videos/hero/go-ahead.mp4",
  CHECK_ME_OUT: "/videos/hero/check-me-out.mp4",
  TURN_AROUND: "/videos/hero/turn-around.mp4",
  BACK: "/videos/hero/back.mp4",
};

const Hero = ({ CTA }) => {
  const [activeVideo, setActiveVideo] = useState(null);
  const [readyToPreload, setReadyToPreload] = useState(false);
  const idleTimerRef = useRef(null);

  // Function to trigger video with a "spam check"
  const triggerVideo = (src) => {
    if (activeVideo === src) return;
    setActiveVideo(src);
  };

  // Logic to handle Idle animations
  const resetIdleTimer = () => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

    idleTimerRef.current = setTimeout(() => {
      // Pick a random animation.
      const options = [
        HERO_ANIMATIONS.TURN_AROUND,
        HERO_ANIMATIONS.LOOK_DOWN,
        HERO_ANIMATIONS.CHECK_ME_OUT,
        HERO_ANIMATIONS.GO_AHEAD,
        HERO_ANIMATIONS.SMILE,
        HERO_ANIMATIONS.PEACE,
      ];
      const randomAnim = options[Math.floor(Math.random() * options.length)];

      // Only trigger if the user isn't currently interacting
      if (!activeVideo) triggerVideo(randomAnim);
    }, 15000); // 15 seconds of inactivity
  };

  useEffect(() => {
    // 1. Lazy Preload Timer
    const preloadTimer = setTimeout(() => setReadyToPreload(true), 2500);

    // 2. Event Listeners
    const handleWindowFocus = () => setActiveVideo(null);

    const handleMouseOut = (e) => {
      const isHeadingForTabs = e.clientY <= 5;
      if (!e.relatedTarget && !e.toElement && isHeadingForTabs) {
        triggerVideo(HERO_ANIMATIONS.PEACE);
      }
    };

    // 3. Listen for any movement to reset the idle timer
    window.addEventListener("focus", handleWindowFocus);
    window.addEventListener("mousemove", resetIdleTimer);
    document.addEventListener("mouseout", handleMouseOut);

    // Start initial timer
    resetIdleTimer();

    return () => {
      clearTimeout(preloadTimer);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      window.removeEventListener("focus", handleWindowFocus);
      window.removeEventListener("mousemove", resetIdleTimer);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [activeVideo]);

  return (
    <div id="about" className={styles["hero-container"]}>
      <div className={styles["hero-bg"]}>
        <HeroBgAnimation />
      </div>

      {readyToPreload && (
        <div style={{ display: "none" }} aria-hidden="true">
          {Object.values(HERO_ANIMATIONS).map((src) => (
            <video key={src} src={src} preload="auto" muted />
          ))}
        </div>
      )}

      <div className={styles["hero-inner-container"]}>
        <div className={styles["hero-left-container"]}>
          <div className={styles.title}>Hey, I'm {Bio.name}!</div>
          <div className={styles["text-loop"]}>
            I am a
            <span className="typewriter-span">
              <Typewriter
                options={{ strings: Bio.roles, autoStart: true, loop: true }}
              />
            </span>
          </div>
          <div className={styles.subtitle}>{Bio.description}</div>

          <div
            className={styles["cta-container"]}
            onMouseEnter={() => triggerVideo(HERO_ANIMATIONS.SMILE)}
          >
            <CTA link={Bio.resume}>My Resume</CTA>
          </div>
        </div>

        <div className={styles["hero-right-container"]}>
          <HeroMedia
            imageSrc={HeroImage}
            videoSrc={activeVideo || HERO_ANIMATIONS.LOOK_DOWN}
            isTriggered={!!activeVideo}
            onFinished={() => setActiveVideo(null)}
            alt={`Photo of ${Bio.name}`}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
