"use client"
import React, { useEffect } from 'react';
import { useRouter } from "next/navigation";
import Image from 'next/image';
import styled from 'styled-components';
import styles from "./ProjectCards.module.css";
import _ from "lodash";

const Card = styled.div`
    width: 330px;
    min-height: fit-content;
    background-color: #171721;
    cursor: pointer;
    border-radius: 10px;
    box-shadow: 0 0 12px 4px rgba(0,0,0,0.4);
    overflow: hidden;
    padding: 26px 20px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    transition: all 0.5s ease-in-out;
    &:hover {
        transform: translateY(-10px);
        box-shadow: 0 0 50px 4px rgba(0,0,0,0.6);
        filter: brightness(1.1);
    }
`

const Tags = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 4px;
`

const Tag = styled.span`
    font-size: 12px;
    font-weight: 400;
    color: #854CE6;
    background-color: #854CE615;
    padding: 2px 8px;
    border-radius: 10px;
`

const Details = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0px;
    padding: 0px 2px;
`
const Title = styled.div`
    font-size: 20px;
    font-weight: 600;
    color: #b1b2b3;
    overflow: hidden;
    display: -webkit-box;
    max-width: 100%;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`

const Date = styled.div`
    font-size: 12px;
    margin-left: 2px;
    font-weight: 400;
    color: #b1b2b3;
    @media only screen and (max-width: 768px){
        font-size: 10px;
    }
`


const Description = styled.div`
    font-weight: 400;
    color: #b1b2b399;
    overflow: hidden;
    margin-top: 8px;
    display: -webkit-box;
    max-width: 100%;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
`

const Contributors = styled.div`
    display: flex;
    align-items: center;
    padding-left: 10px;
`

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
        <Card onClick={() => openProjectDetails(setOpenModal, project)}>
            <Image src={project.slides[0].image} width={290} height={180} alt="image" className={styles["project-image"]}/>
            <Tags>
                {project.tags?.map((tag, index) => (
                <Tag key={index}>{tag}</Tag>
                ))}
            </Tags>
            <Details>
                <Title>{project.title}</Title>
                <Date>{project.date}</Date>
                <Description>{project.description}</Description>
            </Details>
            <Contributors>
                {project.contributors?.map((contributor, index) => (
                    <Image key={index} src={contributor.img} alt="contributor headshot" className={styles.avatar}/>
                ))}
            </Contributors>
        </Card>
    )
}

export default ProjectCards
