import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import OrderITem from "../../components/OrderITem";
import FocusedOrder from "../../components/FocusedOrder";
import styles from "../../styles/MyOrders.module.css";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [targetOrder, setTargetOrder] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getOrders = async () => {
      const response = await axiosPrivate.get("/api/order/userOrders");
      setOrders(response.data.orders);
    };

    getOrders();
  }, []);

  const focusOrder = (orderData) => {
    setTargetOrder(orderData);
  };

  const ordersList =
    orders.length === 0 ? (
      <p>No orders have been placed yet</p>
    ) : (
      orders.map((order, index) => {
        return <OrderITem key={index} orderData={order} onFocus={focusOrder} />;
      })
    );

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>My Orders</h1>
      <div className={styles.content}>
        <div>
          <div className={styles.list_headers}>
            <div className={styles.headers}>
              <span>Order Number</span>
              <span>Restaurant</span>
              <span>Date</span>
              <span>Total</span>
            </div>
          </div>
          <div className={styles.list_container}>{ordersList}</div>
        </div>
        {targetOrder && <FocusedOrder orderData={targetOrder} />}
      </div>
    </div>
  );
};

export default MyOrders;
