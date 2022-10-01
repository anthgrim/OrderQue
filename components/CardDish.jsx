import styles from "../styles/Card.module.css";

const CardDish = ({ dishData }) => {
  return (
    <div className={styles.card}>
      {/* <img src={dishData.image} alt="dish image" /> */}
      <div className={styles.card_content}>
        <h2>{dishData.name}</h2>
        <p>{dishData.description}</p>
        <h4>{dishData.price}</h4>
        <button className={styles.card_button}>Add to Order</button>
      </div>
    </div>
  );
};

export default CardDish;
