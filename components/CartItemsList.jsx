import CartItem from "./CartItem";
import styles from "../styles/Cart.module.css";

const CartItemsList = ({ cart }) => {
  const itemsList = cart.map((item, index) => {
    return <CartItem itemData={item} key={index} />;
  });

  return (
    <div className={styles.cart_items_container}>
      {cart.length === 0 ? (
        <></>
      ) : (
        <div className={styles.cart_item_header}>
          <div></div>
          <div>
            <span className={styles.cart_item_name_header}>Dish</span>
          </div>
          <div className={styles.cart_item_quantity}>Quantity</div>
          <div className={styles.cart_item_total}>
            <span>Unit Price</span>
          </div>
          <div className={styles.cart_item_total}>Dish Total</div>
        </div>
      )}
      {itemsList}
    </div>
  );
};

export default CartItemsList;
