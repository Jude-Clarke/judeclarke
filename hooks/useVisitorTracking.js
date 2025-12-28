import { useEffect, useRef, useState } from "react";

export const useVisitorTracking = (
  getRandomAnim,
  triggerVideo,
  setIsReturning
) => {
  const [priorityVideo, setPriorityVideo] = useState(null);
  const hasTriggeredWelcome = useRef(false);

  useEffect(() => {
    if (hasTriggeredWelcome.current) return;

    const lastVisit = localStorage.getItem("lastVisit");
    const now = Date.now();
    const ONE_DAY = 24 * 60 * 60 * 1000;

    // Set to > 0 for dev testing, > ONE_DAY for production
    const isReturningVisitor = lastVisit && now - parseInt(lastVisit) > 0;

    if (isReturningVisitor) {
      const welcomeAnim = getRandomAnim();

      setPriorityVideo(welcomeAnim);
      setIsReturning(true);
      triggerVideo(welcomeAnim, true);

      setTimeout(() => {
        setIsReturning(false);
      }, 2500);

      hasTriggeredWelcome.current = true;
    }

    localStorage.setItem("lastVisit", now.toString());
  }, [getRandomAnim, triggerVideo, setIsReturning]);

  return { priorityVideo };
};
