import { createContext, useContext, useState } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartdata, setCartdata] = useState([]);
  const [count, setcount] = useState(0);
  const increaseCount = (val) => setcount((_count) => _count + val);
  const exists = (id) => cartdata.findIndex((obj) => obj.id === id);

  const cartupdate = (id, name, qty) => {
    let itemIndex = exists(id);
    if (itemIndex === -1) {
      let newObj = { name: name, qty: 1, id: id, maxqty: qty - 1 };
      setCartdata([...cartdata, newObj]);
    } else {
      let newCartList = cartdata.map((item, index) =>
        index === itemIndex ? { ...item, qty: item.qty + 1 } : item
      );
      setCartdata(newCartList);
    }
    increaseCount(1);
  };

  const cartFilter = (id, qty) => {
    const newCartData = cartdata.filter((data) => data.id !== id);
    setCartdata(newCartData);
    increaseCount(-qty);
  };

  const cartUpdate = (id, val) => {
    const newCartList = cartdata.map((item) =>
      item.id === id
        ? { ...item, qty: item.qty + val, maxqty: item.maxqty - val }
        : item
    );
    setCartdata(newCartList);
    increaseCount(val);
  };
  return (
    <CartContext.Provider
      value={{
        cartdata,
        setCartdata,
        count,
        increaseCount,
        cartupdate,
        cartFilter,
        cartUpdate
      }}
    >
      {" "}
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);
export { CartProvider, useCart };
