import React from "react";
import styles from "../styles/Admin.module.css";

const Dish = ({ dishData }) => {
  return (
    <div className={styles.dish}>
      <span>Actions</span>
      <span>{dishData?.name || ""}</span>
      <span>{dishData?.description || ""}</span>
      <span>{dishData?.price || ""}</span>
      <img
        className={styles.dish_image}
        src={dishData?.image}
        alt="Dish image"
      />
    </div>
  );
};

export default Dish;
