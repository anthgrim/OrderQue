import useData from "../../hooks/useData";
import formatter from "../../utils/formatter";
import CartItem from "../../components/CartItem";
import styles from "../../styles/Cart.module.css";

const MyCart = () => {
  const { cart } = useData();

  const itemsList =
    cart.length === 0 ? (
      <p>No items added yet</p>
    ) : (
      cart.map((item, index) => {
        return <CartItem itemData={item} key={index} />;
      })
    );

  const totalCartItem =
    cart.length === 0 ? 0 : cart.reduce((prev, curr) => prev + curr.total, 0);

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Your Cart</h1>
      <div className={styles.cart_item_totals}>
        <span>Total: </span>
        <span className={styles.cart_total}>
          {formatter.currency(totalCartItem)}
        </span>
      </div>
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
    </div>
  );
};

export default MyCart;
