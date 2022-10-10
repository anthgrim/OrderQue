import React, { useState } from "react";
import { useS3Upload } from "next-s3-upload";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import styles from "../styles/DishForm.module.css";

const DishForm = ({ onCancel }) => {
  let { FileInput, openFileDialog, uploadToS3 } = useS3Upload();
  const axiosPrivate = useAxiosPrivate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    image: "",
    awsKey: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = async (file) => {
    try {
      let s3Response = await uploadToS3(file);
      setFormData((prev) => ({
        ...prev,
        image: s3Response.url,
        awsKey: s3Response.key,
      }));
    } catch (error) {
      console.log(error);
      toast.error("Could not upload image");
    }
  };

  const handleSubmit = async () => {
    const { name, description, price, image, awsKey } = formData;

    if (
      name.trim() === "" ||
      description.trim() === "" ||
      image.trim() === "" ||
      awsKey.trim() === ""
    ) {
      return toast.error("Name, description, and the images cannot be empty");
    }

    if (price === 0) {
      return toast.error("Price must be greater than $0.00");
    }

    try {
      const response = await axiosPrivate.post("/api/dish/", {
        name,
        description,
        price,
        image,
        awsKey,
      });

      window.location.reload();
      return toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      return toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <div className={styles.button_container}>
        <button className={styles.button_action_secondary} onClick={onCancel}>
          Cancel
        </button>
        <button className={styles.button_action} onClick={handleSubmit}>
          Add Dish
        </button>
      </div>
      <div className={styles.form_row}>
        <label className={styles.label} htmlFor="name">
          Dish Name
        </label>
        <input
          className={styles.input}
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className={styles.form_row}>
        <label className={styles.label} htmlFor="description">
          Description
        </label>
        <input
          className={styles.input}
          type="text"
          name="description"
          id="description"
          value={formData.description}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className={styles.form_row}>
        <label className={styles.label} htmlFor="price">
          Price
        </label>
        <input
          className={styles.input}
          type="number"
          name="price"
          id="price"
          value={formData.price}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className={styles.form_row}>
        <label className={styles.label} htmlFor="image">
          Dish Image
        </label>
        <FileInput onChange={handleFileChange} />
        <button className={styles.button} onClick={openFileDialog}>
          Update Logo
        </button>
        <img
          className={styles.image}
          src={formData.image}
          alt="restaurant image"
        />
      </div>
    </div>
  );
};

export default DishForm;
