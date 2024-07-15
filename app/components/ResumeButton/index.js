import React from 'react'
import styles from "./index.module.css"

const ResumeButton = (props) => {
    const { link} = props
  return (
    <a className={styles["resume-button"]} href={link} target="_blank">{props.children}</a>
  )
}

export default ResumeButton