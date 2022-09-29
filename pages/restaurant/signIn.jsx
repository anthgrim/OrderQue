import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import styles from "../../styles/Forms.module.css";

const signInUser = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/restaurant/signIn", {
        email: formData.email,
        password: formData.password,
      });

      console.log(res.data);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  return (
    <div className={styles.form_upper_container}>
      <div className={styles.form_restaurant_signin_image}>
        <div className={styles.form_title_container}>
          <span className={styles.form_title}>Restaurant Sign In</span>
        </div>
        <div className={styles.form_container}>
          <form className={styles.form}>
            <div className={styles.form_row}>
              <label className={styles.form_label} htmlFor="email">
                Email
              </label>
              <input
                className={styles.form_input}
                type="email"
                name="email"
                placeholder="Email..."
                required
                onChange={(e) => handleChange(e)}
                value={formData.email}
              />
            </div>
            <div className={styles.form_row}>
              <label className={styles.form_label} htmlFor="password">
                Password
              </label>
              <input
                className={styles.form_input}
                type="password"
                name="password"
                placeholder="Password..."
                required
                onChange={(e) => handleChange(e)}
                value={formData.password}
              />
            </div>
            <div>
              <button
                className={styles.form_button}
                onClick={(e) => handleSubmit(e)}
              >
                Sign In
              </button>
            </div>
            <div>
              <p>
                Don't have an account yet?{" "}
                <Link href="/restaurant/signUp">
                  <span className={styles.form_hightlight}>Sign Up here</span>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default signInUser;
