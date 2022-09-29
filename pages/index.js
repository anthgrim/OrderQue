import Hero from "../components/Hero";
import Card from "../components/Card";
import styles from "../styles/Home.module.css";

export default function Home() {
  const restaurants = [
    {
      name: "The crazy Mexi",
      description: "Taco loco all year long",
      image: "image",
    },
    {
      name: "La Maison du Soleil",
      description: "Le Fancy French",
      image: "image",
    },
    {
      name: "True Cowboy",
      description: "Make stakes great again",
      image: "image",
    },
    {
      name: "True Cowboy",
      description: "Make stakes great again",
      image: "image",
    },
    {
      name: "True Cowboy",
      description: "Make stakes great again",
      image: "image",
    },
    {
      name: "True Cowboy",
      description: "Make stakes great again",
      image: "image",
    },
  ];

  const restaurantList = restaurants.map((rest, index) => {
    return <Card key={index} restaurantData={rest} />;
  });

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
        <div>
          <h1>Our Restaurants</h1>
          <div className={styles.list}>{restaurantList}</div>
        </div>
      </div>
    </>
  );
}
