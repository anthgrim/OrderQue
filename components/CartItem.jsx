import useData from "../hooks/useData";
import generalFormatter from "general-formatter";
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
        <span>
          {generalFormatter.convertToMoneyString(
            itemData.price,
            "en-US",
            "currency",
            "USD"
          )}
        </span>
      </div>
      <div className={styles.cart_item_total}>
        {generalFormatter.convertToMoneyString(
          itemData.total,
          "en-US",
          "currency",
          "USD"
        )}
      </div>
    </div>
  );
};

export default CartItem;
