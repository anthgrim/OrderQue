import React from "react";
import generalFormatter from "general-formatter";
import styles from "../styles/MyOrders.module.css";

const OrderITem = ({ orderData }) => {
  return (
    <div className={styles.order}>
      <span>{orderData.number}</span>
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
