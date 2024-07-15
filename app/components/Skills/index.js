import React from 'react'
import { skills } from '../../data/constants'
import styles from "./index.module.css"
import Image from 'next/image'

const Skills = () => {
  return (
    <div id="skills" className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.title}>Skills</div>
        <div className={styles.desc}>
          Here are some skills I've been building over the past 5 years of my career.
        </div>
        <div className={styles["skills-container"]}>
          {skills.map((item, index) => (
            <div key={index} className={styles.skill}>
              <h2 className={styles["skill-title"]}>{item.title}</h2>
              <div className={styles["skill-list"]}>
                {
                  item.skills.map((skill, index) => (
                    <a key={index} className={styles["skill-item"] + " " + (skill.minContent && "mobile-min-content")} href={skill.link || "javascript:void(0)"} target={`${skill.link.includes("http") ? "_blank" : "" }`}>
                      <Image src={skill.image} alt={`${skill.name} logo`} className={styles["skill-image"]} width={24} height={24}/>
                      {skill.name}
                    </a>
                  ))
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Skills