import React from "react";
import styles from "../styles/Dialog.module.css";

const Dialog = ({
  title,
  textContent,
  buttonText,
  onCancelAction,
  onConfirmAction,
}) => {
  return (
    <div className={styles.dialog}>
      <div className={styles.dialog_box}>
        <h2>{title}</h2>
        <p>{textContent}</p>
        <section className={styles.button_group}>
          <button className={styles.button_cancel} onClick={onCancelAction}>
            Cancel
          </button>
          <button className={styles.button} onClick={onConfirmAction}>
            {buttonText}
          </button>
        </section>
      </div>
    </div>
  );
};

export default Dialog;
