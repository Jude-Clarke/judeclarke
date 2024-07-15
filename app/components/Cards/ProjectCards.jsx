"use client"
import React, { useEffect } from 'react';
import { useRouter } from "next/navigation";
import Image from 'next/image';
import styles from "./ProjectCards.module.css";
import _ from "lodash";


const ProjectCards = ({project, projectsSectionRef, setOpenModal}) => {
    const router = useRouter();

    // useEffect(() => {
    //     if (location.pathname.includes(`/projects/${_.kebabCase(project.title)}`)) {
    //         projectsSectionRef.current.scrollIntoView({ behavior: 'smooth' })
    //         setOpenModal({ state: true, project: project });
    //     }
    // }, [location.pathname, setOpenModal, project]);

    const openProjectDetails = () => {
        // router.push(`?project=${_.kebabCase(project.title)}`);
        setOpenModal({ state: true, project: project });
    };


    // Add dynamic routing to project modals *****


    return (
        <div className={styles.card} onClick={() => openProjectDetails(setOpenModal, project)}>
            <Image src={project.slides[0].image} width={290} height={180} alt="image" className={styles["project-image"]}/>
            <div className={styles.tags}>
                {project.tags?.map((tag, index) => (
                <div key={index} className={styles.tag}>{tag}</div>
                ))}
            </div>
            <div className={styles.details}>
                <div className={styles.title}>{project.title}</div>
                <div className={styles.date}>{project.date}</div>
                <div className={styles.description}>{project.description}</div>
            </div>
            <div className={styles.contributor}>
                {project.contributors?.map((contributor, index) => (
                    <Image key={index} src={contributor.img} alt="contributor headshot" className={styles.avatar}/>
                ))}
            </div>
        </div>
    )
}

export default ProjectCards
