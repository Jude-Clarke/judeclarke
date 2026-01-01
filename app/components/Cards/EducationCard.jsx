import React from "react";
import styles from "./EducationCard.module.css";
import Image from "next/image";

const EducationCard = ({ education }) => {
  return (
    <a
      className={styles.card}
      href={education.link || "javascript:void(0)"}
      target={education.link ? "_blank" : ""}
    >
      <div className={styles.top}>
        <Image
          src={education.img}
          alt="image"
          className={styles["education-image"]}
          loading="lazy"
        />
        <div className={styles.body}>
          <div className={styles.header}>{education.degree}</div>
          <div className={styles.subheader}>{education.school}</div>
          <div className={styles.date}>{education.date}</div>
        </div>
      </div>
      {education.gpa && (
        <div className={styles.gpa}>
          <b>GPA: </b>
          {education.gpa}
        </div>
      )}
      {education.grade && (
        <div className={styles.gpa}>
          <b>Grade: {education.grade}</b>
        </div>
      )}
      <div className={styles.description}>
        <div className={styles.desc}>{education.desc}</div>
      </div>
    </a>
  );
};

export default EducationCard;
