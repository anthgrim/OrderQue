import useAuth from "../hooks/useAuth";
import { useRouter } from "next/router";
import Image from "next/image";
import Router from "next/router";
import { toast } from "react-toastify";
import styles from "../styles/Card.module.css";

const Card = ({ restaurantData }) => {
  const { currentUser } = useAuth();
  const router = useRouter();

  const validateOrderNow = () => {
    if (!currentUser || currentUser === "") {
      router.push("/user/signIn");
      return toast.info("Please sign in to your account to start an order");
    }

    Router.push({
      pathname: "/user/restaurantOrder",
      query: { restaurantId: restaurantData._id },
    });
  };

  return (
    <div className={styles.card}>
      <div className={styles.image_container}>
        {restaurantData?.image && (
          <Image
            src={restaurantData.image}
            width="260px"
            height="250px"
            loading="lazy"
            alt="Restaurant Image"
          />
        )}
      </div>
      <div className={styles.card_content}>
        <h2>{restaurantData.name}</h2>
        <p>{restaurantData.description}</p>
        <button className={styles.card_button} onClick={validateOrderNow}>
          Order Now!
        </button>
      </div>
    </div>
  );
};

export default Card;
