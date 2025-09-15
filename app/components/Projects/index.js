"use client";
import React from "react";
import { useState, useRef } from "react";
import ProjectCard from "../Cards/ProjectCards";
import { projects } from "../../data/constants";
import { useRouter } from "next/navigation";
import styles from "./index.module.css";

const Projects = ({ openModal, setOpenModal }) => {
  const projectsSectionRef = useRef(null); // Ref for projects section
  const router = useRouter();

  const [toggle, setToggle] = useState("all");

  const handleToggleClick = (option) => {
    // Find a way to change the url without routing
    // router.push("/#projects?projects");
    setToggle(option);
  };
  return (
    <div id="projects" ref={projectsSectionRef} className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.title}>Career Highlights</div>
        <div className={styles.desc}>
          From concept to deployment, I've built a wide range of applications.
          Here are some highlights:
        </div>
        <div className={styles["toggle-button-group"]}>
          <div
            value="all"
            className={
              styles["toggle-button"] +
              " " +
              (toggle === "all" && styles.active)
            }
            onClick={() => handleToggleClick("all")}
          >
            All
          </div>
          <div className={styles.divider} />
          <div
            value="react apps"
            className={
              styles["toggle-button"] +
              " " +
              (toggle === "React" && styles.active)
            }
            onClick={() => handleToggleClick("React")}
          >
            react apps
          </div>
          <div className={styles.divider} />
          <div
            value="node.js apps"
            className={
              styles["toggle-button"] +
              " " +
              (toggle === "Node Js" && styles.active)
            }
            onClick={() => handleToggleClick("Node Js")}
          >
            node.js apps
          </div>
          <div className={styles.divider} />
          <div
            value="agentic ai"
            className={
              styles["toggle-button"] + " " + (toggle === "AI" && styles.active)
            }
            onClick={() => handleToggleClick("AI")}
          >
            agentic ai
          </div>
        </div>
        <div className={styles["card-container"]}>
          {toggle === "all" &&
            projects.map((project) => (
              <ProjectCard
                projectsSectionRef={projectsSectionRef}
                key={project.id}
                project={project}
                openModal={openModal}
                setOpenModal={setOpenModal}
              />
            ))}
          {projects
            .filter((item) => item.tags.includes(toggle))
            .map((project) => (
              <ProjectCard
                projectsSectionRef={projectsSectionRef}
                key={project.id}
                project={project}
                openModal={openModal}
                setOpenModal={setOpenModal}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
