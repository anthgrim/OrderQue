import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Dish from "./Dish";
import DishForm from "./DishForm";
import styles from "../styles/Admin.module.css";
import { toast } from "react-toastify";

const RestaurantDishes = () => {
  const [dishes, setDishes] = useState([]);
  const [targetDish, setTargetDish] = useState({});
  const [isFormOpen, setIsFormOpen] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  // Load dishes data
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axiosPrivate.get("/api/dish/restaurantDishes");
        setDishes(response.data.dishes);
      } catch (error) {
        console.log(error);
        return toast.error(error.response.data.message);
      }
    };

    getData();

    return () => {};
  }, []);

  // Toggle dish form
  const toggleForm = () => {
    setTargetDish({});
    setIsFormOpen((prev) => !prev);
  };

  const onEditDishToggler = (dish) => {
    setTargetDish(dish);
    setIsFormOpen((prev) => !prev);
  };

  // Handle dishList update
  /**
   *
   * @param {String} dishId
   * @param {String} actionEvent: Delete or Add
   * @param {Objet} dishObject
   */
  const listSetter = (dishId, actionEvent, dishObject = {}) => {
    if (actionEvent === "Delete") {
      const newList = dishes.filter((dish) => dish._id !== dishId);
      setDishes(newList);
    } else if (actionEvent === "Add") {
      setDishes((prev) => [...prev, dishObject]);
    } else if (actionEvent === "Edit") {
      const newList = dishes.map((dish) => {
        if (dish._id === dishId) {
          dish.name = dishObject.name;
          dish.description = dishObject.description;
          dish.price = dishObject.price;
          dish.image = dishObject.image;
          dish.awsKey = dishObject.awsKey;
          dish.updatedAt = dishObject.updatedAt;
        }

        return dish;
      });

      setDishes(newList);
    } else {
      return toast.error("Could not update dish list. Unknown action event");
    }
  };

  // Dish List
  const dishList =
    dishes.length === 0 ? (
      <></>
    ) : (
      dishes?.map((dish, index) => {
        return (
          <Dish
            key={index}
            dishData={dish}
            listSetter={listSetter}
            onEdit={onEditDishToggler}
          />
        );
      })
    );

  return (
    <>
      <div>
        <h3>My Dishes</h3>
        {isFormOpen ? (
          <DishForm
            formToggler={toggleForm}
            listSetter={listSetter}
            dishObject={targetDish}
          />
        ) : (
          <>
            <button className={styles.button} onClick={toggleForm}>
              Add new dish
            </button>
            {dishes.length > 0 ? (
              <div className={styles.dish_list}>
                <div className={styles.dish}>
                  <span className={styles.header}>Actions</span>
                  <span className={styles.header}>Name</span>
                  <span className={styles.header}>Description</span>
                  <span className={styles.header}>Price</span>
                  <span className={styles.header}>Image</span>
                </div>
                {dishList}
              </div>
            ) : (
              <p>No dishes have been added yet</p>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default RestaurantDishes;
