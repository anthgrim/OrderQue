import React, { useState, useEffect } from "react";
import { useS3Upload } from "next-s3-upload";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import styles from "../styles/DishForm.module.css";

const DishForm = ({ formToggler, listSetter, dishObject }) => {
  let { FileInput, openFileDialog, uploadToS3 } = useS3Upload();
  const axiosPrivate = useAxiosPrivate();
  const [isNewImage, setIsNewImage] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    image: "",
    awsKey: "",
  });

  // Listen if there's a dish object
  useEffect(() => {
    if (dishObject.hasOwnProperty("_id")) {
      setFormData(dishObject);
      setIsEdit(true);
    }
  }, []);

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

      if (isEdit) {
        setIsNewImage(true);
      }
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
      let response;

      if (isEdit) {
        if (isNewImage) {
          // Delete previous image in s3
          const s3DeletionResponse = await axiosPrivate.delete(
            "/api/dish/deletePrevKey",
            { data: { dishId: dishObject._id } }
          );

          console.log(s3DeletionResponse.data);
        }

        // Edit dish in db
        response = await axiosPrivate.put("/api/dish/update", {
          dishId: dishObject._id,
          name,
          description,
          price,
          image,
          awsKey,
        });

        // Update dishes list in client
        listSetter(response.data.dish._id, "Edit", response.data.dish);
        setIsNewImage(false);
      } else {
        // Create dish in db
        response = await axiosPrivate.post("/api/dish/", {
          name,
          description,
          price,
          image,
          awsKey,
        });

        // Update dishes list in client
        listSetter(response.data.dish._id, "Add", response.data.dish);
      }

      formToggler();
      return toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      return toast.error(error.response.data.message);
    }
  };

  const onCancel = () => {
    setFormData({
      name: "",
      description: "",
      price: 0,
      image: "",
      awsKey: "",
    });
    setIsEdit(false);
    setIsNewImage(false);
    formToggler();
  };

  return (
    <div>
      <div className={styles.button_container}>
        <button className={styles.button_action_secondary} onClick={onCancel}>
          Cancel
        </button>
        <button className={styles.button_action} onClick={handleSubmit}>
          {isEdit ? "Edit Dish" : "Add Dish"}
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
