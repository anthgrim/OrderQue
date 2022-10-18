import React, { useState, useEffect } from "react";
import { useS3Upload } from "next-s3-upload";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Image from "next/image";
import { toast } from "react-toastify";
import styles from "../styles/DishForm.module.css";

const DishForm = ({ formToggler, listSetter, dishObject }) => {
  let { FileInput, openFileDialog, uploadToS3 } = useS3Upload();
  const axiosPrivate = useAxiosPrivate();
  const [isNewImage, setIsNewImage] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [error, setError] = useState({
    name: { error: "", isError: false },
    description: { error: "", isError: false },
    price: { error: "", isError: false },
    image: { error: "", isError: false },
    awsKey: { error: "", isError: false },
  });
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
    let errors = false;

    // Input validations
    // Empty inputs
    // Name
    if (!name || name.trim() === "") {
      errors = true;
      setError((prev) => ({
        ...prev,
        name: { error: "Dish name is required", isError: true },
      }));
    } else {
      setError((prev) => ({ ...prev, name: { error: "", isError: false } }));
    }

    // Description
    if (!description || description.trim() === "") {
      errors = true;
      setError((prev) => ({
        ...prev,
        description: { error: "Dish description is required", isError: true },
      }));
    } else {
      setError((prev) => ({
        ...prev,
        description: { error: "", isError: false },
      }));
    }

    // Price
    if (!price || price === 0) {
      errors = true;
      setError((prev) => ({
        ...prev,
        price: {
          error: "Dish price must be greater than $0.00",
          isError: true,
        },
      }));
    } else {
      setError((prev) => ({ ...prev, price: { error: "", isError: false } }));
    }

    // Price
    if (image === "" || awsKey === "") {
      errors = true;
      setError((prev) => ({
        ...prev,
        image: {
          error: "You must update an image",
          isError: true,
        },
      }));
    } else {
      setError((prev) => ({ ...prev, image: { error: "", isError: false } }));
    }

    // Return if there's any errors
    if (errors) return;

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
        {error.name.isError && (
          <span className={styles.error}>{error.name.error}</span>
        )}
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
        {error.description.isError && (
          <span className={styles.error}>{error.description.error}</span>
        )}
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
        {error.price.isError && (
          <span className={styles.error}>{error.price.error}</span>
        )}
      </div>
      <div className={styles.form_row}>
        <label className={styles.label} htmlFor="image">
          Dish Image
        </label>
        {error.image.isError && (
          <span className={styles.error}>{error.image.error}</span>
        )}
        <FileInput onChange={handleFileChange} />
        <button className={styles.button} onClick={openFileDialog}>
          Update Dish Image
        </button>
        <div>
          {formData.image && (
            <Image
              src={formData.image}
              width="250px"
              height="250px"
              loading="lazy"
              alt="Dish Image"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DishForm;
