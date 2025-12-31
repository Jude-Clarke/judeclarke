import React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { education } from "../../data/constants";
import EducationCard from "../Cards/EducationCard";
import styles from "./index.module.css";

const index = () => {
  return (
    <div id="education" className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.title}>Education</div>
        <div className={styles.desc}>
          I'm a full-stack engineer equipped with an MBA to bring both technical
          expertise and business insight to your organization.
        </div>
        <div className={styles["timeline-section"]}>
          <Timeline sx={{ alignSelf: "center" }}>
            {education.map((education, index) => (
              <TimelineItem key={education.id}>
                <TimelineContent sx={{ py: "12px", px: 2 }}>
                  <EducationCard education={education} />
                </TimelineContent>
                <TimelineSeparator>
                  <TimelineDot variant="outlined" color="secondary" />
                  {index !== education.length && (
                    <TimelineConnector style={{ background: "#854CE6" }} />
                  )}
                </TimelineSeparator>
              </TimelineItem>
            ))}
          </Timeline>
        </div>
      </div>
    </div>
  );
};

export default index;
