import styles from "../styles/SignIn.module.css";

const signIn = () => {
  return (
    <div className={styles.page_container}>
      <section className={styles.page_section}>
        <article>
          <h3 className={styles.page_section_title}>
            Welcome <span className={styles.highlight}>Customers</span>
          </h3>
          <p className={styles.page_section_paragraph}>
            Start ordering from your favorite locals! Help the small businesses
            to grow.
          </p>
          <button className={styles.page_section_button}>
            Sign In as a Customer
          </button>
          <p>
            Don't have an account yet? <span>Sign Up here</span>
          </p>
        </article>
      </section>
      <section className={styles.page_section}>
        <article>
          <h3 className={styles.page_section_title}>
            Welcome <span className={styles.highlight}>Restaurants</span>
          </h3>
          <p className={styles.page_section_paragraph}>
            Start selling your dishes and customize your products in one single
            platform!
          </p>
          <button className={styles.page_section_button}>
            Sign In as a Restaurant
          </button>
          <p>
            Don't have an account yet? <span>Sign Up here</span>
          </p>
        </article>
      </section>
    </div>
  );
};

export default signIn;
