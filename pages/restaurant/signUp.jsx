import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import styles from "../../styles/Forms.module.css";
import { toast } from "react-toastify";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
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
      const res = await axios.post("/api/restaurant/", {
        name: formData.name,
        description: formData.description,
        email: formData.email,
        password: formData.password,
      });

      return toast.success(response.data.message);
    } catch (error) {
      return toast.error(error.response.data.message);
    }
  };

  return (
    <div className={styles.form_upper_container}>
      <div className={styles.form_restaurant_signup_image}>
        <div className={styles.form_title_container}>
          <span className={styles.form_title}>Restaurant Sign Up</span>
        </div>
        <div className={styles.form_container}>
          <form className={styles.form}>
            <div className={styles.form_row_md}>
              <div className={styles.form_row}>
                <label className={styles.form_label} htmlFor="name">
                  Restaurant Name
                </label>
                <input
                  className={styles.form_input}
                  type="text"
                  name="name"
                  placeholder="Restaurant Name..."
                  required
                  onChange={(e) => handleChange(e)}
                  value={formData.name}
                />
              </div>
              <div className={styles.form_row}>
                <label className={styles.form_label} htmlFor="description">
                  Description
                </label>
                <textarea
                  className={styles.form_input}
                  name="description"
                  placeholder="Description..."
                  required
                  onChange={(e) => handleChange(e)}
                  value={formData.description}
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
                <Link href="/restaurant/signIn">
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

export default SignUp;
