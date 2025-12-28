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
import { useHeroTriggers } from "../../../hooks/useHeroTriggers";
import { PreloadVideos } from "./PreloadVideos";

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
  const [displayImage, setDisplayImage] = useState(HeroImage);
  const heroRef = useRef(null);
  // 1. Visitor Tracking Logic
  const hasTriggeredWelcome = useRef(false);

  // use custom hook
  const { getRandomAnim, resetIdleTimer, idleTimerRef } = useHeroTriggers(
    triggerVideo,
    activeVideo,
    isChatOpen,
    HERO_ANIMATIONS
  );

  const [priorityVideo, setPriorityVideo] = useState(null);

  // 1. Visitor Tracking Logic
  useEffect(() => {
    // Shield: Prevents this from running twice in Dev Mode
    if (hasTriggeredWelcome.current) return;

    const lastVisit = localStorage.getItem("lastVisit");
    const now = Date.now();
    const ONE_DAY = 24 * 60 * 60 * 1000;
    // DEBUG: Change ONE_DAY to 0 if you want to test it on every refresh
    const isReturningVisitor = lastVisit && now - parseInt(lastVisit) > 0;
    if (isReturningVisitor) {
      const welcomeAnim = getRandomAnim();

      console.log("Playing welcome animation:", welcomeAnim);

      setPriorityVideo(welcomeAnim);
      setIsReturning(true);
      triggerVideo(welcomeAnim, true);

      setTimeout(() => setIsReturning(false), 2500);

      hasTriggeredWelcome.current = true;
    }

    localStorage.setItem("lastVisit", now.toString());
  }, [getRandomAnim, triggerVideo, setIsReturning]);

  // 2. Image Transition Logic
  useEffect(() => {
    const delay = isChatOpen ? 600 : 1000;
    const timer = setTimeout(() => {
      setDisplayImage(isChatOpen ? ChatOpen : HeroImage);
    }, delay);
    return () => clearTimeout(timer);
  }, [isChatOpen]);

  // 3. Global Event Listeners
  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY;
      if (
        !isChatOpen &&
        scroll > 1 &&
        scroll < (heroRef.current?.offsetHeight || 800)
      ) {
        if (!activeVideo) triggerVideo(HERO_ANIMATIONS.LOOK_DOWN);
      }
    };

    const handleMouseOut = (e) => {
      if (!e.relatedTarget && e.clientY <= 5 && !activeVideo) {
        triggerVideo(HERO_ANIMATIONS.BYE);
      }
    };

    window.addEventListener("mousemove", resetIdleTimer);
    window.addEventListener("touchstart", resetIdleTimer);
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("mouseout", handleMouseOut);

    resetIdleTimer();

    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      window.removeEventListener("mousemove", resetIdleTimer);
      window.removeEventListener("touchstart", resetIdleTimer);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [resetIdleTimer, isChatOpen, activeVideo, triggerVideo]);

  return (
    <div id="about" ref={heroRef} className={styles["hero-container"]}>
      <div className={styles["hero-bg"]}>
        <HeroBgAnimation />
      </div>
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
      <PreloadVideos
        animations={HERO_ANIMATIONS}
        priorityVideo={priorityVideo || HERO_ANIMATIONS.PEACE}
      />
    </div>
  );
};

export default Hero;
