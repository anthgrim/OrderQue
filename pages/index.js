import Hero from "../components/Hero";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Hero
        title={"Welcome to OrderQue.com"}
        subtitle={
          "Where restaurants and customers create community and help each other."
        }
        buttonText={"Learn More"}
      />
      <div className={styles.main}>
        <div>Restauralnt List</div>
        <div>About</div>
      </div>
    </>
  );
}
