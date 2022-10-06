import { useState } from "react";
import useData from "../../hooks/useData";
import formatter from "../../utils/formatter";
import CartItemsList from "../../components/CartItemsList";
import CheckOutForm from "../../components/CheckOutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import styles from "../../styles/Cart.module.css";

const MyCart = ({ stripeKey }) => {
  const { cart } = useData();
  const [isCheckOut, setIsCheckOut] = useState(false);

  const totalCartItem =
    cart.length === 0 ? 0 : cart.reduce((prev, curr) => prev + curr.total, 0);

  const stripePromise = loadStripe(
    "pk_test_51Ll1hBDnku4pw6z1pFXmmi8LHAl4Tf4ctTNZXYa4KiwUCHG95MXlOrLmHYpk5R56b18hzqeH2Se8WPwQvG3vQFyg00T4bayaU5"
  );

  const toggleCheckOutForm = () => {
    setIsCheckOut((prev) => !prev);
  };

  return (
    <div className={styles.main}>
      <div className={styles.cart_container}>
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
                <Elements stripe={stripePromise}>
                  <CheckOutForm total={totalCartItem} />
                </Elements>
              </>
            )}
          </div>
        ) : (
          <p>No items added yet</p>
        )}
      </div>
    </div>
  );
};

export default MyCart;

export async function getServerSidePros() {
  const stripeKey = process.env.STRIPE_PUBLIC_KEY;

  return {
    props: {
      stripeKey,
    },
  };
}
