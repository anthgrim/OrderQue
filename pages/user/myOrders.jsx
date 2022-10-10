import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import OrderITem from "../../components/OrderITem";
import styles from "../../styles/MyOrders.module.css";

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
        return <OrderITem key={index} orderData={order} />;
      })
    );

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>My Orders</h1>
      <div className={styles.list_headers}>
        <div className={styles.headers}>
          <span>Order Number</span>
          <span>Date</span>
          <span>Total</span>
        </div>
      </div>
      <div className={styles.list_container}>{ordersList}</div>
    </div>
  );
};

export default MyOrders;
