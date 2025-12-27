"use client";
import React, { createContext, useContext, useState } from "react";

const MediaContext = createContext();

export const MediaProvider = ({ children }) => {
  const [activeVideo, setActiveVideo] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isReturning, setIsReturning] = useState(false);

  const triggerVideo = (src) => {
    // console.log("Context: Attempting to trigger", src);
    setActiveVideo((current) => {
      if (current !== null) {
        // console.log(
        //   "Context: Trigger blocked, video already playing:",
        //   current
        // );
        return current;
      }
      // console.log("Context: Trigger SUCCESS");
      return src;
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
