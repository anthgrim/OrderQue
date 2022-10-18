import React from "react";
import generalFormatter from "general-formatter";
import styles from "../styles/FocusedOrder.module.css";

const FocusedOrder = ({ orderData }) => {
  const items = orderData.dishes.map((item, index) => {
    return (
      <div className={styles.item_line} key={index}>
        <span>{item.name}</span>
        <span>
          {generalFormatter.convertToMoneyString(
            item.price,
            "en-US",
            "currency",
            "USD"
          )}
        </span>
        <span>{item.quantity}</span>
        <span>
          {generalFormatter.convertToMoneyString(
            item.total,
            "en-US",
            "currency",
            "USD"
          )}
        </span>
      </div>
    );
  });

  return (
    <div className={styles.order_container}>
      <div className={styles.row}>
        <span className={styles.label}>Order:</span>
        <span className={styles.focused_text}>{orderData.number}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Restaurant:</span>
        <span className={styles.focused_text}>
          {orderData.restaurantName || ""}
        </span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Total:</span>
        <span className={styles.focused_text}>
          {generalFormatter.convertToMoneyString(
            orderData.total,
            "en-US",
            "currency",
            "USD"
          )}
        </span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Date:</span>
        <span className={styles.focused_text}>
          {generalFormatter.convertToDateString(orderData.date, "en-US")}
        </span>
      </div>
      <div className={styles.list}>
        <div className={styles.item_line_headers}>
          <span>Item Name</span>
          <span>Price</span>
          <span>Qty</span>
          <span>Total</span>
        </div>
        {items}
      </div>
    </div>
  );
};

export default FocusedOrder;
