"use client";
import React, { createContext, useContext, useState } from "react";

const MediaContext = createContext();

export const MediaProvider = ({ children }) => {
  const [activeVideo, setActiveVideo] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isReturning, setIsReturning] = useState(false);

  const triggerVideo = (src, override = false) => {
    setActiveVideo((current) => {
      // If override is true, or nothing is playing, set the new video
      if (override || current === null) {
        return src;
      }
      return current;
    });
  };

  return (
    <MediaContext.Provider
      value={{
        activeVideo,
        setActiveVideo,
        triggerVideo,
        isChatOpen,
        setIsChatOpen,
        isReturning,
        setIsReturning,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export const useMedia = () => useContext(MediaContext);
