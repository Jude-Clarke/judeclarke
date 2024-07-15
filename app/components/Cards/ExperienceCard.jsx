import React from 'react'
import Image from 'next/image'
import styles from "./ExperienceCard.module.css"


const ExperienceCard = ({ experience }) => {
    return (
        <a className={styles.card} href={`${experience.doc || "javascript:void(0)"}`} target={`${experience.doc ? "_blank" : ""}`}>
            <div className={styles.top}>
                <Image src={experience.img} alt="image" className={styles["experience-image"]}/>
                <div className={styles.body}>
                    <div className={styles.role}>{experience.role}</div>
                    <div className={styles.company}>{experience.company}</div>
                    <div className={styles.date}>{experience.date}</div>
                </div>
            </div>
            <div className={styles.description}>
                {experience?.desc &&
                    <div className={styles.desc}>{experience?.desc}</div>

                }
                {experience?.skills &&
                    <>
                        <br />
                        <div className={styles.skills}>
                            <b>Tech:</b>
                            <div className={styles["item-wrapper"]}>
                                {experience?.skills?.map((skill, index) => (
                                    <div key={index} className={styles.skill}>• {skill}</div>
                                ))}
                            </div>
                        </div>
                    </>
                }
            </div>
        </a>
    )
}

export default ExperienceCard