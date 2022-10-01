import Hero from "../components/Hero";
import Card from "../components/Card";
import styles from "../styles/Home.module.css";

export default function Home({ restaurants }) {
  const restaurantList =
    restaurants.length === 0 ? (
      <p>No restaurants have registered yet :( </p>
    ) : (
      restaurants.map((rest, index) => {
        return <Card key={index} restaurantData={rest} />;
      })
    );

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

export async function getServerSideProps() {
  const response = await fetch("http:/localhost:3000/api/home/restaurants", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();
  const restaurants = data.restaurants;

  return {
    props: {
      restaurants,
    },
  };
}
