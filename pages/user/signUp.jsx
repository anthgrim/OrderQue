import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import styles from "../../styles/Forms.module.css";

const signInUser = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/user/", {
        firstName: formData.firstName,
        lastName: formData.lastName,
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
      <div className={styles.form_user_signup_image}>
        <div className={styles.form_title_container}>
          <span className={styles.form_title}>User Sign Up</span>
        </div>
        <div className={styles.form_container}>
          <form className={styles.form}>
            <div className={styles.form_row_md}>
              <div className={styles.form_row}>
                <label className={styles.form_label} htmlFor="firstName">
                  First Name
                </label>
                <input
                  className={styles.form_input}
                  type="text"
                  name="firstName"
                  placeholder="First Name..."
                  required
                  onChange={(e) => handleChange(e)}
                  value={formData.firstName}
                />
              </div>
              <div className={styles.form_row}>
                <label className={styles.form_label} htmlFor="lastName">
                  Last Name
                </label>
                <input
                  className={styles.form_input}
                  type="text"
                  name="lastName"
                  placeholder="Last Name..."
                  required
                  onChange={(e) => handleChange(e)}
                  value={formData.lastName}
                />
              </div>
            </div>
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
            <div className={styles.form_row_md}>
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
              <div className={styles.form_row}>
                <label className={styles.form_label} htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  className={styles.form_input}
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password..."
                  required
                  onChange={(e) => handleChange(e)}
                  value={formData.confirmPassword}
                />
              </div>
            </div>
            <div>
              <button
                className={styles.form_button}
                onClick={(e) => handleSubmit(e)}
              >
                Sign Up!
              </button>
            </div>
            <div>
              <p>
                Already have an account?{" "}
                <Link href="/user/signIn">
                  <span className={styles.form_hightlight}>Sign In here</span>
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
