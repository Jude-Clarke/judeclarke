import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Bio } from '../../data/constants';
import styles from "./index.module.css"

const date = new Date().getFullYear();

function Footer() {
  return (
    <div className={styles.container}>
      <footer className={styles.wrapper}>
        <h1 className={styles.logo}>Jude Clarke</h1>
        <nav className={styles.nav}>
          <a className={styles["nav-link"]} href="#about">About</a>
          <a className={styles["nav-link"]} href="#skills">Skills</a>
          <a className={styles["nav-link"]} href="#experience">Experience</a>
          <a className={styles["nav-link"]} href="#projects">Projects</a>
          <a className={styles["nav-link"]} href="#education">Education</a>
        </nav>
        <div className={styles["social-media-icons"]}>
          <a className={styles["social-media-icon"]} href={Bio.linkedin} target="display"><LinkedInIcon /></a>
        </div>
        <p className={styles.copyright}>
          &copy; {date} Jude Clarke. All rights reserved.
        </p>

      </footer>
    </div>
  );
}

export default Footer;