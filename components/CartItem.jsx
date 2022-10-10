import useData from "../hooks/useData";
import formatter from "../utils/formatter";
import styles from "../styles/Cart.module.css";

const CartItem = ({ itemData }) => {
  const { decreaseItemQuantity, increaseItemQuantity } = useData();
  return (
    <div className={styles.cart_item}>
      <div className={styles.cart_item_image_container}>
        <img
          className={styles.cart_item_image}
          src={itemData.image}
          alt="Dish Image"
        />
      </div>
      <div className={styles.cart_item_info}>
        <span className={styles.cart_item_name}>{itemData.name}</span>
        <span className={styles.cart_item_description}>
          {itemData.description}
        </span>
      </div>
      <div className={styles.cart_item_quantity}>
        <div>
          <button
            className={styles.cart_item_button}
            onClick={() => decreaseItemQuantity(itemData._id)}
          >
            -
          </button>
        </div>
        {itemData.quantity}
        <div>
          <button
            className={styles.cart_item_button}
            onClick={() => increaseItemQuantity(itemData._id)}
          >
            +
          </button>
        </div>
      </div>
      <div className={styles.cart_item_total}>
        <span>{formatter.currency(itemData.price)}</span>
      </div>
      <div className={styles.cart_item_total}>
        {formatter.currency(itemData.total)}
      </div>
    </div>
  );
};

export default CartItem;
