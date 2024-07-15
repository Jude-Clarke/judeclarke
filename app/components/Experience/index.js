import React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import ExperienceCard from '../Cards/ExperienceCard';
import { experiences } from '../../data/constants';
import styles from "./index.module.css";

const index = () => {
    return (
        <div id="experience" className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.title}>Experience</div>
                <div className={styles.desc}>
                    Here's a summary of my experience in Software Engineering and building applications.
                </div>
                <div className={styles["timeline-section"]}>
                    <Timeline>
                        {experiences.map((experience,index) => (
                            <TimelineItem key={experience.id}>
                                <TimelineSeparator>
                                    <TimelineDot variant="outlined" color="secondary" />
                                    {index !== experiences.length - 1 && <TimelineConnector style={{ background: '#854CE6' }} />}
                                </TimelineSeparator>
                                <TimelineContent sx={{ py: '12px', px: 2 }}>
                                    <ExperienceCard experience={experience}/>
                                </TimelineContent>
                            </TimelineItem>
                        ))}
                    </Timeline>

                </div>
            </div>
        </div>
    )
}

export default index