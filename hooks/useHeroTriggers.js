import { useRef, useCallback, useEffect } from "react";

export const useHeroTriggers = (
  triggerVideo,
  activeVideo,
  isChatOpen,
  HERO_ANIMATIONS
) => {
  const lastAnimRef = useRef(null);
  const idleTimerRef = useRef(null);
  const activeVideoRef = useRef(activeVideo);

  // Sync ref with state so timers always see the current value
  useEffect(() => {
    activeVideoRef.current = activeVideo;
  }, [activeVideo]);

  const getRandomAnim = useCallback(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const options = [
      HERO_ANIMATIONS.TURN_AROUND,
      HERO_ANIMATIONS.LOOK_DOWN,
      HERO_ANIMATIONS.CHECK_ME_OUT,
      HERO_ANIMATIONS.GO_AHEAD,
      HERO_ANIMATIONS.SMILE,
      HERO_ANIMATIONS.LOOK_AROUND,
      HERO_ANIMATIONS.STRETCH,
      HERO_ANIMATIONS.BRB,
      HERO_ANIMATIONS.SUP,
      ...(isMobile ? [HERO_ANIMATIONS.PEACE] : []),
    ];

    // Inside useHeroTriggers.js
    const filtered = options.filter((anim) => anim !== lastAnimRef.current);

    // Fallback: If for some reason filtered is empty, use the full options list
    const pool = filtered.length > 0 ? filtered : options;
    const selected = pool[Math.floor(Math.random() * pool.length)];
    lastAnimRef.current = selected;
    return selected;
  }, [HERO_ANIMATIONS]);

  const resetIdleTimer = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    if (isChatOpen) return;

    const delay = window.innerWidth < 768 ? 8000 : 15000;
    idleTimerRef.current = setTimeout(() => {
      if (!activeVideoRef.current) {
        triggerVideo(getRandomAnim(), true);
      } else {
        resetIdleTimer();
      }
    }, delay);
  }, [triggerVideo, isChatOpen, getRandomAnim]);

  return { getRandomAnim, resetIdleTimer, idleTimerRef };
};
