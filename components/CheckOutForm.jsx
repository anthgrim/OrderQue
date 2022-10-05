import { useState } from "react";
import styles from "../styles/CheckOutForm.module.css";

const CheckOutForm = () => {
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    state: "",
    cc: "",
    exp: "",
    cvv: "",
    zip: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className={styles.form_container}>
      <div className={styles.form_row}>
        <label htmlFor="street">Street Address</label>
        <input
          type="text"
          name="street"
          id="street"
          value={formData.street}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className={styles.form_section}>
        <div className={styles.form_row}>
          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            id="city"
            value={formData.city}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className={styles.form_row}>
          <label htmlFor="state">State</label>
          <input
            type="text"
            name="state"
            id="state"
            value={formData.state}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>
      <div className={styles.form_section}>
        <div className={styles.form_row}>
          <label htmlFor="cc">Credit Card Number</label>
          <input
            type="text"
            name="cc"
            id="cc"
            value={formData.cc}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className={styles.form_row}>
          <label htmlFor="exp">Expiration Date</label>
          <input
            type="text"
            name="exp"
            id="exp"
            value={formData.exp}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className={styles.form_row}>
          <label htmlFor="cvv">CVV</label>
          <input
            type="text"
            name="cvv"
            id="cvv"
            value={formData.cvv}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className={styles.form_row}>
          <label htmlFor="zip">Zip Code</label>
          <input
            type="text"
            name="zip"
            id="zip"
            value={formData.zip}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckOutForm;
