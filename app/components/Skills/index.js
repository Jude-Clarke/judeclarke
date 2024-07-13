import React from 'react'
import styled from 'styled-components'
import { skills } from '../../data/constants'
import styles from "./index.module.css"
import Image from 'next/image'

const Container = styled.div`
padding-top: 50px;
display: flex;
flex-direction: column;
justify-content: center;
position: relative;
z-index: 1;
align-items: center;
`

const Wrapper = styled.div`
position: relative;
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: column;
width: 100%;
max-width: 1100px;
gap: 12px;
@media (max-width: 960px) {
    flex-direction: column;
}
`

export const Title = styled.div`
font-size: 42px;
text-align: center;
font-weight: 600;
margin-top: 20px;
  color: #F2F3F4;
  @media (max-width: 768px) {
margin-top: 12px;
      font-size: 32px;
  }
`;

export const Desc = styled.div`
    font-size: 18px;
    text-align: center;
    max-width: 600px;
    color: #b1b2b3;
    @media (max-width: 768px) {
        font-size: 16px;
    }
`;

const SkillsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  gap: 30px;
  justify-content: center;
`

const Skill = styled.div`
  width: 100%;
  max-width: 500px;
  background: #171721;
  border: 0.1px solid #854CE6;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  border-radius: 16px;
  padding: 18px 36px;
  @media (max-width: 768px) {
    max-width: 400px;
    padding: 10px 36px;
  }
  @media (max-width: 500px) {
    max-width: 330px;
    padding: 10px 36px;
  }


`

const SkillTitle = styled.h2`
  font-size: 28px;
  font-weight: 600;
  color: #b1b2b3;
  margin-bottom: 20px;
  text-align: center;
`

const SkillList = styled.div`
  display: flex;
  justify-content: center; 
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
`

const SkillItem = styled.a`
  font-size: 16px;
  font-weight: 400;
  color: #F2F3F480;
  text-decoration: none;
  border: 1px solid #F2F3F480;
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px 12px;
  }
  @media (max-width: 500px) {
    font-size: 14px;
    padding: 6px 12px;
  }
`


const Skills = () => {
  return (
    <Container id="skills">
      <Wrapper>
        <Title>Skills</Title>
        <Desc>
          Here are some skills I've been building over the past 5 years of my career.
        </Desc>
        <SkillsContainer>
          {skills.map((item, index) => (
            <Skill key={index}>
              <SkillTitle>{item.title}</SkillTitle>
              <SkillList>
                {
                  item.skills.map((skill, index) => (
                    <SkillItem key={index} href={skill.link || "javascript:void(0)"} target={`${skill.link.includes("http") ? "_blank" : "" }`} className={skill.minContent ? "mobile-min-content" : ""}>
                      <Image src={skill.image} alt={`${skill.name} logo`} className={styles["skill-image"]} width={24} height={24}/>
                      {skill.name}
                    </SkillItem>
                  ))
                }
              </SkillList>
            </Skill>
          ))}
        </SkillsContainer>
      </Wrapper>
    </Container>
  )
}

export default Skills