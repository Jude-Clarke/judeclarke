"use client";

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import Experience from "./components/Experience";
import Education from "./components/Education";
import ProjectDetails from "./components/ProjectDetails";
import ResumeButton from "./components/ResumeButton";
import { Bio } from "./data/constants.js";
import styles from "./page.module.css";
import NavLogo from "./images/MKDS-logo.svg";
import { MediaProvider } from "./contexts/MediaContext";

const Home = () => {
  const [openModal, setOpenModal] = useState({ state: false, project: null });

  return (
    <>
      <Navbar navLogo={NavLogo} />
      <div className={styles.body}>
        <HeroSection CTA={ResumeButton} />
        <div className={styles.wrapper}>
          <Skills />
          <Experience />
        </div>
        <Projects openModal={openModal} setOpenModal={setOpenModal} />
        <div className={styles.wrapper}>
          <Education />
          <div className={styles["cta-btn-container"]}>
            <a
              className={styles["resume-button"]}
              href={Bio.resume}
              target="_blank"
            >
              My Resume
            </a>
          </div>
        </div>
        <Footer />
        {openModal.state && (
          <ProjectDetails openModal={openModal} setOpenModal={setOpenModal} />
        )}
      </div>
    </>
  );
};

export default Home;
