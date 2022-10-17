import React, { useState } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import generalFormatter from "general-formatter";
import Image from "next/image";
import Dialog from "./Dialog";
import styles from "../styles/Admin.module.css";
import { toast } from "react-toastify";

const Dish = ({ dishData, listSetter, onEdit }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  // Toggle Dialog
  const toggleDialog = () => setIsDialogOpen((prev) => !prev);

  // Handle delete dish action
  const onDelete = async (dishId) => {
    try {
      const response = await axiosPrivate.delete("/api/dish/delete", {
        data: { dishId },
      });

      listSetter(dishId, "Delete");
      toggleDialog();
      return toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      return toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className={styles.dish}>
        <div className={styles.icons_container}>
          <AiFillEdit
            className={styles.icon_edit}
            title="Edit"
            onClick={() => onEdit(dishData)}
          />
          <AiFillDelete
            className={styles.icon_delete}
            title="Delete"
            onClick={toggleDialog}
          />
        </div>
        <span>{dishData?.name || ""}</span>
        <span>{dishData?.description || ""}</span>
        <span>
          {generalFormatter.convertToMoneyString(
            dishData?.price,
            "en-US",
            "currency",
            "USD"
          ) || ""}
        </span>
        <div className={styles.dish_image_container}>
          {dishData?.image && (
            <Image
              src={dishData.image}
              width="50px"
              height="50px"
              loading="lazy"
              alt="Dish Image"
            />
          )}
        </div>
      </div>
      {isDialogOpen ? (
        <Dialog
          title="Delete Dish"
          textContent="Are you sure you want to delete this dish? All the dish data will be lost"
          onCancelAction={toggleDialog}
          onConfirmAction={() => onDelete(dishData._id)}
          buttonText="Delete Dish"
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default Dish;
