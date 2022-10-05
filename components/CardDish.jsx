import { useState } from "react";
import formatter from "../utils/formatter";
import styles from "../styles/Card.module.css";
import useData from "../hooks/useData";
import { toast } from "react-toastify";

const CardDish = ({ dishData }) => {
  const [quantity, setQuantity] = useState(0);
  const { addItem } = useData();

  const increase = () => setQuantity((prev) => prev + 1);

  const decrease = () => {
    if (quantity === 0) return;
    setQuantity((prev) => prev - 1);
  };

  const onAdd = () => {
    if (quantity === 0) {
      return toast.info("Please add at least one item to the cart");
    }

    // Build new item data
    const newItem = {
      _id: dishData._id,
      restaurantId: dishData.restaurantId,
      name: dishData.name,
      description: dishData.description,
      price: dishData.price,
      quantity: quantity,
      total: quantity * dishData.price,
    };

    addItem(newItem, quantity);
    setQuantity(0);
    toast.success("Item(s) added to the cart");
  };

  return (
    <div className={styles.card}>
      {/* <img src={dishData.image} alt="dish image" /> */}
      <div className={styles.card_content}>
        <h2>{dishData.name}</h2>
        <p className={styles.card_description}>{dishData.description}</p>
        <h4 className={styles.card_price}>
          {formatter.currency(dishData?.price)}
        </h4>
        <div className={styles.card_actions}>
          <button className={styles.card_action_button} onClick={decrease}>
            -
          </button>
          <div>{quantity}</div>
          <button className={styles.card_action_button} onClick={increase}>
            +
          </button>
        </div>
        <button className={styles.card_button} onClick={onAdd}>
          Add to Order
        </button>
      </div>
    </div>
  );
};

export default CardDish;
