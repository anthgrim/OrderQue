import { useState } from "react";
import Link from "next/link";
import Router from "next/router";
import axios from "axios";
import generalFormatter from "general-formatter";
import styles from "../../styles/Forms.module.css";
import { toast } from "react-toastify";

const SignUp = () => {
  const [error, setError] = useState({
    name: { error: "", isError: false },
    description: { error: "", isError: false },
    email: { error: "", isError: false },
    password: { error: "", isError: false },
    confirmPassword: { error: "", isError: false },
  });
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

    // Input validation
    const { name, description, email, password, confirmPassword } = formData;
    let errors = false;

    // Validate empty inputs
    // Name
    if (!name || name.trim() === "") {
      errors = true;
      setError((prev) => ({
        ...prev,
        name: { error: "Name is required", isError: true },
      }));
    } else {
      setError((prev) => ({ ...prev, name: { error: "", isError: false } }));
    }

    // Description
    if (!description || description.trim() === "") {
      errors = true;
      setError((prev) => ({
        ...prev,
        description: { error: "Description is required", isError: true },
      }));
    } else {
      setError((prev) => ({
        ...prev,
        description: { error: "", isError: false },
      }));
    }

    // Email
    if (!email || email.trim() === "") {
      errors = true;
      setError((prev) => ({
        ...prev,
        email: { error: "Email is required", isError: true },
      }));
    } else {
      setError((prev) => ({
        ...prev,
        email: { error: "", isError: false },
      }));
    }

    // Password
    if (!password || password.trim() === "") {
      errors = true;
      setError((prev) => ({
        ...prev,
        password: { error: "Password is required", isError: true },
      }));
    } else {
      setError((prev) => ({
        ...prev,
        password: { error: "", isError: false },
      }));
    }

    // Confirm Password
    if (!confirmPassword || confirmPassword.trim() === "") {
      errors = true;
      setError((prev) => ({
        ...prev,
        confirmPassword: {
          error: "Password confirmation is required",
          isError: true,
        },
      }));
    } else {
      setError((prev) => ({
        ...prev,
        password: { error: "", isError: false },
      }));
    }

    // Verified valid email
    const isEmailValid = generalFormatter.validateEmailFormat(email);
    if (!isEmailValid) {
      errors = true;
      setError((prev) => ({
        ...prev,
        email: {
          error: "Please enter a valid email address",
          isError: true,
        },
      }));
    } else {
      setError((prev) => ({
        ...prev,
        email: { error: "", isError: false },
      }));
    }

    // Validate password confirmation
    if (password !== confirmPassword) {
      errors = true;
      setError((prev) => ({
        ...prev,
        confirmPassword: { error: "Passwords don't match", isError: true },
      }));
    } else {
      setError((prev) => ({
        ...prev,
        confirmPassword: { error: "", isError: false },
      }));
    }

    // Return if there's any errors
    if (errors) return;

    try {
      const res = await axios.post("/api/restaurant/", {
        name,
        description,
        email,
        password,
      });

      toast.success(res.data.message);
      toast.info("Please sign in to your account");
      Router.push("/restaurant/signIn");
    } catch (error) {
      if (error.response.status === 500) console.log(error);
      return toast.error("Could not sign up :(. Server Error");
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
                {error.name.isError && (
                  <span className={styles.error}>{error.name.error}</span>
                )}
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
                {error.description.isError && (
                  <span className={styles.error}>
                    {error.description.error}
                  </span>
                )}
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
              {error.email.isError && (
                <span className={styles.error}>{error.email.error}</span>
              )}
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
                {error.password.isError && (
                  <span className={styles.error}>{error.password.error}</span>
                )}
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
                {error.confirmPassword.isError && (
                  <span className={styles.error}>
                    {error.confirmPassword.error}
                  </span>
                )}
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
