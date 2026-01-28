"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
// import { DiCssdeck } from "react-icons/di";
import { FaBars } from "react-icons/fa";
import { Bio } from "../../data/constants";
import styles from "./index.module.css";
import { media } from "../../data/media";
import { useMedia } from "../../contexts/MediaContext";

const { HERO_ANIMATIONS } = media;

const Navbar = ({ navLogo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { triggerVideo, activeVideo } = useMedia();

  const mobileNavRef = useRef();
  const toggleButtonRef = useRef();

  const handleLogoHover = () => {
    triggerVideo(HERO_ANIMATIONS.SUP);
  };
  const handleLinkHover = () => {
    triggerVideo(HERO_ANIMATIONS.CHECK_ME_OUT);
  };
  const handleCtaHover = () => {
    triggerVideo(HERO_ANIMATIONS.SMILE);
  };

  useEffect(() => {
    const handler = (e) => {
      if (
        mobileNavRef.current &&
        !mobileNavRef.current.contains(e.target) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  let isPageTop;
  useEffect(() => {
    isPageTop = window.scrollY < 75;
    const resizeNav = () => {
      const navDiv = document.getElementById("navbar");
      const hamburger = document.getElementById("hamburger");
      const mobileNavContainer = document.getElementById("mobileNavContainer");

      if (navDiv) {
        navDiv.style.height = window.scrollY < 74 ? "80px" : "60px";
        navDiv.style.opacity = window.scrollY < 74 ? "100%" : "95%";
      }
      if (hamburger) {
        hamburger.style.top = window.scrollY < 75 ? "0" : "-4px";
      }
      if (mobileNavContainer) {
        mobileNavContainer.style.top = window.scrollY < 75 ? "80px" : "60px";
      }
    };
    window.addEventListener("scroll", resizeNav);
    return () => window.removeEventListener("scroll", resizeNav);
  }, []);

  const toggleIsOpen = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <div id="navbar" className={styles.navbar}>
      <div className={styles["nav-container"]}>
        <a
          href="#"
          className={styles["nav-logo"]}
          onMouseEnter={handleLogoHover}
        >
          <span className={styles["logo-span"]}>
            <Image
              src={navLogo}
              width={60}
              height={57}
              alt="logo"
              className={styles["key-logo"]}
            />
            <span className={styles["logo-text"]}>Jude Clarke</span>
          </span>
        </a>
        <div
          id="hamburger"
          onClick={toggleIsOpen}
          ref={toggleButtonRef}
          className={styles["mobile-icon"]}
        >
          <FaBars />
        </div>
        <ul className={styles["nav-items"]}>
          <a
            href="#skills"
            className={styles["nav-link"]}
            onMouseEnter={handleLinkHover}
          >
            Skills
          </a>
          <a
            href="#experience"
            className={styles["nav-link"]}
            onMouseEnter={handleLinkHover}
          >
            Experience
          </a>
          <a
            href="#projects"
            className={styles["nav-link"]}
            onMouseEnter={handleLinkHover}
          >
            Projects
          </a>
          <a
            href="#education"
            className={styles["nav-link"]}
            onMouseEnter={handleLinkHover}
          >
            Education
          </a>
        </ul>
        <div
          className={styles["button-container"]}
          onMouseOver={handleCtaHover}
        >
          <a href={Bio.resume} target="_blank" className={styles["cta-button"]}>
            Contact Me
          </a>
        </div>
      </div>
      {
        <div
          id="mobileNavContainer"
          ref={mobileNavRef}
          className={
            styles["mobile-menu"] +
            " " +
            (isPageTop && styles["page-top"]) +
            " " +
            (isOpen && styles.open)
          }
        >
          <a
            href="#"
            className={styles["mobile-link"]}
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            About
          </a>
          <a
            href="#skills"
            className={styles["mobile-link"]}
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            Skills
          </a>
          <a
            href="#experience"
            className={styles["mobile-link"]}
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            Experience
          </a>
          <a
            href="#projects"
            className={styles["mobile-link"]}
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            Projects
          </a>
          <a
            href="#education"
            className={styles["mobile-link"]}
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            Education
          </a>
          <a
            href={Bio.resume}
            target="_blank"
            className={`${styles["cta-button"]} ${styles["mobile-cta"]}`}
          >
            Contact Me
          </a>
        </div>
      }
    </div>
  );
};

export default Navbar;
