import Link from "next/link";
import styles from "../styles/SignIn.module.css";

const SignIn = () => {
  return (
    <>
      <h2 className={styles.page_title}>Sign In!</h2>
      <div className={styles.page_container}>
        <section className={styles.page_section}>
          <article>
            <h3 className={styles.page_section_title}>
              Welcome <span className={styles.highlight}>Customers</span>
            </h3>
            <p className={styles.page_section_paragraph}>
              Start ordering from your favorite locals! Help the small
              businesses to grow.
            </p>
            <Link href="/user/signIn">
              <button className={styles.page_section_button}>
                Sign In as a Customer
              </button>
            </Link>
            <p>
              Don't have an account yet?{" "}
              <Link href="/user/signUp">
                <span className={styles.page_redirection}>Sign Up here</span>
              </Link>
            </p>
          </article>
        </section>
        <section className={styles.page_section}>
          <article>
            <h3 className={styles.page_section_title}>
              Welcome <span className={styles.highlight}>Restaurants</span>
            </h3>
            <p className={styles.page_section_paragraph}>
              Start selling your dishes and customize your products in one
              single platform!
            </p>
            <Link href="/restaurant/signIn">
              <button className={styles.page_section_button}>
                Sign In as a Restaurant
              </button>
            </Link>
            <p>
              Don't have an account yet?{" "}
              <Link href="/restaurant/signUp">
                <span className={styles.page_redirection}>Sign Up here</span>
              </Link>
            </p>
          </article>
        </section>
      </div>
    </>
  );
};

export default SignIn;
