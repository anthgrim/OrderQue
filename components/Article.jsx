import styles from "../styles/Article.module.css";

const Article = ({ title, textContent, listArray }) => {
  const list =
    listArray.length === 0 ? (
      <></>
    ) : (
      listArray.map((item, index) => {
        return (
          <li className={styles.list_item} key={index}>
            <span className={styles.name}>{item.name}</span>:{" "}
            <span className={styles.content}>{item.content}</span>
          </li>
        );
      })
    );

  return (
    <article className={styles.article}>
      <span className={styles.title}>{title}</span>
      <p className={styles.paragraph}>{textContent}</p>
      {listArray.length > 0 ? <ul className={styles.list}>{list}</ul> : <></>}
    </article>
  );
};

Article.defaultProps = {
  title: "",
  textContent: "",
  listArray: [],
};

export default Article;
