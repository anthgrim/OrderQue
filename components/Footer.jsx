import Link from "next/link";
import { AiOutlineGithub, AiFillLinkedin, AiFillCode } from "react-icons/ai";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_section}>
        <h4>OrderQue.com</h4>
        <p>
          OrderQue.com is the final capstone project of the MIT - Fullstack
          Development with MERN Course. It consist on creating a NextJs
          application for ordering food from restaurants.
        </p>
        <div className={styles.footer_subsection}>
          <span>Author</span>
          <span>Kevin Grimaldi</span>
        </div>
        <div className={styles.footer_subsection}>
          <span>Copyright</span>
          <span>MIT - License</span>
        </div>
      </div>
      <div className={styles.footer_section}>
        <h4>Contact</h4>
        <div>
          <a href="https://github.com/anthgrim" target="_blank">
            <div className={styles.footer_contact_item}>
              <div className={styles.footer_contact_item_icon}>
                <AiOutlineGithub />
              </div>
              <div>anthgrim</div>
            </div>
          </a>
          <a
            href="https://www.linkedin.com/in/kevin-grimaldi-392b44178/"
            target="_blank"
          >
            <div className={styles.footer_contact_item}>
              <div className={styles.footer_contact_item_icon}>
                <AiFillLinkedin />
              </div>
              <div>Kevin Grimaldi</div>
            </div>
          </a>
          <a href="https://github.com/anthgrim/OrderQue" target="_blank">
            <div className={styles.footer_contact_item}>
              <div className={styles.footer_contact_item_icon}>
                <AiFillCode />
              </div>
              <div>Project Repository</div>
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
