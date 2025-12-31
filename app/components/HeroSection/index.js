import React, { useState, useEffect, useRef } from "react";
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
import { useVisitorTracking } from "../../../hooks/useVisitorTracking";
import { useHeroListeners } from "../../../hooks/useHeroListneners";
import { PreloadVideos } from "./PreloadVideos";

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

  const [displayImage, setDisplayImage] = useState(HeroImage);
  const heroRef = useRef(null);

  // 1. Animation Logic (Randomizer and Idle)
  const { getRandomAnim, resetIdleTimer, idleTimerRef } = useHeroTriggers({
    triggerVideo,
    activeVideo,
    isChatOpen,
    HERO_ANIMATIONS,
  });

  // 2. Visitor Logic (Local Starage & Welcome)
  const { priorityVideo } = useVisitorTracking(
    getRandomAnim,
    triggerVideo,
    setIsReturning
  );

  // 3. Global Listeners (Scroll & Mouse)
  useHeroListeners({
    resetIdleTimer,
    triggerVideo,
    activeVideo,
    isChatOpen,
    heroRef,
    HERO_ANIMATIONS,
    idleTimerRef,
  });
  // 4. Image Transition Logic (UI specific)
  useEffect(() => {
    const delay = isChatOpen ? 600 : 1000;
    const timer = setTimeout(() => {
      setDisplayImage(isChatOpen ? ChatOpen : HeroImage);
    }, delay);
    return () => clearTimeout(timer);
  }, [isChatOpen]);

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
