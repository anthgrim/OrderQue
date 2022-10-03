import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getOrders = async () => {
      const response = await axiosPrivate.get("/api/order/userOrders");
      setOrders(response.data.orders);
    };

    getOrders();
  }, []);

  const ordersList =
    orders.length === 0 ? (
      <p>No orders have been placed yet</p>
    ) : (
      <p>There are some Orders</p>
    );

  return (
    <>
      <h1>My Orders</h1>
      {ordersList}
    </>
  );
};

export default MyOrders;
