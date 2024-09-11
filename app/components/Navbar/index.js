"use client"
import React, { useState, useEffect, useRef } from "react";
import { DiCssdeck } from "react-icons/di";
import { FaBars } from "react-icons/fa";
import { Bio } from '../../data/constants';
import styles from "./index.module.css";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const mobileNavRef = useRef();
  const toggleButtonRef = useRef();

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

        return() =>{
            document.removeEventListener("mousedown", handler);
        }
    }, [])

  let isPageTop;
  useEffect(() => {
    isPageTop = window.scrollY < 75;
    const resizeNav = () => {
      const navDiv = document.getElementById("navbar");
      const hamburger = document.getElementById("hamburger");
      const mobileNavContainer = document.getElementById("mobileNavContainer");

      if(navDiv) {
        navDiv.style.height = (window.scrollY < 74 ? "80px" : "60px");
        navDiv.style.opacity = (window.scrollY < 74 ? "100%" : "95%");
      }
      if(hamburger) {
        hamburger.style.top = (window.scrollY < 75 ? "0" : "-4px");
      }
      if(mobileNavContainer) {
        mobileNavContainer.style.top = (window.scrollY < 75 ? "80px" : "60px");
      }
    };
    window.addEventListener("scroll", resizeNav);
    return () => window.removeEventListener("scroll", resizeNav);
    }, []);

    const toggleIsOpen = () => {
      setIsOpen(prevIsOpen => !prevIsOpen);
    };
    

  return (
    <div id="navbar" className={styles.navbar}>
      <div className={styles["nav-container"]}>
        <a href="#" className={styles["nav-logo"]}>
          <span
            className={styles["logo-span"]}
          >
            <DiCssdeck size="3rem" /> <span className={styles["logo-text"]}>Portfolio</span>
          </span>
        </a>
        <div id="hamburger" onClick={toggleIsOpen} ref={toggleButtonRef} className={styles["mobile-icon"]}>
          <FaBars
            
          />
        </div>
        <ul className={styles["nav-items"]}>
          <a href="#" className={styles["nav-link"]}>Home</a>
          <a href="#skills" className={styles["nav-link"]}>Skills</a>
          <a href="#experience" className={styles["nav-link"]}>Experience</a>
          <a href="#projects" className={styles["nav-link"]}>Projects</a>
          <a href="#education" className={styles["nav-link"]}>Education</a>
        </ul>
        <div className={styles["button-container"]}>
          <a href={Bio.resume} target="_blank" className={styles["cta-button"]}>Resume</a>
        </div>
      </div>
      {
          <div id="mobileNavContainer" ref={mobileNavRef} className={styles["mobile-menu"] + " " + (isPageTop && styles["page-top"]) + " " + (isOpen && styles.open)}>
            <a
              href="#"
              className={styles["mobile-link"]}
              onClick={() => {
                setIsOpen(!isOpen)
              }}
            >
              About
            </a>
            <a
              href="#skills"
              className={styles["mobile-link"]}
              onClick={() => {
                setIsOpen(!isOpen)
              }}
            >
              Skills
            </a>
            <a
              href="#experience"
              className={styles["mobile-link"]}
              onClick={() => {
                setIsOpen(!isOpen)
              }}
            >
              Experience
            </a>
            <a
              href="#projects"
              className={styles["mobile-link"]}
              onClick={() => {
                setIsOpen(!isOpen)
              }}
            >
              Projects
            </a>
            <a
              href="#education"
              className={styles["mobile-link"]}
              onClick={() => {
                setIsOpen(!isOpen)
              }}
            >
              Education
            </a>
            <a
              href={Bio.resume}
              target="_blank"
              className={styles["cta-button"]}
            >
              Resume
            </a>
          </div>
      }
    </div>
  )
}

export default Navbar
