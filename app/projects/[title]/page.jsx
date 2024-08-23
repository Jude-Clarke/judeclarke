"use client";

import React, { useState, useEffect } from "react";
import { useParams } from 'next/navigation.js';
import Navbar from "../../components/Navbar/index.js";
import HeroSection from "../../components/HeroSection/index.js";
import Skills from "../../components/Skills/index.js";
import Projects from "../../components/Projects/index.js";
import Footer from "../../components/Footer/index.js";
import Experience from "../../components/Experience/index.js";
import Education from "../../components/Education/index.js";
import ProjectDetails from "../../components/ProjectDetails/index.js";
import ResumeButton from "../../components/ResumeButton/index.js";
import { Bio } from "../../data/constants.js";
import { projects } from '../../data/constants.js';
import _ from "lodash";
import styles from "../../page.module.css";

const projectPage = () => {
  const params = useParams();
  const [openModal, setOpenModal] = useState({ state: false, project: null });

  useEffect(() => {
    if (params.title) {
      const project = projects.find(
        (proj) => _.kebabCase(proj.title.toLowerCase()) === params.title.toLowerCase()
      );

      if (project) {
        setOpenModal({ state: true, project });
      } else {
        setOpenModal({ state: false, project: null });
      }
    }
  }, [params.title]); // Dependency array ensures useEffect runs when params.title changes

  return (
    <>
      <Navbar />
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
            <a className={styles["resume-button"]} href={Bio.resume} target="_blank" rel="noopener noreferrer">
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

export default projectPage;
