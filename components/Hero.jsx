import Image from "next/image";
import styles from "../styles/Hero.module.css";

const Hero = ({ title, subtitle, buttonText }) => {
  return (
    <div className={styles.hero_container}>
      <div className={styles.hero_image}>
        <div className={styles.hero_content}>
          <h1 className={styles.hero_title}>{title}</h1>
          <p className={styles.hero_subtitle}>{subtitle}</p>
          <div className={styles.hero_button_container}>
            <button className={styles.hero_button}>{buttonText}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
