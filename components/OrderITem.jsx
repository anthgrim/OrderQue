import React from "react";
import formatter from "../utils/formatter";
import styles from "../styles/MyOrders.module.css";

const OrderITem = ({ orderData }) => {
  return (
    <div className={styles.order}>
      <span>{orderData.number}</span>
      <span>{formatter.date(orderData?.date) || ""}</span>
      <span>{formatter.currency(orderData?.total) || ""}</span>
    </div>
  );
};

export default OrderITem;
