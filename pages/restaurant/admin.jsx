import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useS3Upload } from "next-s3-upload";
import Dish from "../../components/Dish";
import DishForm from "../../components/DishForm";
import styles from "../../styles/Admin.module.css";
import { toast } from "react-toastify";

const Admin = () => {
  const [restaurantData, setRestaurantData] = useState({});
  const [imageURL, setImageURL] = useState("");
  let { FileInput, openFileDialog, uploadToS3 } = useS3Upload();
  const [dishes, setDishes] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  // Load restaurant information and dishes
  useEffect(() => {
    const getData = async () => {
      const restaurantData = await axiosPrivate.get(
        "/api/restaurant/restaurantData"
      );
      setRestaurantData(restaurantData.data.restaurant);
      setImageURL(restaurantData.data.restaurant.image);

      const response = await axiosPrivate.get("/api/dish/restaurantDishes");
      setDishes(response.data.dishes);
    };

    try {
      getData();
    } catch (error) {
      console.log(error);
      return toast.error(error.response.data.message);
    }
  }, []);

  // Toggle Dish Form
  const toggleForm = () => setIsFormOpen((prev) => !prev);

  // Handle dishList update
  const listSetter = (dishId) => {
    const newList = dishes.filter((dish) => dish._id !== dishId);
    setDishes(newList);
  };

  // Handle change of restaurant information form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurantData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle restaurant information update
  const handleUpdate = async () => {
    const { name, description } = restaurantData;
    if (name.trim() === "" || description.trim() === "") {
      return toast.error("Restaurant information cannot be empty");
    }

    try {
      const updateResponse = await axiosPrivate.put("/api/restaurant/update", {
        name,
        description,
      });

      setRestaurantData(updateResponse.data.restaurant);
      return toast.success(updateResponse.data.message);
    } catch (error) {
      console.log(error);
      return toast.error(error.response.data.message);
    }
  };

  // Handle restaurant image change
  const handleFileChange = async (file) => {
    try {
      // Upload image to s3 bucket
      let s3Response = await uploadToS3(file);
      setImageURL(s3Response.url);

      // Delete previous image in s3
      const deleteRes = await axiosPrivate.delete(
        "/api/restaurant/deletePrevKey"
      );

      if (deleteRes.data.message === "OK") {
        const updateRes = await axiosPrivate.put("/api/restaurant/updateLogo", {
          url: s3Response.url,
          key: s3Response.key,
        });
        return toast.success(updateRes.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Dish List
  const dishList =
    dishes.length === 0 ? (
      <></>
    ) : (
      dishes.map((dish, index) => {
        return (
          <Dish
            key={index}
            targetIndex={index}
            dishData={dish}
            listSetter={listSetter}
          />
        );
      })
    );

  return (
    <>
      <div className={styles.main}>
        <h1>Welcome, {restaurantData?.name}!</h1>
        <button className={styles.button} onClick={handleUpdate}>
          Update Restaurant Info
        </button>
        <div className={styles.admin_content}>
          <div className={styles.section_container}>
            <section className={styles.form}>
              <div>
                <div className={styles.section}>
                  <label className={styles.label} htmlFor="name">
                    Name
                  </label>
                  <input
                    className={styles.form_input}
                    type="text"
                    name="name"
                    id="name"
                    value={restaurantData?.name || ""}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className={styles.section}>
                  <label className={styles.label} htmlFor="description">
                    Description
                  </label>
                  <input
                    className={styles.form_input}
                    type="text"
                    name="description"
                    id="description"
                    value={restaurantData?.description || ""}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
            </section>
            <section className={styles.section}>
              <label className={styles.label} htmlFor="logo">
                Logo
              </label>
              <FileInput onChange={handleFileChange} />
              <button className={styles.button_sm} onClick={openFileDialog}>
                Update Logo
              </button>
              <img
                className={styles.image}
                src={imageURL}
                alt="restaurant image"
              />
            </section>
          </div>
          <div className={styles.section_container}>
            <h3>My Dishes</h3>
            {isFormOpen ? (
              <DishForm onCancel={toggleForm} />
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
        </div>
      </div>
    </>
  );
};

export default Admin;
