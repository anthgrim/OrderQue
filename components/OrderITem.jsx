import React from "react";
import generalFormatter from "general-formatter";
import styles from "../styles/MyOrders.module.css";

const OrderITem = ({ orderData, onFocus }) => {
  return (
    <div className={styles.order}>
      <span className={styles.pointer} onClick={() => onFocus(orderData)}>
        {orderData.number}
      </span>
      <span>{orderData.restaurantName || ""}</span>
      <span>
        {generalFormatter.convertToDateString(orderData?.date, "en-US") || ""}
      </span>
      <span>
        {generalFormatter.convertToMoneyString(
          orderData?.total,
          "en-US",
          "currency",
          "USD"
        ) || ""}
      </span>
    </div>
  );
};

export default OrderITem;
