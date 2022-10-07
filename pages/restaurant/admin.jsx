import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";

const Admin = () => {
  const [dishes, setDishes] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getDishes = async () => {
      const response = await axiosPrivate.get("/api/dish/restaurantDishes");
      setDishes(response.data.dishes);
    };

    try {
      getDishes();
    } catch (error) {
      console.log(error);
      return toast.error(error.response.data.message);
    }
  }, []);

  return <div>admin</div>;
};

export default Admin;
