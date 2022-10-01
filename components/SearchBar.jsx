import { useState } from "react";
import styles from "../styles/Forms.module.css";

const SearchBar = ({ onSearch, onClear, list }) => {
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
      list.map((restaurant, index) => {
        return (
          <option key={index} value={restaurant.name} id={restaurant._id} />
        );
      })
    ) : (
      <option value="-- No Restaurants Found --" />
    );

  return (
    <div className={styles.form_row_sm}>
      <input
        className={styles.form_input_sm}
        list="restaurants"
        placeholder="Restaurant..."
        name="restaurant"
        id="restaurant"
        value={search}
        onChange={(e) => handleChange(e)}
        onSelect={(e) => handleChange(e)}
      />
      <datalist id="restaurants">{options}</datalist>
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
