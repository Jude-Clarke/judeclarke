import { useEffect } from "react";

export const useHeroListeners = ({
  resetIdleTimer,
  triggerVideo,
  activeVideo,
  isChatOpen,
  heroRef,
  HERO_ANIMATIONS,
  idleTimerRef,
}) => {
  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY;
      const heroHeight = heroRef.current?.offsetHeight || 800;

      if (!isChatOpen && scroll > 1 && scroll < heroHeight) {
        if (!activeVideo) triggerVideo(HERO_ANIMATIONS.LOOK_DOWN);
      }
    };

    const handleMouseOut = (e) => {
      // Trigger "Bye" if mouse leaves the top of the browser (tab area)
      if (!e.relatedTarget && e.clientY <= 5 && !activeVideo) {
        triggerVideo(HERO_ANIMATIONS.BYE);
      }
    };

    // Attach listeners
    window.addEventListener("mousemove", resetIdleTimer);
    window.addEventListener("touchstart", resetIdleTimer);
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("mouseout", handleMouseOut);

    resetIdleTimer(); // Initial start

    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      window.removeEventListener("mousemove", resetIdleTimer);
      window.removeEventListener("touchstart", resetIdleTimer);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [
    resetIdleTimer,
    isChatOpen,
    activeVideo,
    triggerVideo,
    heroRef,
    HERO_ANIMATIONS,
    idleTimerRef,
  ]);
};
