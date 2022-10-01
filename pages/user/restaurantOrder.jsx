import CardDish from "../../components/CardDish";
import styles from "../../styles/Home.module.css";

const restaurantOrder = ({ restaurant, dishes }) => {
  console.log(restaurant);
  console.log(dishes);

  const tempData = [
    {
      name: "Delicious but Suspicious",
      description: "It's a guess",
      price: 19.99,
    },
    {
      name: "Thermo Dessert",
      description: "It's something hot",
      price: 9.99,
    },
    {
      name: "Bakineer Maxima",
      description: "A bit strange",
      price: 39.99,
    },
  ];

  const dishList =
    tempData.length === 0 ? (
      <p>No dishes have been added yet</p>
    ) : (
      tempData.map((dish, index) => {
        return <CardDish dishData={dish} key={index} />;
      })
    );

  return (
    <>
      <div className={styles.main}>
        <h1>Welcome to {restaurant.name}!</h1>
        <p>{restaurant.description}</p>
        <h2>Our delicious dishes!</h2>
        <div className={styles.list}>{dishList}</div>
      </div>
    </>
  );
};

export default restaurantOrder;

export async function getServerSideProps(context) {
  const { restaurantId } = context.query;
  const response = await fetch(
    `http://localhost:3000/api/home/restaurant?restaurantId=${restaurantId}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );

  const data = await response.json();
  const restaurant = data.restaurant;
  const dishes = data.dishes;
  return {
    props: {
      restaurant,
      dishes,
    },
  };
}