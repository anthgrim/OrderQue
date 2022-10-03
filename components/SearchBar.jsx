import { useState } from "react";
import styles from "../styles/Forms.module.css";

const SearchBar = ({ onSearch, onClear, list, placeholder }) => {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleClear = () => {
    if (search === "") return;
    onClear();
    setSearch("");
  };

  const handleSearch = () => {
    onSearch(search);
  };

  const options =
    list.length > 0 ? (
      list.map((item, index) => {
        return <option key={index} value={item.name} id={item._id} />;
      })
    ) : (
      <option value="-- Nothing Found --" />
    );

  return (
    <div className={styles.form_row_sm}>
      <input
        className={styles.form_input_sm}
        list="items"
        placeholder={placeholder}
        name="item"
        id="item"
        value={search}
        onChange={(e) => handleChange(e)}
        onSelect={(e) => handleChange(e)}
      />
      <datalist id="items">{options}</datalist>
      <div className={styles.form_button_container}>
        <button className={styles.form_button_sm} onClick={handleSearch}>
          Search
        </button>
        <button
          className={styles.form_button_sm_secondary}
          onClick={handleClear}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
