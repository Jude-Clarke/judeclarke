import React, { useState, useEffect, useRef, useCallback } from "react";
import { Bio } from "../../data/constants";
import Typewriter from "typewriter-effect";
import HeroImage from "../../images/judeProfile.webp";
import ChatOpen from "../../images/chat-open.webp";
import HeroMedia from "./HeroMedia";
import HeroBgAnimation from "../HeroBgAnimation";
import styles from "./index.module.css";
import { useMedia } from "../../contexts/MediaContext";
import { media } from "../../data/media";

const { HERO_ANIMATIONS } = media;

const BASE_OPTIONS = [
  HERO_ANIMATIONS.TURN_AROUND,
  HERO_ANIMATIONS.LOOK_DOWN,
  HERO_ANIMATIONS.CHECK_ME_OUT,
  HERO_ANIMATIONS.GO_AHEAD,
  HERO_ANIMATIONS.SMILE,
  HERO_ANIMATIONS.LOOK_AROUND,
  HERO_ANIMATIONS.STRETCH,
  HERO_ANIMATIONS.BRB,
];

// Create a separate component for animation randomizer?

const Hero = ({ CTA }) => {
  const {
    activeVideo,
    setActiveVideo,
    triggerVideo,
    isChatOpen,
    isReturning,
    setIsReturning,
  } = useMedia();
  const [readyToPreload, setReadyToPreload] = useState(false);
  // using state to manage delayed image swap
  const [displayImage, setDisplayImage] = useState(HeroImage);
  const heroRef = useRef(null);

  // Smart Randomizer Logic ---
  const lastAnimRef = useRef(null);
  const getRandomAnim = useCallback(() => {
    // Wrapping getSmartRandomAnim in useCallback ensures that it doesn't change on every render. This is crucial because the resetIdleTimer and several useEffect hooks depend on it. If it weren't stable, the timers might reset unexpectedly.

    // 1. Determine current options pool
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const currentOptions = isMobile
      ? [...BASE_OPTIONS, HERO_ANIMATIONS.PEACE]
      : BASE_OPTIONS;

    // 2. Filter out the last animation to prevent back-to-back repeats
    const filteredOptions = currentOptions.filter(
      (anim) => anim !== lastAnimRef.current
    );

    // 3. Pick a random one from the remaining pool
    const randomIndex = Math.floor(Math.random() * filteredOptions.length);
    const selectedAnim = filteredOptions[randomIndex];

    // 4. Update the ref for the next call
    lastAnimRef.current = selectedAnim;
    return selectedAnim;
  }, []);

  useEffect(() => {
    const lastVisit = localStorage.getItem("lastVisit");
    const now = Date.now();
    const ONE_DAY = 24 * 60 * 60 * 1000;

    if (lastVisit && now - parseInt(lastVisit) > ONE_DAY) {
      setIsReturning(true);
      // Trigger random "Welcome Back" animation
      triggerVideo(getRandomAnim(), true);

      // RESET LOGIC:
      // After the video has had time to play (adjust 4000ms to your video length + buffer)
      // we flip isReturning back to false so the UI returns to "Standard" mode.
      setTimeout(() => {
        setIsReturning(false);
      }, 2500);
      localStorage.setItem("lastVisit", now.toString());
    } else if (!lastVisit) {
      // First time visitor ever? Set the initial timestamp so they
      // can become a "returning" visitor tomorrow.
      localStorage.setItem("lastVisit", now.toString());
    }

    // Note: If they visit twice in 5 hours, we do nothing and
    // don't update the timestamp, preserving their "Original" 24-hour window.
  }, []); // Run exactly once on mount

  // using effect to handle the delayed transition logic
  useEffect(() => {
    if (isChatOpen) {
      // Switch to ChatOpen immediately when opened
      const timer = setTimeout(() => {
        setDisplayImage(ChatOpen);
      }, 600);
      return () => clearTimeout(timer);
    }

    // Fallback to standard after a delay
    const timer = setTimeout(() => {
      setDisplayImage(HeroImage);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isChatOpen, isReturning]);

  const idleTimerRef = useRef(null);
  const activeVideoRef = useRef(activeVideo);

  const safeTriggerVideo = (src) => {
    // If a video is already playing or fading, ignore all new triggers
    if (activeVideoRef.current) return;
    triggerVideo(src);
  };
  const resetIdleTimer = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

    // SHIELD: If chat is open, Jude stays static to save performance
    if (isChatOpen) return;

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const delay = isMobile ? 8000 : 15000;

    idleTimerRef.current = setTimeout(() => {
      // Check our REF to see if a video is TRULY active
      // (not just the fallback LOOK_AROUND)
      if (activeVideoRef.current) {
        resetIdleTimer();
        return;
      }

      // Use the override created in Context
      triggerVideo(getRandomAnim(), true);
    }, delay);
  }, [triggerVideo, isChatOpen]); // triggerVideo is stable from context

  useEffect(() => {
    activeVideoRef.current = activeVideo;
  }, [activeVideo]);
  // Logic to handle Idle animations

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") resetIdleTimer();
    };
    const handleMouseOut = (e) => {
      const isHeadingForTabs = e.clientY <= 5;
      // This check now respects the "Finish First" rule
      if (!e.relatedTarget && !e.toElement && isHeadingForTabs) {
        safeTriggerVideo(HERO_ANIMATIONS.BYE);
      }
    };
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroHeight = heroRef.current?.offsetHeight || 800; // Fallback to 800px

      // TRIGGER LOGIC:
      // 1. Chat must be closed
      // 2. Must be scrolled more than 1px
      // 3. Must be ABOVE the fold (scrollPosition < heroHeight)
      // 4. Use safeTriggerVideo (no override) so it doesn't cut off other clips
      if (!isChatOpen) {
        if (scrollPosition > 1 && scrollPosition < heroHeight) {
          safeTriggerVideo(HERO_ANIMATIONS.LOOK_DOWN);
        }
      }
    };

    window.addEventListener("mousemove", resetIdleTimer);
    window.addEventListener("touchstart", resetIdleTimer);
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    resetIdleTimer(); // Initial start

    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      window.removeEventListener("mousemove", resetIdleTimer);
      window.removeEventListener("touchstart", resetIdleTimer);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [resetIdleTimer]); // Now depends on the stable callback

  return (
    <div id="about" ref={heroRef} className={styles["hero-container"]}>
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
          <div
            className={styles.subtitle}
            onMouseEnter={() => triggerVideo(HERO_ANIMATIONS.LOOK_AROUND)}
          >
            {Bio.description}
          </div>

          <div
            className={styles["cta-container"]}
            onMouseEnter={() => triggerVideo(HERO_ANIMATIONS.SMILE)}
          >
            <CTA link={Bio.resume}>My Resume</CTA>
          </div>
        </div>

        <div className={styles["hero-right-container"]}>
          <HeroMedia
            imageSrc={displayImage}
            videoSrc={activeVideo || HERO_ANIMATIONS.LOOK_AROUND}
            isTriggered={!!activeVideo}
            onFinished={() => {
              setActiveVideo(null); // Clear current video
              resetIdleTimer(); // Start the next idle countdown!
              resetIdleTimer();
            }}
            isReturning={isReturning}
            alt={`Photo of ${Bio.name}`}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
