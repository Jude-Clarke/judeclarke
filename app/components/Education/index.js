import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Add AnimatePresence
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { Button } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { education } from "../../data/constants";
import EducationCard from "../Cards/EducationCard";
import styles from "./index.module.css";

const Education = () => {
  const [isOpen, setIsOpen] = useState(false);

  const mainEducation = education.slice(0, 3);
  const professionalDevelopment = education.slice(3);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Each item pops in 0.1s after the previous one
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

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
            {mainEducation.map((edu, index) => (
              <TimelineItem key={edu.id}>
                <TimelineContent sx={{ py: "12px", px: 2 }}>
                  <EducationCard education={edu} />
                </TimelineContent>
                <TimelineSeparator>
                  <TimelineDot variant="outlined" color="secondary" />
                  {(index !== mainEducation.length - 1 || isOpen) && (
                    <TimelineConnector style={{ background: "#854CE6" }} />
                  )}
                </TimelineSeparator>
              </TimelineItem>
            ))}

            {/* Framer Motion Collapsible Section */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  {professionalDevelopment.map((edu, index) => (
                    <motion.div key={edu.id} variants={itemVariants}>
                      <TimelineItem>
                        <TimelineContent sx={{ py: "12px", px: 2 }}>
                          <EducationCard education={edu} />
                        </TimelineContent>
                        <TimelineSeparator>
                          <TimelineDot
                            variant="outlined"
                            sx={{ padding: "2px", borderColor: "#854CE6" }}
                          >
                            <img
                              src={edu.img.src}
                              style={{
                                width: "20px",
                                height: "20px",
                                borderRadius: "50%",
                              }}
                              alt=""
                            />
                          </TimelineDot>
                          {index !== professionalDevelopment.length - 1 && (
                            <TimelineConnector
                              style={{ background: "#854CE6" }}
                            />
                          )}
                        </TimelineSeparator>
                      </TimelineItem>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </Timeline>

          <div className={styles.buttonContainer}>
            <Button
              className={styles.toggleButton}
              onClick={() => setIsOpen(!isOpen)}
              endIcon={
                isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
              }
            >
              {isOpen ? "Show Less" : "View Professional Development"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
