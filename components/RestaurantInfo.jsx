import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Image from "next/image";
import { useS3Upload } from "next-s3-upload";
import styles from "../styles/Admin.module.css";
import { toast } from "react-toastify";

const RestaurantInfo = () => {
  const [restaurantData, setRestaurantData] = useState({});
  const [error, setError] = useState({
    name: { error: "", isError: false },
    description: { error: "", isError: false },
  });
  const [imageURL, setImageURL] = useState("");
  let { FileInput, openFileDialog, uploadToS3 } = useS3Upload();
  const axiosPrivate = useAxiosPrivate();

  // Load restaurant information
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axiosPrivate.get(
          "/api/restaurant/restaurantData"
        );

        setRestaurantData(response.data.restaurant);
        setImageURL(response.data.restaurant.image);
      } catch (error) {
        console.log(error);
        return toast.error(error.response.data.message);
      }
    };

    getData();

    return () => {};
  }, []);

  // Handle change of restaurant information
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurantData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle restaurant information update
  const handleUpdate = async () => {
    const { name, description } = restaurantData;
    let errors = false;

    // Validate inputs
    // Name
    if (!name || name.trim() === "") {
      errors = true;
      setError((prev) => ({
        ...prev,
        name: { error: "Name cannot be empty", isError: true },
      }));
    } else {
      setError((prev) => ({ ...prev, name: { error: "", isError: false } }));
    }

    // Description
    if (!description || description.trim() === "") {
      errors = true;
      setError((prev) => ({
        ...prev,
        description: { error: "Description cannot be empty", isError: true },
      }));
    } else {
      setError((prev) => ({
        ...prev,
        description: { error: "", isError: false },
      }));
    }

    // Return if there's any errors
    if (errors) return;

    try {
      const response = await axiosPrivate.put("/api/restaurant/update", {
        name,
        description,
      });

      setRestaurantData(response.data.restaurant);
      return toast.success(response.data.message);
    } catch (error) {
      console.log("Error:", error.message);
      return toast.error(error.response.data.message);
    }
  };

  // Handle restaurant image update
  const handleFileChange = async (file) => {
    try {
      // Upload image to s3 bucket
      let s3Response = await uploadToS3(file);
      setImageURL(s3Response.url);

      // Delete previous image in s3
      const deleteRes = await axiosPrivate.delete(
        "/api/restaurant/deletePrevKey"
      );

      // If delete response is ok then update image url and key in db
      if (deleteRes.data.message === "OK") {
        const updateRes = await axiosPrivate.put("/api/restaurant/updateLogo", {
          url: s3Response.url,
          key: s3Response.key,
        });
        return toast.success(updateRes.data.message);
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  return (
    <>
      <div className={styles.form}>
        <section className={styles.section}>
          <h1>Welcome, {restaurantData?.name}!</h1>
          <button className={styles.button} onClick={handleUpdate}>
            Update Restaurant Info
          </button>
        </section>
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
            {error.name.isError && (
              <span className={styles.error}>{error.name.error}</span>
            )}
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
            {error.description.isError && (
              <span className={styles.error}>{error.description.error}</span>
            )}
          </div>
        </div>
        <section className={styles.section}>
          <label className={styles.label} htmlFor="logo">
            Logo
          </label>
          <FileInput onChange={handleFileChange} />
          <button className={styles.button_sm} onClick={openFileDialog}>
            Update Logo
          </button>
          {imageURL && (
            <Image
              src={imageURL}
              width="300px"
              height="400px"
              alt="restaurant image"
              loading="lazy"
            />
          )}
        </section>
      </div>
    </>
  );
};

export default RestaurantInfo;
