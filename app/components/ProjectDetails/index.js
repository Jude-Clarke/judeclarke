"use client";
import { CloseRounded, GitHub, LinkedIn } from "@mui/icons-material";
import { Modal } from "@mui/material";
import React, { useEffect, useRef } from "react";
import Carousel from "../Carousel";
import { useRouter } from "next/navigation";
import styles from "./index.module.css";
import Image from "next/image";

const index = ({ openModal, setOpenModal }) => {
  const project = openModal?.project;
  const menuRef = useRef();
  const router = useRouter();

  useEffect(() => {
    const handler = (e) => {
      if (!(menuRef.current && menuRef.current.contains(e.target))) {
        setOpenModal(false);
        // Find a way to change the url without routing
        // router.push("/");
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <Modal
      open={true}
      onClose={() => setOpenModal({ state: false, project: null })}
    >
      <div className={styles.container}>
        <div className={styles.wrapper} ref={menuRef}>
          <CloseRounded
            className={styles["close-rounded"]}
            onClick={() => setOpenModal({ state: false, project: null })}
          />

          <div className={styles.title}>{project?.title}</div>
          <div className={styles.date}>{project.date}</div>
          <div className={styles.tags}>
            {project?.tags.map((tag, index) => (
              <div className={styles.tag} key={index}>
                {tag}
              </div>
            ))}
          </div>
          <div className={styles.desc}>{project?.description}</div>
          {project?.slides.length === 1 && project.webapp ? (
            <a href={project?.webapp} target="new">
              <Carousel slides={project?.slides} />
            </a>
          ) : (
            <Carousel slides={project?.slides} />
          )}

          <div className={styles["button-group"]}>
            {project?.github && (
              <a
                className={styles.button + " " + styles.dark}
                href={project?.github}
                target="new"
              >
                View Code
              </a>
            )}
            {project?.webapp && (
              <a className={styles.button} href={project?.webapp} target="new">
                View Live App
              </a>
            )}
            {project?.slideDeck && (
              <a
                className={styles.button}
                href={project?.slideDeck}
                target="new"
              >
                View Slide Deck
              </a>
            )}
          </div>
          {project.contributors && (
            <>
              <div className={styles.label}>Contributors</div>
              <div className={styles.contributors}>
                {project?.contributors.map((contributor, index) => (
                  <div className={styles.contributor} key={index}>
                    <div className={styles["contributor-container"]}>
                      <Image
                        src={contributor.img}
                        alt={`headshot of ${contributor.name}`}
                        className={styles["contributor-image"]}
                      />
                      <div className={styles["contributor-name"]}>
                        {contributor.name}
                      </div>
                      <div className={styles["contributor-socials"]}>
                        {contributor.linkedin && (
                          <a href={contributor.linkedin} target="new">
                            <LinkedIn />
                          </a>
                        )}
                        {contributor.github && (
                          <a href={contributor.github} target="new">
                            <GitHub />
                          </a>
                        )}
                      </div>
                    </div>
                    <div className={styles["contributor-container"]}>
                      <div className={styles.role}>{contributor.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default index;
