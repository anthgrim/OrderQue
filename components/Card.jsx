import styles from "../styles/Card.module.css";

const Card = ({ restaurantData }) => {
  return (
    <div className={styles.card}>
      <img src={restaurantData.image} alt="restaurant image" />
      <div className={styles.card_content}>
        <h2>{restaurantData.name}</h2>
        <p>{restaurantData.description}</p>
        <button className={styles.card_button}>Order Now!</button>
      </div>
    </div>
  );
};

export default Card;
