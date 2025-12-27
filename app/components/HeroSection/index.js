import React, { useState, useEffect, useRef } from "react";
import { Bio } from "../../data/constants";
import Typewriter from "typewriter-effect";
import HeroImage from "../../images/judeProfile.webp";
import ChatOpen from "../../images/chat-open.webp";
import WelcomeBack from "../../images/back.webp";
import HeroMedia from "./HeroMedia";
import HeroBgAnimation from "../HeroBgAnimation";
import styles from "./index.module.css";
import { useMedia } from "../../contexts/MediaContext";
import { media } from "../../data/media";
const { HERO_ANIMATIONS } = media;

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

  useEffect(() => {
    const lastVisit = localStorage.getItem("lastVisit");
    const now = Date.now();
    const ONE_DAY = 24 * 60 * 60 * 1000;

    if (lastVisit && now - parseInt(lastVisit) > ONE_DAY) {
      setIsReturning(true);
      // Trigger "Welcome Back" video
      const videoTimer = setTimeout(() => {
        triggerVideo(HERO_ANIMATIONS.WELCOME_BACK);
      }, 1500);

      // RESET LOGIC:
      // After the video has had time to play (adjust 4000ms to your video length + buffer)
      // we flip isReturning back to false so the UI returns to "Standard" mode.
      const resetTimer = setTimeout(() => {
        setIsReturning(false);
        // This will cause your other useEffect to swap the image back to HeroImage
      }, 2500);

      return () => {
        clearTimeout(videoTimer);
        clearTimeout(resetTimer);
      };
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
    let timer;
    if (isChatOpen) {
      // Switch to ChatOpen immediately when opened
      timer = setTimeout(() => {
        setDisplayImage(ChatOpen);
      }, 601);
    } else if (isReturning) {
      // Show the "Welcome Back" image if they are a returning visitor
      setDisplayImage(WelcomeBack);
    } else {
      // Fallback to standard
      timer = setTimeout(() => {
        setDisplayImage(HeroImage);
      }, 2000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isChatOpen, isReturning]);

  const idleTimerRef = useRef(null);
  const activeVideoRef = useRef(activeVideo);

  const safeTriggerVideo = (src) => {
    // If a video is already playing or fading, ignore all new triggers
    if (activeVideoRef.current) return;
    triggerVideo(src);
  };

  useEffect(() => {
    activeVideoRef.current = activeVideo;
  }, [activeVideo]);
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
        HERO_ANIMATIONS.LOOK_AROUND,
        HERO_ANIMATIONS.STRETCH,
        HERO_ANIMATIONS.BRB,
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
      // This check now respects the "Finish First" rule
      if (!e.relatedTarget && !e.toElement && isHeadingForTabs) {
        safeTriggerVideo(HERO_ANIMATIONS.BYE);
      }
    };
    // This triggers when the user scrolls down past the Hero section
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 1) {
        safeTriggerVideo(HERO_ANIMATIONS.LOOK_DOWN);
      }
    };

    // 3. Listen for any movement to reset the idle timer
    window.addEventListener("focus", handleWindowFocus);
    window.addEventListener("mousemove", resetIdleTimer);
    document.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("scroll", handleScroll);

    // Start initial timer
    resetIdleTimer();

    return () => {
      clearTimeout(preloadTimer);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      window.removeEventListener("focus", handleWindowFocus);
      window.removeEventListener("mousemove", resetIdleTimer);
      document.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
            onFinished={() => setActiveVideo(null)}
            isReturning={isReturning}
            alt={`Photo of ${Bio.name}`}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
