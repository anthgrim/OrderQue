import { useState } from "react";
import Router from "next/router";
import Link from "next/link";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import styles from "../../styles/Forms.module.css";

const signInUser = () => {
  const { setAuth, setCurrentUser, setPersist } = useAuth();
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
      const res = await axios.post("/api/user/signIn", {
        email: formData.email,
        password: formData.password,
      });

      setAuth({ accessToken: res.data.accessToken });
      setCurrentUser(res.data.email);
      setPersist(true);
      localStorage.setItem("currentUser", res.data.email);
      localStorage.setItem("accessToken", res.data.accessToken);
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
                <Link href="/user/signUp">
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
