import { useState } from "react";
import useData from "../../hooks/useData";
import formatter from "../../utils/formatter";
import CartItemsList from "../../components/CartItemsList";
import CheckOutForm from "../../components/CheckOutForm";
import styles from "../../styles/Cart.module.css";

const MyCart = () => {
  const { cart } = useData();
  const [isCheckOut, setIsCheckOut] = useState(false);

  const totalCartItem =
    cart.length === 0 ? 0 : cart.reduce((prev, curr) => prev + curr.total, 0);

  const toggleCheckOutForm = () => {
    setIsCheckOut((prev) => !prev);
  };

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Your Cart</h1>
      <div className={styles.cart_item_totals}>
        <span>Total: </span>
        <span className={styles.cart_total}>
          {formatter.currency(totalCartItem)}
        </span>
      </div>
      {cart.length > 0 ? (
        <div>
          {!isCheckOut ? (
            <>
              <button
                className={styles.cart_item_button_lg}
                onClick={toggleCheckOutForm}
              >
                Place My Order
              </button>
              <CartItemsList cart={cart} />
            </>
          ) : (
            <>
              <button
                className={styles.cart_item_button_lg}
                onClick={toggleCheckOutForm}
              >
                Edit Cart
              </button>
              <CheckOutForm />
            </>
          )}
        </div>
      ) : (
        <p>No items added yet</p>
      )}
    </div>
  );
};

export default MyCart;
