import { useState } from "react";
import Router from "next/router";
import Link from "next/link";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import generalFormatter from "general-formatter";
import styles from "../../styles/Forms.module.css";

const SignInUser = () => {
  const { setAuth, setCurrentUser } = useAuth();
  const [error, setError] = useState({
    email: {
      error: "",
      isError: false,
    },
    password: {
      error: "",
      isError: false,
    },
  });
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

    // Input validation
    const { email, password } = formData;
    let errors = false;

    // Email
    if (!email || email.trim() === "") {
      errors = true;
      setError((prev) => ({
        ...prev,
        email: { error: "Email is required", isError: true },
      }));
    } else {
      setError((prev) => ({ ...prev, email: { error: "", isError: false } }));
    }

    // Verified valid email
    const isEmailValid = generalFormatter.validateEmailFormat(email);

    if (!isEmailValid) {
      errors = true;
      setError((prev) => ({
        ...prev,
        email: { error: "Please enter a valid email address", isError: true },
      }));
    } else {
      setError((prev) => ({ ...prev, email: { error: "", isError: false } }));
    }

    // Validate password
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

    // Return if there's any errors
    if (errors) return;

    try {
      const res = await axios.post("/api/user/signIn", {
        email,
        password,
      });

      setAuth({ accessToken: res.data.accessToken });
      setCurrentUser(res.data.user);
      localStorage.setItem("currentUser", res.data.user);
      localStorage.setItem("accountType", "User");
      Router.push({ pathname: "/", query: { id: res.data.id } });
      return toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      return toast.error(error.response.data.message);
    }
  };

  return (
    <div className={styles.form_upper_container}>
      <div className={styles.form_signIn_image}>
        <div className={styles.form_title_container}>
          <span className={styles.form_title}>User Sign In</span>
        </div>
        <form className={styles.form_container}>
          <div className={styles.form}>
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
                <Link href="/user/signUp">
                  <span className={styles.form_hightlight}>Sign Up here</span>
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInUser;
