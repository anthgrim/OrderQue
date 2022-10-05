import { createContext, useState, useEffect } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  /**
   * @desc   Add item
   * @param {object} item: dish object
   * @param {number} quantity: Integer
   */
  const addItem = (item, quantity) => {
    try {
      // Check for duplicates
      const isDuplicate = cart.filter((dish) => dish._id === item._id);

      if (isDuplicate.length > 0) {
        const newCart = cart.map((dish) => {
          if (dish._id === item._id) {
            dish.quantity = dish.quantity + quantity;
            dish.total = dish.price * dish.quantity;
          }

          return dish;
        });

        setCart(newCart);
      } else {
        setCart((prev) => [...prev, item]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * @desc   Decrease item by one
   * @param {string} itemId
   */
  const decreaseItemQuantity = (itemId) => {
    let removableIndex;
    const newCart = cart.map((dish) => {
      if (dish._id === itemId) {
        dish.quantity = dish.quantity - 1;
        if (dish.quantity > 0) {
          dish.total = dish.price * dish.quantity;
        } else {
          removableIndex = cart.indexOf(dish);
        }
      }

      return dish;
    });

    if (removableIndex > -1) {
      newCart.splice(removableIndex, 1);
    }

    setCart(newCart);
  };

  /**
   * @desc   Increase item by one
   * @param {string} itemId
   */
  const increaseItemQuantity = (itemId) => {
    const newCart = cart.map((dish) => {
      if (dish._id === itemId) {
        dish.quantity = dish.quantity + 1;
        dish.total = dish.price * dish.quantity;
      }

      return dish;
    });

    setCart(newCart);
  };

  return (
    <DataContext.Provider
      value={{
        cart,
        setCart,
        addItem,
        decreaseItemQuantity,
        increaseItemQuantity,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
