import React, { useEffect, useState } from "react";

export const PreloadVideos = ({ animations, priorityVideo }) => {
  const [loadOthers, setLoadOthers] = useState(false);

  useEffect(() => {
    // ONLY delay the background pool
    const timer = setTimeout(() => {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(() => setLoadOthers(true));
      } else {
        setLoadOthers(true);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ display: "none" }} aria-hidden="true">
      {/* TRIGGER IMMEDIATELY: This puts the bytes in the browser cache instantly */}
      {priorityVideo && (
        <video src={priorityVideo} preload="auto" muted playsInline />
      )}

      {loadOthers &&
        Object.values(animations)
          .filter((src) => src !== priorityVideo)
          .map((src) => (
            <video key={src} src={src} preload="auto" muted playsInline />
          ))}
    </div>
  );
};
