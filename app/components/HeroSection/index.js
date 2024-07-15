import React from 'react';
import { Bio } from '../../data/constants';
import Typewriter from 'typewriter-effect';
import HeroImage from "../../images/judeProfile.webp"
import HeroBgAnimation from '../HeroBgAnimation';
import Image from 'next/image';
import styles from "./index.module.css";

const Hero = (props) => {
  const { CTA } = props;
  return (
    <div id="about">
      <div className={styles["hero-container"]}>
        <div className={styles["hero-bg"]}>
          <HeroBgAnimation />
        </div>
        <div className={styles["hero-inner-container"]}>
          <div className={styles["hero-left-container"]}>
            <div className={styles.title}>
              Hi, I'm <br />
              {Bio.name}
            </div>
            <div className={styles["text-loop"]}>
              I am a 
              <span className={["typewriter-span"]}>
                <Typewriter 
                  options={{
                    strings: Bio.roles,
                    autoStart: true,
                    loop: true
                  }}
                />
              </span>
            </div>
            <div className={styles.subtitle}>{Bio.description}</div>
            <div className={styles["cta-container"]}>
              <CTA link={Bio.resume}>
                My Resume
              </CTA>
            </div>
          </div>
          <div className={styles["hero-right-container"]}>
            <Image src={HeroImage} alt="photo of Jude Clarke" className={styles["hero-image"]} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero