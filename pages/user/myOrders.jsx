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
      orders.map((order, index) => {
        return (
          <li key={index}>
            <div>
              {order.number} - {order.total} - {order.date}
            </div>
          </li>
        );
      })
    );

  return (
    <>
      <h1>My Orders</h1>
      <ul>{ordersList}</ul>
    </>
  );
};

export default MyOrders;
