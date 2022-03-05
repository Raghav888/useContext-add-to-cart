import { createContext, useContext, useState } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartdata, setCartdata] = useState([]);
  const [count, setcount] = useState(0);
  const increaseCount = () => setcount((_count) => _count + 1);
  return (
    <CartContext.Provider
      value={{ cartdata, setCartdata, count, increaseCount }}
    >
      {" "}
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);
export { CartProvider, useCart };
