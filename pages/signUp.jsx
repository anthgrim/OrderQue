import Link from "next/link";
import styles from "../styles/SignIn.module.css";

const SignUp = () => {
  return (
    <>
      <h2 className={styles.page_title}>Sign Up!</h2>
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
            <Link href="/user/signUp">
              <button className={styles.page_section_button}>
                Sign Up as a Customer
              </button>
            </Link>
            <p>
              Already have an account?{" "}
              <Link href="/user/signIn">
                <span className={styles.page_redirection}>Sign In here</span>
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
            <Link href="/restaurant/signUp">
              <button className={styles.page_section_button}>
                Sign Up as a Restaurant
              </button>
            </Link>
            <p>
              Already have an account?{" "}
              <Link href="/restaurant/signIn">
                <span className={styles.page_redirection}>Sign In here</span>
              </Link>
            </p>
          </article>
        </section>
      </div>
    </>
  );
};

export default SignUp;
